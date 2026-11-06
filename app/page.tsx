"use client";

import { catalogueProducts } from "@/data/catalogue";

const productImage = (model: string) => catalogueProducts.find((product) => product.model === model)?.image ?? "";

const categories = [
  { number: "01", name: "Washing machines", detail: "Care for every fabric", image: productImage("WGA254ZSIN") },
  { number: "02", name: "Refrigerators", detail: "Freshness, thoughtfully kept", image: productImage("CMC36K23VI") },
  { number: "03", name: "Dishwashers", detail: "A smarter way to clean", image: productImage("SMS66GB01I") },
  { number: "04", name: "Ovens & cooking", detail: "Made for inspired kitchens", image: productImage("HJG852YB0I") },
  { number: "05", name: "Hobs & chimneys", detail: "A considered cooking space", image: productImage("PIB375FB5I") },
  { number: "06", name: "Vacuum cleaners", detail: "A cleaner kind of home", image: productImage("BCS71PETIN") },
];

const highlights = [
  { number: "01", title: "Explore the range", text: "Browse Bosch home appliances by category and discover the details that matter." },
  { number: "02", title: "Get a clear quote", text: "Ask our team for current pricing, product availability and delivery information." },
  { number: "03", title: "Visit our showroom", text: "See selected appliances in person at Rajlaxmi Enterprises in Bhubaneswar." },
];

