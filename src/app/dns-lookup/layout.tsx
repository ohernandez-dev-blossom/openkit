import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DNS Lookup - Online DNS Query Tool | OpenKit.tools',
  description: 'Free online DNS lookup tool. Query A, AAAA, CNAME, MX, TXT, NS, SOA, PTR records using Google DNS-over-HTTPS. Batch lookup, TTL display, response times. Privacy-first, runs in your browser.',
  keywords: [
    'dns lookup',
    'dns query',
    'dns checker',
    'mx lookup',
    'txt record',
    'ns lookup',
    'dns propagation',
    'a record lookup',
    'cname lookup',
    'soa record',
    'ptr lookup',
    'dns over https'
  ],
  openGraph: {
    title: 'DNS Lookup - Free Online DNS Query Tool',
    description: 'Query DNS records (A, AAAA, CNAME, MX, TXT, NS, SOA, PTR) using Google DNS-over-HTTPS. Batch lookup supported.',
    url: 'https://openkit.tools/dns-lookup',
    siteName: 'OpenKit.tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DNS Lookup - Online DNS Query Tool',
    description: 'Query any DNS record type via Google DNS-over-HTTPS. A, AAAA, MX, TXT, NS, CNAME, SOA, PTR.',
  },
  alternates: {
    canonical: 'https://openkit.tools/dns-lookup',
  },
};

export default function DNSLookupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
