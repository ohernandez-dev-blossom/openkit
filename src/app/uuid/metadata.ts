import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UUID Generator - Free UUID v4 Generator',
  description: 'Generate UUID v4 identifiers instantly. Create multiple random UUIDs with different formats (standard, uppercase, no dashes). Free online UUID generator for developers.',
  keywords: [
    'uuid generator',
    'uuid v4',
    'generate uuid',
    'random uuid',
    'uuid online',
    'uuid maker',
    'unique identifier',
    'guid generator',
    'uuid format',
    'uuid javascript'
  ],
  openGraph: {
    title: 'UUID Generator - Free UUID v4 Generator',
    description: 'Generate UUID v4 identifiers instantly. Create multiple random UUIDs with different formats.',
    type: 'website',
    url: 'https://openkit.tools/uuid',
    images: [
      {
        url: '/og-images/uuid.jpg',
        width: 1200,
        height: 630,
        alt: 'UUID Generator - Free UUID v4 Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UUID Generator - OpenKit.tools',
    description: 'Generate UUID v4 identifiers instantly with multiple format options',
    images: ['/og-images/uuid.jpg'],
  },
  alternates: {
    canonical: 'https://openkit.tools/uuid',
  },
};
