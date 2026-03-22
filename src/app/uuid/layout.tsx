import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator - Generate Random UUIDs v4",
  description: "Free UUID v4 generator. Generate multiple random UUIDs instantly with customizable formats. Perfect for database keys, session IDs, and unique identifiers. Client-side generation for privacy.",
  keywords: ["UUID generator", "GUID generator", "UUID v4", "random UUID", "database key", "unique identifier", "generate UUID"],
  openGraph: {
    title: "UUID Generator - Free UUID v4 Generator Tool",
    description: "Generate cryptographically random UUIDs instantly. Multiple formats, bulk generation, client-side privacy.",
    url: "https://openkit.tools/uuid",
    images: [{
      url: "/og/uuid.jpg",
      width: 1200,
      height: 630,
      alt: "UUID Generator - Generate Random UUIDs v4",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UUID Generator - Generate Random UUIDs v4",
    description: "Generate cryptographically random UUIDs instantly. Multiple formats, bulk generation.",
    images: ["/og/uuid.jpg"],
  },
  alternates: {
    canonical: "https://openkit.tools/uuid",
  },
};

export default function UUIDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
