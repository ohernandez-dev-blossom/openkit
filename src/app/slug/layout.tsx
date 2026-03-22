import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slug - Free Online Tool | OpenKit",
  description: "Generate URL-friendly slugs. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["slug generator","online tool","free","slug"],
  openGraph: {
    title: "Slug - Free Online Tool",
    description: "Generate URL-friendly slugs. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/slug",
    images: [
      {
        url: "/og/slug.jpg",
        width: 1200,
        height: 630,
        alt: "Slug - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/slug",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
