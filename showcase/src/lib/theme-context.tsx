"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemeId = "default" | "teal" | "violet" | "amber" | "forge";

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  description: string;
  swatch: string;
}

/** Example brand ramps demonstrating that Core rebrands from one hue.
 *  "default" is Core's neutral indigo-slate placeholder (no data-theme). */
export const THEMES: ThemeMeta[] = [
  { id: "default", label: "Indigo", description: "Core's neutral placeholder", swatch: "#3C4673" },
  { id: "teal", label: "Teal", description: "Hue only", swatch: "#0E7C86" },
  { id: "violet", label: "Violet", description: "Hue only", swatch: "#5B2FC9" },
  { id: "amber", label: "Amber", description: "Hue only", swatch: "#8A5800" },
  { id: "forge", label: "Forge", description: "Warm, sharp, compact five-axis fork", swatch: "#8C3A1A" },
];

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "core-theme";

function applyTheme(theme: ThemeId): void {
  const html = document.documentElement;
  if (theme === "default") html.removeAttribute("data-theme");
  else html.setAttribute("data-theme", theme);
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [theme, setThemeState] = useState<ThemeId>("default");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (stored && THEMES.some((t) => t.id === stored)) {
      setThemeState(stored);
      applyTheme(stored);
    }
  }, []);

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next);
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
