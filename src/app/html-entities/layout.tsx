import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Entities Encoder & Decoder + Reference Table | OpenKit",
  description: "Free HTML entity encoder/decoder with comprehensive reference. Convert special characters, symbols, math operators to HTML entities. 200+ entities with named (&amp;) and numeric (&#38;) formats. Search and copy instantly.",
  keywords: ["html entities","html encoder","html decoder","html special characters","html symbols","html entity reference","&amp;","&lt;","&gt;","&nbsp;","character encoding","escape html","online tool","free"],
  openGraph: {
    title: "HTML Entities Encoder/Decoder + Complete Reference",
    description: "Convert special characters to HTML entities with comprehensive reference table. 200+ symbols including math operators, arrows, and special characters. Named and numeric formats.",
    url: "https://openkit.tools/html-entities",
    images: [
      {
        url: "/og/html-entities.jpg",
        width: 1200,
        height: 630,
        alt: "HTML Entities Encoder - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/html-entities",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
