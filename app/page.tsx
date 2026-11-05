import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/seo";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import ServicesSection from "@/components/home/ServicesSection";
import ReferralSection from "@/components/home/ReferralSection";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LenderLogos from "@/components/home/LenderLogos";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Brisbane Mortgage Broker & Home Loans | Baset Finance",
  description:
    "Trusted Brisbane mortgage broker for home loans, refinancing, investment and first home buyers. Compare 40+ lenders with a free consultation.",
  alternates: {
    canonical: "https://basetfinance.com.au",
  },
  openGraph: {
    ...sharedOpenGraph,
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
      <ReferralSection />
      <LenderLogos />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
