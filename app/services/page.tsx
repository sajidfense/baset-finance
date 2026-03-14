import type { Metadata } from "next";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Baset Finance offers home loans, refinancing, investment lending, first home buyer support, and construction loans — all with expert, transparent advice.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
