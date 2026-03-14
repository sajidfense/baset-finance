import type { Metadata } from "next";
import ContactPageContent from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Baset Finance. Book a free consultation with one of our expert mortgage brokers and discover your borrowing potential today.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
