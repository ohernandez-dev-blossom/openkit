import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | OpenKit.tools",
  description: "Cookie Policy for OpenKit.tools - What cookies we use, why, and how to manage them. Your privacy matters.",
  keywords: ["cookie policy", "cookies", "privacy", "GDPR", "consent", "developer tools"],
  alternates: {
    canonical: "https://openkit.tools/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | OpenKit.tools",
    description: "What cookies we use, why, and how to manage them. Your privacy matters.",
    url: "https://openkit.tools/cookie-policy",
    siteName: "OpenKit.tools",
    images: [
      {
        url: "https://openkit.tools/og/cookie-policy.jpg",
        width: 1200,
        height: 630,
        alt: "OpenKit.tools Cookie Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | OpenKit.tools",
    description: "What cookies we use, why, and how to manage them. Your privacy matters.",
    images: ["https://openkit.tools/og/cookie-policy.jpg"],
  },
};
