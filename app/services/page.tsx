import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/seo";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "Home Loan & Refinancing Services Brisbane",
  description:
    "Mortgage broker services in Brisbane: home loans, refinancing, investment, first home buyer, commercial and construction finance. Free consultation.",
  alternates: {
    canonical: "https://basetfinance.com.au/services",
  },
  openGraph: {
    ...sharedOpenGraph,
    title: "Mortgage Broker Services — Baset Finance Brisbane",
    description:
      "Full range of mortgage broker services: home loans, refinancing, investment loans, first home buyer support, and more.",
    url: "https://basetfinance.com.au/services",
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
