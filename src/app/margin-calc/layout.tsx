import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Margin Calculator - Free Trading Tool | OpenKit",
  description: "Calculate margin requirements, liquidation price, and leverage impact for crypto, forex, and futures trading. 100% client-side, private, no data sent to servers.",
  keywords: ["margin calculator", "leverage calculator", "liquidation price", "trading tool", "crypto margin", "forex margin", "free"],
  openGraph: {
    title: "Margin Calculator - Free Trading Tool",
    description: "Calculate margin requirements, liquidation price, and leverage impact for crypto, forex, and futures trading. 100% client-side, private, no data sent to servers.",
    url: "https://openkit.tools/margin-calc",
    images: [
      {
        url: "/og/margin-calc.jpg",
        width: 1200,
        height: 630,
        alt: "Margin Calculator - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/margin-calc",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
