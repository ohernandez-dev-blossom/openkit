import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | OpenKit.tools",
  description: "Terms of Service for OpenKit.tools - Free online developer tools. Client-side processing, no data collection.",
  keywords: ["terms of service", "terms", "legal", "developer tools", "free tools"],
  alternates: {
    canonical: "https://openkit.tools/terms",
  },
  openGraph: {
    title: "Terms of Service | OpenKit.tools",
    description: "Terms of Service for OpenKit.tools. Free online developer tools with client-side processing.",
    url: "https://openkit.tools/terms",
    siteName: "OpenKit.tools",
    images: [
      {
        url: "https://openkit.tools/og/terms.jpg",
        width: 1200,
        height: 630,
        alt: "OpenKit.tools Terms of Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | OpenKit.tools",
    description: "Terms of Service for OpenKit.tools. Free online developer tools.",
    images: ["https://openkit.tools/og/terms.jpg"],
  },
};
