import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C8A96A",
          light: "#D4B97A",
          dark: "#8F7A4F",
          50: "#FAF5EB",
          100: "#F0E4C4",
          200: "#E4CC9A",
          300: "#D4B97A",
          400: "#C8A96A",
          500: "#B89255",
          600: "#8F7A4F",
          700: "#6B5A3A",
          800: "#4A3F28",
          900: "#2E2718",
        },
        marble: {
          DEFAULT: "#F7F7F7",
          50: "#FFFFFF",
          100: "#F7F7F7",
          200: "#EFEFEF",
          300: "#E5E5E5",
        },
        charcoal: {
          DEFAULT: "#3A3A3A",
          light: "#5A5A5A",
          dark: "#2A2A2A",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-up": "fadeUp 0.7s ease-out",
        "gold-shimmer": "goldShimmer 3s ease-in-out infinite",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        goldShimmer: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        gold: "0 4px 24px rgba(200, 169, 106, 0.15)",
        "gold-lg": "0 8px 40px rgba(200, 169, 106, 0.25)",
        luxury: "0 20px 60px rgba(58, 58, 58, 0.06)",
        "luxury-lg": "0 30px 80px rgba(58, 58, 58, 0.10)",
      },
      maxWidth: {
        "8xl": "1400px",
      },
    },
  },
  plugins: [],
};

export default config;
