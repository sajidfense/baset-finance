import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About Us — Trusted Brisbane Mortgage Brokers",
  description:
    "Learn about Baset Finance — a Brisbane mortgage broker built on trust, transparency, and genuine care. MFAA accredited brokers with access to 40+ lenders, helping Australians secure smarter home loans.",
  alternates: {
    canonical: "https://basetfinance.com.au/about",
  },
  openGraph: {
    title: "About Baset Finance — Trusted Brisbane Mortgage Brokers",
    description:
      "Brisbane mortgage broker built on trust, transparency, and genuine care. MFAA accredited with 40+ lender partners.",
    url: "https://basetfinance.com.au/about",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
