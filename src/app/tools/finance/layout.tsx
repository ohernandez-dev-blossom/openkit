import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Finance Calculators — Tip, VAT, Loan, Discount & More",
  description:
    "Free online finance calculators for everyday money tasks. Tip calculator, VAT calculator, loan payment estimator, discount calculator, currency converter, and more. Private, instant, no signup required.",
  keywords: [
    "finance calculators",
    "tip calculator",
    "vat calculator",
    "loan calculator",
    "discount calculator",
    "currency converter",
    "percentage calculator",
    "fee calculator",
    "money tools",
    "financial tools",
    "free calculator online",
    "payment calculator",
    "sales tax calculator",
    "compound interest",
  ],
  openGraph: {
    title: "Free Finance Calculators — Tip, VAT, Loan, Discount & More | OpenKit.tools",
    description:
      "Free finance calculators for everyday money tasks. Tip, VAT, loan, discount, currency — all instant, private, and browser-based.",
    url: "https://openkit.tools/tools/finance",
    type: "website",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "OpenKit.tools — Free Finance Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Finance Calculators — Tip, VAT, Loan & More | OpenKit.tools",
    description:
      "Tip calculator, VAT calculator, loan estimator, discount calculator — all free, instant, and private.",
    images: ["/og/home.jpg"],
  },
  alternates: {
    canonical: "https://openkit.tools/tools/finance",
  },
};

export default function FinanceToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
