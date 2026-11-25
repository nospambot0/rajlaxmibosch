import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rajlaxmibosch.com"),
  title: {
    default: "Rajlaxmi Enterprises | Bosch Home Appliances | Bhubaneswar & Cuttack",
    template: "%s | Rajlaxmi Enterprises",
  },
  description:
    "Explore genuine Bosch home appliances at Rajlaxmi Enterprises, serving Bhubaneswar and Cuttack, Odisha. Visit our Bhubaneswar showroom or enquire about product pricing, delivery and availability.",
  openGraph: {
    title: "Rajlaxmi Enterprises | Bosch Home Appliances",
    description:
      "Discover Bosch home appliances with guidance from Rajlaxmi Enterprises, a Bosch Brand Store serving Bhubaneswar and Cuttack, Odisha.",
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
