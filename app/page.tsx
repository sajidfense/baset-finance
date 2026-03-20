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
  title: "Baset Finance | Mortgage Brokers For The People",
  description:
    "Trusted Australian mortgage brokers helping our people secure smarter home loans with transparent advice and better lending solutions. Access 25+ lenders.",
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
