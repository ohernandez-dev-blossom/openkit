"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  Wrench,
  User,
} from "lucide-react";
import { MarkdownContent } from "@/components/markdown-content";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { RelatedTools } from "@/components/related-tools";
import { BLOG_CATEGORIES } from "@/content/blog";
import type { BlogPost } from "@/content/blog";

function BlogArticleSchema({ post }: { post: BlogPost }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://openkit.tools",
    },
    publisher: {
      "@type": "Organization",
      name: "OpenKit.tools",
      url: "https://openkit.tools",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://openkit.tools/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <>
      <BlogArticleSchema post={post} />
      <BreadcrumbStructuredData
        items={[
          { name: "Blog", url: "https://openkit.tools/blog" },
          {
            name: post.title,
            url: `https://openkit.tools/blog/${post.slug}`,
          },
        ]}
      />

      <main className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <div className="border-b border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground">
              <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 text-xs font-medium">
                {BLOG_CATEGORIES[post.category].label}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} min read
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Article body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <MarkdownContent content={post.content} />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm text-muted-foreground bg-muted/50 border border-border"
                >
                  <Tag className="w-3.5 h-3.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related tools cross-link */}
          {post.relatedTools && post.relatedTools.length > 0 && (
            <div className="mt-10 p-6 rounded-xl bg-gradient-to-br from-card to-muted/30 border border-border backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-400" />
                Try These Tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {post.relatedTools.map((toolPath) => (
                  <Link
                    key={toolPath}
                    href={toolPath}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 border border-blue-500/20 hover:from-blue-500/20 hover:to-purple-500/20 transition-all"
                  >
                    {toolPath.replace("/", "").replace(/-/g, " ")}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related tools section from algorithm */}
        {post.relatedTools && post.relatedTools[0] && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
            <RelatedTools currentPath={post.relatedTools[0]} />
          </div>
        )}
      </main>
    </>
  );
}
