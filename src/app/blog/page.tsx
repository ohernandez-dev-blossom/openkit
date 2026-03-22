"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { getPublishedPosts, BLOG_CATEGORIES } from "@/content/blog";
import type { BlogCategory } from "@/content/blog";
import { useState } from "react";
import { BreadcrumbStructuredData } from "@/components/structured-data";

export default function BlogIndex() {
  const posts = getPublishedPosts();
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">(
    "all"
  );

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const categories = Object.entries(BLOG_CATEGORIES) as [
    BlogCategory,
    { label: string; description: string },
  ][];

  return (
    <>
      <BreadcrumbStructuredData
        items={[{ name: "Blog", url: "https://openkit.tools/blog" }]}
      />

      <main className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <div className="border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                OpenKit Blog
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Guides, Insights & Engineering
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Developer-focused articles on privacy, tooling, workflows, and the
              engineering behind OpenKit.tools.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              All Posts
            </button>
            {categories.map(([key, { label }]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === key
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Post list */}
          {filteredPosts.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              No posts in this category yet.
            </p>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block p-6 rounded-xl border border-border hover:border-blue-500/30 bg-card backdrop-blur-sm hover:bg-card/80 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 text-xs font-medium">
                      {BLOG_CATEGORIES[post.category].label}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime} min read
                    </span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2 py-0.5 rounded text-xs text-muted-foreground bg-muted/50 border border-border"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
