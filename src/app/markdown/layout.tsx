import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown to HTML Converter - Free Online Tool | OpenKit",
  description: "Live markdown preview and editor online. GitHub Flavored Markdown support. Free markdown viewer.",
  keywords: ["markdown preview","markdown editor online","md preview","markdown viewer"],
  openGraph: {
    title: "Markdown to HTML Converter - Free Online Tool",
    description: "Live markdown preview and editor online. GitHub Flavored Markdown support. Free markdown viewer.",
    url: "https://openkit.tools/markdown",
    images: [
      {
        url: "/og/markdown.jpg",
        width: 1200,
        height: 630,
        alt: "Markdown to HTML Converter - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/markdown",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
