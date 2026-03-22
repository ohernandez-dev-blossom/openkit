import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester - Free Online Tool | OpenKit",
  description: "Test regular expressions. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["regex tester","online tool","free","regex"],
  openGraph: {
    title: "Regex Tester - Free Online Tool",
    description: "Test regular expressions. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/regex",
    images: [
      {
        url: "/og/regex.jpg",
        width: 1200,
        height: 630,
        alt: "Regex Tester - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/regex",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
