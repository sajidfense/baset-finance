import type { Metadata } from "next";
import InvestmentLoansContent from "./InvestmentLoansContent";

export const metadata: Metadata = {
  title: "Investment Loans",
  description:
    "Grow your property portfolio with smart investment financing from Baset Finance. Expert advice on investment loans, interest-only strategies, and portfolio structuring.",
};

export default function InvestmentLoansPage() {
  return <InvestmentLoansContent />;
}
