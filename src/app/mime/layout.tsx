import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MIME Type Lookup - File Extension to MIME Type | OpenKit.tools",
  description: "Instantly lookup MIME types for file extensions. Comprehensive database of common MIME types for web development, covering documents, images, audio, video, fonts, and more.",
  keywords: ["mime type lookup", "file extension", "content type", "media type", "mime database", "web development"],
  openGraph: {
    title: "MIME Type Lookup - File Extension to MIME Type",
    description: "Instantly lookup MIME types for file extensions. Comprehensive database covering documents, images, audio, video, and more.",
    url: "https://openkit.tools/mime",
    images: [
      {
        url: "/og/mime.jpg",
        width: 1200,
        height: 630,
        alt: "MIME Type Lookup - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/mime",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
