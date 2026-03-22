import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  // Note: Using Webpack instead of Turbopack via --webpack flag in package.json
  // Reason: Turbopack has module factory bugs with large content files in production
  // https://github.com/vercel/next.js/issues/86132
  // https://github.com/vercel/next.js/issues/68077
  // Consolidate duplicate tools with permanent redirects
  async redirects() {
    return [
      { source: '/base64-img', destination: '/img-base64', permanent: true },
      { source: '/sql-formatter', destination: '/sql-format', permanent: true },
      { source: '/json-to-csv', destination: '/json-csv', permanent: true },
      { source: '/json-to-yaml', destination: '/json-yaml', permanent: true },
      { source: '/json-to-xml', destination: '/json-xml', permanent: true },
      { source: '/xml-json', destination: '/json-xml', permanent: true },
      { source: '/robots-txt', destination: '/robots-gen', permanent: true },
      { source: '/og-preview', destination: '/og-gen', permanent: true },
      { source: '/og-debug', destination: '/og-gen', permanent: true },
      { source: '/open-graph', destination: '/og-gen', permanent: true },
      { source: '/meta-tag-gen', destination: '/meta-gen', permanent: true },
      { source: '/cron-explain', destination: '/cron', permanent: true },
    ];
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
