import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Risk/Reward Ratio Calculator - Free Online Tool | OpenKit",
  description: "Calculate risk/reward ratios, breakeven win rates, and expected value for any trade setup. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["risk reward ratio", "risk reward calculator", "trading calculator", "breakeven win rate", "expected value", "R:R ratio", "trade analysis", "risk management"],
  openGraph: {
    title: "Risk/Reward Ratio Calculator - Free Online Tool",
    description: "Calculate risk/reward ratios, breakeven win rates, and expected value for any trade setup.",
    url: "https://openkit.tools/risk-reward",
  },
  alternates: { canonical: "https://openkit.tools/risk-reward" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
