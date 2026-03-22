import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faq - Free Online Tool | OpenKit",
  description: "Faq online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["faq", "online tool", "free", "faq"],
  openGraph: {
    title: "Faq - Free Online Tool",
    description: "Faq online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/faq",
    images: [
      {
        url: "/og/faq.jpg",
        width: 1200,
        height: 630,
        alt: "Faq - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/faq",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
