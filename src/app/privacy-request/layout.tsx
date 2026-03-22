import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Data Request - GDPR Rights | OpenKit.tools',
  description: 'Request access to your data, request deletion, or exercise your GDPR rights at OpenKit.tools. Fast response within 30 days. We collect minimal data and respect your privacy.',
  keywords: [
    'privacy request',
    'data request',
    'gdpr request',
    'data deletion',
    'right to be forgotten',
    'data access request',
    'privacy rights',
    'gdpr compliance',
    'data protection',
    'user data request'
  ],
  openGraph: {
    title: 'Privacy Data Request - OpenKit.tools',
    description: 'Exercise your GDPR rights - request data access or deletion.',
    url: 'https://openkit.tools/privacy-request',
    siteName: 'OpenKit.tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Data Request - OpenKit.tools',
    description: 'Exercise your GDPR rights - request data access or deletion.',
  },
  alternates: {
    canonical: 'https://openkit.tools/privacy-request',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyRequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
