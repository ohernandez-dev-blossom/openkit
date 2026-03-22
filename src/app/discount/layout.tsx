import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discount - Free Online Tool | OpenKit",
  description: "Calculate discounts and final prices. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["discount calculator","online tool","free","discount"],
  openGraph: {
    title: "Discount - Free Online Tool",
    description: "Calculate discounts and final prices. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/discount",
    images: [
      {
        url: "/og/discount.jpg",
        width: 1200,
        height: 630,
        alt: "Discount - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/discount",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
