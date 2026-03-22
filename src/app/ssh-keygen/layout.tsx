import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SSH Key Generator - Generate RSA & Ed25519 Keys Online | OpenKit.tools',
  description: 'Generate SSH key pairs (RSA 2048/4096, Ed25519) directly in your browser. Private keys never leave your device. Export in OpenSSH or PEM format. Free, secure, no installation.',
  keywords: [
    'ssh key generator',
    'generate ssh key',
    'rsa key generator',
    'ed25519 key generator',
    'ssh keygen online',
    'ssh key pair',
    'public key generator',
    'private key generator',
    'openssh key',
    'ssh key tool'
  ],
  openGraph: {
    title: 'SSH Key Generator - Generate RSA & Ed25519 Keys Online',
    description: 'Generate SSH key pairs securely in your browser. RSA 2048/4096 and Ed25519 support. Keys never leave your device.',
    url: 'https://openkit.tools/ssh-keygen',
    siteName: 'OpenKit.tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SSH Key Generator - Generate RSA & Ed25519 Keys Online',
    description: 'Generate SSH key pairs in your browser. RSA & Ed25519 support. 100% client-side, keys never leave your device.',
  },
  alternates: {
    canonical: 'https://openkit.tools/ssh-keygen',
  },
};

export default function SSHKeygenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
