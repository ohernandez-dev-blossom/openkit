import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://openkit.tools";
  const disallowPaths = [
    "/api/",
    "/_next/",
    "/_vercel/",
    "/dashboard/",
    "/po-dashboard/",
    "/private/",
  ];

  const aiBots = [
    "GPTBot",
    "ChatGPT-User",
    "anthropic-ai",
    "Claude-Web",
    "PerplexityBot",
    "Google-Extended",
    "CCBot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: aiBots,
        allow: "/",
        disallow: disallowPaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
