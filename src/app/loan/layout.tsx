import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan - Free Online Tool | OpenKit",
  description: "Calculate loan payments and interest. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["loan calculator","online tool","free","loan"],
  openGraph: {
    title: "Loan - Free Online Tool",
    description: "Calculate loan payments and interest. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/loan",
    images: [
      {
        url: "/og/loan.jpg",
        width: 1200,
        height: 630,
        alt: "Loan - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/loan",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
