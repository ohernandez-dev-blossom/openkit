import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pip Value Calculator - Free Online Tool | OpenKit",
  description: "Calculate pip values for forex currency pairs across all lot sizes. Support for major, minor, and cross pairs. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["pip value calculator", "forex calculator", "pip calculator", "lot size calculator", "forex pip value", "currency pair calculator", "forex trading tool", "pip cost calculator"],
  openGraph: {
    title: "Pip Value Calculator - Free Online Tool",
    description: "Calculate pip values for forex currency pairs across all lot sizes. Support for major, minor, and cross pairs.",
    url: "https://openkit.tools/pip-value",
  },
  alternates: { canonical: "https://openkit.tools/pip-value" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
