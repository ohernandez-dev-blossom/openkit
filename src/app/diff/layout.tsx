import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Diff Tool - Free Online Tool | OpenKit",
  description: "Compare two texts and see differences highlighted. Free online text comparison tool.",
  keywords: ["text diff","compare text","diff checker","text comparison"],
  openGraph: {
    title: "Text Diff Tool - Free Online Tool",
    description: "Compare two texts and see differences highlighted. Free online text comparison tool.",
    url: "https://openkit.tools/diff",
    images: [
      {
        url: "/og/diff.jpg",
        width: 1200,
        height: 630,
        alt: "Text Diff Tool - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/diff",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
