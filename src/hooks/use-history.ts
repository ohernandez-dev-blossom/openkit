import { useState, useCallback, useRef, useEffect } from "react";

/**
 * History/Undo Hook for OpenKit.tools
 * Provides undo/redo functionality for any state value
 * 
 * @example
 * const [value, setValue, { undo, redo, canUndo, canRedo, clear }] = useHistory("initial");
 * 
 * setValue("new value"); // Creates history entry
 * undo(); // Restores previous value
 * redo(); // Restores next value
 */

export interface HistoryOptions {
  /**
   * Maximum number of history entries to keep
   * @default 50
   */
  maxHistory?: number;
  
  /**
   * Debounce time in milliseconds before adding to history
   * Prevents creating history entries on every keystroke
   * @default 500
   */
  debounceMs?: number;
  
  /**
   * Whether to enable browser back/forward integration
   * @default false
   */
  useBrowserHistory?: boolean;
}

export interface HistoryControls {
  /** Undo to previous state */
  undo: () => void;
  /** Redo to next state */
  redo: () => void;
  /** Whether undo is available */
  canUndo: boolean;
  /** Whether redo is available */
  canRedo: boolean;
  /** Clear all history */
  clear: () => void;
  /** Get current history position */
  position: number;
  /** Get total history length */
  length: number;
}

/**
 * Hook to manage state with undo/redo functionality
 */
export function useHistory<T>(
  initialValue: T,
  options: HistoryOptions = {}
): [T, (value: T | ((prev: T) => T)) => void, HistoryControls] {
  const {
    maxHistory = 50,
    debounceMs = 500,
    useBrowserHistory = false,
  } = options;

  // History state
  const [history, setHistory] = useState<T[]>([initialValue]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Debounce timer
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const pendingValue = useRef<T | null>(null);

  // Current value
  const currentValue = history[currentIndex];

  /**
   * Add a new entry to history
   */
  const addToHistory = useCallback((value: T) => {
    setHistory((prev) => {
      // Remove any future history if we're not at the end
      const newHistory = prev.slice(0, currentIndex + 1);
      
      // Don't add if value is the same as current
      if (JSON.stringify(value) === JSON.stringify(newHistory[newHistory.length - 1])) {
        return prev;
      }
      
      // Add new value
      newHistory.push(value);
      
      // Limit history size
      if (newHistory.length > maxHistory) {
        return newHistory.slice(newHistory.length - maxHistory);
      }
      
      return newHistory;
    });
    
    setCurrentIndex((prev) => {
      const newIndex = Math.min(prev + 1, maxHistory - 1);
      return newIndex;
    });
  }, [currentIndex, maxHistory]);

  /**
   * Set value with debouncing
   */
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    const newValue = typeof value === "function" 
      ? (value as (prev: T) => T)(currentValue)
      : value;

    // Update immediately for UI responsiveness
    setHistory((prev) => {
      const updated = [...prev];
      updated[currentIndex] = newValue;
      return updated;
    });

    // Debounce adding to history
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    pendingValue.current = newValue;
    
    debounceTimer.current = setTimeout(() => {
      if (pendingValue.current !== null) {
        addToHistory(pendingValue.current);
        pendingValue.current = null;
      }
    }, debounceMs);
  }, [currentValue, currentIndex, addToHistory, debounceMs]);

  /**
   * Undo to previous state
   */
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      
      if (useBrowserHistory && window.history.state?.historyIndex !== undefined) {
        window.history.back();
      }
    }
  }, [currentIndex, useBrowserHistory]);

  /**
   * Redo to next state
   */
  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      
      if (useBrowserHistory && window.history.state?.historyIndex !== undefined) {
        window.history.forward();
      }
    }
  }, [currentIndex, history.length, useBrowserHistory]);

  /**
   * Clear all history
   */
  const clear = useCallback(() => {
    setHistory([currentValue]);
    setCurrentIndex(0);
  }, [currentValue]);

  /**
   * Browser history integration
   */
  useEffect(() => {
    if (!useBrowserHistory) return;

    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.historyIndex !== undefined) {
        setCurrentIndex(event.state.historyIndex);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [useBrowserHistory]);

  /**
   * Update browser history when currentIndex changes
   */
  useEffect(() => {
    if (!useBrowserHistory) return;

    const state = { historyIndex: currentIndex };
    const url = new URL(window.location.href);
    url.searchParams.set("h", currentIndex.toString());
    
    // Use replaceState for the first entry, pushState for subsequent ones
    if (currentIndex === 0) {
      window.history.replaceState(state, "", url.toString());
    } else {
      window.history.pushState(state, "", url.toString());
    }
  }, [currentIndex, useBrowserHistory]);

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const controls: HistoryControls = {
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    clear,
    position: currentIndex,
    length: history.length,
  };

  return [currentValue, setValue, controls];
}

/**
 * Simpler hook for managing multiple related state values with shared history
 * Useful for forms or tools with multiple inputs
 */
export function useFormHistory<T extends Record<string, unknown>>(
  initialValues: T,
  options: HistoryOptions = {}
) {
  const [state, setState, controls] = useHistory(initialValues, options);

  const setField = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setState((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [setState]
  );

  return { state, setState, setField, ...controls };
}
