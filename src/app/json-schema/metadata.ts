import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Schema Generator - Generate Schema from JSON',
  description: 'Generate JSON Schema from any JSON object instantly. Supports Draft-04, Draft-07, and 2020-12 with automatic format detection for dates, emails, URIs, and UUIDs.',
  keywords: ['json schema generator', 'json schema', 'json to schema', 'json schema draft-07', 'json schema 2020-12', 'api validation', 'json schema online'],
  openGraph: {
    title: 'JSON Schema Generator - OpenKit.tools',
    description: 'Generate JSON Schema from JSON objects with format detection and multiple draft support',
    type: 'website',
    url: 'https://openkit.tools/json-schema',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Schema Generator',
    description: 'Generate JSON Schema from JSON objects with format detection',
  },
  alternates: {
    canonical: 'https://openkit.tools/json-schema',
  },
};
