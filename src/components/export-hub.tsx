/**
 * ExportHub - Legacy Component (Backward Compatibility)
 * 
 * This is the legacy export component maintained for backward compatibility.
 * For new implementations, use ExportHubV2 from @/components/export-hub-v2
 * 
 * @deprecated Use ExportHubV2 for standardized exports with metadata support
 */

"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { 
  ClipboardIcon, 
  DownloadIcon, 
  CheckIcon 
} from "lucide-react";

export type ExportFormat = "copy" | "txt" | "json" | "custom";

export interface ExportOption {
  format: ExportFormat;
  label: string;
  extension?: string;
  mimeType?: string;
}

export interface ExportHubProps {
  content: string | object;
  filename?: string;
  formats?: ExportFormat[];
  customOptions?: ExportOption[];
  variant?: "buttons" | "compact";
  onExport?: (format: ExportFormat) => void;
}

const DEFAULT_OPTIONS: Record<ExportFormat, ExportOption> = {
  copy: {
    format: "copy",
    label: "Copy",
  },
  txt: {
    format: "txt",
    label: "Download TXT",
    extension: "txt",
    mimeType: "text/plain",
  },
  json: {
    format: "json",
    label: "Download JSON",
    extension: "json",
    mimeType: "application/json",
  },
  custom: {
    format: "custom",
    label: "Download",
  },
};

export function ExportHub({
  content,
  filename = "export",
  formats = ["copy", "txt"],
  customOptions = [],
  variant = "buttons",
  onExport,
}: ExportHubProps) {
  const [copiedFormat, setCopiedFormat] = useState<ExportFormat | null>(null);

  const getContentAsString = useCallback(() => {
    if (typeof content === "string") {
      return content;
    }
    return JSON.stringify(content, null, 2);
  }, [content]);

  const handleCopy = useCallback(async () => {
    try {
      const text = getContentAsString();
      await navigator.clipboard.writeText(text);
      setCopiedFormat("copy");
      onExport?.("copy");
      
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }, [getContentAsString, onExport]);

  const handleDownload = useCallback((option: ExportOption) => {
    try {
      const text = getContentAsString();
      const extension = option.extension || "txt";
      const mimeType = option.mimeType || "text/plain";
      
      const blob = new Blob([text], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      
      link.href = url;
      link.download = `${filename}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      onExport?.(option.format);
    } catch (error) {
      console.error("Failed to download:", error);
    }
  }, [getContentAsString, filename, onExport]);

  const handleExport = useCallback((option: ExportOption) => {
    if (option.format === "copy") {
      handleCopy();
    } else {
      handleDownload(option);
    }
  }, [handleCopy, handleDownload]);

  // Build options list from formats + custom options
  const options: ExportOption[] = [
    ...formats.map((format) => DEFAULT_OPTIONS[format]),
    ...customOptions,
  ];

  if (options.length === 0) {
    return null;
  }

  // Compact variant: single dropdown-style button
  if (variant === "compact") {
    return (
      <div className="relative inline-block">
        <select
          onChange={(e) => {
            const option = options[parseInt(e.target.value)];
            if (option) handleExport(option);
            e.target.value = "";
          }}
          className="h-8 px-3 rounded-md bg-zinc-700 hover:bg-zinc-600 border-0 text-white text-sm cursor-pointer appearance-none pr-8"
          defaultValue=""
        >
          <option value="" disabled>
            Export...
          </option>
          {options.map((option, idx) => (
            <option key={idx} value={idx}>
              {option.label}
            </option>
          ))}
        </select>
        <DownloadIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
      </div>
    );
  }

  // Button variant: individual buttons with icons
  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((option, idx) => {
        const isCopy = option.format === "copy";
        const isCopied = copiedFormat === option.format;
        
        return (
          <Button
            key={idx}
            onClick={() => handleExport(option)}
            variant={isCopy ? "default" : "outline"}
            size="sm"
            className={
              isCopy
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-zinc-600 hover:bg-zinc-700 text-white border-0"
            }
          >
            {isCopy ? (
              isCopied ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                <ClipboardIcon className="w-4 h-4" />
              )
            ) : (
              <DownloadIcon className="w-4 h-4" />
            )}
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}
