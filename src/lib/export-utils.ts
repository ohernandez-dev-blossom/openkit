/**
 * Export Utilities for OpenKit.tools
 * Standardized export functionality across all tools
 */

export type ExportFormat = "copy" | "txt" | "json" | "csv" | "html" | "md";

export interface ExportMetadata {
  toolName: string;
  toolUrl?: string;
  timestamp: string;
  version?: string;
}

export interface ExportOptions {
  content: string | object | unknown[];
  filename: string;
  format: ExportFormat;
  metadata?: ExportMetadata;
  includeMetadata?: boolean;
}

/**
 * Generate a standardized filename with timestamp
 */
export function generateFilename(
  toolName: string,
  format: ExportFormat,
  customName?: string
): string {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
  const baseName = customName || toolName;
  const sanitized = baseName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  
  return `openkit-${sanitized}-${timestamp}.${getExtension(format)}`;
}

/**
 * Get file extension for format
 */
function getExtension(format: ExportFormat): string {
  const extensions: Record<ExportFormat, string> = {
    copy: "txt",
    txt: "txt",
    json: "json",
    csv: "csv",
    html: "html",
    md: "md",
  };
  return extensions[format];
}

/**
 * Get MIME type for format
 */
function getMimeType(format: ExportFormat): string {
  const mimeTypes: Record<ExportFormat, string> = {
    copy: "text/plain",
    txt: "text/plain",
    json: "application/json",
    csv: "text/csv",
    html: "text/html",
    md: "text/markdown",
  };
  return mimeTypes[format];
}

/**
 * Convert content to string based on format
 */
function contentToString(
  content: string | object | unknown[],
  format: ExportFormat
): string {
  if (typeof content === "string") {
    return content;
  }

  switch (format) {
    case "json":
      return JSON.stringify(content, null, 2);
    
    case "csv":
      return arrayToCSV(content);
    
    case "html":
      return objectToHTML(content);
    
    case "md":
      return objectToMarkdown(content);
    
    default:
      return JSON.stringify(content, null, 2);
  }
}

/**
 * Convert array/object to CSV
 */
function arrayToCSV(data: unknown): string {
  if (Array.isArray(data)) {
    if (data.length === 0) return "";
    
    // Check if array of objects
    if (typeof data[0] === "object" && data[0] !== null) {
      const headers = Object.keys(data[0]);
      const rows = data.map((row) =>
        headers.map((header) => {
          const value = row[header];
          const stringValue = value === null || value === undefined ? "" : String(value);
          // Escape quotes and wrap in quotes if contains comma, quote, or newline
          if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(",")
      );
      return [headers.join(","), ...rows].join("\n");
    }
    
    // Array of primitives
    return data.join("\n");
  }
  
  // Single object - convert to key-value pairs
  if (typeof data === "object" && data !== null) {
    return Object.entries(data)
      .map(([key, value]) => `${key},${value}`)
      .join("\n");
  }
  
  return String(data);
}

/**
 * Convert object to HTML table
 */
function objectToHTML(data: unknown): string {
  const html = ["<!DOCTYPE html>", "<html>", "<head>", "<meta charset=\"UTF-8\">", "<title>OpenKit.tools Export</title>", "<style>", "  body { font-family: system-ui, sans-serif; padding: 20px; }", "  table { border-collapse: collapse; width: 100%; }", "  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }", "  th { background-color: #f4f4f4; }", "  pre { background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto; }", "</style>", "</head>", "<body>"];

  if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
    // Array of objects -> table
    const headers = Object.keys(data[0]);
    html.push("<table>");
    html.push("<thead><tr>");
    headers.forEach((h) => html.push(`<th>${escapeHTML(h)}</th>`));
    html.push("</tr></thead>");
    html.push("<tbody>");
    data.forEach((row) => {
      html.push("<tr>");
      headers.forEach((h) => {
        html.push(`<td>${escapeHTML(String(row[h] ?? ""))}</td>`);
      });
      html.push("</tr>");
    });
    html.push("</tbody></table>");
  } else {
    // Fallback to pre-formatted JSON
    html.push("<pre>");
    html.push(escapeHTML(JSON.stringify(data, null, 2)));
    html.push("</pre>");
  }

  html.push("</body>", "</html>");
  return html.join("\n");
}

/**
 * Convert object to Markdown
 */
function objectToMarkdown(data: unknown): string {
  const md: string[] = [];

  if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
    // Array of objects -> markdown table
    const headers = Object.keys(data[0]);
    md.push(`| ${headers.join(" | ")} |`);
    md.push(`| ${headers.map(() => "---").join(" | ")} |`);
    data.forEach((row) => {
      const values = headers.map((h) => String(row[h] ?? "").replace(/\|/g, "\\|"));
      md.push(`| ${values.join(" | ")} |`);
    });
  } else if (typeof data === "object" && data !== null && !Array.isArray(data)) {
    // Single object -> key-value list
    Object.entries(data).forEach(([key, value]) => {
      md.push(`**${key}:** ${value}`);
      md.push("");
    });
  } else {
    // Fallback to code block
    md.push("```");
    md.push(JSON.stringify(data, null, 2));
    md.push("```");
  }

  return md.join("\n");
}

