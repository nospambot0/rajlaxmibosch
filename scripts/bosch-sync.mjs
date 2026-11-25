import { chromium } from "playwright";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const BASE = "https://www.bosch-home.in";
const categories = [
  { name: "Washing machines", label: "Laundry", url: "/en/category/washer-dryer/washing-machines" },
  { name: "Dishwashers", label: "Kitchen", url: "/en/category/dishwashers" },
  { name: "Refrigerators", label: "Cooling", url: "/en/category/fridges-freezers" },
  { name: "Ovens & cooking", label: "Cooking", url: "/en/category/cooking-baking" },
  { name: "Mixer grinders", label: "Kitchen", url: "/en/category/mixer-grinders" },
  { name: "Coffee machines", label: "Kitchen", url: "/en/category/filter-coffee-makers" },
  { name: "Vacuum cleaners", label: "Floor care", url: "/en/category/vacuumcleaners" },
];
const outputPath = "data/auto-catalogue.ts";
const date = new Date().toISOString().slice(0, 10);
const existingText = existsSync(outputPath) ? readFileSync(outputPath, "utf8") : "";
const match = existingText.match(/export const autoCatalogueProducts: CatalogueProduct\[\] = ([\s\S]*);\s*$/);
const existing = match ? JSON.parse(match[1]) : [];
const known = new Set(existing.map((p) => String(p.model).toUpperCase()));

function modelFromUrl(raw) {
  try {
    const url = new URL(raw, BASE);
    if (!url.pathname.includes("/en/product/")) return null;
    const segment = url.pathname.split("/").filter(Boolean).at(-1) || "";
    return /^[A-Z0-9]{7,12}$/i.test(segment) ? segment.toUpperCase() : null;
  } catch { return null; }
}

function priceFromText(text) {
  const m = text.match(/MRP\s*₹\s*([\d,]+)(?:\.\d{2})?/i) || text.match(/₹\s*([\d,]+)(?:\.\d{2})?/);
  if (!m) return null;
  const value = Number(m[1].replace(/,/g, ""));
  return Number.isFinite(value) && value > 0 ? value : null;
}

async function collectSpecs(page) {
  return page.evaluate(() => {
    const rows = [];
    const add = (label, value) => {
      label = (label || "").replace(/\s+/g, " ").trim();
      value = (value || "").replace(/\s+/g, " ").trim();
      if (label && value && label.length < 90 && value.length < 240 && label.toLowerCase() !== value.toLowerCase()) rows.push({ label, value });
    };
    document.querySelectorAll("dl").forEach((dl) => {
      dl.querySelectorAll("dt").forEach((dt) => add(dt.textContent, dt.nextElementSibling?.textContent));
    });
    document.querySelectorAll("table tr").forEach((tr) => {
      const cells = [...tr.querySelectorAll("th,td")];
      if (cells.length >= 2) add(cells[0].textContent, cells.slice(1).map((c) => c.textContent).join(" "));
    });
    const lines = (document.body.innerText || "").split(String.fromCharCode(10)).map((s) => s.trim()).filter(Boolean);
    const labels = /^(capacity|dimensions?|maximum spin speed|spin speed|drum volume|place settings|programmes?|water consumption|energy efficiency rating|energy consumption|noise level|main colour of product|colour|finish|home connect|heating modes|usable volume.*|cavity capacity|microwave power|connection rating|net weight|width|height|depth|installation|type|product series|series|temperature range.*|cooking method|number of automatic programmes)$/i;
    for (let i = 0; i < lines.length - 1; i++) if (labels.test(lines[i])) add(lines[i], lines[i + 1]);
    const seen = new Set();
    return rows.filter((r) => {
      const k = r.label.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return !/^(general|technical overview|technical specifications|comfort|connectivity|size and weight|highlights|specifications)$/i.test(k);
    }).slice(0, 40);
  });
}

