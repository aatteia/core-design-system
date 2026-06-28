"use client";

import { useMemo, useState } from "react";
import { NAV_GROUPS, NAV_IDS } from "@/lib/nav-data";
import { useScrollSpy } from "@/lib/use-scroll-spy";

/**
 * The browse sidebar: search box + category tree with scroll-spy highlighting
 * and deep-linking. Rendered in the neutral `.sc-*` chrome namespace so it never
 * reads as one of the `.ds-*` design-system artefacts it lists.
 */
export function SidebarNav({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}): React.JSX.Element {
  const [query, setQuery] = useState("");
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
      className={`sc-nav${open ? " sc-nav--open" : ""}`}
      aria-label="Design system sections"
    >
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
