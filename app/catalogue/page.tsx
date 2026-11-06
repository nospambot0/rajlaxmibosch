"use client";

import { useMemo, useState } from "react";
import { catalogueCategories, catalogueProducts, officialCategorySources } from "../../data/catalogue";

const formatRupees = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

export default function CataloguePage() {
  const [activeCategory, setActiveCategory] = useState("All products");
  const [search, setSearch] = useState("");
  const products = useMemo(() => {
    const selectedCategory = activeCategory.trim().toLocaleLowerCase();
    const query = search.trim().toLocaleLowerCase();

    return catalogueProducts.filter((product) => {
      // Category membership is determined only by the canonical category field.
      const productCategory = product.category.trim().toLocaleLowerCase();
      const matchesCategory = selectedCategory === "all products" || productCategory === selectedCategory;
      const matchesSearch = !query || [product.name, product.model, product.category, product.summary]
        .join(" ")
        .toLocaleLowerCase()
        .includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setSearch("");
  };

  return (
    <main className="catalogue-page">
      <div className="catalogue-topline">
        <a className="catalogue-back" href="/">← Rajlaxmi Enterprises</a>
        <span>AUTHORised BOSCH HOME APPLIANCES RETAILER</span>
      </div>
      <section className="catalogue-hero">
        <p className="eyebrow"><span className="eyebrow-line" /> THE BOSCH COLLECTION</p>
        <h1>Explore the<br /><em>catalogue.</em></h1>
        <p>Discover selected Bosch home appliances with product details sourced from Bosch Home Appliances India. Compare published Bosch MRPs and enquire with Rajlaxmi Enterprises for our current offer price and local availability.</p>
        <div className="catalogue-meta"><span>OFFICIAL PRODUCT INFORMATION</span><span>RAJLAXMI OFFER PRICE ON ENQUIRY</span></div>
      </section>
      <section className="catalogue-browser">
        <div className="catalogue-toolbar">
          <div><p className="eyebrow"><span className="eyebrow-line" /> FIND YOUR APPLIANCE</p><h2>Browse products</h2></div>
          <label className="catalogue-search"><span>Search model or product</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="e.g. WGA254IRIN" /></label>
        </div>
        <div className="catalogue-filters" aria-label="Product categories">
          {catalogueCategories.map((category) => <button type="button" key={category} aria-pressed={activeCategory === category} className={activeCategory === category ? "active" : ""} onClick={() => selectCategory(category)}>{category}</button>)}
        </div>
        <div className="catalogue-results-head"><span>{products.length} selected models</span><span>MODEL INFORMATION FROM BOSCH INDIA</span></div>
        {products.length ? <div className="product-grid">
          {products.map((product, index) => <article className="product-card" key={product.id}>
            <a className="product-image" href={`/catalogue/${product.model.toLowerCase()}`}>
              <img src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" />
              <span className="product-image-cta">View product ↗</span>
            </a>
            <div className="product-card-copy">
              <div className="product-card-meta"><span>{product.categoryLabel} / {product.series}</span><span>MODEL {product.model}</span></div>
              <h3>{product.name}</h3>
              <p>{product.summary}</p>
              <div className="product-highlights">{product.highlights.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div>
              <div className="product-price-block">
                <div className="product-price-line"><span>Bosch MRP</span><strong>{product.manufacturerMrp != null ? formatRupees(product.manufacturerMrp) : "MRP on enquiry"}</strong></div>
                <div className="product-price-line retailer-price"><span>Rajlaxmi Enterprise offer price</span><strong>Enquire for price</strong></div>
              </div>
              <div className="product-card-bottom"><span>Stock & delivery on enquiry</span><a href={`/catalogue/${product.model.toLowerCase()}`}>View details ↗</a></div>
            </div>
          </article>)}
        </div> : <div className="catalogue-empty"><span>MORE BOSCH MODELS COMING INTO THE CATALOGUE</span><p>We are organising the full range category by category. Contact Rajlaxmi Enterprises for help finding a model.</p><a href="/">Back to home ↗</a></div>}
      </section>
      <section className="catalogue-source-panel"><div><p className="eyebrow"><span className="eyebrow-line" /> OFFICIAL BOSCH RANGE</p><h2>More to<br /><em>discover.</em></h2><p>These official Bosch India category pages show the broader range. We are adding model cards in verified batches; category totals are indicative and can change as Bosch updates its catalogue.</p></div><div className="catalogue-source-list">{officialCategorySources.map((source) => <a key={source.name} href={source.url} target="_blank" rel="noreferrer"><span>{source.name}</span><strong>{source.count} <small>listed</small> ↗</strong></a>)}</div></section><section className="catalogue-note-panel"><div><p className="eyebrow"><span className="eyebrow-line" /> A NOTE ON PRICING</p><h2>Clear details.<br /><em>Personal guidance.</em></h2></div><p>Bosch MRP is shown separately wherever it has been verified from Bosch Home Appliances India. Where a published MRP has not been verified, the catalogue says “MRP on enquiry”. Rajlaxmi Enterprises’ own offer price, stock and delivery are confirmed directly by the retailer.</p></section>
      <footer className="catalogue-footer"><a href="/">rajlaxmi<span>.</span> ENTERPRISES</a><span>Independent authorised Bosch home appliances retailer · Bhubaneswar, Odisha</span><a href="https://www.bosch-home.in/en" target="_blank" rel="noreferrer">Bosch Home Appliances ↗</a></footer>
    </main>
  );
}
