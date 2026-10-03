"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MoodSwitcher } from "@/components/mood-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { MOODS, useMood } from "@/lib/mood-context";
import { THEMES, useTheme } from "@/lib/theme-context";

const DESKTOP_QUERY = "(min-width: 881px)";
const FOCUSABLE =
  "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])";

function focusableIn(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.tabIndex !== -1 && !el.hasAttribute("disabled"),
  );
}

/**
 * Desktop top-bar control. Mood and brand theme stay in the Drawer Vault
 * at ≤880px; this popover is hidden there so the two are never both shown.
 */
export function AppearancePopover(): React.JSX.Element {
  const { mood } = useMood();
  const { theme } = useTheme();
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const chromeId = `${baseId}-chrome`;
  const brandId = `${baseId}-brand`;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const moodMeta = MOODS.find((item) => item.id === mood) ?? MOODS[0];
  const themeMeta = THEMES.find((item) => item.id === theme) ?? THEMES[0];

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const closeOnPhone = (): void => {
      if (!mq.matches) setOpen(false);
    };
    closeOnPhone();
    mq.addEventListener("change", closeOnPhone);
    return () => mq.removeEventListener("change", closeOnPhone);
  }, []);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const root = rootRef.current;
    if (!panel || !root) return;
    const dialog = panel;
    const popover = root;

    const preferred = dialog.querySelector<HTMLElement>(
      '.sc-mood-btn[aria-checked="true"]',
    );
    (preferred ?? focusableIn(dialog)[0])?.focus();

    function onKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = focusableIn(dialog);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function onPointerDown(e: PointerEvent): void {
      if (popover.contains(e.target as Node)) return;
      const target = e.target instanceof Element ? e.target : null;
      const interactive = Boolean(target?.closest(FOCUSABLE));
      setOpen(false);
      if (interactive) return;
      // A non-focusable target would otherwise blur the trigger on mousedown.
      e.preventDefault();
      triggerRef.current?.focus();
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="sc-appearance" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="sc-appearance__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className="sc-appearance__swatch"
          style={{ background: themeMeta.swatch }}
          aria-hidden="true"
        />
        <span className="sc-appearance__name">Appearance</span>
        <span className="sr-only">
          {moodMeta.label}, {themeMeta.label}
        </span>
        <svg
          className="sc-appearance__caret"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden="true"
        >
          <path
            d="M2.2 3.6 5 6.4l2.8-2.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        className="sc-appearance__panel"
        role="dialog"
        aria-label="Appearance"
        aria-modal={open ? true : undefined}
        hidden={!open}
        inert={open ? undefined : true}
      >
        <div className="sc-appearance__section">
          <p className="sc-appearance__heading" id={chromeId}>
            Showcase chrome
          </p>
          <MoodSwitcher labelledBy={chromeId} />
        </div>
        <div className="sc-appearance__section">
          <p className="sc-appearance__heading" id={brandId}>
            Brand theme
          </p>
          <ThemeSwitcher variant="dots" labelledBy={brandId} />
        </div>
      </div>
    </div>
  );
}
