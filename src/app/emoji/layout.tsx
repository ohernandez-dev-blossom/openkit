import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emoji Picker & Search - Free Online Tool | OpenKit",
  description: "Browse and search 1800+ emojis by name, keyword, or category. Copy with one click, skin tone support, recent & frequently used tracking. 100% client-side.",
  keywords: ["emoji picker", "emoji search", "copy emojis", "online tool", "free", "skin tone", "unicode"],
  openGraph: {
    title: "Emoji Picker & Search - Free Online Tool",
    description: "Browse and search 1800+ emojis by name, keyword, or category. Copy with one click, skin tone support. 100% client-side.",
    url: "https://openkit.tools/emoji",
    images: [
      {
        url: "/og/emoji.jpg",
        width: 1200,
        height: 630,
        alt: "Emoji Picker & Search - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/emoji",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
