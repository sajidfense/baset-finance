import type { Metadata } from "next";
import FirstHomeBuyersContent from "./FirstHomeBuyersContent";

export const metadata: Metadata = {
  title: "First Home Buyers",
  description:
    "Baset Finance guides first home buyers through every step — from borrowing capacity and pre-approval to grants, schemes, and settlement. Get started today.",
};

export default function FirstHomeBuyersPage() {
  return <FirstHomeBuyersContent />;
}
