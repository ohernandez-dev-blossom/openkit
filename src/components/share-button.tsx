"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import {
  generateShareUrl,
  getCurrentUrl,
  estimateUrlSize,
  type ShareableData,
} from "@/lib/share-utils";

export interface ShareButtonProps extends Omit<ComponentProps<typeof Button>, "onClick"> {
  /**
   * Tool identifier
   */
  toolId: string;

  /**
   * Data to share
   */
  data: Record<string, unknown>;

  /**
   * Custom label for the button
   * @default "Share"
   */
  label?: string;

  /**
   * Custom label shown when copied
   * @default "Link Copied!"
   */
  copiedLabel?: string;

  /**
   * Show icon in button
   * @default true
   */
  showIcon?: boolean;

  /**
   * Duration in milliseconds to show the "copied" state
   * @default 2000
   */
  feedbackDuration?: number;

  /**
   * Callback when share succeeds
   */
  onShareSuccess?: (url: string) => void;

  /**
   * Callback when share fails
   */
  onShareError?: (error: Error) => void;

  /**
   * Show privacy notice below button
   * @default true
   */
  showPrivacyNotice?: boolean;

  /**
   * Custom base URL (defaults to current page URL)
   */
  baseUrl?: string;
}

/**
 * Share button that generates a shareable URL with base64-encoded data
 * 
 * @example
 * ```tsx
 * <ShareButton
 *   toolId="base64"
 *   data={{ input: "Hello World", mode: "encode" }}
 * />
 * ```
 */
export function ShareButton({
  toolId,
  data,
  label = "Share",
  copiedLabel = "Link Copied!",
  showIcon = true,
  feedbackDuration = 2000,
  onShareSuccess,
  onShareError,
  showPrivacyNotice = true,
  baseUrl,
  className,
  disabled,
  ...props
}: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShare = useCallback(async () => {
    if (disabled) return;

    try {
      setError(null);

      // Prepare shareable data
      const shareableData: ShareableData = {
        tool: toolId,
        data,
      };

      // Check URL size
      const { warning } = estimateUrlSize(shareableData);
      if (warning) {
        console.warn("Share URL size warning:", warning);
        // Continue anyway - users can decide if they want to use it
      }

      // Generate share URL
      const url = baseUrl || getCurrentUrl();
      const shareUrl = generateShareUrl(url, shareableData);

      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);

      // Show success feedback
      setIsCopied(true);
      onShareSuccess?.(shareUrl);

      // Reset after duration
      setTimeout(() => {
        setIsCopied(false);
      }, feedbackDuration);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to generate share link");
      console.error("Share error:", error);
      setError("Failed to copy link");
      onShareError?.(error);

      // Clear error after duration
      setTimeout(() => {
        setError(null);
      }, feedbackDuration);
    }
  }, [toolId, data, baseUrl, disabled, feedbackDuration, onShareSuccess, onShareError]);

  return (
    <div className="inline-flex flex-col gap-1">
      <Button
        onClick={handleShare}
        disabled={disabled || !data || Object.keys(data).length === 0}
        className={cn(
          "transition-all",
          isCopied && "bg-green-600 hover:bg-green-700",
          error && "bg-red-600 hover:bg-red-700",
          className
        )}
        aria-label={isCopied ? copiedLabel : error || label}
        {...props}
      >
        {showIcon && (
          <>
            {isCopied ? (
              <Check className="w-4 h-4 mr-2" aria-hidden="true" />
            ) : error ? (
              <AlertCircle className="w-4 h-4 mr-2" aria-hidden="true" />
            ) : (
              <Share2 className="w-4 h-4 mr-2" aria-hidden="true" />
            )}
          </>
        )}
        {isCopied ? copiedLabel : error || label}
      </Button>

      {/* Privacy Notice */}
      {showPrivacyNotice && !isCopied && !error && (
        <p className="text-xs text-muted-foreground/70 max-w-xs">
          📍 Data is encoded in the URL. Anyone with the link can view it.
        </p>
      )}

      {/* Success announcement for screen readers */}
      {isCopied && (
        <div role="status" aria-live="polite" className="sr-only">
          {copiedLabel}
        </div>
      )}

      {/* Error announcement for screen readers */}
      {error && (
        <div role="alert" aria-live="assertive" className="sr-only">
          {error}
        </div>
      )}
    </div>
  );
}

/**
 * Compact share button that only shows an icon
 */
export function ShareIconButton({
  toolId,
  data,
  feedbackDuration = 2000,
  onShareSuccess,
  onShareError,
  baseUrl,
  className,
  disabled,
  ...props
}: Omit<ShareButtonProps, "label" | "copiedLabel" | "showIcon" | "showPrivacyNotice">) {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShare = useCallback(async () => {
    if (disabled) return;

    try {
      setError(null);

      const shareableData: ShareableData = {
        tool: toolId,
        data,
      };

      const url = baseUrl || getCurrentUrl();
      const shareUrl = generateShareUrl(url, shareableData);

      await navigator.clipboard.writeText(shareUrl);

      setIsCopied(true);
      onShareSuccess?.(shareUrl);

      setTimeout(() => {
        setIsCopied(false);
      }, feedbackDuration);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to generate share link");
      console.error("Share error:", error);
      setError("Failed");
      onShareError?.(error);

      setTimeout(() => {
        setError(null);
      }, feedbackDuration);
    }
  }, [toolId, data, baseUrl, disabled, feedbackDuration, onShareSuccess, onShareError]);

  return (
    <>
      <Button
        onClick={handleShare}
        disabled={disabled || !data || Object.keys(data).length === 0}
        size="sm"
        variant="ghost"
        className={cn(
          "h-8 w-8 p-0 transition-all",
          isCopied && "text-green-500",
          error && "text-red-500",
          className
        )}
        aria-label={isCopied ? "Link copied!" : error || "Share link"}
        title={isCopied ? "Link copied!" : error || "Share this tool state"}
        {...props}
      >
        {isCopied ? (
          <Check className="w-4 h-4" aria-hidden="true" />
        ) : error ? (
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Share2 className="w-4 h-4" aria-hidden="true" />
        )}
      </Button>

      {isCopied && (
        <div role="status" aria-live="polite" className="sr-only">
          Link copied to clipboard
        </div>
      )}

      {error && (
        <div role="alert" aria-live="assertive" className="sr-only">
          {error}
        </div>
      )}
    </>
  );
}
