import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Currency Converter - Live Exchange Rates | OpenKit",
  description: "Convert currencies with real-time exchange rates. Support for 170+ currencies including USD, EUR, GBP, JPY. Free online currency converter with live rates.",
  keywords: ["currency converter", "exchange rate", "forex", "currency exchange", "money converter", "fx rates", "live rates"],
  openGraph: {
    title: "Currency Converter - Live Exchange Rates",
    description: "Convert currencies with real-time exchange rates. Support for 170+ currencies including USD, EUR, GBP, JPY.",
    url: "https://openkit.tools/currency",
    images: [
      {
        url: "/og/currency.jpg",
        width: 1200,
        height: 630,
        alt: "Currency - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/currency",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
