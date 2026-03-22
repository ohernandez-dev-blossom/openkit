import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bcrypt Hash Generator - Secure Password Hashing',
  description: 'Generate secure bcrypt password hashes with customizable salt rounds (8-16). Verify passwords against existing hashes. Free online bcrypt tool for developers.',
  keywords: [
    'bcrypt generator',
    'bcrypt hash',
    'password hash',
    'bcrypt online',
    'bcrypt calculator',
    'secure password hashing',
    'bcrypt salt rounds',
    'password hash generator',
    'bcrypt verifier',
    'bcrypt compare',
    'node bcrypt',
    'password security'
  ],
  openGraph: {
    title: 'Bcrypt Hash Generator - Secure Password Hashing',
    description: 'Generate secure bcrypt password hashes with customizable salt rounds. Verify passwords against existing hashes.',
    type: 'website',
    url: 'https://openkit.tools/bcrypt',
    images: [
      {
        url: '/og/bcrypt.jpg',
        width: 1200,
        height: 630,
        alt: 'Bcrypt Hash Generator - Secure Password Hashing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bcrypt Hash Generator - OpenKit.tools',
    description: 'Generate bcrypt password hashes with customizable salt rounds.',
    images: ['/og/bcrypt.jpg'],
  },
  alternates: {
    canonical: 'https://openkit.tools/bcrypt',
  },
};
