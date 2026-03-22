import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HMAC Generator - Create Message Authentication Codes',
  description: 'Generate HMAC (Hash-based Message Authentication Code) signatures with SHA-256, SHA-512, SHA-1, and MD5. Test API authentication and secure message signing. Free online HMAC tool.',
  keywords: [
    'hmac generator',
    'hmac sha256',
    'message authentication code',
    'hmac online',
    'hmac calculator',
    'api signature generator',
    'webhook signature',
    'hmac sha512',
    'hmac md5',
    'hmac sha1',
    'api authentication',
    'message signing'
  ],
  openGraph: {
    title: 'HMAC Generator - Create Message Authentication Codes',
    description: 'Generate HMAC signatures with SHA-256, SHA-512, SHA-1, and MD5. Test API authentication and secure message signing.',
    type: 'website',
    url: 'https://openkit.tools/hmac',
    images: [
      {
        url: '/og/hmac.jpg',
        width: 1200,
        height: 630,
        alt: 'HMAC Generator - Create Message Authentication Codes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HMAC Generator - OpenKit.tools',
    description: 'Generate HMAC signatures for API authentication and message signing.',
    images: ['/og/hmac.jpg'],
  },
  alternates: {
    canonical: 'https://openkit.tools/hmac',
  },
};
