import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/seo";
import ReferrerProgramContent from "./ReferrerProgramContent";

export const metadata: Metadata = {
  title: "Refer & Earn: Home Loan Referral Commission",
  description:
    "Earn 25% of the upfront commission on every settled home loan referral with Baset Finance Refer & Earn. Simple process, paid within 30 days of settlement.",
  alternates: {
    canonical: "https://basetfinance.com.au/referrer-program",
  },
  openGraph: {
    ...sharedOpenGraph,
    title: "Refer & Earn — Earn Commission | Baset Finance",
    description:
      "Earn 25% upfront commission on every settled home loan referral. Simple process, fast payouts.",
    url: "https://basetfinance.com.au/referrer-program",
  },
};

export default function ReferrerProgramPage() {
  return <ReferrerProgramContent />;
}
