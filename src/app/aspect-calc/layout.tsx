import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aspect Calc - Free Online Tool | OpenKit",
  description: "Aspect Calc online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["aspect calc", "online tool", "free", "aspect calc"],
  openGraph: {
    title: "Aspect Calc - Free Online Tool",
    description: "Aspect Calc online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/aspect-calc",
    images: [
      {
        url: "/og/aspect-calc.jpg",
        width: 1200,
        height: 630,
        alt: "Aspect Calc - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/aspect-calc",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
