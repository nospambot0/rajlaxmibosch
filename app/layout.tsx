import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rajlaxmibosch.com"),
  title: {
    default: "Rajlaxmi Enterprises | Bosch Home Appliances in Bhubaneswar",
    template: "%s | Rajlaxmi Enterprises",
  },
  description:
    "Explore Bosch home appliances at Rajlaxmi Enterprises, an authorised Bosch retailer in Bhubaneswar. Enquire about products, pricing and availability. Serving Cuttack and across Odisha.",
  openGraph: {
    title: "Rajlaxmi Enterprises | Bosch Home Appliances",
    description:
      "Discover Bosch home appliances with guidance from Rajlaxmi Enterprises in Bhubaneswar, Odisha.",
    url: "https://rajlaxmibosch.com",
    siteName: "Rajlaxmi Enterprises",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
