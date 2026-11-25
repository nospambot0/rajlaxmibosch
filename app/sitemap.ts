import type { MetadataRoute } from "next";
import { catalogueProducts } from "../data/catalogue";

const siteUrl = "https://rajlaxmibosch.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteLastModified = new Date();
  return [
    { url: siteUrl, lastModified: siteLastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/catalogue`, lastModified: siteLastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/terms`, lastModified: siteLastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/warranty`, lastModified: siteLastModified, changeFrequency: "monthly", priority: 0.6 },
    ...catalogueProducts.map((product) => ({
      url: `${siteUrl}/catalogue/${product.model.toLowerCase()}`,
      lastModified: new Date(`${product.sourceChecked}T00:00:00.000Z`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
