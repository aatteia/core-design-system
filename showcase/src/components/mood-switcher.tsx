"use client";

import { MOODS, useMood } from "@/lib/mood-context";

export function MoodSwitcher(): React.JSX.Element {
  const { mood, setMood } = useMood();
  return (
    <div
      className="sc-mood"
      role="radiogroup"
      aria-label="Showcase chrome"
    >
      {MOODS.map((m) => {
        const active = m.id === mood;
        return (
          <button
            key={m.id}
            type="button"
            className={`sc-mood-btn${active ? " sc-mood-btn--active" : ""}`}
            role="radio"
            aria-checked={active}
            title={`${m.label}: ${m.description}`}
            onClick={() => setMood(m.id)}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
