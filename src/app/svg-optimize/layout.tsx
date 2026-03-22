import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Svg Optimize - Free Online Tool | OpenKit",
  description: "Svg Optimize online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["svg optimize", "online tool", "free", "svg optimize"],
  openGraph: {
    title: "Svg Optimize - Free Online Tool",
    description: "Svg Optimize online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/svg-optimize",
    images: [
      {
        url: "/og/svg-optimize.jpg",
        width: 1200,
        height: 630,
        alt: "Svg Optimize - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/svg-optimize",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
