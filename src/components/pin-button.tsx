"use client";

import { Star } from "lucide-react";
import { useState, useEffect } from "react";

interface PinButtonProps {
  toolHref: string;
  className?: string;
}

const MAX_PINS = 10;

export function PinButton({ toolHref, className = "" }: PinButtonProps) {
  const [pinned, setPinned] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem("openkit-pinned");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Listen for changes from other pin buttons
    const handlePinChange = () => {
      const updated = localStorage.getItem("openkit-pinned");
      if (updated) setPinned(JSON.parse(updated));
    };

    window.addEventListener("pinned-tools-changed", handlePinChange);
    return () => window.removeEventListener("pinned-tools-changed", handlePinChange);
  }, []);

  const isPinned = pinned.includes(toolHref);

  const togglePin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let newPinned: string[];
    
    if (isPinned) {
      // Remove pin
      newPinned = pinned.filter((p) => p !== toolHref);
    } else {
      // Add pin (max 10)
      if (pinned.length >= MAX_PINS) {
        // Optional: show toast or alert
        alert(`Maximum ${MAX_PINS} pinned tools allowed. Unpin one first.`);
        return;
      }
      newPinned = [...pinned, toolHref];
    }

    setPinned(newPinned);
    localStorage.setItem("openkit-pinned", JSON.stringify(newPinned));
    
    // Dispatch custom event so other components can react
    window.dispatchEvent(new CustomEvent("pinned-tools-changed"));
  };

  const toolName = toolHref.split('/').filter(Boolean).pop() || 'tool';

  return (
    <button
      onClick={togglePin}
      className={`p-1.5 rounded-lg transition-all duration-150 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        isPinned
          ? "text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20 active:bg-yellow-400/30"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/80 active:bg-muted sm:opacity-0 sm:group-hover:opacity-100"
      } ${className}`}
      aria-label={isPinned ? `Unpin ${toolName} from dashboard` : `Pin ${toolName} to dashboard`}
      title={isPinned ? "Unpin from dashboard" : "Pin to dashboard"}
    >
      <Star className={`w-4 h-4 ${isPinned ? "fill-yellow-400" : ""}`} aria-hidden="true" />
    </button>
  );
}
