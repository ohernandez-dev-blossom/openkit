'use client';

import { useMemo } from 'react';
import Script from 'next/script';
import { useCookieConsent, isDNTEnabled } from '@/hooks/use-cookie-consent';

/**
 * Google Analytics 4 (GA4) tracking component
 *
 * Features:
 * - Consent-gated: Only loads if user has consented to analytics cookies
 * - DNT support: Respects Do Not Track browser settings
 * - Privacy-first: Anonymized IP addresses
 *
 * Tracks:
 * - Pageviews
 * - Events
 * - User engagement
 * - Conversions
 */
export function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
  const { hasConsent, loading } = useCookieConsent();

  // Calculate shouldLoad using useMemo to avoid setState in effect
  const shouldLoad = useMemo(() => {
    // Don't load if still loading consent state
    if (loading) return false;

    // Check if DNT is enabled
    if (isDNTEnabled()) return false;

    // Only load if user has consented to analytics
    return hasConsent('analytics');
  }, [loading, hasConsent]);

  // Don't render scripts if no measurement ID, consent not granted, or DNT enabled
  if (!GA_MEASUREMENT_ID || !shouldLoad) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Configure GA4 with privacy settings
          gtag('config', '${GA_MEASUREMENT_ID}', {
            'anonymize_ip': true,
            'cookie_flags': 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}
