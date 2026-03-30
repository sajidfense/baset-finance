import type { Metadata } from "next";
import FirstHomeBuyersContent from "./FirstHomeBuyersContent";

export const metadata: Metadata = {
  title: "First Home Buyer Loans Brisbane — Grants, Schemes & Expert Guidance",
  description:
    "Baset Finance helps first home buyers in Brisbane navigate grants (FHBG, FHOG), stamp duty concessions, and pre-approval. Free mortgage broker service — get expert guidance from application to settlement.",
  alternates: {
    canonical: "https://basetfinance.com.au/first-home-buyers",
  },
  openGraph: {
    title: "First Home Buyer Loans Brisbane — Baset Finance",
    description:
      "Expert guidance for first home buyers in Brisbane. Navigate grants, schemes, and get pre-approved with a free mortgage broker service.",
    url: "https://basetfinance.com.au/first-home-buyers",
  },
};

export default function FirstHomeBuyersPage() {
  return <FirstHomeBuyersContent />;
}
