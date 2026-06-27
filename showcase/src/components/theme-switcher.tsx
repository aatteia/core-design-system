"use client";

import { THEMES, useTheme } from "@/lib/theme-context";

export function ThemeSwitcher(): React.JSX.Element {
  const { theme, setTheme } = useTheme();
  return (
    <div
      role="radiogroup"
      aria-label="Brand theme"
      style={{ display: "inline-flex", gap: 6, alignItems: "center" }}
    >
      {THEMES.map((t) => {
        const active = t.id === theme;
        return (
          <button
            key={t.id}
            role="radio"
            aria-checked={active}
            title={`${t.label} — ${t.description}`}
            onClick={() => setTheme(t.id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "6px 12px",
              borderRadius: 200,
              cursor: "pointer",
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              fontWeight: 600,
              color: active ? "#fff" : "var(--showcase-fg)",
              background: active ? "var(--brand-600)" : "#fff",
              border: `1px solid ${active ? "var(--brand-600)" : "var(--showcase-border)"}`,
              transition: "background 120ms linear, border-color 120ms linear",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 12,
                height: 12,
                borderRadius: 200,
                background: t.swatch,
                boxShadow: active ? "0 0 0 2px #fff inset" : "none",
              }}
            />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
