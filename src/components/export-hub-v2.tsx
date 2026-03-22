"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ClipboardIcon,
  DownloadIcon,
  CheckIcon,
  FileTextIcon,
  FileJsonIcon,
  TableIcon,
  CodeIcon,
  FileIcon} from "lucide-react";
import { ExportFormat } from "@/lib/export-utils";
import { useExport } from "@/hooks/use-export";

export interface ExportHubV2Props {
  content: string | object | Array<unknown>;
  toolName: string;
  filename?: string;
  formats?: ExportFormat[];
  variant?: "buttons" | "compact" | "dropdown";
  includeMetadata?: boolean;
  className?: string;
  onExport?: (format: ExportFormat) => void;
}

const FORMAT_LABELS: Record<ExportFormat, string> = {
  copy: "Copy",
  txt: "TXT",
  json: "JSON",
  csv: "CSV",
  html: "HTML",
  md: "Markdown"};

const FORMAT_ICONS: Record<ExportFormat, React.ComponentType<{ className?: string }>> = {
  copy: ClipboardIcon,
  txt: FileTextIcon,
  json: FileJsonIcon,
  csv: TableIcon,
  html: CodeIcon,
  md: FileIcon};

export function ExportHubV2({
  content,
  toolName,
  filename,
  formats = ["copy", "txt", "json"],
  variant = "buttons",
  includeMetadata = true,
  className = "",
  onExport}: ExportHubV2Props) {
  const { export: handleExport, exportedFormat, isExporting } = useExport({
    toolName,
    includeMetadata});

  const onExportClick = useCallback(
    async (format: ExportFormat) => {
      await handleExport(content, format, filename);
      onExport?.(format);
    },
    [content, filename, handleExport, onExport]
  );

  if (formats.length === 0) {
    return null;
  }

  // Compact dropdown variant
  if (variant === "compact" || variant === "dropdown") {
    return (
      <div className={`relative inline-block ${className}`}>
        <select
          onChange={(e) => {
            const format = e.target.value as ExportFormat;
            if (format) {
              onExportClick(format);
              e.target.value = "";
            }
          }}
          disabled={isExporting}
          className="h-9 px-3 pr-8 rounded-md bg-zinc-700 hover:bg-zinc-600 border-0 text-white text-sm cursor-pointer appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
          defaultValue=""
        >
          <option value="" disabled>
            {isExporting ? "Exporting..." : "Export..."}
          </option>
          {formats.map((format) => (
            <option key={format} value={format}>
              {FORMAT_LABELS[format]}
            </option>
          ))}
        </select>
        <DownloadIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
      </div>
    );
  }

  // Button variant: individual buttons with icons
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {formats.map((format) => {
        const Icon = FORMAT_ICONS[format];
        const isCopy = format === "copy";
        const isExported = exportedFormat === format;
        const label = FORMAT_LABELS[format];

        return (
          <Button
            key={format}
            onClick={() => onExportClick(format)}
            variant={isCopy ? "default" : "outline"}
            size="sm"
            disabled={isExporting}
            className={
              isCopy
                ? "bg-blue-600 hover:bg-blue-700 text-white gap-1.5 min-h-[44px]"
                : "bg-zinc-600 hover:bg-zinc-700 text-white border-0 gap-1.5 min-h-[44px]"
            }
          >
            {isExported ? (
              <CheckIcon className="w-4 h-4" />
            ) : (
              <Icon className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{isExported && isCopy ? "Copied!" : label}</span>
            <span className="sm:hidden">{isExported && isCopy ? "✓" : label}</span>
          </Button>
        );
      })}
    </div>
  );
}

// Backward compatibility: alias for ExportHubV2
export { ExportHubV2 as ExportHub };
