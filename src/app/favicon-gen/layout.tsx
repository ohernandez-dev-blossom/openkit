import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favicon Gen - Free Online Tool | OpenKit",
  description: "Favicon Gen online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["favicon gen", "online tool", "free", "favicon gen"],
  openGraph: {
    title: "Favicon Gen - Free Online Tool",
    description: "Favicon Gen online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/favicon-gen",
    images: [
      {
        url: "/og/favicon-gen.jpg",
        width: 1200,
        height: 630,
        alt: "Favicon Gen - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/favicon-gen",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
