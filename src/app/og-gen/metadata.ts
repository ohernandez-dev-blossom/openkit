import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Graph Image Generator - Create Social Cards',
  description: 'Generate Open Graph images for social media. Create beautiful share cards for Twitter, Facebook, LinkedIn. No design skills needed.',
  keywords: ['og image', 'open graph image', 'social card', 'twitter card image', 'facebook share image', 'og generator'],
  openGraph: {
    title: 'Open Graph Image Generator - OpenKit.tools',
    description: 'Generate Open Graph images for social sharing',
    type: 'website',
    url: 'https://openkit.tools/og-gen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Graph Image Generator',
    description: 'Generate Open Graph images for social sharing',
  },
  alternates: {
    canonical: 'https://openkit.tools/og-gen',
  },
};
