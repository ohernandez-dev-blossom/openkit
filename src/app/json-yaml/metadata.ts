import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to YAML Converter - Free Online Tool | OpenKit",
  description: "Convert JSON to YAML and YAML to JSON instantly. Configurable indentation, multiline string support. Free online JSON YAML converter.",
  keywords: ["json to yaml", "yaml to json", "json yaml converter", "convert json yaml", "json to yaml online", "yaml converter"],
  openGraph: {
    title: "JSON to YAML Converter - Free Online Tool",
    description: "Convert JSON to YAML and YAML to JSON instantly. Configurable indentation, multiline string support.",
    url: "https://openkit.tools/json-yaml",
    images: [
      {
        url: "/og/json-yaml.jpg",
        width: 1200,
        height: 630,
        alt: "JSON YAML Converter - OpenKit.tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to YAML Converter | OpenKit.tools",
    description: "Convert JSON to YAML and YAML to JSON instantly",
  },
  alternates: {
    canonical: "https://openkit.tools/json-yaml",
  },
};
