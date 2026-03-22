/**
 * Structured Data (JSON-LD) component for SEO
 * Adds schema.org markup for better search engine understanding
 */

import Script from 'next/script';

interface StructuredDataProps {
  type: 'WebApplication' | 'SoftwareApplication';
  name: string;
  description: string;
  url: string;
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

export function StructuredData({
  type,
  name,
  description,
  url,
  applicationCategory = 'DeveloperApplication',
  offers = { price: '0', priceCurrency: 'USD' },
  datePublished,
  dateModified,
  version,
  screenshot,
  aggregateRating
}: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    applicationCategory,
    offers: {
      '@type': 'Offer',
      ...offers,
    },
    author: {
      '@type': 'Organization',
      name: 'OpenKit.tools',
      url: 'https://openkit.tools'
    },
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    permissions: 'browser',
    isAccessibleForFree: true,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(version && { softwareVersion: version }),
    ...(screenshot && { screenshot }),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        ratingCount: aggregateRating.ratingCount,
        bestRating: aggregateRating.bestRating || '5'
      }
    })
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="worker"
    />
  );
}

/**
 * Breadcrumb structured data for navigation
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="worker"
    />
  );
}
