import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Converter - Free Online Tool | OpenKit",
  description: "Convert colors between HEX, RGB, and HSL formats instantly. Free online color picker with live preview.",
  keywords: ["hex to rgb","color converter","rgb to hex","hsl converter","color picker"],
  openGraph: {
    title: "Color Converter - Free Online Tool",
    description: "Convert colors between HEX, RGB, and HSL formats instantly. Free online color picker with live preview.",
    url: "https://openkit.tools/colors",
    images: [
      {
        url: "/og/colors.jpg",
        width: 1200,
        height: 630,
        alt: "Color Converter - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/colors",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
