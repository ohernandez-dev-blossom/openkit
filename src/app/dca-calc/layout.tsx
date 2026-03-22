import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DCA Calculator - Free Online Tool | OpenKit",
  description: "Calculate your dollar-cost average entry price, total investment, and unrealized P&L. Track multiple entries with running averages. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["dca calculator", "dollar cost averaging", "average entry price", "crypto dca calculator", "investment average calculator", "cost basis calculator", "portfolio average price", "dca strategy calculator"],
  openGraph: {
    title: "DCA Calculator - Free Online Tool",
    description: "Calculate your dollar-cost average entry price, total investment, and unrealized P&L. Track multiple entries with running averages.",
    url: "https://openkit.tools/dca-calc",
  },
  alternates: { canonical: "https://openkit.tools/dca-calc" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
