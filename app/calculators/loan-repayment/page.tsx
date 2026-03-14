import type { Metadata } from "next";
import LoanRepaymentCalculator from "./LoanRepaymentCalculator";

export const metadata: Metadata = {
  title: "Loan Repayment Calculator",
  description:
    "Calculate your mortgage repayments with Baset Finance's loan repayment calculator. See monthly, fortnightly, or weekly repayments with an amortisation chart.",
};

export default function LoanRepaymentPage() {
  return <LoanRepaymentCalculator />;
}
