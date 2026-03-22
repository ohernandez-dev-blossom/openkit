import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Design Tools — Color Palettes, CSS Generators, Gradients & More",
  description:
    "Free online design tools for designers, UI/UX professionals, and front-end developers. Color palettes, gradient generators, contrast checkers, CSS shadow designers, and more. Privacy-first, runs in your browser.",
  keywords: [
    "design tools",
    "color palette generator",
    "css gradient generator",
    "color picker",
    "contrast checker",
    "shadow generator",
    "css tools",
    "ui design tools",
    "ux tools",
    "color converter",
    "free design tools online",
    "color wheel",
    "border radius generator",
    "glassmorphism generator",
  ],
  openGraph: {
    title: "Free Design Tools — Color Palettes, CSS Generators & More | OpenKit.tools",
    description:
      "Free design tools for UI/UX designers and developers. Color palettes, gradient generators, contrast checkers, CSS generators, and more — all privacy-first and browser-based.",
    url: "https://openkit.tools/tools/design",
    type: "website",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "OpenKit.tools — Free Design Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Design Tools — Color Palettes, CSS Generators & More | OpenKit.tools",
    description:
      "Color palettes, gradient generators, contrast checkers, and CSS tools — all free, browser-based, and privacy-first.",
    images: ["/og/home.jpg"],
  },
  alternates: {
    canonical: "https://openkit.tools/tools/design",
  },
};

export default function DesignToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
