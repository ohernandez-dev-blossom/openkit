import { useEffect } from "react";
import { registerShortcut, type KeyboardShortcut } from "@/lib/keyboard-shortcuts";

export function useKeyboardShortcut(
  shortcut: KeyboardShortcut,
  handler: () => void,
  options: {
    enabled?: boolean;
    preventDefault?: boolean;
  } = {}
) {
  const { enabled = true, preventDefault = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const cleanup = registerShortcut(shortcut, handler, { preventDefault });
    return cleanup;
  }, [shortcut, handler, enabled, preventDefault]);
}

/**
 * Hook to use a shortcut by action name (uses context for customization)
 * Falls back to default shortcuts if context is not available
 */
export function useShortcutAction(
  action: string,
  handler: () => void,
  options: {
    enabled?: boolean;
    preventDefault?: boolean;
  } = {}
) {
  // For now, this is just an alias - can be enhanced later with context
  // This is future-proofing for when we want shortcuts to be customizable per-tool
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;
    // Placeholder for future context-based shortcut lookup
  }, [action, handler, enabled]);
}
