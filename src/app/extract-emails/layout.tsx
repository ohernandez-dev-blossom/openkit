import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extract Emails - Free Online Tool | OpenKit",
  description: "Extract email addresses from text. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["extract emails","online tool","free","extract-emails"],
  openGraph: {
    title: "Extract Emails - Free Online Tool",
    description: "Extract email addresses from text. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/extract-emails",
    images: [
      {
        url: "/og/extract-emails.jpg",
        width: 1200,
        height: 630,
        alt: "Extract Emails - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/extract-emails",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
