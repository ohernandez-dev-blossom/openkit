import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sort - Free Online Tool | OpenKit",
  description: "Sort lines alphabetically. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["sort lines","online tool","free","sort"],
  openGraph: {
    title: "Sort - Free Online Tool",
    description: "Sort lines alphabetically. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/sort",
    images: [
      {
        url: "/og/sort.jpg",
        width: 1200,
        height: 630,
        alt: "Sort - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/sort",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
