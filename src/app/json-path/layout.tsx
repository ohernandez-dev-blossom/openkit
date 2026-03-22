import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Json Path - Free Online Tool | OpenKit",
  description: "Json Path online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["json path", "online tool", "free", "json path"],
  openGraph: {
    title: "Json Path - Free Online Tool",
    description: "Json Path online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/json-path",
    images: [
      {
        url: "/og/json-path.jpg",
        width: 1200,
        height: 630,
        alt: "Json Path - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/json-path",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
