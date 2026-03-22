import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Html Md - Free Online Tool | OpenKit",
  description: "Html Md online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["html md", "online tool", "free", "html md"],
  openGraph: {
    title: "Html Md - Free Online Tool",
    description: "Html Md online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/html-md",
    images: [
      {
        url: "/og/html-md.jpg",
        width: 1200,
        height: 630,
        alt: "Html Md - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/html-md",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
