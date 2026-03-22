import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage - Free Online Tool | OpenKit",
  description: "Calculate percentages. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["percentage calculator","online tool","free","percentage"],
  openGraph: {
    title: "Percentage - Free Online Tool",
    description: "Calculate percentages. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/percentage",
    images: [
      {
        url: "/og/percentage.jpg",
        width: 1200,
        height: 630,
        alt: "Percentage - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/percentage",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
