import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelly Criterion Calculator - Free Trading Tool | OpenKit",
  description: "Calculate optimal position sizing using the Kelly Criterion formula. Full, Half, and Quarter Kelly with growth simulation. 100% client-side, free, and private.",
  keywords: ["kelly criterion calculator", "position sizing", "bankroll management", "kelly formula", "optimal bet size", "trading calculator", "risk management"],
  openGraph: {
    title: "Kelly Criterion Calculator - Free Trading Tool",
    description: "Calculate optimal position sizing using the Kelly Criterion formula. Full, Half, and Quarter Kelly with growth simulation. 100% client-side, free, and private.",
    url: "https://openkit.tools/kelly-criterion",
    images: [
      {
        url: "/og/kelly-criterion.jpg",
        width: 1200,
        height: 630,
        alt: "Kelly Criterion Calculator - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/kelly-criterion",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
