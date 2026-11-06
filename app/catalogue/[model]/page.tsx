import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { catalogueProducts } from "../../../data/catalogue";
import ProductGallery from "./product-gallery";

const formatRupees = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
const siteUrl = "https://rajlaxmibosch.com";

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
        <div><p className="eyebrow"><span className="eyebrow-line" /> BOSCH PRODUCT DETAILS</p><h2 id="product-specs-title">Bosch {product.model}<br /><em>specifications.</em></h2><p className="product-spec-intro">Technical information and published product details for the Bosch {product.name}. Use the model number when enquiring about this appliance.</p></div>
        <dl className="product-spec-table">{verifiedSpecs.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>
      </section>
      <footer className="catalogue-footer"><a href="/">rajlaxmi<span>.</span> ENTERPRISES</a><span>Independent authorised Bosch home appliances retailer · Bhubaneswar, Odisha</span><a href={product.officialUrl} target="_blank" rel="noreferrer">Official Bosch details ↗</a></footer>
    </main>
  );
}
