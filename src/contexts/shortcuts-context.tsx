"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { SHORTCUTS, type ShortcutAction, type KeyboardShortcut } from "@/lib/keyboard-shortcuts";

type ShortcutsContextType = {
  shortcuts: Record<ShortcutAction, KeyboardShortcut>;
  updateShortcut: (action: ShortcutAction, shortcut: KeyboardShortcut) => void;
  resetShortcut: (action: ShortcutAction) => void;
  resetAllShortcuts: () => void;
};

const ShortcutsContext = createContext<ShortcutsContextType | undefined>(undefined);

const STORAGE_KEY = "openkit-keyboard-shortcuts";

// Helper function to load shortcuts from localStorage
function loadShortcutsFromStorage(): Record<ShortcutAction, KeyboardShortcut> {
  if (typeof window === "undefined") return SHORTCUTS;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const customShortcuts = JSON.parse(saved);
      return { ...SHORTCUTS, ...customShortcuts };
    }
  } catch (error) {
    console.error("Failed to load custom shortcuts:", error);
  }
  return SHORTCUTS;
}

export function ShortcutsProvider({ children }: { children: ReactNode }) {
  // Use lazy initialization to load from localStorage
  const [shortcuts, setShortcuts] = useState<Record<ShortcutAction, KeyboardShortcut>>(() =>
    loadShortcutsFromStorage()
  );

  const updateShortcut = (action: ShortcutAction, shortcut: KeyboardShortcut) => {
    setShortcuts((prev) => {
      const updated = { ...prev, [action]: shortcut };
      
      // Save to localStorage
      try {
        const customShortcuts = Object.entries(updated).reduce((acc, [key, value]) => {
          if (JSON.stringify(value) !== JSON.stringify(SHORTCUTS[key as ShortcutAction])) {
            acc[key as ShortcutAction] = value;
          }
          return acc;
        }, {} as Partial<Record<ShortcutAction, KeyboardShortcut>>);
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customShortcuts));
      } catch (error) {
        console.error("Failed to save custom shortcuts:", error);
      }
      
      return updated;
    });
  };

  const resetShortcut = (action: ShortcutAction) => {
    setShortcuts((prev) => {
      const updated = { ...prev, [action]: SHORTCUTS[action] };
      
      // Update localStorage
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const customShortcuts = JSON.parse(saved);
          delete customShortcuts[action];
          
          if (Object.keys(customShortcuts).length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(customShortcuts));
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error("Failed to reset shortcut:", error);
      }
      
      return updated;
    });
  };

  const resetAllShortcuts = () => {
    setShortcuts(SHORTCUTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to reset all shortcuts:", error);
    }
  };

  return (
    <ShortcutsContext.Provider
      value={{ shortcuts, updateShortcut, resetShortcut, resetAllShortcuts }}
    >
      {children}
    </ShortcutsContext.Provider>
  );
}

export function useShortcuts() {
  const context = useContext(ShortcutsContext);
  if (!context) {
    throw new Error("useShortcuts must be used within ShortcutsProvider");
  }
  return context;
}
