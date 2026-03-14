import type { Metadata } from "next";
import ReferrerProgramContent from "./ReferrerProgramContent";

export const metadata: Metadata = {
  title: "Referrer Partner Program",
  description:
    "Partner with Baset Finance and earn generous commissions by referring clients who need home loans. Simple, transparent, and fast payouts.",
};

export default function ReferrerProgramPage() {
  return <ReferrerProgramContent />;
}
