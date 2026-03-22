"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, Settings, Shield } from 'lucide-react';
import { useCookieConsent, isDNTEnabled } from '@/hooks/use-cookie-consent';

export function CookieConsent() {
  const {
    consent,
    loading,
    hasChosenConsent,
    acceptAll,
    rejectAll,
    updateConsent,
  } = useCookieConsent();

  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const [advertisingChecked, setAdvertisingChecked] = useState(false);
  const [dntHandled, setDntHandled] = useState(false);

  // Check if banner should be shown
  useEffect(() => {
    if (loading) return;

    // Handle DNT auto-reject (only once)
    if (isDNTEnabled() && !hasChosenConsent() && !dntHandled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDntHandled(true);
      rejectAll();
      return;
    }

    // Show banner if no consent choice has been made and DNT not enabled
    if (!hasChosenConsent() && !isDNTEnabled()) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [loading, hasChosenConsent, rejectAll, dntHandled, consent]);

  // Update checkboxes when consent changes
  useEffect(() => {
    if (consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnalyticsChecked(consent.analytics);
      setAdvertisingChecked(consent.advertising);
    }
  }, [consent]);

  const handleAcceptAll = () => {
    acceptAll();
    setShowBanner(false);
    setShowCustomize(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    setShowBanner(false);
    setShowCustomize(false);
  };

  const handleCustomize = () => {
    setShowCustomize(true);
  };

  const handleSaveCustom = () => {
    updateConsent({
      analytics: analyticsChecked,
      advertising: advertisingChecked,
    });
    setShowBanner(false);
    setShowCustomize(false);
  };

  // Don't render anything if loading or if user has already chosen
  if (loading || (!showBanner && hasChosenConsent())) {
    return null;
  }

  // Don't render if DNT is enabled (auto-rejected)
  if (isDNTEnabled()) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      {showBanner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      )}

      {/* Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
          <div className="max-w-6xl mx-auto bg-card border-2 border-border rounded-2xl shadow-2xl overflow-hidden">
            {!showCustomize ? (
              // Simple banner view
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
                      We Value Your Privacy
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      OpenKit.tools uses cookies to enhance your experience. All tools process data 100% client-side
                      in your browser. We only use cookies for analytics (to understand usage) and advertising
                      (to fund this free service). You can customize your preferences.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all shadow-lg"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="flex-1 px-6 py-3 bg-card hover:bg-muted border-2 border-border text-foreground font-semibold rounded-xl transition-all"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleCustomize}
                    className="flex-1 px-6 py-3 bg-card hover:bg-muted border-2 border-border text-foreground font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Customize
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <Link href="/privacy" className="hover:text-accent-foreground underline">
                    Privacy Policy
                  </Link>
                  <Link href="/cookie-policy" className="hover:text-accent-foreground underline">
                    Cookie Policy
                  </Link>
                </div>
              </div>
            ) : (
              // Customization view
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
                        Customize Cookie Preferences
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Choose which types of cookies you want to allow
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Essential Cookies (always enabled) */}
                  <div className="flex items-start gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">Essential Cookies</h3>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Always Active</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Required for the website to function. Stores your theme preference and cookie consent choices.
                        Cannot be disabled.
                      </p>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
                    <div className="flex-shrink-0 mt-1">
                      <input
                        type="checkbox"
                        id="analytics-consent"
                        checked={analyticsChecked}
                        onChange={(e) => setAnalyticsChecked(e.target.checked)}
                        className="w-5 h-5 rounded border-border bg-background text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="analytics-consent" className="block mb-2 cursor-pointer">
                        <h3 className="font-semibold text-foreground">Analytics Cookies</h3>
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Help us understand how visitors interact with our website. We use Google Analytics
                        to collect anonymized usage statistics and improve the service.
                      </p>
                    </div>
                  </div>

                  {/* Advertising Cookies */}
                  <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
                    <div className="flex-shrink-0 mt-1">
                      <input
                        type="checkbox"
                        id="advertising-consent"
                        checked={advertisingChecked}
                        onChange={(e) => setAdvertisingChecked(e.target.checked)}
                        className="w-5 h-5 rounded border-border bg-background text-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-0 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="advertising-consent" className="block mb-2 cursor-pointer">
                        <h3 className="font-semibold text-foreground">Advertising Cookies</h3>
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Used to deliver relevant ads and fund this free service. We use Google AdSense
                        for ad personalization and performance measurement.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSaveCustom}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all shadow-lg"
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={() => setShowCustomize(false)}
                    className="px-6 py-3 bg-card hover:bg-muted border-2 border-border text-foreground font-semibold rounded-xl transition-all"
                  >
                    Back
                  </button>
                </div>

                <div className="mt-4 text-xs text-muted-foreground">
                  Learn more in our{' '}
                  <Link href="/cookie-policy" className="text-blue-400 hover:text-blue-300 underline">
                    Cookie Policy
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Cookie Settings Button Component
 * Use this in header/footer to allow users to reopen the consent banner
 */
export function CookieSettingsButton() {
  const { resetConsent } = useCookieConsent();

  const handleClick = () => {
    resetConsent();
    // Force page reload to show banner
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-foreground transition-colors"
    >
      <Settings className="w-4 h-4" />
      Cookie Settings
    </button>
  );
}
