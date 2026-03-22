import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xml Format - Free Online Tool | OpenKit",
  description: "Xml Format online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["xml format", "online tool", "free", "xml format"],
  openGraph: {
    title: "Xml Format - Free Online Tool",
    description: "Xml Format online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/xml-format",
    images: [
      {
        url: "/og/xml-format.jpg",
        width: 1200,
        height: 630,
        alt: "Xml Format - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/xml-format",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
