"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";

type Theme = "dark"; // Only dark mode supported

type ThemeContextType = {
  theme: Theme;
  effectiveTheme: "dark";
  setTheme: (theme: Theme) => void; // No-op, kept for compatibility
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Force dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // No-op setTheme for backward compatibility
  const setTheme = () => {
    // Dark mode is permanent, do nothing
  };

  return (
    <ThemeContext.Provider value={{ theme: "dark", effectiveTheme: "dark", setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
