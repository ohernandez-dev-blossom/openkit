import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Epoch Converter - Unix Timestamp Tool | OpenKit",
  description: "Convert Unix timestamps to dates and vice versa. Real-time epoch converter with timezone support, milliseconds/seconds, and relative time display. Free online tool.",
  keywords: ["epoch converter", "unix timestamp", "epoch time", "timestamp converter", "unix time", "date converter", "timezone converter"],
  openGraph: {
    title: "Epoch Converter - Unix Timestamp Tool",
    description: "Convert Unix timestamps to dates and vice versa. Real-time epoch converter with timezone support, milliseconds/seconds, and relative time display.",
    url: "https://openkit.tools/epoch",
    images: [
      {
        url: "/og/epoch.jpg",
        width: 1200,
        height: 630,
        alt: "Epoch - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/epoch",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
