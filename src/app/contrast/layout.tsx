import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contrast - Free Online Tool | OpenKit",
  description: "Contrast online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["contrast", "online tool", "free", "contrast"],
  openGraph: {
    title: "Contrast - Free Online Tool",
    description: "Contrast online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/contrast",
    images: [
      {
        url: "/og/contrast.jpg",
        width: 1200,
        height: 630,
        alt: "Contrast - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/contrast",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
