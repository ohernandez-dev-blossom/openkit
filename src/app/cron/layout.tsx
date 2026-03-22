import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cron - Free Online Tool | OpenKit",
  description: "Cron online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["cron", "online tool", "free", "cron"],
  openGraph: {
    title: "Cron - Free Online Tool",
    description: "Cron online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/cron",
    images: [
      {
        url: "/og/cron.jpg",
        width: 1200,
        height: 630,
        alt: "Cron - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/cron",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
