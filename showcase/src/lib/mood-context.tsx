"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type MoodId = "product" | "editorial" | "portfolio" | "glass";

export interface MoodMeta {
  id: MoodId;
  label: string;
  description: string;
}

/** Showcase-only chrome directions. Product dense is the default frame.
 *  These do not fork the kernel. Brand themes stay on data-theme. */
export const MOODS: MoodMeta[] = [
  { id: "product", label: "Product", description: "Dense app chrome (default)" },
  { id: "editorial", label: "Editorial", description: "Steward masthead and paper" },
  { id: "portfolio", label: "Portfolio", description: "Large hero, proof strip" },
  { id: "glass", label: "Glass", description: "Frosted chrome and airy cards" },
];

interface MoodContextValue {
  mood: MoodId;
  setMood: (mood: MoodId) => void;
}

const MoodContext = createContext<MoodContextValue | null>(null);
const STORAGE_KEY = "core-mood";

function applyMood(mood: MoodId): void {
  const html = document.documentElement;
  if (mood === "product") html.removeAttribute("data-mood");
  else html.setAttribute("data-mood", mood);
}

export function MoodProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [mood, setMoodState] = useState<MoodId>("product");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as MoodId | null;
    if (stored && MOODS.some((m) => m.id === stored)) {
      setMoodState(stored);
      applyMood(stored);
    }
  }, []);

  const setMood = useCallback((next: MoodId): void => {
    setMoodState(next);
    applyMood(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood(): MoodContextValue {
  const ctx = useContext(MoodContext);
  if (!ctx) throw new Error("useMood must be used within MoodProvider");
  return ctx;
}
