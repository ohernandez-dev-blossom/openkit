import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Free Online Tool | OpenKit",
  description: "About online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["about", "online tool", "free", "about"],
  openGraph: {
    title: "About - Free Online Tool",
    description: "About online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/about",
    images: [
      {
        url: "/og/about.jpg",
        width: 1200,
        height: 630,
        alt: "About - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
