import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Stats - Free Online Tool | OpenKit",
  description: "Text Stats online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["text stats", "online tool", "free", "text stats"],
  openGraph: {
    title: "Text Stats - Free Online Tool",
    description: "Text Stats online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/text-stats",
    images: [
      {
        url: "/og/text-stats.jpg",
        width: 1200,
        height: 630,
        alt: "Text Stats - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/text-stats",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
