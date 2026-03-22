import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shadow - Free Online Tool | OpenKit",
  description: "CSS box-shadow generator. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["box shadow generator","online tool","free","shadow"],
  openGraph: {
    title: "Shadow - Free Online Tool",
    description: "CSS box-shadow generator. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/shadow",
    images: [
      {
        url: "/og/shadow.jpg",
        width: 1200,
        height: 630,
        alt: "Shadow - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/shadow",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
