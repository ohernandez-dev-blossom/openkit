import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SSL/TLS Certificate Decoder - Parse & Analyze X.509 Certificates',
  description: 'Decode and analyze PEM-encoded SSL/TLS certificates. View subject, issuer, validity dates, fingerprints (SHA-256, SHA-1), serial number, and signature algorithms. Free online certificate decoder for developers.',
  keywords: [
    'certificate decoder',
    'ssl certificate viewer',
    'tls certificate decoder',
    'x509 decoder',
    'pem decoder',
    'certificate parser',
    'ssl checker',
    'certificate fingerprint',
    'ssl certificate details',
    'certificate expiry checker',
    'openssl alternative',
    'certificate analyzer'
  ],
  openGraph: {
    title: 'SSL/TLS Certificate Decoder - Parse & Analyze X.509 Certificates',
    description: 'Decode PEM-encoded SSL/TLS certificates. View subject, issuer, validity, fingerprints, and more.',
    type: 'website',
    url: 'https://openkit.tools/cert-decoder',
    images: [
      {
        url: '/og/cert-decoder.jpg',
        width: 1200,
        height: 630,
        alt: 'SSL/TLS Certificate Decoder Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SSL/TLS Certificate Decoder - OpenKit.tools',
    description: 'Parse and analyze X.509 certificates. View subject, issuer, validity, and fingerprints.',
    images: ['/og/cert-decoder.jpg'],
  },
  alternates: {
    canonical: 'https://openkit.tools/cert-decoder',
  },
};
