/**
 * Open Graph defaults. A page's `openGraph` metadata replaces the layout's
 * rather than merging with it, so every page must spread these in.
 */
export const sharedOpenGraph = {
  type: "website" as const,
  locale: "en_AU",
  siteName: "Baset Finance",
  images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Baset Finance — Brisbane Mortgage Broker",
    },
  ],
};
