import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { catalogueProducts } from "../../../data/catalogue";
import ProductGallery from "./product-gallery";

const formatRupees = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
const siteUrl = "https://rajlaxmibosch.com";
const specSections = [
 {title:"General",test:(s:string)=>!/(dimension|size|weight|cool|refriger|freez|connect|wifi|wi-fi|bluetooth|app|home.?connect|feature|function|technology|programme|program|mode)/i.test(s)},
 {title:"Size and weight",test:(s:string)=>/(dimension|size|weight|height|width|depth)/i.test(s)},
 {title:"Specific Features",test:(s:string)=>/(feature|function|technology|programme|program|mode)/i.test(s)},
 {title:"Cooling",test:(s:string)=>/(cool|refriger|freshness|temperature)/i.test(s)},
 {title:"Freezing",test:(s:string)=>/(freez|freezer)/i.test(s)},
 {title:"Connectivity",test:(s:string)=>/(connect|wifi|wi-fi|bluetooth|app|home.?connect)/i.test(s)},
];

export const revalidate = 86400;

type ProductParams = { model: string };

function findProduct(model: string) {
  return catalogueProducts.find((item) => item.model.toLowerCase() === model.toLowerCase());
}

export async function generateMetadata({ params }: { params: Promise<ProductParams> }): Promise<Metadata> {
  const { model } = await params;
  const product = findProduct(model);
  if (!product) return { title: "Product not found" };

  const title = `Bosch ${product.model} ${product.name} | Bhubaneswar`;
  const description = `Explore Bosch ${product.name} (model ${product.model}) at Rajlaxmi Enterprises, authorised Bosch home appliances retailer in Bhubaneswar, Odisha. View product features and specifications; enquire for offer price, stock and delivery.`;
  const canonical = `/catalogue/${product.model.toLowerCase()}`;

  return {
    title,
    description,
    keywords: [
      `Bosch ${product.model}`,
      product.name,
      `Bosch ${product.categoryLabel}`,
      "Bosch appliances Bhubaneswar",
      "Rajlaxmi Enterprises",
      "Bosch authorised retailer Odisha",
    ],
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Rajlaxmi Enterprises",
      locale: "en_IN",
      images: [{ url: product.image, alt: product.imageAlt }],
    },
  };
}

