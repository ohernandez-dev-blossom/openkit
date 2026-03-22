import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gradient - Free Online Tool | OpenKit",
  description: "Generate CSS gradients. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["css gradient generator","online tool","free","gradient"],
  openGraph: {
    title: "Gradient - Free Online Tool",
    description: "Generate CSS gradients. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/gradient",
    images: [
      {
        url: "/og/gradient.jpg",
        width: 1200,
        height: 630,
        alt: "Gradient - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/gradient",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
