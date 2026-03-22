import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Position Size Calculator - Free Online Tool | OpenKit",
  description: "Calculate optimal position sizes based on account balance, risk percentage, and stop loss distance. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["position size calculator", "trading calculator", "risk management", "position sizing", "stop loss calculator", "trade size", "lot size calculator", "forex position size"],
  openGraph: {
    title: "Position Size Calculator - Free Online Tool",
    description: "Calculate optimal position sizes based on account balance, risk percentage, and stop loss distance.",
    url: "https://openkit.tools/position-size",
  },
  alternates: { canonical: "https://openkit.tools/position-size" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
