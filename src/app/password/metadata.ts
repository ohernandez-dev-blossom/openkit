import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Generator - Secure Random Passwords',
  description: 'Generate strong, secure passwords instantly. Customize length and character sets (uppercase, lowercase, numbers, symbols). Check password strength. Free online password generator.',
  keywords: [
    'password generator',
    'secure password',
    'random password',
    'strong password',
    'password maker',
    'generate password',
    'password strength',
    'secure random password',
    'password creator',
    'online password generator'
  ],
  openGraph: {
    title: 'Password Generator - Secure Random Passwords',
    description: 'Generate strong, secure passwords instantly. Customize length and character sets.',
    type: 'website',
    url: 'https://openkit.tools/password',
    images: [
      {
        url: '/og-images/password.jpg',
        width: 1200,
        height: 630,
        alt: 'Password Generator - Secure Random Passwords',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator - OpenKit.tools',
    description: 'Generate strong, secure passwords with customizable options',
    images: ['/og-images/password.jpg'],
  },
  alternates: {
    canonical: 'https://openkit.tools/password',
  },
};
