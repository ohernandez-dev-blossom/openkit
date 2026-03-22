import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gitignore - Free Online Tool | OpenKit",
  description: "Gitignore online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["gitignore", "online tool", "free", "gitignore"],
  openGraph: {
    title: "Gitignore - Free Online Tool",
    description: "Gitignore online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/gitignore",
    images: [
      {
        url: "/og/gitignore.jpg",
        width: 1200,
        height: 630,
        alt: "Gitignore - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/gitignore",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
