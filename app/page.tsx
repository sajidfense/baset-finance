import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import ServicesSection from "@/components/home/ServicesSection";
import CalculatorSection from "@/components/home/CalculatorSection";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LenderLogos from "@/components/home/LenderLogos";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Brisbane Mortgage Broker | Home Loans & Refinancing — Baset Finance",
  description:
    "Baset Finance is a trusted Brisbane mortgage broker offering home loans, refinancing, investment lending, and first home buyer support. Compare 40+ lenders with a free consultation. Serving Brisbane, Gold Coast & Australia wide.",
  alternates: {
    canonical: "https://basetfinance.com.au",
  },
  openGraph: {
    title: "Brisbane Mortgage Broker | Home Loans & Refinancing — Baset Finance",
    description:
      "Trusted Brisbane mortgage broker helping Australians secure smarter home loans. Compare 40+ lenders with free, transparent advice.",
    url: "https://basetfinance.com.au",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <ProcessSection />
      <CalculatorSection />
      <LenderLogos />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
