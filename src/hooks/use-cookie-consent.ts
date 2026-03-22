"use client";

import { useState, useEffect, useCallback } from 'react';

export interface CookieConsent {
  analytics: boolean;
  advertising: boolean;
  timestamp: number;
  version: string;
}

const CONSENT_KEY = 'openkit-cookie-consent';
const CONSENT_VERSION = '1.0';

const DEFAULT_CONSENT: CookieConsent = {
  analytics: false,
  advertising: false,
  timestamp: 0,
  version: CONSENT_VERSION,
};

/**
 * Hook to manage cookie consent preferences
 * Handles localStorage persistence, consent state, and provides update functions
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [loading, setLoading] = useState(true);

  // Load consent from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CookieConsent;

        // Check if consent is still valid (within 1 year)
        const oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
        if (parsed.timestamp < oneYearAgo) {
          // Consent expired, clear it
          localStorage.removeItem(CONSENT_KEY);
          setConsent(null);
        } else {
          setConsent(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load cookie consent:', error);
      setConsent(null);
    }

    setLoading(false);
  }, []);

  /**
   * Update consent preferences
   * @param preferences Partial consent object to update
   */
  const updateConsent = useCallback((preferences: Partial<Omit<CookieConsent, 'timestamp' | 'version'>>) => {
    if (typeof window === 'undefined') return;

    const newConsent: CookieConsent = {
      ...DEFAULT_CONSENT,
      ...preferences,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };

    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
      setConsent(newConsent);

      // Trigger storage event for other tabs
      window.dispatchEvent(new StorageEvent('storage', {
        key: CONSENT_KEY,
        newValue: JSON.stringify(newConsent),
      }));
    } catch (error) {
      console.error('Failed to save cookie consent:', error);
    }
  }, []);

  /**
   * Reset all consent preferences (remove from storage)
   * Useful for testing or when user wants to see the banner again
   */
  const resetConsent = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(CONSENT_KEY);
      setConsent(null);

      // Trigger storage event for other tabs
      window.dispatchEvent(new StorageEvent('storage', {
        key: CONSENT_KEY,
        newValue: null,
      }));
    } catch (error) {
      console.error('Failed to reset cookie consent:', error);
    }
  }, []);

  /**
   * Check if user has consented to a specific cookie type
   * @param type Cookie type to check ('analytics' or 'advertising')
   * @returns true if consented, false otherwise
   */
  const hasConsent = useCallback((type: keyof Omit<CookieConsent, 'timestamp' | 'version'>): boolean => {
    if (!consent) return false;
    return consent[type] === true;
  }, [consent]);

  /**
   * Check if user has made any consent choice
   * @returns true if consent exists, false if banner should be shown
   */
  const hasChosenConsent = useCallback((): boolean => {
    return consent !== null;
  }, [consent]);

  /**
   * Accept all cookies (analytics + advertising)
   */
  const acceptAll = useCallback(() => {
    updateConsent({
      analytics: true,
      advertising: true,
    });
  }, [updateConsent]);

  /**
   * Reject all non-essential cookies
   */
  const rejectAll = useCallback(() => {
    updateConsent({
      analytics: false,
      advertising: false,
    });
  }, [updateConsent]);

  return {
    consent,
    loading,
    hasConsent,
    hasChosenConsent,
    updateConsent,
    resetConsent,
    acceptAll,
    rejectAll,
  };
}

/**
 * Check if Do Not Track is enabled
 * @returns true if DNT is enabled
 */
export function isDNTEnabled(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  // Check various DNT signals
  const dnt = (navigator as unknown as { doNotTrack?: string }).doNotTrack
    || (window as unknown as { doNotTrack?: string }).doNotTrack
    || (navigator as unknown as { msDoNotTrack?: string }).msDoNotTrack;

  return dnt === '1' || dnt === 'yes';
}
