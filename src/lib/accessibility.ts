/**
 * Accessibility Utilities
 * WCAG 2.1 AA Compliance Helpers
 */

/**
 * Generate accessible label for copy buttons
 */
export function getCopyAriaLabel(contentType?: string): string {
  return contentType ? `Copy ${contentType} to clipboard` : 'Copy to clipboard';
}

/**
 * Generate accessible label for download buttons
 */
export function getDownloadAriaLabel(format?: string): string {
  return format ? `Download as ${format.toUpperCase()}` : 'Download file';
}

/**
 * Generate accessible label for random/sample buttons
 */
export function getGenerateAriaLabel(type: 'random' | 'sample'): string {
  return type === 'random' ? 'Generate random values' : 'Load sample data';
}

/**
 * Check if color contrast meets WCAG AA standards
 */
export function meetsContrastRequirement(
  foreground: string,
  background: string,
  isLargeText = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3.0 : ratio >= 4.5;
}

/**
 * Calculate relative luminance for a color
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r / 255, g / 255, b / 255].map(c =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Announce to screen readers (live region)
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  if (typeof document === 'undefined') return;
  
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Get unique ID for form inputs (if not provided)
 */
let idCounter = 0;
export function generateUniqueId(prefix = 'input'): string {
  return `${prefix}-${++idCounter}-${Date.now()}`;
}
