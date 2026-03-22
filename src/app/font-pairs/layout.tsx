import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Font Pairs - Free Online Tool | OpenKit",
  description: "Font Pairs online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["font pairs", "online tool", "free", "font pairs"],
  openGraph: {
    title: "Font Pairs - Free Online Tool",
    description: "Font Pairs online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/font-pairs",
    images: [
      {
        url: "/og/font-pairs.jpg",
        width: 1200,
        height: 630,
        alt: "Font Pairs - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/font-pairs",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