async function readProduct(page, item, category) {
  await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.locator("h1").first().waitFor({ state: "visible", timeout: 20000 });
  const details = await page.evaluate(() => {
    const text = document.body.innerText || "";
    const meta = (selector) => document.querySelector(selector)?.getAttribute("content") || "";
    const h1 = document.querySelector("h1")?.textContent?.trim() || "";
    const image = meta('meta[property="og:image"]') ||
      document.querySelector('img[src*="media3.bsh-group.com"]')?.getAttribute("src") || "";
    const description = meta('meta[name="description"]') || meta('meta[property="og:description"]') || "";
    return { h1, image, description, text };
  });
  const model = item.model;
  if (!details.h1 || !details.image || !details.text.toUpperCase().includes(model)) return null;
  if (!/^https:\/\//i.test(details.image)) return null;

  const specs = await collectSpecs(page);
  const series = details.h1.match(/Series\s*\d+/i)?.[0] || details.text.slice(0, 1200).match(/Series\s*\d+/i)?.[0] || "Bosch";
  const highlights = specs.slice(0, 5).map((s) => `${s.label}: ${s.value}`);
  const summary = details.description || `${details.h1}. Explore official Bosch product information and specifications at Rajlaxmi Bosch Brand Store.`;
  const officialUrl = new URL(item.url).href;
  return {
    id: model.toLowerCase(),
    name: details.h1,
    model,
    category: category.name,
    categoryLabel: category.label,
    series,
    summary: summary.slice(0, 320),
    image: details.image,
    imageAlt: `Bosch ${model} ${details.h1}`,
    officialUrl,
    highlights,
    specs,
    source: "Bosch Home Appliances India product page",
    sourceChecked: date,
    manufacturerMrp: item.mrp,
    manufacturerMrpSourceUrl: item.mrp == null ? null : officialUrl,
    manufacturerMrpCheckedAt: item.mrp == null ? null : date,
    documentsUrl: "https://www.bosch-home.in/service/get-support/manual-search",
    retailer: { mrp: null, offerPrice: null, availability: "enquiry" },
  };
}

async function main() {
  // Rotate categories so Bosch is not hit with a full-catalogue crawl every five minutes.
  const slot = Math.floor(new Date().getUTCMinutes() / 5);
  const category = categories[slot % categories.length];
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ userAgent: "Mozilla/5.0 (compatible; RajlaxmiBoschCatalogueBot/1.0; +https://rajlaxmibosch.com)" });
  const discovered = new Map();
  try {
    await page.goto(BASE + category.url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1200);
    for (let i = 0; i < 16; i++) {
      const countBefore = await page.locator('a[href*="/en/product/"]').count();
      const more = page.getByText(/^Load more$/i).last();
      if (!(await more.count()) || !(await more.isVisible().catch(() => false))) break;
      await more.click({ timeout: 8000 }).catch(() => {});
      await page.waitForTimeout(1000);
      const countAfter = await page.locator('a[href*="/en/product/"]').count();
      if (countAfter <= countBefore) break;
    }
    const cards = await page.locator('a[href*="/en/product/"]').evaluateAll((anchors) =>
      anchors.map((a) => ({ url: a.href, text: a.innerText || "" }))
    );
    for (const card of cards) {
      const model = modelFromUrl(card.url);
      if (!model || known.has(model) || discovered.has(model)) continue;
      discovered.set(model, { model, url: card.url, mrp: priceFromText(card.text) });
    }

    let added = 0;
    for (const item of discovered.values()) {
      if (added >= 8) break;
      try {
        const product = await readProduct(page, item, category);
        if (!product) {
          console.log(`Skipped ${item.model}: Bosch product page did not pass validation`);
          continue;
        }
        existing.push(product);
        known.add(product.model.toUpperCase());
        added++;
        console.log(`Validated new Bosch model ${product.model}`);
      } catch (error) {
        console.log(`Skipped ${item.model}: ${String(error).slice(0, 180)}`);
      }
    }
    if (added > 0) {
      const output = `import type { CatalogueProduct } from "./catalogue";\n\n// Generated by the scheduled Bosch India catalogue sync. Do not edit manually.\nexport const autoCatalogueProducts: CatalogueProduct[] = ${JSON.stringify(existing, null, 2)};\n`;
      writeFileSync(outputPath, output);
    }
    console.log(JSON.stringify({ category: category.name, discovered: discovered.size, added, totalAutoProducts: existing.length }));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
