import { Metadata } from "next";

const title = "Webhook Tester & Inspector - Debug Webhooks Online | OpenKit.tools";
const description = "Test and debug webhooks with a mock endpoint inspector. Generate sample payloads for GitHub, Stripe, Slack, and more. Parse and validate webhook signatures. Client-side only.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["webhook tester", "webhook debugger", "webhook inspector", "webhook mock", "test webhook", "webhook payload", "webhook signature", "github webhook", "stripe webhook", "slack webhook"],
  openGraph: {
    title,
    description,
    url: "https://openkit.tools/webhook-tester",
    siteName: "OpenKit.tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: "https://openkit.tools/webhook-tester",
  },
};
