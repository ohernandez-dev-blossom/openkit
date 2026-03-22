"use client";

import { CategoryLandingPage } from "@/components/category-landing-page";
import { tools } from "@/lib/tool-registry";

const CATEGORIES = ["design", "css"] as const;

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Design Tools",
  description:
    "Color palettes, CSS generators, gradient tools, and more for designers and developers.",
  url: "https://openkit.tools/tools/design",
  numberOfItems: tools.filter((t) =>
    (CATEGORIES as readonly string[]).includes(t.category)
  ).length,
  itemListElement: tools
    .filter((t) => (CATEGORIES as readonly string[]).includes(t.category))
    .map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      description: tool.description,
      url: `https://openkit.tools${tool.href}`,
    })),
};

export default function DesignToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CategoryLandingPage
        categoryIds={["design", "css"]}
        title="Design Tools"
        description="Color palettes, CSS generators, gradient builders, contrast checkers, and visual design utilities — perfect for designers, UI/UX professionals, and front-end developers."
        titleGradient="from-pink-400 via-fuchsia-400 to-purple-400"
      />
    </>
  );
}
