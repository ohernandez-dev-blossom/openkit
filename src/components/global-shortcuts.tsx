"use client";

import { useEffect } from "react";
import { KeyboardShortcutsHelp } from "./keyboard-shortcuts-help";

/**
 * Global keyboard shortcuts manager
 * Renders the help modal and ensures global shortcuts work app-wide
 */
export function GlobalShortcuts() {
  useEffect(() => {
    // Prevent default browser behavior for certain shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K (search) - prevent browser search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
      }

      // Cmd/Ctrl + Shift + C (copy output) - prevent browser dev tools
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "c") {
        const target = e.target as HTMLElement;
        // Only prevent if not in an input field
        if (
          target.tagName !== "INPUT" &&
          target.tagName !== "TEXTAREA" &&
          !target.isContentEditable
        ) {
          e.preventDefault();
        }
      }

      // Cmd/Ctrl + L (clear) - prevent browser location bar
      if ((e.metaKey || e.ctrlKey) && e.key === "l") {
        const target = e.target as HTMLElement;
        // Only prevent if not in an input field
        if (
          target.tagName !== "INPUT" &&
          target.tagName !== "TEXTAREA" &&
          !target.isContentEditable
        ) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <KeyboardShortcutsHelp />;
}
