import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Growth Calculator - Free Trading Tool | OpenKit",
  description: "Project compound growth with interactive SVG charts. Visualize investment returns, compare scenarios, and plan contributions with this free client-side calculator.",
  keywords: ["compound growth calculator", "compound interest calculator", "investment growth", "compound returns", "trading calculator", "portfolio projection"],
  openGraph: {
    title: "Compound Growth Calculator - Free Trading Tool",
    description: "Project compound growth with interactive SVG charts. Visualize investment returns, compare scenarios, and plan contributions.",
    url: "https://openkit.tools/compound-growth",
    images: [
      {
        url: "/og/compound-growth.jpg",
        width: 1200,
        height: 630,
        alt: "Compound Growth Calculator - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/compound-growth",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
