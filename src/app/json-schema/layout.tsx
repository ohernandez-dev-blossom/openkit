import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Schema Generator - Free Online Tool | OpenKit",
  description: "Generate JSON Schema from any JSON object. Supports Draft-04, Draft-07, and 2020-12 with automatic format detection.",
  keywords: ["json schema generator", "json schema", "json to schema", "api validation", "online tool"],
  openGraph: {
    title: "JSON Schema Generator - Free Online Tool",
    description: "Generate JSON Schema from JSON objects with format detection and multiple draft support.",
    url: "https://openkit.tools/json-schema",
    images: [
      {
        url: "/og/json-schema.jpg",
        width: 1200,
        height: 630,
        alt: "JSON Schema Generator - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/json-schema",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
