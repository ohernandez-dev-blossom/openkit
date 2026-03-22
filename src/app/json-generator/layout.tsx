import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Data Generator - Generate Random JSON Online Free",
  description: "Generate random JSON data from templates with placeholders. Create mock users, products, orders. Seed databases, mock APIs. Free online JSON generator. No data sent to servers.",
  keywords: ["json generator", "random json", "mock data generator", "json test data", "fake json api", "json seed data", "generate json online"],
  openGraph: {
    title: "JSON Data Generator - Generate Random JSON Online Free",
    description: "Generate random JSON data from templates with placeholders. Create mock users, products, orders. Free online generator.",
    url: "https://openkit.tools/json-generator",
    images: [
      {
        url: "/og/json-generator.jpg",
        width: 1200,
        height: 630,
        alt: "JSON Data Generator - OpenKit.tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Data Generator - OpenKit.tools",
    description: "Generate random JSON data from templates. Free online tool.",
  },
  alternates: {
    canonical: "https://openkit.tools/json-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
