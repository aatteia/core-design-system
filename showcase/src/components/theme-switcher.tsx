"use client";

import { THEMES, useTheme } from "@/lib/theme-context";

export function ThemeSwitcher({
  variant = "segments",
  labelledBy,
}: {
  variant?: "segments" | "dots";
  labelledBy?: string;
} = {}): React.JSX.Element {
  const { theme, setTheme } = useTheme();
  const dots = variant === "dots";
  return (
    <div
      className={dots ? "sc-theme sc-theme--dots" : "sc-theme"}
      role="radiogroup"
      aria-label={labelledBy ? undefined : "Brand theme"}
      aria-labelledby={labelledBy}
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
            aria-label={dots ? t.label : undefined}
            title={`${t.label}: ${t.description}`}
            onClick={() => setTheme(t.id)}
          >
            {dots ? (
              <span
                className="sc-theme-btn__dot"
                style={{ background: t.swatch }}
                aria-hidden="true"
              />
            ) : (
              t.label
            )}
          </button>
        );
      })}
    </div>
  );
}
