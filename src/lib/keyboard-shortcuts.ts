/**
 * Keyboard Shortcuts Library
 * Centralized keyboard shortcut management for OpenKit.tools
 */

export type KeyboardShortcut = {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
};

export type ShortcutAction =
  | "execute"
  | "copy"
  | "clear"
  | "save"
  | "swap"
  | "sample"
  | "search"
  | "help"
  | "undo"
  | "redo"
  | "compare";

export const SHORTCUTS: Record<ShortcutAction, KeyboardShortcut> = {
  execute: {
    key: "Enter",
    ctrl: true,
    meta: true,
    description: "Execute primary action",
  },
  copy: {
    key: "c",
    ctrl: true,
    meta: true,
    shift: true,
    description: "Copy output",
  },
  clear: {
    key: "l",
    ctrl: true,
    meta: true,
    description: "Clear all",
  },
  save: {
    key: "s",
    ctrl: true,
    meta: true,
    description: "Save/Export",
  },
  swap: {
    key: "s",
    ctrl: true,
    meta: true,
    shift: true,
    description: "Swap input/output",
  },
  sample: {
    key: "d",
    ctrl: true,
    meta: true,
    description: "Load sample",
  },
  search: {
    key: "k",
    ctrl: true,
    meta: true,
    description: "Search tools",
  },
  help: {
    key: "?",
    shift: true,
    description: "Show keyboard shortcuts",
  },
  undo: {
    key: "z",
    ctrl: true,
    meta: true,
    description: "Undo last change",
  },
  redo: {
    key: "z",
    ctrl: true,
    meta: true,
    shift: true,
    description: "Redo last change",
  },
  compare: {
    key: "Enter",
    ctrl: true,
    meta: true,
    description: "Compare/Diff",
  },
};

/**
 * Check if a keyboard event matches a shortcut
 */
export function matchesShortcut(
  event: KeyboardEvent,
  shortcut: KeyboardShortcut
): boolean {
  const key = event.key.toLowerCase();
  const targetKey = shortcut.key.toLowerCase();

  if (key !== targetKey) return false;

  // Check modifiers
  const ctrlPressed = event.ctrlKey || event.metaKey;
  const shiftPressed = event.shiftKey;
  const altPressed = event.altKey;

  // On Mac, use metaKey; on Windows/Linux, use ctrlKey
  const modifierPressed = shortcut.ctrl || shortcut.meta;

  if (modifierPressed && !ctrlPressed) return false;
  if (shortcut.shift && !shiftPressed) return false;
  if (shortcut.alt && !altPressed) return false;

  // Ensure we're not getting extra modifiers
  if (!shortcut.shift && shiftPressed && key.length === 1) return false;
  if (!shortcut.alt && altPressed) return false;

  return true;
}

/**
 * Get a human-readable shortcut label for display
 */
export function getShortcutLabel(shortcut: KeyboardShortcut): string {
  const parts: string[] = [];
  const isMac = typeof navigator !== "undefined" && navigator.platform.includes("Mac");

  if (shortcut.ctrl || shortcut.meta) {
    parts.push(isMac ? "⌘" : "Ctrl");
  }
  if (shortcut.shift) {
    parts.push(isMac ? "⇧" : "Shift");
  }
  if (shortcut.alt) {
    parts.push(isMac ? "⌥" : "Alt");
  }

  // Format the key nicely
  let key = shortcut.key;
  if (key === "Enter") key = "↵";
  else if (key.length === 1) key = key.toUpperCase();

  parts.push(key);

  return parts.join(isMac ? "" : "+");
}

/**
 * Register a keyboard shortcut handler
 */
export function registerShortcut(
  shortcut: KeyboardShortcut,
  handler: () => void,
  options: { preventDefault?: boolean } = {}
): () => void {
  const listener = (event: KeyboardEvent) => {
    if (matchesShortcut(event, shortcut)) {
      if (options.preventDefault !== false) {
        event.preventDefault();
      }
      handler();
    }
  };

  window.addEventListener("keydown", listener);
  return () => window.removeEventListener("keydown", listener);
}
