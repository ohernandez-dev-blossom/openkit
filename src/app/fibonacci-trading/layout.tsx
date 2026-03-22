import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fibonacci Retracement Calculator - Free Online Tool | OpenKit",
  description: "Calculate Fibonacci retracement and extension levels for any price move. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["fibonacci retracement", "fibonacci calculator", "fibonacci levels", "fibonacci extensions", "technical analysis", "trading tool", "swing trading", "fibonacci trading"],
  openGraph: {
    title: "Fibonacci Retracement Calculator - Free Online Tool",
    description: "Calculate Fibonacci retracement and extension levels for any price move.",
    url: "https://openkit.tools/fibonacci-trading",
  },
  alternates: { canonical: "https://openkit.tools/fibonacci-trading" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
