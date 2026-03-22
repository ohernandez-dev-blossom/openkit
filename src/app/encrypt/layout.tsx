import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Encrypt - Free Online Tool | OpenKit",
  description: "Encrypt and decrypt text with AES-256 encryption. Secure, password-protected encryption. All processing happens in your browser - no data sent to servers.",
  keywords: ["text encryption","aes encryption","encrypt text","decrypt text","online encryption tool","secure text","password encryption"],
  openGraph: {
    title: "Encrypt - Free Online Tool",
    description: "Encrypt and decrypt text with AES-256 encryption. Secure, password-protected encryption. All processing happens in your browser - no data sent to servers.",
    url: "https://openkit.tools/encrypt",
    images: [
      {
        url: "/og/encrypt.jpg",
        width: 1200,
        height: 630,
        alt: "Encrypt - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/encrypt",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
