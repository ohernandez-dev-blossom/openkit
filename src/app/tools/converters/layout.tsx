import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Converters — Unit, Currency, Temperature, File Format & More",
  description:
    "Free online converters for units, currency, temperature, file formats, and more. Convert JSON to YAML, CSV to JSON, numbers between bases, temperatures, and units — all instant and browser-based.",
  keywords: [
    "online converters",
    "unit converter",
    "temperature converter",
    "currency converter",
    "file format converter",
    "json to yaml",
    "csv to json",
    "number base converter",
    "data converter",
    "free converter online",
    "xml to json",
    "json to csv",
    "toml to json",
    "yaml to toml",
  ],
  openGraph: {
    title:
      "Free Online Converters — Unit, Currency, Temperature, File Format & More | OpenKit.tools",
    description:
      "Free online converters for units, currency, temperature, file formats, and more. All instant, private, and browser-based.",
    url: "https://openkit.tools/tools/converters",
    type: "website",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "OpenKit.tools — Free Online Converters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Converters — Unit, Currency, Temperature & More | OpenKit.tools",
    description:
      "Unit converter, temperature converter, currency converter, file format converter — all free, instant, and private.",
    images: ["/og/home.jpg"],
  },
  alternates: {
    canonical: "https://openkit.tools/tools/converters",
  },
};

export default function ConverterToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
