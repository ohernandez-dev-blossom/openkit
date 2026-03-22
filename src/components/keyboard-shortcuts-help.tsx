"use client";

import { useState, useEffect } from "react";
import { getShortcutLabel, SHORTCUTS, type ShortcutAction } from "@/lib/keyboard-shortcuts";
import { X, Keyboard } from "lucide-react";

type ShortcutCategory = {
  name: string;
  shortcuts: { action: ShortcutAction; label: string }[];
};

const SHORTCUT_CATEGORIES: ShortcutCategory[] = [
  {
    name: "Global",
    shortcuts: [
      { action: "search", label: "Search tools" },
      { action: "help", label: "Show keyboard shortcuts" },
    ],
  },
  {
    name: "Tool Actions",
    shortcuts: [
      { action: "execute", label: "Execute primary action" },
      { action: "copy", label: "Copy output" },
      { action: "clear", label: "Clear all" },
      { action: "save", label: "Save/Export" },
    ],
  },
  {
    name: "Tool Utilities",
    shortcuts: [
      { action: "swap", label: "Swap input/output" },
      { action: "sample", label: "Load sample" },
    ],
  },
];

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ? key (Shift + /)
      if (e.key === "?" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Don't trigger if user is typing in an input/textarea
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }

        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      // ESC to close
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl bg-card border border-border/80 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
              <Keyboard className="w-4 h-4 text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-muted active:bg-muted/70 transition-all duration-150 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          <p className="text-sm text-muted-foreground mb-6">
            Use these keyboard shortcuts to navigate and interact with OpenKit.tools faster.
          </p>

          {SHORTCUT_CATEGORIES.map((category) => (
            <div key={category.name} className="mb-6 last:mb-0">
              <h3 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-3">
                {category.name}
              </h3>
              <div className="space-y-2">
                {category.shortcuts.map(({ action, label }) => {
                  const shortcut = SHORTCUTS[action];
                  return (
                    <div
                      key={action}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <span className="text-sm text-foreground/70">{label}</span>
                      <kbd className="px-2.5 py-1.5 text-sm font-mono text-foreground/70 bg-card border border-border/80 rounded shadow-sm">
                        {getShortcutLabel(shortcut)}
                      </kbd>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Tip */}
          <div className="mt-6 p-4 rounded-lg bg-blue-600/10 border border-blue-600/20">
            <p className="text-sm text-blue-300">
              <strong>Tip:</strong> Not all shortcuts are available on every tool. 
              Look for the keyboard hints next to buttons to see which shortcuts are active.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <div className="text-xs text-muted-foreground/70">
            Press <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border/80">?</kbd> to toggle this dialog
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-muted hover:bg-muted/80 active:bg-muted/60 rounded-lg text-sm text-foreground/70 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close keyboard shortcuts help"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
