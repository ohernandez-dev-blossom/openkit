import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Usage Guidelines | OpenKit.tools',
  description: 'OpenKit.tools terms of service. Free to use, no registration required. Learn about acceptable use, disclaimers, and your rights when using our developer tools.',
  keywords: [
    'terms of service',
    'terms and conditions',
    'usage terms',
    'legal terms',
    'service agreement',
    'user agreement',
    'acceptable use',
    'terms of use',
    'service terms',
    'legal agreement'
  ],
  openGraph: {
    title: 'Terms of Service - OpenKit.tools',
    description: 'Free to use, no registration required. Simple terms for using our developer tools.',
    url: 'https://openkit.tools/terms',
    siteName: 'OpenKit.tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service - OpenKit.tools',
    description: 'Simple, transparent terms for using our free developer tools.',
  },
  alternates: {
    canonical: 'https://openkit.tools/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
