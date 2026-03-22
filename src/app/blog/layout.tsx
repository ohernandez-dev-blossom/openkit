import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Developer Guides & Insights",
  description:
    "Developer guides, privacy insights, tool comparisons, and engineering deep-dives from the OpenKit.tools team.",
  keywords: [
    "developer blog",
    "dev tools",
    "privacy",
    "client-side tools",
    "developer guides",
    "engineering",
  ],
  openGraph: {
    title: "Blog - OpenKit.tools",
    description:
      "Developer guides, privacy insights, and engineering deep-dives.",
    url: "https://openkit.tools/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://openkit.tools/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
