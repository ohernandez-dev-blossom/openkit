import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to CSV Converter - Free Online Tool | OpenKit",
  description: "Convert JSON to CSV and CSV to JSON instantly. Flatten nested objects, handle arrays, choose delimiters. Free online JSON CSV converter.",
  keywords: ["json to csv", "csv to json", "json csv converter", "convert json csv", "json to csv online", "csv converter"],
  openGraph: {
    title: "JSON to CSV Converter - Free Online Tool",
    description: "Convert JSON to CSV and CSV to JSON instantly. Flatten nested objects, handle arrays, choose delimiters.",
    url: "https://openkit.tools/json-csv",
    images: [
      {
        url: "/og/json-csv.jpg",
        width: 1200,
        height: 630,
        alt: "JSON CSV Converter - OpenKit.tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to CSV Converter | OpenKit.tools",
    description: "Convert JSON to CSV and CSV to JSON instantly",
  },
  alternates: {
    canonical: "https://openkit.tools/json-csv",
  },
};
