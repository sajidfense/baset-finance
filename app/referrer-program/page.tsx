import type { Metadata } from "next";
import ReferrerProgramContent from "./ReferrerProgramContent";

export const metadata: Metadata = {
  title: "Refer & Earn — Earn Commission on Home Loan Referrals",
  description:
    "Join Baset Finance Refer & Earn and receive 25% of the upfront commission on every settled home loan referral. Open to all Australian citizens — simple process, transparent tracking, fast payouts.",
  alternates: {
    canonical: "https://basetfinance.com.au/referrer-program",
  },
  openGraph: {
    title: "Refer & Earn — Earn Commission | Baset Finance",
    description:
      "Earn 25% upfront commission on every settled home loan referral. Simple process, fast payouts.",
    url: "https://basetfinance.com.au/referrer-program",
  },
};

export default function ReferrerProgramPage() {
  return <ReferrerProgramContent />;
}
