import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter - Free Online Tool | OpenKit",
  description: "Format, validate, and beautify JSON online for free. Minify JSON, convert to tree view. Fast, private, no data sent to servers.",
  keywords: ["json formatter","json beautifier","json validator","json minifier","format json online"],
  openGraph: {
    title: "JSON Formatter - Free Online Tool",
    description: "Format, validate, and beautify JSON online for free. Minify JSON, convert to tree view. Fast, private, no data sent to servers.",
    url: "https://openkit.tools/json",
    images: [
      {
        url: "/og/json.jpg",
        width: 1200,
        height: 630,
        alt: "JSON Formatter - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/json",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
