import type { Metadata, Viewport } from "next";
import { Montserrat, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/content";

const heading = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const body = Nunito_Sans({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-nunito", display: "swap" });

const description =
  "Green Channels is a specialist buying house for professional clothing programmes: workwear, corporate wear and uniforms. We develop the product, source fabric and trims, run sampling, select the factory, follow production and control quality, through to shipment. 35+ years in Bangladesh.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Green Channels — Workwear, Corporate Wear & Uniforms, sourced in Bangladesh",
    template: "%s · Green Channels",
  },
  description,
  applicationName: "Green Channels",
  openGraph: { type: "website", siteName: "Green Channels", title: "Workwear, corporate wear and uniforms — Green Channels", description, url: site.url },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0a0a0a", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", streetAddress: "Road 102, House 4, Apart H3, Gulshan 2", addressLocality: "Dhaka", postalCode: "1212", addressCountry: "BD" },
  description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
