import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Picker - Visual Color Selection Tool | OpenKit",
  description: "Free online color picker with HEX, RGB, HSL, HSV, CMYK output. EyeDropper support, color history, and WCAG contrast checker. 100% client-side, private, no data sent to servers.",
  keywords: ["color picker", "hex color", "rgb color", "color converter", "contrast checker", "wcag", "eyedropper"],
  openGraph: {
    title: "Color Picker - Visual Color Selection Tool",
    description: "Free online color picker with HEX, RGB, HSL, HSV, CMYK output. EyeDropper support and WCAG contrast checker.",
    url: "https://openkit.tools/color-picker",
  },
  alternates: {
    canonical: "https://openkit.tools/color-picker",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
