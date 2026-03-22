import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fees - Free Online Tool | OpenKit",
  description: "Calculate PayPal, Stripe, and Wise payment processing fees instantly. Know exactly what you'll pay or receive.",
  keywords: ["paypal fee calculator","stripe fee calculator","payment fees","wise fees"],
  openGraph: {
    title: "Fees - Free Online Tool",
    description: "Calculate PayPal, Stripe, and Wise payment processing fees instantly. Know exactly what you'll pay or receive.",
    url: "https://openkit.tools/fees",
    images: [
      {
        url: "/og/fees.jpg",
        width: 1200,
        height: 630,
        alt: "Fees - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/fees",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
