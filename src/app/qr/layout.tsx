import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator - Free Online Tool | OpenKit",
  description: "Generate QR codes for URLs, text, WiFi, and more. Customize colors and size. Free online QR code maker.",
  keywords: ["qr code generator","create qr code","qr code maker","free qr code"],
  openGraph: {
    title: "QR Code Generator - Free Online Tool",
    description: "Generate QR codes for URLs, text, WiFi, and more. Customize colors and size. Free online QR code maker.",
    url: "https://openkit.tools/qr",
    images: [
      {
        url: "/og/qr.jpg",
        width: 1200,
        height: 630,
        alt: "QR Code Generator - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/qr",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
