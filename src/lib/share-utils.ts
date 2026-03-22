/**
 * Share utilities for generating and parsing shareable URLs
 */

export interface ShareableData {
  /**
   * The tool identifier (e.g., "base64", "json")
   */
  tool: string;

  /**
   * The data to share (will be base64-encoded in URL)
   */
  data: Record<string, unknown>;

  /**
   * Optional version for future compatibility
   */
  version?: string;
}

/**
 * Generate a shareable URL with base64-encoded data
 * 
 * @param baseUrl - The base URL of the tool (e.g., "https://openkit.tools/base64")
 * @param data - The data to encode in the URL
 * @returns Shareable URL with encoded data
 * 
 * @example
 * ```ts
 * const url = generateShareUrl("https://openkit.tools/base64", {
 *   tool: "base64",
 *   data: { input: "Hello World", mode: "encode" }
 * });
 * // Returns: https://openkit.tools/base64?share=eyJ0b29sIjoiYmFzZTY0IiwiZGF0YSI6eyJpbnB1dCI6IkhlbGxvIFdvcmxkIiwibW9kZSI6ImVuY29kZSJ9fQ==
 * ```
 */
export function generateShareUrl(baseUrl: string, data: ShareableData): string {
  try {
    // Add version if not present
    const dataWithVersion: ShareableData = {
      ...data,
      version: data.version || "1.0",
    };

    // Convert to JSON and encode to base64
    const json = JSON.stringify(dataWithVersion);
    const base64 = btoa(unescape(encodeURIComponent(json)));

    // Create URL with share parameter
    const url = new URL(baseUrl);
    url.searchParams.set("share", base64);

    return url.toString();
  } catch (error) {
    console.error("Failed to generate share URL:", error);
    throw new Error("Failed to generate shareable link");
  }
}

/**
 * Parse shared data from a URL parameter
 * 
 * @param shareParam - The base64-encoded share parameter from URL
 * @returns Decoded shareable data or null if invalid
 * 
 * @example
 * ```ts
 * const data = parseSharedData("eyJ0b29sIjoiYmFzZTY0IiwiZGF0YSI6eyJpbnB1dCI6IkhlbGxvIFdvcmxkIn19");
 * // Returns: { tool: "base64", data: { input: "Hello World" }, version: "1.0" }
 * ```
 */
export function parseSharedData(shareParam: string): ShareableData | null {
  try {
    // Decode from base64
    const json = decodeURIComponent(escape(atob(shareParam)));
    const data = JSON.parse(json) as ShareableData;

    // Validate structure
    if (!data.tool || !data.data || typeof data.data !== "object") {
      console.warn("Invalid shared data structure");
      return null;
    }

    return data;
  } catch (error) {
    console.error("Failed to parse shared data:", error);
    return null;
  }
}

/**
 * Get the current page URL (client-side only)
 * 
 * @returns Current page URL or empty string on server
 */
export function getCurrentUrl(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location.href.split("?")[0]; // Remove existing query params
}

/**
 * Estimate the size of shared data in the URL
 * Warns if URL might be too long for some browsers
 * 
 * @param data - The data to check
 * @returns Size in characters and a warning if too large
 */
export function estimateUrlSize(data: ShareableData): {
  size: number;
  warning: string | null;
} {
  try {
    const json = JSON.stringify(data);
    const base64 = btoa(unescape(encodeURIComponent(json)));
    const size = base64.length;

    let warning: string | null = null;

    if (size > 2000) {
      warning = "URL is very long and may not work in all browsers or messaging apps";
    } else if (size > 1000) {
      warning = "URL is long. Consider sharing smaller data if possible";
    }

    return { size, warning };
  } catch {
    return { size: 0, warning: "Unable to estimate URL size" };
  }
}
