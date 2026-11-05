import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/seo";
import CalculatorsPageContent from "./CalculatorsPageContent";

export const metadata: Metadata = {
  title: "Free Mortgage Calculators",
  description:
    "Free mortgage calculators to estimate your borrowing capacity, loan repayments, purchase costs and refinancing savings. Plan your home loan with confidence.",
  alternates: {
    canonical: "https://basetfinance.com.au/calculators",
  },
  openGraph: {
    ...sharedOpenGraph,
    title: "Free Mortgage Calculators — Baset Finance",
    description:
      "Estimate borrowing capacity, loan repayments, purchase costs, and refinancing savings with our free calculators.",
    url: "https://basetfinance.com.au/calculators",
  },
};

export default function CalculatorsPage() {
  return <CalculatorsPageContent />;
}
