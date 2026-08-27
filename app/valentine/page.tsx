import type { Metadata, Viewport } from "next";
import { Press_Start_2P } from "next/font/google";
import ValentineExperience from "./ValentineExperience";
import "./valentine.css";

const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Will you be my valentine?",
  description: "A tiny pixel-art game with exactly one question.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f486d8",
};

export default function ValentinePage() {
  return (
    <div className={pixel.variable}>
      <ValentineExperience />
    </div>
  );
}
