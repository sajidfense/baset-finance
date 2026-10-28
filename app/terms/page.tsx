import type { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern use of the Baset Finance website, services, fees and the Refer & Earn program, including referral eligibility, rewards and payment.",
  alternates: {
    canonical: "https://basetfinance.com.au/terms",
  },
  openGraph: {
    title: "Terms & Conditions — Baset Finance",
    description: "The terms that govern use of the Baset Finance website, services and Refer & Earn program.",
    url: "https://basetfinance.com.au/terms",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
