import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Semver Calculator - Parse, Compare & Validate Semantic Versions | OpenKit.tools',
  description: 'Parse, compare, and bump semantic version strings. Check version ranges (^, ~, >=), sort multiple versions. Semver 2.0.0 compliant. Free, client-side tool.',
  keywords: [
    'semver calculator',
    'semantic versioning',
    'version compare',
    'semver parser',
    'version bump',
    'semver range',
    'npm version',
    'cargo version',
    'semver validator',
    'version sort'
  ],
  openGraph: {
    title: 'Semver Calculator - Parse, Compare & Validate Semantic Versions',
    description: 'Parse, compare, bump, and validate semantic version strings. Check version ranges and sort multiple versions. Semver 2.0.0 compliant.',
    url: 'https://openkit.tools/semver',
    siteName: 'OpenKit.tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Semver Calculator - Semantic Version Tool',
    description: 'Parse, compare, bump semantic versions. Range validation (^, ~, >=), batch sort. 100% client-side, free.',
  },
  alternates: {
    canonical: 'https://openkit.tools/semver',
  },
};

export default function SemverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
