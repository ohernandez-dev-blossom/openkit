import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nginx Config Generator - Visual Nginx Configuration | OpenKit.tools',
  description: 'Generate Nginx server block configurations visually. Reverse proxy, static site, SSL/TLS, load balancing, caching, and security headers. Copy ready-to-use configs.',
  keywords: [
    'nginx config generator',
    'nginx configuration',
    'nginx reverse proxy',
    'nginx ssl config',
    'nginx server block',
    'nginx conf generator',
    'nginx load balancer',
    'nginx security headers',
    'nginx static site',
    'web server config'
  ],
  openGraph: {
    title: 'Nginx Config Generator - Visual Configuration Builder',
    description: 'Generate Nginx configurations visually. Reverse proxy, SSL, caching, security headers — ready to paste.',
    url: 'https://openkit.tools/nginx-gen',
    siteName: 'OpenKit.tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nginx Config Generator - Visual Nginx Configuration',
    description: 'Build Nginx server blocks visually. Reverse proxy, static sites, SSL, load balancing — one click to copy.',
  },
  alternates: {
    canonical: 'https://openkit.tools/nginx-gen',
  },
};

export default function NginxGenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
