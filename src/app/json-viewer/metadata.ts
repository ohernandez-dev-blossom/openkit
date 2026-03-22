import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Viewer - Interactive Tree Explorer | OpenKit",
  description: "Explore JSON data with an interactive tree view. Expand/collapse nodes, search keys and values, copy paths, and analyze structure. Free online JSON viewer.",
  keywords: ["json viewer", "json tree view", "json explorer", "json browser", "json inspector", "view json online", "json tree"],
  openGraph: {
    title: "JSON Viewer - Interactive Tree Explorer",
    description: "Explore JSON data with an interactive tree view. Expand/collapse nodes, search keys and values, copy paths.",
    url: "https://openkit.tools/json-viewer",
    images: [
      {
        url: "/og/json-viewer.jpg",
        width: 1200,
        height: 630,
        alt: "JSON Viewer - OpenKit.tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Viewer - Interactive Tree Explorer | OpenKit.tools",
    description: "Explore JSON data with an interactive tree view",
  },
  alternates: {
    canonical: "https://openkit.tools/json-viewer",
  },
};
