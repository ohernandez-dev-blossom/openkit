"use client";

import { CategoryLandingPage } from "@/components/category-landing-page";
import { tools } from "@/lib/tool-registry";

const CATEGORIES = ["finance"] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Finance Calculators",
  description:
    "Tip calculator, VAT calculator, loan estimator, discount calculator, and more financial tools.",
  url: "https://openkit.tools/tools/finance",
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

export default function FinanceToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CategoryLandingPage
        categoryIds={["finance"]}
        title="Finance Calculators"
        description="Tip calculator, VAT calculator, loan payment estimator, discount finder, currency converter, and fee calculator — free tools for everyday money decisions."
        titleGradient="from-emerald-400 via-green-400 to-teal-400"
      />
    </>
  );
}
