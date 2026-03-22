import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Replace - Free Online Tool | OpenKit",
  description: "Advanced find and replace with regex support. Case-sensitive matching, whole word search, live preview. All processing happens in your browser.",
  keywords: ["find and replace","text replace","regex replace","search and replace","text editor","bulk replace","regex tool"],
  openGraph: {
    title: "Replace - Free Online Tool",
    description: "Advanced find and replace with regex support. Case-sensitive matching, whole word search, live preview. All processing happens in your browser.",
    url: "https://openkit.tools/replace",
    images: [
      {
        url: "/og/replace.jpg",
        width: 1200,
        height: 630,
        alt: "Replace - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/replace",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
