import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sql Format - Free Online Tool | OpenKit",
  description: "Sql Format online free. Fast, privacy-first, 100% client-side processing. No signup required.",
  keywords: ["sql format", "online tool", "free", "sql format"],
  openGraph: {
    title: "Sql Format - Free Online Tool",
    description: "Sql Format online free. Privacy-first, client-side processing.",
    url: "https://openkit.tools/sql-format",
    images: [
      {
        url: "/og/sql-format.jpg",
        width: 1200,
        height: 630,
        alt: "Sql Format - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/sql-format",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
