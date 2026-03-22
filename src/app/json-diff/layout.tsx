import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Diff - Compare JSON Objects Online | OpenKit",
  description: "Compare two JSON objects and find differences instantly. Semantic deep comparison with additions, deletions, and changes highlighted. Free online JSON diff tool.",
  keywords: ["json diff", "json compare", "json difference", "compare json objects", "json diff online"],
  openGraph: {
    title: "JSON Diff - Compare JSON Objects Online",
    description: "Compare two JSON objects and find differences instantly. Semantic deep comparison with visual diff output.",
    url: "https://openkit.tools/json-diff",
  },
  alternates: {
    canonical: "https://openkit.tools/json-diff",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
