import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Baset Finance — our mission, values, and the team dedicated to helping Australians secure smarter home loans with transparent advice.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
