/**
 * Analytics tracking hook
 * 
 * Provides a simple interface to track custom events in GA4
 * Respects user consent and DNT settings
 * 
 * Usage:
 * ```tsx
 * const analytics = useAnalytics();
 * analytics.trackToolUsage('json-formatter', { action: 'format' });
 * analytics.trackError('validation-error', { tool: 'json' });
 * ```
 */

import { useCallback } from 'react';
import { useCookieConsent, isDNTEnabled } from './use-cookie-consent';

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

export type EventCategory = 
  | 'tool_usage'
  | 'tool_interaction'
  | 'tool_error'
  | 'tool_share'
  | 'tool_pin'
  | 'tool_export'
  | 'workflow'
  | 'search'
  | 'engagement';

export interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

export function useAnalytics() {
  const { hasConsent } = useCookieConsent();

  const trackEvent = useCallback((
    category: EventCategory,
    action: string,
    params?: EventParams
  ) => {
    // Don't track if no consent or DNT enabled
    if (!hasConsent('analytics') || isDNTEnabled()) {
      return;
    }

    // Don't track if gtag is not loaded
    if (typeof window === 'undefined' || !window.gtag) {
      return;
    }

    // Send event to GA4
    window.gtag('event', action, {
      event_category: category,
      ...params,
    });
  }, [hasConsent]);

  const trackToolUsage = useCallback((
    toolName: string,
    params?: EventParams
  ) => {
    trackEvent('tool_usage', 'tool_used', {
      tool_name: toolName,
      ...params,
    });
  }, [trackEvent]);

  const trackToolInteraction = useCallback((
    toolName: string,
    action: string,
    params?: EventParams
  ) => {
    trackEvent('tool_interaction', action, {
      tool_name: toolName,
      ...params,
    });
  }, [trackEvent]);

  const trackError = useCallback((
    errorType: string,
    params?: EventParams
  ) => {
    trackEvent('tool_error', 'error', {
      error_type: errorType,
      ...params,
    });
  }, [trackEvent]);

  const trackShare = useCallback((
    toolName: string,
    method: string,
    params?: EventParams
  ) => {
    trackEvent('tool_share', 'share', {
      tool_name: toolName,
      share_method: method,
      ...params,
    });
  }, [trackEvent]);

  const trackPin = useCallback((
    toolName: string,
    pinned: boolean,
    params?: EventParams
  ) => {
    trackEvent('tool_pin', pinned ? 'pin' : 'unpin', {
      tool_name: toolName,
      ...params,
    });
  }, [trackEvent]);

  const trackExport = useCallback((
    toolName: string,
    format: string,
    params?: EventParams
  ) => {
    trackEvent('tool_export', 'export', {
      tool_name: toolName,
      export_format: format,
      ...params,
    });
  }, [trackEvent]);

  const trackWorkflow = useCallback((
    workflowName: string,
    action: string,
    params?: EventParams
  ) => {
    trackEvent('workflow', action, {
      workflow_name: workflowName,
      ...params,
    });
  }, [trackEvent]);

  const trackSearch = useCallback((
    query: string,
    resultsCount: number,
    params?: EventParams
  ) => {
    trackEvent('search', 'search', {
      search_query: query,
      results_count: resultsCount,
      ...params,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackToolUsage,
    trackToolInteraction,
    trackError,
    trackShare,
    trackPin,
    trackExport,
    trackWorkflow,
    trackSearch,
  };
}
