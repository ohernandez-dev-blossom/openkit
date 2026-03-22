import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'cURL Builder - Visual cURL Command Generator | OpenKit.tools',
  description: 'Build cURL commands visually. Set method, headers, body, auth, and options with a clean UI. Generate ready-to-paste curl commands for API testing. No installation needed.',
  keywords: [
    'curl builder',
    'curl generator',
    'curl command builder',
    'api testing',
    'http request builder',
    'curl online',
    'rest api tester',
    'curl command generator',
    'http client',
    'api debugging'
  ],
  openGraph: {
    title: 'cURL Builder - Visual cURL Command Generator',
    description: 'Build cURL commands visually with headers, auth, body, and options. Copy ready-to-paste commands.',
    url: 'https://openkit.tools/curl-builder',
    siteName: 'OpenKit.tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cURL Builder - Visual cURL Command Generator',
    description: 'Build and test cURL commands with a visual interface. Headers, auth, body, cookies — all in one place.',
  },
  alternates: {
    canonical: 'https://openkit.tools/curl-builder',
  },
};

export default function CurlBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
