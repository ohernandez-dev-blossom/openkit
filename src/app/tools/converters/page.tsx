"use client";

import { CategoryLandingPage } from "@/components/category-landing-page";
import { tools } from "@/lib/tool-registry";

const CATEGORIES = ["converters"] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Online Converters",
  description:
    "Unit converter, temperature converter, currency converter, file format converter, and more.",
  url: "https://openkit.tools/tools/converters",
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

export default function ConverterToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CategoryLandingPage
        categoryIds={["converters"]}
        title="Online Converters"
        description="Convert between units, temperatures, currencies, number bases, and file formats — JSON to YAML, CSV to JSON, XML, and more. Instant results, all in your browser."
        titleGradient="from-orange-400 via-amber-400 to-yellow-400"
      />
    </>
  );
}
