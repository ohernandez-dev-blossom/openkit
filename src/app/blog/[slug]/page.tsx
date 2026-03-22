import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/content/blog";
import { BlogPostView } from "@/components/blog-post-view";

// Statically generate all published posts at build time
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Only allow statically-generated slugs — return 404 for anything else
export const dynamicParams = false;

// Generate metadata per post (server-side, for SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://openkit.tools/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://openkit.tools/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostView post={post} />;
}
