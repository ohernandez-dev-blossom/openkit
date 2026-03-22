"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Library, X } from "lucide-react";
import { getTemplatesForTool, type PresetTemplate } from "@/lib/preset-templates";
import type { PresetData } from "@/components/preset-manager";

interface PresetLibraryProps {
  toolName: string;
  onLoadTemplate: (data: PresetData) => void;
  className?: string;
}

export function PresetLibrary({
  toolName,
  onLoadTemplate,
  className = "",
}: PresetLibraryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const templates = useMemo(() => getTemplatesForTool(toolName), [toolName]);

  if (templates.length === 0) {
    return null; // No templates for this tool
  }

  const handleLoadTemplate = (template: PresetTemplate) => {
    onLoadTemplate(template.data);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        variant="ghost"
        className="text-zinc-400 hover:text-foreground h-8"
      >
        <Library className="w-4 h-4 mr-1.5" />
        Templates
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border/80 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Library className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">
                  Preset Templates
                </h3>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                size="sm"
                variant="ghost"
                className="text-zinc-400 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Templates Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleLoadTemplate(template)}
                    className="text-left p-4 bg-muted hover:bg-muted/80 border border-border/80 hover:border-blue-500/50 rounded-lg transition-all group"
                  >
                    <h4 className="font-medium text-white group-hover:text-blue-400 mb-1">
                      {template.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-muted/80 text-foreground/70 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border text-sm text-muted-foreground">
              {templates.length} template{templates.length !== 1 ? "s" : ""}{" "}
              available
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
