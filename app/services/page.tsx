import type { Metadata } from "next";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "Mortgage Broker Services — Home Loans, Refinancing & Investment Lending",
  description:
    "Baset Finance offers a full range of mortgage broker services in Brisbane — home loans, refinancing, investment loans, first home buyer support, commercial lending, and construction finance. Free consultation available.",
  alternates: {
    canonical: "https://basetfinance.com.au/services",
  },
  openGraph: {
    title: "Mortgage Broker Services — Baset Finance Brisbane",
    description:
      "Full range of mortgage broker services: home loans, refinancing, investment loans, first home buyer support, and more.",
    url: "https://basetfinance.com.au/services",
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
