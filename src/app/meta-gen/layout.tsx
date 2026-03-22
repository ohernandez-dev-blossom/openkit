import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meta Gen - Free Online Tool | OpenKit",
  description: "Meta Gen online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["meta gen", "online tool", "free", "meta gen"],
  openGraph: {
    title: "Meta Gen - Free Online Tool",
    description: "Meta Gen online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/meta-gen",
    images: [
      {
        url: "/og/meta-gen.jpg",
        width: 1200,
        height: 630,
        alt: "Meta Gen - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/meta-gen",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
