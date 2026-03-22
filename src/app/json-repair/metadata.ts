import { Metadata } from "next";

const title = "JSON Repair Tool - Fix Broken JSON Online | OpenKit.tools";
const description = "Fix broken JSON automatically. Repair unquoted keys, single quotes, trailing commas, comments, missing brackets, and more. 100% client-side processing.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["json repair", "fix json", "broken json", "json fixer", "json validator", "invalid json", "json syntax error", "trailing comma", "unquoted keys", "json comments"],
  openGraph: {
    title,
    description,
    url: "https://openkit.tools/json-repair",
    siteName: "OpenKit.tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: "https://openkit.tools/json-repair",
  },
};
