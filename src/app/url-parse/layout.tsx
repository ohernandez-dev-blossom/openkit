import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Url Parse - Free Online Tool | OpenKit",
  description: "Url Parse online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["url parse", "online tool", "free", "url parse"],
  openGraph: {
    title: "Url Parse - Free Online Tool",
    description: "Url Parse online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/url-parse",
    images: [
      {
        url: "/og/url-parse.jpg",
        width: 1200,
        height: 630,
        alt: "Url Parse - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/url-parse",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
