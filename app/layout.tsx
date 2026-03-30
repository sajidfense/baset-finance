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
    default: "Baset Finance | Brisbane Mortgage Broker — Home Loans For The People",
    template: "%s | Baset Finance — Brisbane Mortgage Broker",
  },
  description:
    "Baset Finance is a trusted Brisbane mortgage broker helping Australians secure smarter home loans. Compare 40+ lenders, get free consultations, and enjoy transparent advice. Serving Brisbane, Gold Coast, and Australia wide.",
  keywords: [
    "mortgage broker Brisbane",
    "Brisbane mortgage broker",
    "home loans Brisbane",
    "refinancing Brisbane",
    "first home buyer Brisbane",
    "investment loans Brisbane",
    "borrowing capacity calculator",
    "loan repayment calculator",
    "Australian mortgage broker",
    "Baset Finance",
  ],
  authors: [{ name: "Baset Finance" }],
  creator: "Baset Finance",
  publisher: "Baset Finance",
  metadataBase: new URL("https://basetfinance.com.au"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://basetfinance.com.au",
    siteName: "Baset Finance",
    title: "Baset Finance | Brisbane Mortgage Broker — Home Loans For The People",
    description:
      "Trusted Brisbane mortgage broker helping Australians secure smarter home loans. Compare 40+ lenders with free, transparent advice.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Baset Finance — Brisbane Mortgage Broker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baset Finance | Brisbane Mortgage Broker",
    description:
      "Trusted Brisbane mortgage broker helping Australians secure smarter home loans. Compare 40+ lenders.",
    images: ["/og-image.png"],
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
  verification: {
    // Add Google Search Console verification when available
    // google: "your-verification-code",
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
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Baset Finance",
              url: "https://basetfinance.com.au",
              logo: "https://basetfinance.com.au/logo2.PNG",
              description:
                "Trusted Brisbane mortgage broker helping Australians secure smarter home loans with transparent advice and access to 40+ lenders.",
              telephone: "+61420601553",
              email: "baset@basetfinance.com.au",
              areaServed: [
                {
                  "@type": "City",
                  name: "Brisbane",
                  containedInPlace: {
                    "@type": "State",
                    name: "Queensland",
                  },
                },
                {
                  "@type": "Country",
                  name: "Australia",
                },
              ],
              sameAs: [],
            }),
          }}
        />
        {/* LocalBusiness / FinancialService Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              name: "Baset Finance",
              description:
                "Brisbane mortgage broker offering home loans, refinancing, investment lending, and first home buyer support. Free consultations and access to 40+ lenders.",
              url: "https://basetfinance.com.au",
              logo: "https://basetfinance.com.au/logo2.PNG",
              image: "https://basetfinance.com.au/logo2.PNG",
              telephone: "+61420601553",
              email: "baset@basetfinance.com.au",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Brisbane",
                addressRegion: "QLD",
                addressCountry: "AU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -27.4698,
                longitude: 153.0251,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "08:00",
                  closes: "19:00",
                },
              ],
              priceRange: "Free consultation",
              currenciesAccepted: "AUD",
              paymentAccepted: "Bank transfer",
              areaServed: [
                {
                  "@type": "City",
                  name: "Brisbane",
                },
                {
                  "@type": "City",
                  name: "Gold Coast",
                },
                {
                  "@type": "State",
                  name: "Queensland",
                },
                {
                  "@type": "Country",
                  name: "Australia",
                },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Mortgage Broker Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Home Loans",
                      description: "Competitive home loan solutions from 40+ lenders",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Refinancing",
                      description: "Free loan health check and refinancing service",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "First Home Buyer Support",
                      description: "Guidance on grants, schemes, and first home purchases",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Investment Loans",
                      description: "Investment property lending and portfolio structuring",
                    },
                  },
                ],
              },
            }),
          }}
        />
        {/* WebSite Schema with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Baset Finance",
              url: "https://basetfinance.com.au",
              publisher: {
                "@type": "Organization",
                name: "Baset Finance",
              },
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
