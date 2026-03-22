import { useState, useCallback, useRef, useEffect } from "react";

export interface UseCopyToClipboardOptions {
  /**
   * Duration in milliseconds to show the "copied" state
   * @default 2000
   */
  duration?: number;

  /**
   * Callback function called when text is successfully copied
   */
  onCopy?: (text: string) => void;

  /**
   * Callback function called when copy fails
   */
  onError?: (error: Error) => void;
}

export interface UseCopyToClipboardReturn {
  /**
   * The text that was last copied (null if nothing copied yet or feedback expired)
   */
  copiedText: string | null;

  /**
   * Whether the copy operation is currently in the "copied" state
   */
  isCopied: boolean;

  /**
   * Function to copy text to clipboard
   */
  copy: (text: string) => Promise<void>;

  /**
   * Function to manually reset the copied state
   */
  reset: () => void;
}

/**
 * Hook to handle copy-to-clipboard functionality with feedback state
 * 
 * @example
 * ```tsx
 * const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
 * 
 * <button onClick={() => copy("Hello World")}>
 *   {isCopied ? "Copied!" : "Copy"}
 * </button>
 * ```
 */
export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn {
  const { duration = 2000, onCopy, onError } = options;
  
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const reset = useCallback(() => {
    setCopiedText(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        onCopy?.(text);

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set new timeout to reset state
        timeoutRef.current = setTimeout(() => {
          setCopiedText(null);
          timeoutRef.current = null;
        }, duration);
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Failed to copy");
        onError?.(err);
        console.error("Failed to copy to clipboard:", err);
      }
    },
    [duration, onCopy, onError]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    copiedText,
    isCopied: copiedText !== null,
    copy,
    reset,
  };
}
