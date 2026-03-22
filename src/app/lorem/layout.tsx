import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Free Online Tool | OpenKit",
  description: "Generate lorem ipsum placeholder text for designs. Create paragraphs, sentences, or words. Free generator.",
  keywords: ["lorem ipsum generator","placeholder text","dummy text generator","lipsum"],
  openGraph: {
    title: "Lorem Ipsum Generator - Free Online Tool",
    description: "Generate lorem ipsum placeholder text for designs. Create paragraphs, sentences, or words. Free generator.",
    url: "https://openkit.tools/lorem",
    images: [
      {
        url: "/og/lorem.jpg",
        width: 1200,
        height: 630,
        alt: "Lorem Ipsum Generator - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/lorem",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
