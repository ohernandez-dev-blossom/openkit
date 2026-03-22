import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Og Gen - Free Online Tool | OpenKit",
  description: "Og Gen online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["og gen", "online tool", "free", "og gen"],
  openGraph: {
    title: "Og Gen - Free Online Tool",
    description: "Og Gen online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/og-gen",
    images: [
      {
        url: "/og/og-gen.jpg",
        width: 1200,
        height: 630,
        alt: "Og Gen - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/og-gen",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
