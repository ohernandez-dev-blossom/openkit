import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit - Free Online Tool | OpenKit",
  description: "Convert length, weight, temperature, data. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["unit converter","online tool","free","unit"],
  openGraph: {
    title: "Unit - Free Online Tool",
    description: "Convert length, weight, temperature, data. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/unit",
    images: [
      {
        url: "/og/unit.jpg",
        width: 1200,
        height: 630,
        alt: "Unit - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/unit",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
