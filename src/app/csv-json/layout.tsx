import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to JSON Converter - Free Online Tool | OpenKit",
  description: "Convert CSV to JSON and JSON to CSV instantly. Bidirectional converter with custom delimiters, header detection, and formatting options. 100% client-side processing.",
  keywords: ["csv to json", "json to csv", "csv converter", "json converter", "csv parser", "data converter", "spreadsheet"],
  openGraph: {
    title: "CSV to JSON Converter - Free Online Tool",
    description: "Convert CSV to JSON and JSON to CSV instantly. Bidirectional converter with custom delimiters, header detection, and formatting options.",
    url: "https://openkit.tools/csv-json",
    images: [
      {
        url: "/og/csv-json.jpg",
        width: 1200,
        height: 630,
        alt: "Csv Json - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/csv-json",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
