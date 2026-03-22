import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random - Free Online Tool | OpenKit",
  description: "Generate random numbers. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["random number generator","online tool","free","random"],
  openGraph: {
    title: "Random - Free Online Tool",
    description: "Generate random numbers. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/random",
    images: [
      {
        url: "/og/random.jpg",
        width: 1200,
        height: 630,
        alt: "Random - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/random",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
