import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to CSV Converter - Convert JSON ↔ CSV Online Free",
  description: "Convert JSON to CSV and CSV to JSON instantly. Flatten nested objects, handle arrays, choose delimiters. Free online converter with preview table. No data sent to servers.",
  keywords: ["json to csv", "csv to json", "json csv converter", "convert json to csv online", "json to spreadsheet", "csv converter", "json array to csv"],
  openGraph: {
    title: "JSON to CSV Converter - Convert JSON ↔ CSV Online Free",
    description: "Convert JSON to CSV and CSV to JSON instantly. Flatten nested objects, handle arrays, choose delimiters. Free online converter.",
    url: "https://openkit.tools/json-csv",
    images: [
      {
        url: "/og/json-csv.jpg",
        width: 1200,
        height: 630,
        alt: "JSON to CSV Converter - OpenKit.tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON ↔ CSV Converter - OpenKit.tools",
    description: "Convert JSON to CSV and CSV to JSON instantly. Free online tool.",
  },
  alternates: {
    canonical: "https://openkit.tools/json-csv",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
