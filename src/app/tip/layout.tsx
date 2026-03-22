import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tip - Free Online Tool | OpenKit",
  description: "Calculate tips and split bills. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["tip calculator","online tool","free","tip"],
  openGraph: {
    title: "Tip - Free Online Tool",
    description: "Calculate tips and split bills. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/tip",
    images: [
      {
        url: "/og/tip.jpg",
        width: 1200,
        height: 630,
        alt: "Tip - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/tip",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
