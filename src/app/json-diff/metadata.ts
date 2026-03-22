import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Diff - Compare JSON Objects Online | OpenKit",
  description: "Compare two JSON objects and find differences instantly. Semantic deep comparison with additions, deletions, and changes highlighted. Free online JSON diff tool.",
  keywords: ["json diff", "json compare", "json difference", "compare json objects", "json diff online", "json comparison tool", "json delta"],
  openGraph: {
    title: "JSON Diff - Compare JSON Objects Online",
    description: "Compare two JSON objects and find differences instantly. Semantic deep comparison with visual diff output.",
    url: "https://openkit.tools/json-diff",
    images: [
      {
        url: "/og/json-diff.jpg",
        width: 1200,
        height: 630,
        alt: "JSON Diff - OpenKit.tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Diff - Compare JSON Objects | OpenKit.tools",
    description: "Compare two JSON objects and find differences instantly",
  },
  alternates: {
    canonical: "https://openkit.tools/json-diff",
  },
};
