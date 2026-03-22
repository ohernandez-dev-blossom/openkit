import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clip Path - Free Online Tool | OpenKit",
  description: "Clip Path online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["clip path", "online tool", "free", "clip path"],
  openGraph: {
    title: "Clip Path - Free Online Tool",
    description: "Clip Path online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/clip-path",
    images: [
      {
        url: "/og/clip-path.jpg",
        width: 1200,
        height: 630,
        alt: "Clip Path - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/clip-path",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
