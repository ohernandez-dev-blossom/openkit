/**
 * useExport Hook
 * Standardized export functionality for OpenKit.tools
 */

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  ExportFormat,
  ExportMetadata,
  exportData,
  generateFilename,
} from "@/lib/export-utils";

export interface UseExportOptions {
  toolName: string;
  defaultFormats?: ExportFormat[];
  includeMetadata?: boolean;
}

export interface UseExportReturn {
  export: (content: string | object | unknown[], format: ExportFormat, customFilename?: string) => Promise<void>;
  exportedFormat: ExportFormat | null;
  isExporting: boolean;
  error: string | null;
}

export function useExport(options: UseExportOptions): UseExportReturn {
  const pathname = usePathname();
  const [exportedFormat, setExportedFormat] = useState<ExportFormat | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = useCallback(
    async (
      content: string | object | unknown[],
      format: ExportFormat,
      customFilename?: string
    ) => {
      setIsExporting(true);
      setError(null);

      try {
        const metadata: ExportMetadata = {
          toolName: options.toolName,
          toolUrl: `https://openkit.tools${pathname}`,
          timestamp: new Date().toISOString(),
          version: "1.0.0",
        };

        const filename = customFilename || generateFilename(options.toolName, format);

        await exportData({
          content,
          filename,
          format,
          metadata,
          includeMetadata: options.includeMetadata ?? true,
        });

        setExportedFormat(format);
        
        // Reset exported state after 2 seconds
        setTimeout(() => setExportedFormat(null), 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Export failed");
        console.error("Export error:", err);
      } finally {
        setIsExporting(false);
      }
    },
    [options.toolName, options.includeMetadata, pathname]
  );

  return {
    export: handleExport,
    exportedFormat,
    isExporting,
    error,
  };
}
