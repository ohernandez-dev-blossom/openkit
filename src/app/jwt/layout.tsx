import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT Decoder - Decode JSON Web Tokens",
  description: "Decode and inspect JWT (JSON Web Token) headers, payloads, and signatures. Debug authentication tokens, verify claims, and check expiration. 100% client-side decoding for privacy.",
  keywords: ["JWT decoder", "decode JWT", "JSON web token", "JWT inspector", "token decoder", "JWT debugger"],
  openGraph: {
    title: "JWT Decoder - Debug JSON Web Tokens Instantly",
    description: "Decode JWT tokens to inspect headers, payloads, and claims. Debug authentication issues with real-time decoding.",
    url: "https://openkit.tools/jwt",
    images: [{
      url: "/og/jwt.jpg",
      width: 1200,
      height: 630,
      alt: "JWT Decoder - Decode JSON Web Tokens",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JWT Decoder - Decode JSON Web Tokens",
    description: "Decode JWT tokens to inspect headers, payloads, and claims. Debug authentication issues.",
    images: ["/og/jwt.jpg"],
  },
  alternates: {
    canonical: "https://openkit.tools/jwt",
  },
};

export default function JWTLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
