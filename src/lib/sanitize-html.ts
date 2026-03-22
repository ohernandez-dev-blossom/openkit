import DOMPurify, { type Config } from "dompurify";

export function sanitizeHtml(html: string, config?: Config): string {
  if (typeof window === "undefined") {
    return html;
  }

  return DOMPurify.sanitize(html, config);
}
