import { Metadata } from "next";

export const metadata: Metadata = {
  title: "chmod Calculator Pro | Linux Permission Calculator",
  description: "Calculate Linux file permissions with numeric and symbolic notation. Supports special permissions: SUID, SGID, and sticky bit. Generate chmod commands instantly.",
  keywords: [
    "chmod calculator",
    "linux permissions",
    "file permissions",
    "chmod command generator",
    "SUID",
    "SGID",
    "sticky bit",
    "unix permissions",
    "permission calculator",
    "chmod 755",
    "chmod 644",
  ],
  alternates: {
    canonical: "https://openkit.tools/chmod-calc",
  },
  openGraph: {
    title: "chmod Calculator Pro | Linux Permission Calculator",
    description: "Calculate Linux file permissions with numeric/symbolic notation. Supports SUID, SGID, sticky bit.",
    url: "https://openkit.tools/chmod-calc",
    siteName: "OpenKit",
    type: "website",
    images: [
      {
        url: "https://openkit.tools/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "chmod Calculator Pro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "chmod Calculator Pro",
    description: "Calculate Linux file permissions with SUID, SGID, sticky bit support.",
    images: ["https://openkit.tools/opengraph-image.png"],
  },
};
