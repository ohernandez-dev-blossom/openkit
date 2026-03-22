import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder Decoder - Free Online Tool | OpenKit",
  description: "Encode and decode Base64, URL, HTML. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["base64 encoder decoder","online tool","free","base64"],
  openGraph: {
    title: "Base64 Encoder Decoder - Free Online Tool",
    description: "Encode and decode Base64, URL, HTML. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/base64",
    images: [
      {
        url: "/og/base64.jpg",
        width: 1200,
        height: 630,
        alt: "Base64 Encoder Decoder - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/base64",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
