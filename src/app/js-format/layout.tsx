import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript Formatter & Beautifier - Format JS Code | OpenKit",
  description:
    "Format, beautify, and minify JavaScript code online. Configurable indentation, comment handling, and ES6+ support. Free developer tool.",
  keywords: [
    "javascript formatter",
    "js beautifier",
    "format javascript",
    "javascript beautify",
    "js formatter online",
    "javascript pretty print",
    "minify javascript",
    "js format",
    "javascript indent",
    "code beautifier",
  ],
  openGraph: {
    title: "JavaScript Formatter & Beautifier",
    description:
      "Format, beautify, and minify JavaScript code with configurable indentation. Free online tool.",
    url: "https://openkit.tools/js-format",
    images: [
      {
        url: "/og/js-format.jpg",
        width: 1200,
        height: 630,
        alt: "JavaScript Formatter - OpenKit.tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Formatter - OpenKit.tools",
    description: "Beautify & minify JavaScript code online — free dev tool",
  },
  alternates: {
    canonical: "https://openkit.tools/js-format",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
