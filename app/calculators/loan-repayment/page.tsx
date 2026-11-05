import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/seo";
import LoanRepaymentCalculator from "./LoanRepaymentCalculator";

export const metadata: Metadata = {
  title: "Loan Repayment Calculator",
  description:
    "Free mortgage repayment calculator. See weekly, fortnightly or monthly repayments, your balance over time, and how extra repayments save interest.",
  alternates: {
    canonical: "https://basetfinance.com.au/calculators/loan-repayment",
  },
  openGraph: {
    ...sharedOpenGraph,
    title: "Loan Repayment Calculator — Mortgage Repayments | Baset Finance",
    description:
      "Free mortgage repayment calculator with amortisation chart. See how extra repayments can save you thousands.",
    url: "https://basetfinance.com.au/calculators/loan-repayment",
  },
};

export default function LoanRepaymentPage() {
  return <LoanRepaymentCalculator />;
}
