import { MetadataRoute } from "next";
import { getPublishedPosts } from "@/content/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://openkit.tools";
  const lastModified = new Date();

  const tools = [
    // Homepage
    { path: "", priority: 1.0, changeFreq: "daily" as const },

    // Audience landing pages
    { path: "/tools/design", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tools/text", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tools/finance", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tools/converters", priority: 0.9, changeFreq: "weekly" as const },

    // Informational pages
    { path: "/faq", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/disclosure", priority: 0.6, changeFreq: "monthly" as const },

    // High-traffic core tools
    { path: "/json", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/colors", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/qr", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/hash", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/hmac", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/bcrypt", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/base64", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/regex", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/uuid", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/password", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/jwt", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/barcode", priority: 0.9, changeFreq: "monthly" as const },

    // Popular tools
    { path: "/cron", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/diff", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/json-schema", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/ip", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/lorem", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/markdown", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/html-md", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/encrypt", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/case", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/fees", priority: 0.8, changeFreq: "weekly" as const },

    // Standard tools
    { path: "/sort", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/extract-emails", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/replace", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/random", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/unit", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/percentage", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/tip", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/discount", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/vat", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/loan", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/currency", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/slug", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/epoch", priority: 0.7, changeFreq: "monthly" as const },

    // CSS/Design tools
    { path: "/gradient", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/gradient-gen", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/shadow", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/border", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/palette", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/contrast", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/css-animate", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/css-format", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/clip-path", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/filter-gen", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/font-pairs", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/color-picker", priority: 0.7, changeFreq: "monthly" as const },

    // Code formatters/converters
    { path: "/json-path", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/json-to-ts", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/json-repair", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/csv-json", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/toml-json", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/xml-format", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/sql-format", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/html-format", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/html-entities", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/js-format", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/code-formatter", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/yaml", priority: 0.7, changeFreq: "monthly" as const },

    // Image/Media tools
    { path: "/svg-optimize", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/favicon-gen", priority: 0.7, changeFreq: "monthly" as const },

    // Text tools
    { path: "/text-stats", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/emoji", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/token-counter", priority: 0.7, changeFreq: "monthly" as const },

    // Generators
    { path: "/gitignore", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/og-gen", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/meta-gen", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/mime", priority: 0.6, changeFreq: "monthly" as const },

    // DevOps tools
    { path: "/nginx-gen", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/ssh-keygen", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/docker", priority: 0.6, changeFreq: "monthly" as const },

    // Security tools
    { path: "/totp", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/cert-decoder", priority: 0.7, changeFreq: "monthly" as const },

    // Network tools
    { path: "/dns-lookup", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/curl-builder", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/cidr", priority: 0.7, changeFreq: "monthly" as const },

    // Utilities
    { path: "/chmod-calc", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/keycode", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/http-codes", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/url-parse", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/aspect-calc", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/pomodoro", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/mock-api", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/semver", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/math-eval", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/email-validator", priority: 0.7, changeFreq: "monthly" as const },

    // API tools
    { path: "/openapi-validator", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/webhook-tester", priority: 0.9, changeFreq: "monthly" as const },


    // Trading & finance tools
    { path: "/position-size", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/risk-reward", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/fibonacci-trading", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/pivot-points", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/drawdown-calc", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/kelly-criterion", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/compound-growth", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/pip-value", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/margin-calc", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/dca-calc", priority: 0.8, changeFreq: "monthly" as const },
  ];

  // Blog post URLs
  const blogPosts = getPublishedPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...tools.map((tool) => ({
      url: `${baseUrl}${tool.path}`,
      lastModified,
      changeFrequency: tool.changeFreq,
      priority: tool.priority,
    })),
    ...blogPosts,
  ];
}
