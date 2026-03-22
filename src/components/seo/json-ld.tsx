/**
 * JSON-LD Structured Data Components
 * Provides schema.org markup for SEO
 */

export interface OrganizationSchemaProps {
  url?: string;
}

export function OrganizationSchema({ url = "https://openkit.tools" }: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OpenKit.tools",
    "url": url,
    "logo": `${url}/favicon.svg`,
    "description": "Essential developer tools for programmers and software engineers. Privacy-first coding utilities with client-side processing. 100+ dev tools built for developers.",
    "sameAs": [
      "https://twitter.com/openkit_tools",
      "https://github.com/ohernandez-dev-blossom/openkit"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "url": `${url}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface WebSiteSchemaProps {
  url?: string;
}

export function WebSiteSchema({ url = "https://openkit.tools" }: WebSiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OpenKit.tools - Developer Tools",
    "url": url,
    "description": "Essential developer tools and coding utilities for programmers. Privacy-first, client-side processing built for software engineers.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  url: string;
  category?: string;
  operatingSystem?: string;
  applicationCategory?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  datePublished?: string;
  dateModified?: string;
  version?: string;
  screenshot?: string;
  aggregateRating?: {
    ratingValue: string;
    ratingCount: string;
    bestRating?: string;
  };
}

export function SoftwareApplicationSchema({
  name,
  description,
  url,
  operatingSystem = "Any",
  applicationCategory = "DeveloperApplication",
  offers = {
    price: "0",
    priceCurrency: "USD"
  },
  datePublished,
  dateModified,
  version,
  screenshot,
  aggregateRating
}: SoftwareApplicationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": applicationCategory,
    "operatingSystem": operatingSystem,
    "offers": {
      "@type": "Offer",
      "price": offers.price,
      "priceCurrency": offers.priceCurrency
    },
    "provider": {
      "@type": "Organization",
      "name": "OpenKit.tools",
      "url": "https://openkit.tools"
    },
    "author": {
      "@type": "Organization",
      "name": "OpenKit.tools",
      "url": "https://openkit.tools"
    },
    "browserRequirements": "Requires JavaScript. Modern browser recommended.",
    "permissions": "No permissions required. All processing happens in browser.",
    "isAccessibleForFree": true,
    ...(datePublished && { "datePublished": datePublished }),
    ...(dateModified && { "dateModified": dateModified }),
    ...(version && { "softwareVersion": version }),
    ...(screenshot && { "screenshot": screenshot }),
    ...(aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "ratingCount": aggregateRating.ratingCount,
        "bestRating": aggregateRating.bestRating || "5"
      }
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface WebApplicationSchemaProps {
  name: string;
  description: string;
  url: string;
}

export function WebApplicationSchema({ name, description, url }: WebApplicationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": "DeveloperApplication",
    "browserRequirements": "Requires JavaScript",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
