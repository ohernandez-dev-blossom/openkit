import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Border - Free Online Tool | OpenKit",
  description: "CSS border-radius generator. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["border radius generator","online tool","free","border"],
  openGraph: {
    title: "Border - Free Online Tool",
    description: "CSS border-radius generator. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/border",
    images: [
      {
        url: "/og/border.jpg",
        width: 1200,
        height: 630,
        alt: "Border - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/border",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
