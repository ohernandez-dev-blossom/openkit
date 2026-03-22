import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drawdown & Recovery Calculator - Free Online Tool | OpenKit",
  description: "Calculate how much recovery is needed after a trading drawdown. Visualize the asymmetry between losses and gains. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["drawdown calculator", "recovery calculator", "trading drawdown", "drawdown recovery", "loss recovery", "risk management", "portfolio drawdown", "max drawdown"],
  openGraph: {
    title: "Drawdown & Recovery Calculator - Free Online Tool",
    description: "Calculate how much recovery is needed after a trading drawdown. Visualize the asymmetry between losses and gains.",
    url: "https://openkit.tools/drawdown-calc",
  },
  alternates: { canonical: "https://openkit.tools/drawdown-calc" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
