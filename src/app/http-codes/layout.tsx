import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Http Codes - Free Online Tool | OpenKit",
  description: "Reference for HTTP status codes. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["http status codes","online tool","free","http-codes"],
  openGraph: {
    title: "Http Codes - Free Online Tool",
    description: "Reference for HTTP status codes. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/http-codes",
    images: [
      {
        url: "/og/http-codes.jpg",
        width: 1200,
        height: 630,
        alt: "Http Codes - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/http-codes",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
