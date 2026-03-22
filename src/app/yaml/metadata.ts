import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YAML Formatter & Validator - Format, Beautify & Lint YAML | OpenKit",
  description:
    "Format, validate, and beautify YAML online for free. Sort keys, adjust indentation, detect errors with line numbers. Fast, private, no data sent to servers.",
  keywords: [
    "yaml formatter",
    "yaml validator",
    "yaml beautifier",
    "yaml lint",
    "format yaml online",
    "yaml parser",
    "yaml pretty print",
    "yaml checker",
    "yaml editor online",
    "yaml syntax checker",
  ],
  openGraph: {
    title: "YAML Formatter & Validator - Free Online Tool",
    description:
      "Format, validate, and beautify YAML online for free. Sort keys, adjust indentation, detect errors with line numbers.",
    url: "https://openkit.tools/yaml",
    images: [
      {
        url: "/og/yaml.png",
        width: 1200,
        height: 630,
        alt: "YAML Formatter & Validator - OpenKit.tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YAML Formatter & Validator - OpenKit.tools",
    description:
      "Format, validate, and beautify YAML online. Sort keys, adjust indentation, detect syntax errors.",
  },
  alternates: {
    canonical: "https://openkit.tools/yaml",
  },
};
