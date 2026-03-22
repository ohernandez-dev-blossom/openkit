'use client';

import { useMemo } from 'react';
import Script from 'next/script';
import { useCookieConsent, isDNTEnabled } from '@/hooks/use-cookie-consent';

/**
 * Google AdSense script component
 *
 * Features:
 * - Consent-gated: Only loads if user has consented to advertising cookies
 * - DNT support: Respects Do Not Track browser settings
 * - Privacy-first: Only loads after explicit user consent
 */
export function AdSenseScript() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const { hasConsent, loading } = useCookieConsent();

  // Calculate shouldLoad using useMemo to avoid setState in effect
  const shouldLoad = useMemo(() => {
    // Don't load if still loading consent state
    if (loading) return false;

    // Check if DNT is enabled
    if (isDNTEnabled()) return false;

    // Only load if user has consented to advertising
    return hasConsent('advertising');
  }, [loading, hasConsent]);

  // Don't render if no publisher ID configured
  if (!publisherId) {
    return null;
  }

  // Don't render script if consent not granted or DNT enabled
  if (!shouldLoad) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
