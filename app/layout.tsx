import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Baset Finance | Mortgage Brokers For The People",
    template: "%s | Baset Finance",
  },
  description:
    "Baset Finance — trusted Australian mortgage brokers helping you secure smarter home loans with transparent advice and better lending solutions. Compare 25+ lenders.",
  keywords: [
    "mortgage broker",
    "home loans",
    "refinancing",
    "first home buyers",
    "investment loans",
    "Australian mortgage broker",
    "borrowing capacity",
    "loan repayment calculator",
    "Baset Finance",
  ],
  authors: [{ name: "Baset Finance" }],
  creator: "Baset Finance",
  metadataBase: new URL("https://basetfinance.com.au"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://basetfinance.com.au",
    siteName: "Baset Finance",
    title: "Baset Finance | Mortgage Brokers For The People",
    description:
      "Trusted Australian mortgage brokers helping you secure smarter home loans with transparent advice and better lending solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              name: "Baset Finance",
              description:
                "Australian mortgage brokers helping you secure smarter home loans",
              url: "https://basetfinance.com.au",
              serviceType: "Mortgage Broker",
              areaServed: "AU",
            }),
          }}
        />
      </head>
      <body className="font-inter bg-marble text-charcoal antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
