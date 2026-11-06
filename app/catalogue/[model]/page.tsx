import { notFound } from "next/navigation";
import { catalogueProducts } from "../../../data/catalogue";

export function generateStaticParams() {
  return catalogueProducts.map((product) => ({ model: product.model.toLowerCase() }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;
  const product = catalogueProducts.find((item) => item.model.toLowerCase() === model.toLowerCase());
  if (!product) notFound();

  return (
    <main className="product-detail-page">
      <div className="catalogue-topline"><a className="catalogue-back" href="/catalogue">← Back to catalogue</a><span>RAJLAXMI ENTERPRISES · BOSCH HOME APPLIANCES</span></div>
      <div className="product-detail-breadcrumb"><a href="/">Home</a><span>/</span><a href="/catalogue">Catalogue</a><span>/</span><span>{product.model}</span></div>
      <section className="product-detail-layout">
        <div className="product-detail-image"><img src={product.image} alt={product.imageAlt} /></div>
        <div className="product-detail-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> {product.categoryLabel} / {product.series}</p>
          <p className="product-model">MODEL {product.model}</p>
          <h1>{product.name}</h1>
          <p className="product-detail-summary">{product.summary}</p>
          <div className="product-highlights product-detail-highlights">{product.highlights.map((item) => <span key={item}>{item}</span>)}</div>
          <p className="product-enquiry-note">Ask Rajlaxmi Enterprises for current MRP, best available price, stock and delivery details.</p>
          <div className="product-detail-actions"><a className="button button-dark" href={product.officialUrl} target="_blank" rel="noreferrer">View on Bosch ↗</a><a className="text-link" href="/catalogue">Explore more models →</a></div>
          <p className="product-source-note">Manuals & product documents: <a href={product.documentsUrl} target="_blank" rel="noreferrer">find documents by model number on Bosch ↗</a></p>
          <p className="product-source-note">Rajlaxmi pricing & availability: {product.retailer.availability === "enquiry" ? "Please enquire for local price and stock." : product.retailer.availability}</p>
          <p className="product-source-note">Product information checked against Bosch Home Appliances India on {product.sourceChecked}.</p>
        </div>
      </section>
      <section className="product-spec-section"><div><p className="eyebrow"><span className="eyebrow-line" /> PRODUCT INFORMATION</p><h2>Technical<br /><em>overview.</em></h2></div><div className="product-spec-table">{product.specs.map((spec) => <div key={spec.label}><span>{spec.label}</span><strong>{spec.value}</strong></div>)}</div></section>
      <footer className="catalogue-footer"><a href="/">rajlaxmi<span>.</span> ENTERPRISES</a><span>Independent authorised Bosch home appliances retailer · Bhubaneswar, Odisha</span><a href={product.officialUrl} target="_blank" rel="noreferrer">Official Bosch details ↗</a></footer>
    </main>
  );
}
