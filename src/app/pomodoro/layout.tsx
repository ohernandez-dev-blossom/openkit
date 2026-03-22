import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pomodoro - Free Online Tool | OpenKit",
  description: "Time tracking for productivity. Fast, private, no data sent to servers. 100% client-side processing.",
  keywords: ["pomodoro timer","online tool","free","pomodoro"],
  openGraph: {
    title: "Pomodoro - Free Online Tool",
    description: "Time tracking for productivity. Fast, private, no data sent to servers. 100% client-side processing.",
    url: "https://openkit.tools/pomodoro",
    images: [
      {
        url: "/og/pomodoro.jpg",
        width: 1200,
        height: 630,
        alt: "Pomodoro - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/pomodoro",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
