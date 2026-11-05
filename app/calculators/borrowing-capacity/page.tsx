import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/seo";
import BorrowingCapacityCalculator from "./BorrowingCapacityCalculator";

export const metadata: Metadata = {
  title: "Borrowing Capacity Calculator",
  description:
    "Free borrowing capacity calculator. Enter your income, expenses and commitments to estimate how much you can borrow for a home loan in Australia.",
  alternates: {
    canonical: "https://basetfinance.com.au/calculators/borrowing-capacity",
  },
  openGraph: {
    ...sharedOpenGraph,
    title: "Borrowing Capacity Calculator — How Much Can I Borrow?",
    description:
      "Free borrowing capacity calculator. Enter your income and expenses to estimate your home loan borrowing power.",
    url: "https://basetfinance.com.au/calculators/borrowing-capacity",
  },
};

export default function BorrowingCapacityPage() {
  return <BorrowingCapacityCalculator />;
}
