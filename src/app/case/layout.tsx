import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case - Free Online Tool | OpenKit",
  description: "Convert text between 15 case styles: camelCase, snake_case, kebab-case, PascalCase, Title Case & more. Batch processing, preserve formatting. 100% client-side.",
  keywords: ["case converter","camelCase","snake_case","kebab-case","PascalCase","text transform","batch converter","online tool","free"],
  openGraph: {
    title: "Case - Free Online Tool",
    description: "Convert text between 15 case styles: camelCase, snake_case, kebab-case, PascalCase, Title Case & more. Batch processing, preserve formatting. 100% client-side.",
    url: "https://openkit.tools/case",
    images: [
      {
        url: "/og/case.jpg",
        width: 1200,
        height: 630,
        alt: "Case - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/case",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
