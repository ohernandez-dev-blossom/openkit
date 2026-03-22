import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hash Generator - Free Online Tool | OpenKit",
  description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["hash generator","online tool","free","hash"],
  openGraph: {
    title: "Hash Generator - Free Online Tool",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/hash",
    images: [
      {
        url: "/og/hash.jpg",
        width: 1200,
        height: 630,
        alt: "Hash Generator - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/hash",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
