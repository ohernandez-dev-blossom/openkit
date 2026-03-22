/**
 * Google Analytics 4 Integration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create GA4 property at https://analytics.google.com
 * 2. Get Measurement ID (format: G-XXXXXXXXXX)
 * 3. Set NEXT_PUBLIC_GA_ID in .env.local
 * 4. Uncomment the import in src/app/layout.tsx
 * 
 * Privacy-focused: Only tracks page views and basic events
 */

'use client';

import Script from 'next/script';

export function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  // Don't load in development
  if (!GA_ID || process.env.NODE_ENV === 'development') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  );
}

// Define gtag types for Google Analytics
declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

type GtagFunction = (
  command: 'event' | 'config' | 'js',
  targetId: string | Date,
  params?: Record<string, unknown>
) => void;

/**
 * Track custom events
 * Usage: trackEvent('tool_used', { tool: 'json-formatter' })
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as { gtag: GtagFunction }).gtag;
    gtag('event', eventName, params);
  }
}

/**
 * Track tool usage
 * Call this when user performs an action on a tool
 */
export function trackToolUsage(toolName: string, params: { action: string; [key: string]: unknown }) {
  trackEvent('tool_usage', {
    tool_name: toolName,
    ...params,
  });
}
