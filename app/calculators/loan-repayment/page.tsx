import type { Metadata } from "next";
import LoanRepaymentCalculator from "./LoanRepaymentCalculator";

export const metadata: Metadata = {
  title: "Loan Repayment Calculator — Mortgage Repayments & Extra Payments",
  description:
    "Calculate your mortgage repayments with Baset Finance's free loan repayment calculator. See monthly, fortnightly, or weekly repayments, visualise your loan balance over time, and discover how extra repayments save you interest.",
  alternates: {
    canonical: "https://basetfinance.com.au/calculators/loan-repayment",
  },
  openGraph: {
    title: "Loan Repayment Calculator — Mortgage Repayments | Baset Finance",
    description:
      "Free mortgage repayment calculator with amortisation chart. See how extra repayments can save you thousands.",
    url: "https://basetfinance.com.au/calculators/loan-repayment",
  },
};

export default function LoanRepaymentPage() {
  return <LoanRepaymentCalculator />;
}
