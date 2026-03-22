"use client";

import { CategoryLandingPage } from "@/components/category-landing-page";
import { tools } from "@/lib/tool-registry";

const CATEGORIES = ["text"] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Text Tools",
  description:
    "Word counter, case converter, diff checker, line sorter, and more text manipulation tools.",
  url: "https://openkit.tools/tools/text",
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

export default function TextToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CategoryLandingPage
        categoryIds={["text"]}
        title="Text Tools"
        description="Word counter, case converter, diff checker, text sorter, duplicate remover, and more — essential utilities for writers, editors, developers, and content creators."
        titleGradient="from-cyan-400 via-blue-400 to-indigo-400"
      />
    </>
  );
}
