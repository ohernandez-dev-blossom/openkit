import { getShortcutLabel, type KeyboardShortcut } from "@/lib/keyboard-shortcuts";

type KeyboardHintProps = {
  shortcut: KeyboardShortcut;
  className?: string;
};

/**
 * Visual keyboard shortcut hint badge
 * Shows next to buttons to indicate available keyboard shortcuts
 */
export function KeyboardHint({ shortcut, className = "" }: KeyboardHintProps) {
  const label = getShortcutLabel(shortcut);

  return (
    <kbd
      className={`ml-2 hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground bg-muted border border-border/80 rounded ${className}`}
      title={shortcut.description}
    >
      {label}
    </kbd>
  );
}

/**
 * Tooltip-style keyboard hint for buttons
 * Shows as a small badge that appears on hover
 */
export function KeyboardHintTooltip({
  shortcut,
  children,
}: {
  shortcut: KeyboardShortcut;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-card border border-border/80 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {getShortcutLabel(shortcut)}
        <div className="text-[10px] text-muted-foreground/70 mt-0.5">{shortcut.description}</div>
      </div>
    </div>
  );
}
