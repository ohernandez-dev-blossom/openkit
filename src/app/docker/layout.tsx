import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docker - Free Online Tool | OpenKit",
  description: "Docker online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["docker", "online tool", "free", "docker"],
  openGraph: {
    title: "Docker - Free Online Tool",
    description: "Docker online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/docker",
    images: [
      {
        url: "/og/docker.jpg",
        width: 1200,
        height: 630,
        alt: "Docker - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/docker",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
