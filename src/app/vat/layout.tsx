import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vat - Free Online Tool | OpenKit",
  description: "Calculate VAT on prices. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["vat calculator","online tool","free","vat"],
  openGraph: {
    title: "Vat - Free Online Tool",
    description: "Calculate VAT on prices. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/vat",
    images: [
      {
        url: "/og/vat.jpg",
        width: 1200,
        height: 630,
        alt: "Vat - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/vat",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
