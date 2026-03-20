import type { Metadata } from "next";
import CalculatorsPageContent from "./CalculatorsPageContent";

export const metadata: Metadata = {
  title: "Calculators | Baset Finance",
  description:
    "Use our free mortgage calculators to estimate your borrowing capacity, loan repayments, purchase costs, and refinancing savings.",
};

export default function CalculatorsPage() {
  return <CalculatorsPageContent />;
}
