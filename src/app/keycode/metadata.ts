import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript KeyCode Tool | Keyboard Event Lookup",
  description: "Debug keyboard events in real-time. Get key codes, key names, and event properties for JavaScript development. Perfect for handling keyboard shortcuts and input.",
  keywords: [
    "javascript keycode",
    "keyboard events",
    "key code lookup",
    "event.key",
    "event.code",
    "javascript keyboard",
    "keypress event",
    "keydown event",
    "keyup event",
    "which key code",
    "charcode",
    "modifier keys",
  ],
  alternates: {
    canonical: "https://openkit.tools/keycode",
  },
  openGraph: {
    title: "JavaScript KeyCode Tool | Keyboard Event Lookup",
    description: "Debug keyboard events in real-time. Get key codes, key names, and event properties for JavaScript.",
    url: "https://openkit.tools/keycode",
    siteName: "OpenKit",
    type: "website",
    images: [
      {
        url: "https://openkit.tools/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "JavaScript KeyCode Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript KeyCode Tool",
    description: "Debug keyboard events in real-time. Get key codes and event properties.",
    images: ["https://openkit.tools/opengraph-image.png"],
  },
};
