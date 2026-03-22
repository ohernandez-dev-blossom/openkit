/**
 * Blog Post Registry
 *
 * All blog posts are imported and exported here.
 * To add a new post: create the file in this directory, then add it to the `allPosts` array.
 * Posts with `published: false` are drafts and won't appear in listings or sitemap.
 */

import { BlogPost, BlogCategory } from "./types";
import { whyDevToolsLeakData } from "./why-dev-tools-leak-data";
import { howToDecodeDebugJwt } from "./how-to-decode-debug-jwt-tokens";
import { jsonFormattingGuide } from "./json-formatting-guide-api-development";
import { regexPatternsGuide } from "./regex-patterns-every-developer-needs";
import { base64EncodingExplained } from "./base64-encoding-explained-when-why-how";
import { hashFunctionsGuide } from "./hash-functions-md5-sha256-when-to-use";
import { developerWorkflowAutomation } from "./developer-workflow-automation-tools";

// ============================================================
// Add new post imports above this line, then add to the array:
// ============================================================

const allPosts: BlogPost[] = [
  whyDevToolsLeakData,
  howToDecodeDebugJwt,
  jsonFormattingGuide,
  regexPatternsGuide,
  base64EncodingExplained,
  hashFunctionsGuide,
  developerWorkflowAutomation,
];

// --- Helpers (used by pages, sitemap, RSS) ---

/** All published posts, sorted by date (newest first) */
export function getPublishedPosts(): BlogPost[] {
  return allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/** Get a single post by slug (published only) */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug && post.published);
}

/** Get all slugs for generateStaticParams */
export function getAllSlugs(): string[] {
  return allPosts.filter((post) => post.published).map((post) => post.slug);
}

/** Get posts by category */
export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getPublishedPosts().filter((post) => post.category === category);
}

/** Get posts by tag */
export function getPostsByTag(tag: string): BlogPost[] {
  return getPublishedPosts().filter((post) => post.tags.includes(tag));
}

// Re-export types
export type { BlogPost, BlogCategory } from "./types";
export { BLOG_CATEGORIES } from "./types";
