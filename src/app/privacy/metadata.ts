import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | OpenKit.tools",
  description: "Privacy Policy for OpenKit.tools - How we handle your data and protect your privacy. All tools process data client-side.",
  keywords: ["privacy policy", "data protection", "privacy", "GDPR", "developer tools"],
  alternates: {
    canonical: "https://openkit.tools/privacy",
  },
  openGraph: {
    title: "Privacy Policy | OpenKit.tools",
    description: "How we handle your data and protect your privacy. All tools process data client-side in your browser.",
    url: "https://openkit.tools/privacy",
    siteName: "OpenKit.tools",
    images: [
      {
        url: "https://openkit.tools/og/privacy.jpg",
        width: 1200,
        height: 630,
        alt: "OpenKit.tools Privacy Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | OpenKit.tools",
    description: "How we handle your data and protect your privacy. All tools process data client-side.",
    images: ["https://openkit.tools/og/privacy.jpg"],
  },
};
