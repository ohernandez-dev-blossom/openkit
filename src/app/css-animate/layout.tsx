import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Css Animate - Free Online Tool | OpenKit",
  description: "Css Animate online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["css animate", "online tool", "free", "css animate"],
  openGraph: {
    title: "Css Animate - Free Online Tool",
    description: "Css Animate online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/css-animate",
    images: [
      {
        url: "/og/css-animate.jpg",
        width: 1200,
        height: 630,
        alt: "Css Animate - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/css-animate",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
