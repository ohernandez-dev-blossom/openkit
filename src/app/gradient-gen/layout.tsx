import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gradient Gen - Free Online Tool | OpenKit",
  description: "Create beautiful CSS gradients with visual editor. Linear, radial, and conic gradients with color stops.",
  keywords: ["gradient gen","online tool","free"],
  openGraph: {
    title: "Gradient Gen - Free Online Tool",
    description: "Create beautiful CSS gradients with visual editor. Linear, radial, and conic gradients with color stops.",
    url: "https://openkit.tools/gradient-gen",
    images: [
      {
        url: "/og/gradient-gen.jpg",
        width: 1200,
        height: 630,
        alt: "Gradient Gen - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/gradient-gen",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
