import type { Metadata } from "next";
import UUIDClient from "./uuid-client";

export const metadata: Metadata = {
  title: "UUID Generator - Free UUID v4 Generator | OpenKit.tools",
  description: "Generate random UUID v4 identifiers instantly. Create multiple UUIDs with custom formats (standard, uppercase, no-dash). Perfect for database keys, session IDs, and distributed systems.",
  keywords: [
    "UUID generator",
    "UUID v4",
    "generate UUID",
    "random UUID",
    "UUID online",
    "database key generator",
    "session ID generator",
    "unique identifier",
    "GUID generator",
    "developer tools"
  ],
  openGraph: {
    title: "UUID Generator - Free UUID v4 Generator",
    description: "Generate random UUID v4 identifiers instantly. Perfect for database keys and distributed systems.",
    url: "https://openkit.tools/uuid",
    images: [
      {
        url: "/og-images/uuid.jpg",
        width: 1200,
        height: 630,
        alt: "UUID Generator - Free UUID v4 Generator Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UUID Generator - Free UUID v4 Generator",
    description: "Generate random UUID v4 identifiers instantly. Perfect for database keys and distributed systems.",
    images: ["/og-images/uuid.jpg"],
  },
  alternates: {
    canonical: "https://openkit.tools/uuid",
  },
};

export default function UUIDPage() {
  return <UUIDClient />;
}
