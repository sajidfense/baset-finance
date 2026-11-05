import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/seo";
import RefinancingContent from "./RefinancingContent";

export const metadata: Metadata = {
  title: "Refinance Your Home Loan in Brisbane",
  description:
    "Could you get a better deal on your mortgage? Get a free loan health check from a Brisbane broker and compare rates across 40+ lenders.",
  alternates: {
    canonical: "https://basetfinance.com.au/refinancing",
  },
  openGraph: {
    ...sharedOpenGraph,
    title: "Refinance Your Home Loan — Free Health Check | Baset Finance",
    description:
      "Free loan health check for Brisbane homeowners. Compare rates across 40+ lenders and save thousands on your mortgage.",
    url: "https://basetfinance.com.au/refinancing",
  },
};

export default function RefinancingPage() {
  return <RefinancingContent />;
}
