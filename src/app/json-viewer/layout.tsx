import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Viewer - Interactive Tree Explorer | OpenKit",
  description: "Explore JSON data with an interactive tree view. Expand/collapse nodes, search keys and values, copy paths, and analyze structure. Free online JSON viewer.",
  keywords: ["json viewer", "json tree view", "json explorer", "json browser", "json inspector"],
  openGraph: {
    title: "JSON Viewer - Interactive Tree Explorer",
    description: "Explore JSON data with an interactive tree view. Expand/collapse nodes, search keys and values, copy paths.",
    url: "https://openkit.tools/json-viewer",
  },
  alternates: {
    canonical: "https://openkit.tools/json-viewer",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
