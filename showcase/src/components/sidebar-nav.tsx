"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MoodSwitcher } from "@/components/mood-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { NAV_GROUPS, NAV_IDS } from "@/lib/nav-data";
import { useScrollSpy } from "@/lib/use-scroll-spy";

const OVERLAY_QUERY = "(max-width: 880px)";
const FOCUSABLE =
  "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])";

/**
 * The browse sidebar: search box + category tree with scroll-spy highlighting
 * and deep-linking. Rendered in the neutral `.sc-*` chrome namespace so it never
 * reads as one of the `.ds-*` design-system artefacts it lists.
 *
 * On viewports ≤880px this is the off-canvas Drawer Vault: mood and brand-theme
 * switchers sit in labelled sections above the existing nav links.
 */
export function SidebarNav({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}): React.JSX.Element {
  const navRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onNavigateRef = useRef(onNavigate);
  onNavigateRef.current = onNavigate;
  const [query, setQuery] = useState("");
  const [overlay, setOverlay] = useState(false);
  const active = useScrollSpy(NAV_IDS);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV_GROUPS;
    return NAV_GROUPS.map((g) => ({
      ...g,
      items: g.items.filter(
        (i) =>
          i.label.toLowerCase().includes(q) ||
          (i.keywords ?? "").toLowerCase().includes(q),
      ),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  useEffect(() => {
    const mq = window.matchMedia(OVERLAY_QUERY);
    const sync = (): void => setOverlay(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open || !overlay) return;

    const nav = navRef.current;
    if (!nav) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") {
        e.preventDefault();
        onNavigateRef.current();
        return;
      }
      if (e.key !== "Tab" || !nav) return;
      const nodes = Array.from(nav.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.tabIndex !== -1 && !el.hasAttribute("disabled"),
      );
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

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, overlay]);

  function handleClick(e: React.MouseEvent, id: string): void {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
    onNavigate();
  }

  return (
    <nav
      ref={navRef}
      id="sc-nav"
      className={`sc-nav${open ? " sc-nav--open" : ""}`}
      aria-label="Design system sections"
      inert={overlay && !open ? true : undefined}
    >
      <div className="sc-nav__head">
        <p className="sc-nav__title">Menu</p>
        <button
          ref={closeRef}
          type="button"
          className="sc-nav-toggle"
          aria-label="Close navigation"
          onClick={onNavigate}
        >
          Close
        </button>
      </div>

      <div className="sc-nav__vault">
        <div className="sc-nav__vault-section">
          <p className="sc-nav__vault-label">Showcase chrome</p>
          <MoodSwitcher />
        </div>
        <div className="sc-nav__vault-section">
          <p className="sc-nav__vault-label">Brand theme</p>
          <ThemeSwitcher />
        </div>
      </div>

      <input
        className="sc-nav__search"
        type="search"
        placeholder="Search the system…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search sections"
      />
      {groups.length === 0 && <p className="sc-nav__empty">No matches.</p>}
      {groups.map((g) => (
        <div className="sc-nav__group" key={g.label}>
          <div className="sc-nav__group-label">{g.label}</div>
          {g.items.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              className={`sc-nav__link${active === i.id ? " sc-nav__link--active" : ""}`}
              aria-current={active === i.id ? "true" : undefined}
              onClick={(e) => handleClick(e, i.id)}
            >
              {i.label}
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
}
