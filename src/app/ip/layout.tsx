import { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is My IP Address? - Free IP Lookup & Geolocation | OpenKit",
  description: "Instantly find your public IP address with detailed geolocation data. View city, region, country, timezone, and ISP information. Free IP lookup tool with privacy-focused design.",
  keywords: ["what is my ip","my ip address","ip lookup","ip geolocation","public ip","ip address finder","ip location","what's my ip","find my ip","check ip address","online tool","free"],
  openGraph: {
    title: "What is My IP? - Free IP Address Lookup & Geolocation",
    description: "Instantly detect your public IP address with location details: city, region, country, timezone, and ISP. Privacy-focused IP lookup tool.",
    url: "https://openkit.tools/ip",
    images: [
      {
        url: "/og/ip.jpg",
        width: 1200,
        height: 630,
        alt: "IP Address Lookup - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/ip",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
