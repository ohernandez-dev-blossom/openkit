import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Html Format - Free Online Tool | OpenKit",
  description: "Html Format online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["html format", "online tool", "free", "html format"],
  openGraph: {
    title: "Html Format - Free Online Tool",
    description: "Html Format online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/html-format",
    images: [
      {
        url: "/og/html-format.jpg",
        width: 1200,
        height: 630,
        alt: "Html Format - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/html-format",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
