"use client";

import { Button } from "@/components/ui/button";
import { Undo2, Redo2 } from "lucide-react";
import { KeyboardHint } from "@/components/keyboard-hint";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";
import { cn } from "@/lib/utils";

interface HistoryControlsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  position?: number;
  length?: number;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showPosition?: boolean;
}

/**
 * History Controls Component
 * Provides undo/redo buttons with keyboard shortcuts
 */
export function HistoryControls({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  position,
  length,
  className,
  variant = "outline",
  size = "default",
  showPosition = false,
}: HistoryControlsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        onClick={onUndo}
        disabled={!canUndo}
        variant={variant}
        size={size}
        className={cn(
          "min-h-[44px]",
          variant === "outline" && "border-border/80 hover:bg-muted"
        )}
        title="Undo"
      >
        <Undo2 className="w-4 h-4" />
        {size !== "icon" && <span className="ml-2">Undo</span>}
        {canUndo && <KeyboardHint shortcut={SHORTCUTS.undo} />}
      </Button>
      
      <Button
        onClick={onRedo}
        disabled={!canRedo}
        variant={variant}
        size={size}
        className={cn(
          "min-h-[44px]",
          variant === "outline" && "border-border/80 hover:bg-muted"
        )}
        title="Redo"
      >
        <Redo2 className="w-4 h-4" />
        {size !== "icon" && <span className="ml-2">Redo</span>}
        {canRedo && <KeyboardHint shortcut={SHORTCUTS.redo} />}
      </Button>

      {showPosition && position !== undefined && length !== undefined && (
        <span className="text-xs text-muted-foreground/70 ml-2">
          {position + 1} / {length}
        </span>
      )}
    </div>
  );
}

/**
 * Compact history indicator (just icons)
 */
export function HistoryIndicator({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  className,
}: Pick<HistoryControlsProps, "canUndo" | "canRedo" | "onUndo" | "onRedo" | "className">) {
  return (
    <HistoryControls
      canUndo={canUndo}
      canRedo={canRedo}
      onUndo={onUndo}
      onRedo={onRedo}
      variant="ghost"
      size="icon"
      className={className}
    />
  );
}
