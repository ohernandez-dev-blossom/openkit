import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pivot Points Calculator - Free Online Tool | OpenKit",
  description: "Calculate pivot points using Standard, Fibonacci, Camarilla, Woodie, and DeMark methods. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["pivot points calculator", "pivot points", "support resistance", "trading levels", "camarilla pivots", "fibonacci pivots", "woodie pivots", "demark pivots"],
  openGraph: {
    title: "Pivot Points Calculator - Free Online Tool",
    description: "Calculate pivot points using Standard, Fibonacci, Camarilla, Woodie, and DeMark methods.",
    url: "https://openkit.tools/pivot-points",
  },
  alternates: { canonical: "https://openkit.tools/pivot-points" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