export default function HomePage() {
  return (
    <main id="top">
      <div className="announcement">
        <span>RAJLAXMI ENTERPRISES</span>
        <span className="announcement-center">Authorised Bosch Home Appliances Retailer</span>
        <a href="#contact">Bhubaneswar, Odisha <span aria-hidden="true">↗</span></a>
      </div>

      <header className="site-header">
        <div className="header-brand">
          <a className="wordmark" href="/" aria-label="Rajlaxmi Enterprises home">
            <span className="wordmark-name">rajlaxmi<span>.</span></span>
            <span className="wordmark-caption">ENTERPRISES</span>
          </a>
          <span className="brand-divider" aria-hidden="true" />
          <a className="bosch-brand" href="https://www.bosch-home.in/" target="_blank" rel="noreferrer" aria-label="Bosch Home Appliances">
            <img className="bosch-header-logo" src="/bosch-logo.svg" alt="Bosch" />
            <span className="bosch-brand-caption">HOME APPLIANCES</span>
          </a>
        </div>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="/catalogue">Catalogue</a>
          <a href="#collections">Collections</a>
          <a href="#experience">The experience</a>
          <a href="#about">About us</a>
          <a href="#contact">Visit & enquire</a>
        </nav>
        <a className="header-cta" href="#contact">Talk to our team <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> A BETTER WAY TO LIVE</p>
          <h1>Thoughtful living.<br /><em>German engineering.</em></h1>
          <p className="hero-description">
            Discover the world of Bosch home appliances with Rajlaxmi Enterprises.
            Personal guidance, considered choices and a more confident way to choose for your home.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="/catalogue">Explore catalogue <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#contact">Plan a showroom visit <span aria-hidden="true">→</span></a>
          </div>
          <div className="hero-footnote"><span className="small-dot" /> INDEPENDENTLY OWNED AUTHORISED RETAILER</div>
        </div>
        <div className="hero-art hero-product-art" aria-label="Official Bosch home appliance product photography">
          <div className="hero-photo-frame">
            <img src={productImage("WGA254ZSIN")} alt="Bosch Series 6 front-loading washing machine" fetchPriority="high" />
            <div className="hero-photo-label"><span>THE BOSCH COLLECTION</span><strong>Designed around everyday life.</strong></div>
          </div>
          <div className="hero-stamp"><span>THE</span><strong>BOSCH</strong><span>COLLECTION</span></div>
          <div className="art-note"><span>01 /</span> Everyday, elevated.</div>
        </div>
        <div className="hero-index"><span>01</span><span className="index-rule" /><span>03</span></div>
      </section>

      <section className="trust-strip" aria-label="Store highlights">
        <div><span className="trust-mark">✳</span><p>Authorised Bosch<br />retailer</p></div>
        <div><span className="trust-mark">⌖</span><p>Showroom in<br />Bhubaneswar</p></div>
        <div><span className="trust-mark">↗</span><p>Serving Cuttack<br />and across Odisha</p></div>
        <div><span className="trust-mark">＋</span><p>Personal product<br />guidance</p></div>
      </section>

      <section className="section collections" id="collections">
        <div className="section-heading">
          <div><p className="eyebrow"><span className="eyebrow-line" /> FIND YOUR FIT</p><h2>Made for the way<br /><em>you live.</em></h2></div>
          <div className="section-aside"><p>Explore the Bosch home appliance range. From everyday essentials to considered kitchen upgrades, find the right place to begin.</p><a className="text-link" href="#contact">Need help choosing? <span aria-hidden="true">→</span></a></div>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <a className="category-card" href={`/catalogue?category=${encodeURIComponent(category.name)}`} key={category.number}>
              <img className="category-card-image" src={category.image} alt="" loading="lazy" decoding="async" /><div className="category-card-shade" /><div className="category-card-top"><span>{category.number} / 06</span><span className="category-icon" aria-hidden="true">↗</span></div>
              <div className="category-card-bottom"><div><h3>{category.name}</h3><p>{category.detail}</p></div><span className="circle-arrow" aria-hidden="true">↗</span></div>
            </a>
          ))}
        </div>
        <p className="catalogue-note">Explore selected Bosch models with official product imagery and specifications. Pricing and stock are confirmed directly by Rajlaxmi Enterprises.</p><a className="text-link catalogue-link" href="/catalogue">View selected products <span aria-hidden="true">→</span></a>
      </section>

      <section className="experience" id="experience">
        <div className="experience-visual experience-photo-visual">
          <div className="experience-photo-grid">
            <img className="experience-photo-main" src={productImage("CMC36K23VI")} alt="Bosch Series 6 refrigerator" loading="lazy" />
            <img src={productImage("SMS66GB01I")} alt="Bosch Series 6 dishwasher" loading="lazy" />
            <img src={productImage("HJG852YB0I")} alt="Bosch Series 6 built-in oven" loading="lazy" />
          </div>
          <div className="experience-photo-caption"><span>BUILT FOR EVERYDAY</span><strong>Bosch home appliances</strong></div>
        </div>
        <div className="experience-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> THE RAJLAXMI EXPERIENCE</p>
          <h2>Choosing well<br />should feel <em>simple.</em></h2>
          <p className="experience-intro">The right appliance is more than a product. It is a choice you make for the everyday moments at home. We help you understand the options and make that choice with confidence.</p>
          <div className="steps">
            {highlights.map((item) => (
              <div className="step" key={item.number}><span className="step-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><span className="step-arrow">↗</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="location-section" id="about">
        <div className="location-inner">
          <div><p className="eyebrow"><span className="eyebrow-line" /> ROOTED IN ODISHA</p><h2>Your home.<br /><em>Our neighbourhood.</em></h2></div>
          <div className="location-copy"><p>Visit Rajlaxmi Enterprises in Bhubaneswar for a more personal way to explore Bosch home appliances. We also welcome enquiries from Cuttack and customers across Odisha.</p><a className="button button-light" href="#contact">Connect with Rajlaxmi <span aria-hidden="true">↗</span></a></div>
          <div className="location-city"><span>BHUBANESWAR</span><i /> <span>CUTTACK</span><i /> <span>ODISHA</span></div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-heading"><p className="eyebrow"><span className="eyebrow-line" /> START A CONVERSATION</p><h2>Let’s find the<br /><em>right fit.</em></h2></div>
        <div className="contact-content"><p>Have a model in mind, need help comparing options, or planning a showroom visit? Our team would be happy to help.</p><div className="contact-actions"><a className="button button-dark" href="https://wa.me/?text=Hello%20Rajlaxmi%20Enterprises%2C%20I%20would%20like%20to%20enquire%20about%20Bosch%20home%20appliances.">Enquire on WhatsApp <span aria-hidden="true">↗</span></a><span className="contact-small">For current prices, stock and delivery information.</span></div></div>
      </section>

      <footer className="footer">
        <div className="footer-main"><a className="wordmark footer-wordmark" href="/"><span className="wordmark-name">rajlaxmi<span>.</span></span><span className="wordmark-caption">ENTERPRISES · BOSCH HOME APPLIANCES</span></a><p>Thoughtful living, made simpler.<br />Bhubaneswar, Odisha · Serving across Odisha</p><a className="footer-top" href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Back to top ↑</a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Rajlaxmi Enterprises</span><span>Independent authorised Bosch home appliances retailer.</span><span>Bosch is a registered trademark of its respective owner.</span></div>
      </footer>
    </main>
  );
}