async function getBoschGallery(product: (typeof catalogueProducts)[number]) {
  try {
    const response = await fetch(product.officialUrl, {
      next: { revalidate: 86400 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RajlaxmiCatalogue/1.0)" }
    });
    if (!response.ok) return [product.image];
    const html = await response.text();
    const matches = [...html.matchAll(/https?:\\?\/\\?\/media3\.bsh-group\.com\\?\/Product_Shots\\?\/5120x\\?\/[^"'<>]+?\.(?:webp|jpg|png)/gi)]
      .map((match) => match[0].replace(/\\/g, "/").replace(/&amp;/g, "&"));
    const gallery = [...new Set(matches)].filter((url) => url.includes(product.model));
    const primary = gallery.find((url) => /_STP_def\.(?:webp|jpg|png)$/i.test(url)) || product.image;
    return [primary, ...gallery.filter((url) => url !== primary)];
  } catch {
    return [product.image];
  }
}

export function generateStaticParams() {
  return catalogueProducts.map((product) => ({ model: product.model.toLowerCase() }));
}

export default async function ProductDetailPage({ params }: { params: Promise<ProductParams> }) {
  const { model } = await params;
  const product = findProduct(model);
  if (!product) notFound();

  const galleryImages = await getBoschGallery(product);
  const verifiedSpecs = product.specs.length ? product.specs : [
    { label: "Appliance type", value: product.name },
    { label: "Product series", value: product.series },
    ...product.highlights.map((feature, index) => ({ label: `Key feature ${index + 1}`, value: feature }))
  ];

  const dimensionAndCapacitySpecs = verifiedSpecs.filter((spec) =>
    /(dimension|size|weight|height|width|depth|capacity|volume|place settings|load)/i.test(spec.label)
  );
  const energySpecs = verifiedSpecs.filter((spec) =>
    /(energy|star rating|efficien|consumption|kwh|electricity)/i.test(spec.label)
  );
  const technicalSpecs = verifiedSpecs.filter(
    (spec) => !dimensionAndCapacitySpecs.includes(spec) && !energySpecs.includes(spec)
  );
  const energyRatingApplies = /(washing|washer|refrigerator|dishwasher|air conditioner|cooling)/i.test(product.category);
  const sameCategoryProducts = catalogueProducts.filter(
    (item) => item.model !== product.model && item.category === product.category
  );
  const relatedProducts = (sameCategoryProducts.length
    ? sameCategoryProducts
    : catalogueProducts.filter((item) => item.model !== product.model && item.categoryLabel === product.categoryLabel)
  ).slice(0, 4);

  const productUrl = `${siteUrl}/catalogue/${product.model.toLowerCase()}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `Bosch ${product.name}`,
      model: product.model,
      sku: product.model,
      brand: { "@type": "Brand", name: "Bosch" },
      category: product.category,
      description: product.summary,
      image: galleryImages,
      url: productUrl,
      additionalProperty: verifiedSpecs.map((spec) => ({
        "@type": "PropertyValue",
        name: spec.label,
        value: spec.value,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Bosch home appliances catalogue", item: `${siteUrl}/catalogue` },
        { "@type": "ListItem", position: 3, name: `Bosch ${product.model}`, item: productUrl },
      ],
    },
  ];

  return (
    <main className="product-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className="catalogue-topline"><a className="catalogue-back" href="/catalogue">← Back to catalogue</a><span>RAJLAXMI ENTERPRISES · BOSCH HOME APPLIANCES</span></div>
      <nav className="product-detail-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/catalogue">Bosch home appliances</a><span aria-hidden="true">/</span><span aria-current="page">{product.model}</span></nav>
      <section className="product-detail-layout" aria-labelledby="product-title">
        <ProductGallery images={galleryImages} alt={product.imageAlt} model={product.model} />
        <div className="product-detail-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> {product.categoryLabel} / {product.series}</p>
          <p className="product-model">BOSCH MODEL {product.model}</p>
          <h1 id="product-title">{product.name}</h1>
          <p className="product-detail-summary">{product.summary}</p>
          <section className="product-classification" aria-label="Product series and category">
            <div><span>Series</span><strong>{product.series}</strong></div>
            <div><span>Product category</span><strong>{product.category}</strong></div>
          </section>
          <section className="product-detail-feature-section" aria-labelledby="product-features-title">
            <h2 id="product-features-title">Key features of Bosch {product.model}</h2>
            <ul className="product-highlights product-detail-highlights">{product.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className="detail-pricing" aria-label="Product pricing">
            <div className="detail-price-row"><span>Bosch MRP</span><strong>{product.manufacturerMrp != null ? formatRupees(product.manufacturerMrp) : "MRP on enquiry"}</strong></div>
            <div className="detail-price-row"><span>Rajlaxmi Enterprise offer price</span><strong>Enquire for price</strong></div>
            <p>Ask Rajlaxmi Enterprises for our current offer, stock and delivery details.</p>
          </section>
          <div className="product-detail-actions"><button className="button button-dark" type="button" disabled>Enquire for Price</button><a className="text-link" href="/catalogue">Explore more models →</a></div>
          <p className="product-source-note">Rajlaxmi stock &amp; delivery: {product.retailer.availability === "enquiry" ? "Please enquire for local availability." : product.retailer.availability}</p>
          <p className="product-source-note">Product information checked against Bosch Home Appliances India on {product.sourceChecked}. Specifications shown are those published for this model; contact Rajlaxmi for clarification or current availability.</p>
        </div>
      </section>
      <section className="product-spec-section" aria-labelledby="product-specs-title">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> BOSCH PRODUCT DETAILS</p>
          <h2 id="product-specs-title">Technical<br /><em>specifications.</em></h2>
          <p className="product-spec-intro">Model-specific technical information published for Bosch {product.model}. Only verified values are shown; unavailable values are not guessed.</p>
        </div>
        <div className="product-spec-groups">
          {specSections.map((section) => {
            const rows = technicalSpecs.filter((spec) => section.test(spec.label));
            return rows.length ? (
              <section className="product-spec-group" key={section.title}>
                <h3>{section.title}</h3>
                <dl className="product-spec-table">
                  {rows.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}
                </dl>
              </section>
            ) : null;
          })}
          {!technicalSpecs.length && <p className="product-data-note">Detailed technical specifications have not yet been verified for this model.</p>}
        </div>
      </section>

      <section className="product-detail-extra-section" aria-labelledby="product-dimensions-title">
        <div className="product-detail-extra-heading">
          <p className="eyebrow"><span className="eyebrow-line" /> FIT &amp; CAPACITY</p>
          <h2 id="product-dimensions-title">Dimensions<br /><em>&amp; capacity.</em></h2>
        </div>
        {dimensionAndCapacitySpecs.length ? (
          <dl className="product-extra-spec-grid">
            {dimensionAndCapacitySpecs.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}
          </dl>
        ) : (
          <p className="product-data-note">Dimensions and capacity details are not currently verified in the catalogue for this model. Please refer to the official Bosch product documentation or ask our team before planning installation.</p>
        )}
      </section>

      {(energyRatingApplies || energySpecs.length > 0) && (
        <section className="product-energy-section" aria-labelledby="product-energy-title">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> EFFICIENCY INFORMATION</p>
            <h2 id="product-energy-title">Energy<br /><em>rating.</em></h2>
          </div>
          {energySpecs.length ? (
            <dl className="product-extra-spec-grid">
              {energySpecs.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}
            </dl>
          ) : (
            <p className="product-data-note">An energy label or consumption value has not yet been verified for this exact model. Where applicable, check the product's current BEE label and Bosch documentation before comparing ratings.</p>
          )}
        </section>
      )}

      <section className="product-documents-section" aria-labelledby="product-documents-title">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> OFFICIAL PRODUCT DOCUMENTS</p>
          <h2 id="product-documents-title">Guides for<br /><em>your appliance.</em></h2>
          <p>Open the official Bosch product information and support resources for this exact model.</p>
        </div>
        <div className="product-document-links">
          <a href={product.officialUrl} target="_blank" rel="noreferrer">
            <span className="product-document-icon" aria-hidden="true">↗</span>
            <span><strong>Product brochure &amp; information</strong><small>Open the official Bosch product page for available product literature</small></span>
            <span className="product-document-arrow" aria-hidden="true">↗</span>
          </a>
          <a href={product.documentsUrl} target="_blank" rel="noreferrer">
            <span className="product-document-icon" aria-hidden="true">PDF</span>
            <span><strong>User manual</strong><small>Find the manual using model number {product.model} on Bosch support</small></span>
            <span className="product-document-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="product-related-section" aria-labelledby="product-related-title">
        <div className="product-related-heading">
          <div><p className="eyebrow"><span className="eyebrow-line" /> KEEP EXPLORING</p><h2 id="product-related-title">Related<br /><em>products.</em></h2></div>
          <a className="text-link" href="/catalogue">View full catalogue →</a>
        </div>
        {relatedProducts.length ? (
          <div className="product-related-grid">
            {relatedProducts.map((item) => (
              <a className="product-related-card" href={`/catalogue/${item.model.toLowerCase()}`} key={item.model}>
                <div className="product-related-image"><img src={item.image} alt={item.imageAlt} loading="lazy" /></div>
                <div className="product-related-copy"><span>{item.series} · {item.category}</span><h3>{item.name}</h3><p>Model {item.model}</p><strong>View product ↗</strong></div>
              </a>
            ))}
          </div>
        ) : <p className="product-data-note">More related models will appear as the verified catalogue expands.</p>}
      </section>

      <section className="product-warranty-note"><div><p className="eyebrow">BOSCH MANUFACTURER WARRANTY</p><h2>Warranty coverage, clearly explained.</h2><p>Warranty duration and covered components depend on the appliance category and, in some cases, the exact model. Confirm coverage against the product warranty card and Bosch’s current terms.</p></div><a className="text-link" href="/warranty">View Bosch warranty information →</a></section>
      <footer className="catalogue-footer"><a href="/">rajlaxmi<span>.</span> ENTERPRISES</a><span>Bosch Brand Store · Serving Bhubaneswar & Cuttack</span><div className="catalogue-footer-links"><a href="/terms">Terms &amp; Conditions</a><a href="/warranty">Warranty Information</a><a href={product.officialUrl} target="_blank" rel="noreferrer">Official Bosch details ↗</a></div></footer>
    </main>
  );
}
