import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Text Tools — Word Counter, Case Converter, Diff Checker & More",
  description:
    "Free online text tools for writers, editors, and content creators. Word counter, case converter, text diff checker, line sorter, Lorem Ipsum generator, and more. All tools run in your browser — no data leaves your device.",
  keywords: [
    "text tools",
    "word counter",
    "case converter",
    "text diff",
    "line sorter",
    "lorem ipsum generator",
    "text editor tools",
    "writing tools",
    "content tools",
    "text manipulation",
    "free text tools online",
    "remove duplicates",
    "sort lines",
    "extract emails",
    "regex replace",
  ],
  openGraph: {
    title: "Free Text Tools — Word Counter, Case Converter, Diff Checker & More | OpenKit.tools",
    description:
      "Free text tools for writers, editors, and content creators. Word counter, case converter, diff checker, line sorter — all browser-based and privacy-first.",
    url: "https://openkit.tools/tools/text",
    type: "website",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "OpenKit.tools — Free Text Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Text Tools — Word Counter, Case Converter & More | OpenKit.tools",
    description:
      "Word counter, case converter, diff checker, line sorter, and more — all free, browser-based, and privacy-first.",
    images: ["/og/home.jpg"],
  },
  alternates: {
    canonical: "https://openkit.tools/tools/text",
  },
};

export default function TextToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
