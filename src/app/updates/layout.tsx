import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Updates - Free Online Tool | OpenKit",
  description: "Updates online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["updates", "online tool", "free", "updates"],
  openGraph: {
    title: "Updates - Free Online Tool",
    description: "Updates online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/updates",
    images: [
      {
        url: "/og/updates.jpg",
        width: 1200,
        height: 630,
        alt: "Updates - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/updates",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
