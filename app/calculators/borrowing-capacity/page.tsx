import type { Metadata } from "next";
import BorrowingCapacityCalculator from "./BorrowingCapacityCalculator";

export const metadata: Metadata = {
  title: "Borrowing Capacity Calculator",
  description:
    "Use Baset Finance's borrowing capacity calculator to estimate how much you can borrow based on your income, expenses, and existing commitments.",
};

export default function BorrowingCapacityPage() {
  return <BorrowingCapacityCalculator />;
}
