/**
 * Blog Post Types
 * Defines the structure for all blog content
 */

export interface BlogPost {
  /** URL slug - used in /blog/[slug] */
  slug: string;
  /** Post title - used in H1 and meta title */
  title: string;
  /** Short description - used in meta description and cards (150-160 chars ideal) */
  description: string;
  /** Main content in Markdown format */
  content: string;
  /** ISO date string (YYYY-MM-DD) */
  publishedAt: string;
  /** ISO date string, if post was updated after publishing */
  updatedAt?: string;
  /** Author name */
  author: string;
  /** Reading time in minutes (calculate: wordCount / 200) */
  readingTime: number;
  /** Category for grouping */
  category: BlogCategory;
  /** Tags for SEO and filtering */
  tags: string[];
  /** Related tool paths (e.g., ["/json", "/jwt"]) to cross-link tools */
  relatedTools?: string[];
  /** Whether the post is published (false = draft, won't appear in listings or sitemap) */
  published: boolean;
}

export type BlogCategory =
  | "guides"
  | "engineering"
  | "privacy"
  | "comparisons"
  | "announcements"
  | "workflows";

export const BLOG_CATEGORIES: Record<BlogCategory, { label: string; description: string }> = {
  guides: { label: "Guides", description: "Tutorials and how-to articles" },
  engineering: { label: "Engineering", description: "Technical deep-dives and architecture" },
  privacy: { label: "Privacy", description: "Data privacy and security topics" },
  comparisons: { label: "Comparisons", description: "Tool comparisons and benchmarks" },
  announcements: { label: "Announcements", description: "Product updates and news" },
  workflows: { label: "Workflows", description: "Developer productivity and workflows" },
};
