"use client";

import { THEMES, useTheme } from "@/lib/theme-context";

export function ThemeSwitcher(): React.JSX.Element {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className="sc-theme"
      role="radiogroup"
      aria-label="Brand theme"
    >
      {THEMES.map((t) => {
        const active = t.id === theme;
        return (
          <button
            key={t.id}
            type="button"
            className={`sc-theme-btn${active ? " sc-theme-btn--active" : ""}`}
            role="radio"
            aria-checked={active}
            title={`${t.label}: ${t.description}`}
            onClick={() => setTheme(t.id)}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
