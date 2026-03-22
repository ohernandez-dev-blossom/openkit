import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CIDR Calculator - IP Subnet Calculator | OpenKit.tools',
  description: 'Free online CIDR calculator for network planning. Calculate subnet masks, network addresses, broadcast addresses, and host ranges from CIDR notation. IPv4 subnet calculator with binary representation.',
  keywords: [
    'cidr calculator',
    'subnet calculator',
    'ip calculator',
    'network calculator',
    'subnet mask calculator',
    'cidr notation',
    'ip subnet',
    'network planning',
    'ipv4 calculator',
    'wildcard mask',
    'network address',
    'broadcast address'
  ],
  openGraph: {
    title: 'CIDR Calculator - Free IP Subnet Calculator',
    description: 'Calculate network information from CIDR notation. Subnet masks, host ranges, and more.',
    url: 'https://openkit.tools/cidr',
    siteName: 'OpenKit.tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CIDR Calculator - IP Subnet Calculator',
    description: 'Calculate network information from CIDR notation. Free online tool.',
  },
  alternates: {
    canonical: 'https://openkit.tools/cidr',
  },
};

export default function CIDRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
