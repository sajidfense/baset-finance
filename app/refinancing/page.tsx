import type { Metadata } from "next";
import RefinancingContent from "./RefinancingContent";

export const metadata: Metadata = {
  title: "Refinancing",
  description:
    "Could you be getting a better deal on your mortgage? Baset Finance offers a free loan health check and refinancing service to help you save thousands.",
};

export default function RefinancingPage() {
  return <RefinancingContent />;
}
