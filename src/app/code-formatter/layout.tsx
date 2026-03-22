import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Formatter & Beautifier - Format HTML, CSS, JS, JSON, SQL",
  description: "Free online code formatter and beautifier. Format HTML, CSS, JavaScript, JSON, and SQL with proper indentation. Clean up minified code instantly. 100% client-side for privacy.",
  keywords: ["code formatter", "code beautifier", "HTML formatter", "CSS formatter", "JavaScript formatter", "JSON formatter", "SQL formatter", "code cleaner", "format code online"],
  openGraph: {
    title: "Code Formatter & Beautifier - Format Multiple Languages",
    description: "Format HTML, CSS, JavaScript, JSON, and SQL instantly. Clean up minified code with proper indentation.",
    url: "https://openkit.tools/code-formatter",
    images: [{
      url: "/og/code-formatter.jpg",
      width: 1200,
      height: 630,
      alt: "Code Formatter & Beautifier Tool",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Formatter & Beautifier - Format HTML, CSS, JS, JSON, SQL",
    description: "Format HTML, CSS, JavaScript, JSON, and SQL instantly. Clean, beautified code with proper indentation.",
    images: ["/og/code-formatter.jpg"],
  },
  alternates: {
    canonical: "https://openkit.tools/code-formatter",
  },
};

export default function CodeFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
