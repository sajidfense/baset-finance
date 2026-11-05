import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/seo";
import FirstHomeBuyersContent from "./FirstHomeBuyersContent";

export const metadata: Metadata = {
  title: "First Home Buyer Loans Brisbane",
  description:
    "Brisbane first home buyer loans made simple. Get help with grants (FHBG, FHOG), stamp duty concessions and pre-approval, from application to settlement.",
  alternates: {
    canonical: "https://basetfinance.com.au/first-home-buyers",
  },
  openGraph: {
    ...sharedOpenGraph,
    title: "First Home Buyer Loans Brisbane — Baset Finance",
    description:
      "Expert guidance for first home buyers in Brisbane. Navigate grants, schemes, and get pre-approved with a free mortgage broker service.",
    url: "https://basetfinance.com.au/first-home-buyers",
  },
};

export default function FirstHomeBuyersPage() {
  return <FirstHomeBuyersContent />;
}
