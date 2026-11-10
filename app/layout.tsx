import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://rajlaxmibosch.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bosch Showroom in Bhubaneswar | Rajlaxmi Enterprises",
    template: "%s | Rajlaxmi Enterprises",
  },
  description:
    "Explore Bosch home appliances at Rajlaxmi Enterprises, an independently owned authorised retailer with a showroom in Bhubaneswar, Odisha. Browse washing machines, refrigerators, dishwashers and more; enquire about models, offers and availability.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Bosch Showroom in Bhubaneswar | Rajlaxmi Enterprises",
    description:
      "Discover Bosch home appliances with personal product guidance at Rajlaxmi Enterprises in Bhubaneswar, Odisha. Explore selected models and enquire about current offers and availability.",
    url: siteUrl,
    siteName: "Rajlaxmi Enterprises",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Bosch Showroom in Bhubaneswar | Rajlaxmi Enterprises",
    description:
      "Explore Bosch home appliances at Rajlaxmi Enterprises in Bhubaneswar, Odisha.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
