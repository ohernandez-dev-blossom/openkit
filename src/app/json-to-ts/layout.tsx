import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Json To Ts - Free Online Tool | OpenKit",
  description: "Json To Ts online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["json to-ts", "online tool", "free", "json to ts"],
  openGraph: {
    title: "Json To Ts - Free Online Tool",
    description: "Json To Ts online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/json-to-ts",
    images: [
      {
        url: "/og/json-to-ts.jpg",
        width: 1200,
        height: 630,
        alt: "Json To Ts - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/json-to-ts",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
