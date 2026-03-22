import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Data Generator - Free Online Tool | OpenKit",
  description: "Generate random JSON data from templates. Create mock users, products, orders with placeholders for names, emails, UUIDs. Free online JSON generator.",
  keywords: ["json generator", "json data generator", "mock json", "random json", "json faker", "json mock data", "generate json online"],
  openGraph: {
    title: "JSON Data Generator - Free Online Tool",
    description: "Generate random JSON data from templates with placeholders for names, emails, numbers, UUIDs.",
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
    title: "JSON Data Generator | OpenKit.tools",
    description: "Generate random JSON data from templates instantly",
  },
  alternates: {
    canonical: "https://openkit.tools/json-generator",
  },
};
