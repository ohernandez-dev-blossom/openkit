import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Your Data Rights | OpenKit.tools',
  description: 'OpenKit.tools privacy policy. Learn how we protect your data with client-side processing, no accounts, and minimal data collection. GDPR compliant with full transparency.',
  keywords: [
    'privacy policy',
    'data protection',
    'gdpr compliance',
    'privacy rights',
    'data privacy',
    'user privacy',
    'client-side processing',
    'no tracking',
    'data security',
    'privacy first'
  ],
  openGraph: {
    title: 'Privacy Policy - OpenKit.tools',
    description: 'Client-side processing, no accounts, minimal data collection. Your privacy is our priority.',
    url: 'https://openkit.tools/privacy',
    siteName: 'OpenKit.tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - OpenKit.tools',
    description: 'Client-side processing, no accounts, minimal data collection. Privacy-first developer tools.',
  },
  alternates: {
    canonical: 'https://openkit.tools/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
