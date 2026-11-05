import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/seo";
import InvestmentLoansContent from "./InvestmentLoansContent";

export const metadata: Metadata = {
  title: "Investment Property Loans Brisbane",
  description:
    "Grow your property portfolio with expert Brisbane mortgage broker advice on investment loans, interest-only strategies, equity and SMSF lending.",
  alternates: {
    canonical: "https://basetfinance.com.au/investment-loans",
  },
  openGraph: {
    ...sharedOpenGraph,
    title: "Investment Property Loans Brisbane — Baset Finance",
    description:
      "Grow your property portfolio with expert investment lending from a trusted Brisbane mortgage broker.",
    url: "https://basetfinance.com.au/investment-loans",
  },
};

export default function InvestmentLoansPage() {
  return <InvestmentLoansContent />;
}
