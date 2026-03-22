import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toml Json - Free Online Tool | OpenKit",
  description: "Toml Json online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["toml json", "online tool", "free", "toml json"],
  openGraph: {
    title: "Toml Json - Free Online Tool",
    description: "Toml Json online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/toml-json",
    images: [
      {
        url: "/og/toml-json.jpg",
        width: 1200,
        height: 630,
        alt: "Toml Json - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/toml-json",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
