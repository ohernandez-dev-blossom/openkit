import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclosure - Free Online Tool | OpenKit",
  description: "Disclosure online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["disclosure", "online tool", "free", "disclosure"],
  openGraph: {
    title: "Disclosure - Free Online Tool",
    description: "Disclosure online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/disclosure",
    images: [
      {
        url: "/og/disclosure.jpg",
        width: 1200,
        height: 630,
        alt: "Disclosure - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/disclosure",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
