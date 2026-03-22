import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palette - Free Online Tool | OpenKit",
  description: "Generate color palettes. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["color palette generator","online tool","free","palette"],
  openGraph: {
    title: "Palette - Free Online Tool",
    description: "Generate color palettes. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/palette",
    images: [
      {
        url: "/og/palette.jpg",
        width: 1200,
        height: 630,
        alt: "Palette - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/palette",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
