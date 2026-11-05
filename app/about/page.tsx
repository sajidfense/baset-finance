import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/seo";
import AboutPageContent from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About Our Brisbane Mortgage Brokers",
  description:
    "Meet Baset Finance, a Brisbane mortgage broker built on trust and transparency. MFAA accredited, with access to 40+ lenders Australia wide.",
  alternates: {
    canonical: "https://basetfinance.com.au/about",
  },
  openGraph: {
    ...sharedOpenGraph,
    title: "About Baset Finance — Trusted Brisbane Mortgage Brokers",
    description:
      "Brisbane mortgage broker built on trust, transparency, and genuine care. MFAA accredited with 40+ lender partners.",
    url: "https://basetfinance.com.au/about",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
