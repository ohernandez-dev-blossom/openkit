import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mock Api - Free Online Tool | OpenKit",
  description: "Mock Api online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["mock api", "online tool", "free", "mock api"],
  openGraph: {
    title: "Mock Api - Free Online Tool",
    description: "Mock Api online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/mock-api",
    images: [
      {
        url: "/og/mock-api.jpg",
        width: 1200,
        height: 630,
        alt: "Mock Api - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/mock-api",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
