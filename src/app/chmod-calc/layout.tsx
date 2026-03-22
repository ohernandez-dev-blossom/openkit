import { Metadata } from "next";

export const metadata: Metadata = {
  title: "chmod Calculator Pro - Advanced File Permissions | OpenKit",
  description: "Advanced chmod calculator with special permissions (SUID, SGID, sticky bit), umask support, and symbolic notation. Interactive permission builder for Linux/Unix.",
  keywords: ["chmod calculator", "chmod calc", "file permissions", "unix permissions", "suid", "sgid", "sticky bit", "umask", "linux permissions"],
  openGraph: {
    title: "chmod Calculator Pro - Advanced File Permissions",
    description: "Advanced chmod calculator with special permissions, umask support, and symbolic notation. Interactive permission builder.",
    url: "https://openkit.tools/chmod-calc",
    images: [
      {
        url: "/og/chmod-calc.jpg",
        width: 1200,
        height: 630,
        alt: "chmod Calculator Pro - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/chmod-calc",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