/**
 * Escape HTML special characters
 */
function escapeHTML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Add metadata header to content
 */
function addMetadataHeader(content: string, metadata: ExportMetadata, format: ExportFormat): string {
  const lines: string[] = [];
  
  switch (format) {
    case "txt":
    case "csv":
      lines.push("# OpenKit.tools Export");
      lines.push(`# Tool: ${metadata.toolName}`);
      lines.push(`# Date: ${metadata.timestamp}`);
      if (metadata.toolUrl) {
        lines.push(`# URL: ${metadata.toolUrl}`);
      }
      lines.push("#");
      lines.push("");
      lines.push(content);
      return lines.join("\n");
    
    case "json":
      try {
        const parsed = JSON.parse(content);
        const wrapped = {
          _meta: metadata,
          data: parsed,
        };
        return JSON.stringify(wrapped, null, 2);
      } catch {
        return content;
      }
    
    case "html":
      return content.replace(
        "<body>",
        `<body>\n<div style="background: #f0f0f0; padding: 10px; margin-bottom: 20px; border-radius: 4px;">\n<p><strong>OpenKit.tools Export</strong></p>\n<p>Tool: ${metadata.toolName}</p>\n<p>Date: ${metadata.timestamp}</p>\n${metadata.toolUrl ? `<p>URL: <a href="${metadata.toolUrl}">${metadata.toolUrl}</a></p>` : ""}\n</div>`
      );
    
    case "md":
      lines.push("# OpenKit.tools Export");
      lines.push("");
      lines.push(`**Tool:** ${metadata.toolName}`);
      lines.push(`**Date:** ${metadata.timestamp}`);
      if (metadata.toolUrl) {
        lines.push(`**URL:** [${metadata.toolUrl}](${metadata.toolUrl})`);
      }
      lines.push("");
      lines.push("---");
      lines.push("");
      lines.push(content);
      return lines.join("\n");
    
    default:
      return content;
  }
}

/**
 * Export content to clipboard
 */
export async function exportToClipboard(options: ExportOptions): Promise<void> {
  let content = contentToString(options.content, options.format);
  
  if (options.includeMetadata && options.metadata) {
    content = addMetadataHeader(content, options.metadata, options.format);
  }
  
  await navigator.clipboard.writeText(content);
}

/**
 * Export content as file download
 */
export function exportToFile(options: ExportOptions): void {
  let content = contentToString(options.content, options.format);
  
  if (options.includeMetadata && options.metadata) {
    content = addMetadataHeader(content, options.metadata, options.format);
  }
  
  const mimeType = getMimeType(options.format);
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.href = url;
  link.download = options.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Main export function
 */
export async function exportData(options: ExportOptions): Promise<void> {
  if (options.format === "copy") {
    await exportToClipboard(options);
  } else {
    exportToFile(options);
  }
}
