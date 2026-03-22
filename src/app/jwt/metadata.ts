import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JWT Decoder - Decode JSON Web Tokens',
  description: 'Decode and inspect JWT tokens instantly. View header and payload data, check expiration, and verify token structure. Free online JWT decoder for developers.',
  keywords: [
    'jwt decoder',
    'decode jwt',
    'json web token',
    'jwt inspector',
    'jwt parser',
    'jwt token decoder',
    'jwt debugger',
    'jwt payload viewer',
    'jwt token analyzer',
    'online jwt decoder'
  ],
  openGraph: {
    title: 'JWT Decoder - Decode JSON Web Tokens',
    description: 'Decode and inspect JWT tokens instantly. View header and payload data, check expiration.',
    type: 'website',
    url: 'https://openkit.tools/jwt',
    images: [
      {
        url: '/og-images/jwt.jpg',
        width: 1200,
        height: 630,
        alt: 'JWT Decoder - Decode JSON Web Tokens',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Decoder - OpenKit.tools',
    description: 'Decode and inspect JWT tokens instantly. View header, payload, and expiration.',
    images: ['/og-images/jwt.jpg'],
  },
  alternates: {
    canonical: 'https://openkit.tools/jwt',
  },
};
