import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript KeyCode - Keyboard Event Helper | OpenKit",
  description: "Interactive JavaScript keycode reference. Press any key to see key codes, key names, charCode, which, and event properties. Free online tool.",
  keywords: ["keycode", "javascript keycode", "keyboard events", "key codes", "charCode", "which", "online tool"],
  openGraph: {
    title: "JavaScript KeyCode - Keyboard Event Helper",
    description: "Interactive keycode reference. Press any key to see event properties, key codes, and keyboard information. Developer tool.",
    url: "https://openkit.tools/keycode",
    images: [
      {
        url: "/og/keycode.jpg",
        width: 1200,
        height: 630,
        alt: "JavaScript KeyCode - OpenKit.tools",
      },
    ],
  },
  alternates: {
    canonical: "https://openkit.tools/keycode",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
