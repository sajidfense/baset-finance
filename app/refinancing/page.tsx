import type { Metadata } from "next";
import RefinancingContent from "./RefinancingContent";

export const metadata: Metadata = {
  title: "Refinance Your Home Loan Brisbane — Free Loan Health Check",
  description:
    "Could you be getting a better deal on your mortgage? Baset Finance offers a free loan health check for Brisbane homeowners. Compare rates across 40+ lenders and save thousands on your home loan.",
  alternates: {
    canonical: "https://basetfinance.com.au/refinancing",
  },
  openGraph: {
    title: "Refinance Your Home Loan — Free Health Check | Baset Finance",
    description:
      "Free loan health check for Brisbane homeowners. Compare rates across 40+ lenders and save thousands on your mortgage.",
    url: "https://basetfinance.com.au/refinancing",
  },
};

export default function RefinancingPage() {
  return <RefinancingContent />;
}
