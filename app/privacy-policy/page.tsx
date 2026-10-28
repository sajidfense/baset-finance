import type { Metadata } from "next";
import PrivacyPolicyContent from "./PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Baset Finance collects, uses, stores, discloses and protects personal information, including Refer & Earn, marketing, and your access and correction rights.",
  alternates: {
    canonical: "https://basetfinance.com.au/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy — Baset Finance",
    description:
      "How Baset Finance collects, uses, stores, discloses and protects personal information.",
    url: "https://basetfinance.com.au/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
