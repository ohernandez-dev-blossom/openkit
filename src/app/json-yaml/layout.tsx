import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to YAML Converter - Convert JSON ↔ YAML Online Free",
  description: "Convert JSON to YAML and YAML to JSON instantly. Configurable indentation, multiline string support. Free online converter for DevOps configs. No data sent to servers.",
  keywords: ["json to yaml", "yaml to json", "json yaml converter", "convert json to yaml online", "yaml converter", "docker compose yaml", "kubernetes yaml"],
  openGraph: {
    title: "JSON to YAML Converter - Convert JSON ↔ YAML Online Free",
    description: "Convert JSON to YAML and YAML to JSON instantly. Configurable indentation, multiline support. Free online converter.",
    url: "https://openkit.tools/json-yaml",
    images: [
      {
        url: "/og/json-yaml.jpg",
        width: 1200,
        height: 630,
        alt: "JSON to YAML Converter - OpenKit.tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON ↔ YAML Converter - OpenKit.tools",
    description: "Convert JSON to YAML and YAML to JSON instantly. Free online tool.",
  },
  alternates: {
    canonical: "https://openkit.tools/json-yaml",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
