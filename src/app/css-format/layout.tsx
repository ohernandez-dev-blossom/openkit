import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Css Format - Free Online Tool | OpenKit",
  description: "Css Format online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["css format", "online tool", "free", "css format"],
  openGraph: {
    title: "Css Format - Free Online Tool",
    description: "Css Format online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/css-format",
    images: [
      {
        url: "/og/css-format.jpg",
        width: 1200,
        height: 630,
        alt: "Css Format - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/css-format",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
