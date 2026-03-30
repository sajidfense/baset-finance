import type { Metadata } from "next";
import InvestmentLoansContent from "./InvestmentLoansContent";

export const metadata: Metadata = {
  title: "Investment Property Loans Brisbane — Portfolio Lending & Strategy",
  description:
    "Grow your property portfolio with smart investment financing from Baset Finance. Expert Brisbane mortgage broker advice on investment loans, interest-only strategies, equity leverage, and SMSF lending.",
  alternates: {
    canonical: "https://basetfinance.com.au/investment-loans",
  },
  openGraph: {
    title: "Investment Property Loans Brisbane — Baset Finance",
    description:
      "Grow your property portfolio with expert investment lending from a trusted Brisbane mortgage broker.",
    url: "https://basetfinance.com.au/investment-loans",
  },
};

export default function InvestmentLoansPage() {
  return <InvestmentLoansContent />;
}
