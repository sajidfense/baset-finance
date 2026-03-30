import type { Metadata } from "next";
import ContactPageContent from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us — Free Mortgage Consultation Brisbane",
  description:
    "Book a free, no-obligation mortgage consultation with Baset Finance. Call 0420 601 553 or enquire online. Brisbane mortgage broker serving Queensland and all of Australia.",
  alternates: {
    canonical: "https://basetfinance.com.au/contact",
  },
  openGraph: {
    title: "Contact Baset Finance — Free Mortgage Consultation",
    description:
      "Book a free mortgage consultation. Call 0420 601 553 or enquire online. Brisbane mortgage broker.",
    url: "https://basetfinance.com.au/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
