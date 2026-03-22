import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filter Gen - Free Online Tool | OpenKit",
  description: "Filter Gen online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["filter gen", "online tool", "free", "filter gen"],
  openGraph: {
    title: "Filter Gen - Free Online Tool",
    description: "Filter Gen online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/filter-gen",
    images: [
      {
        url: "/og/filter-gen.jpg",
        width: 1200,
        height: 630,
        alt: "Filter Gen - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/filter-gen",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
