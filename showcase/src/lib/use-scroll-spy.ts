"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view so the sidebar can highlight it.
 * Returns the id of the active section. Also reports the last section when the
 * page is scrolled to the very bottom (sections near the end may never reach
 * the activation band on tall viewports).
 */
export function useScrollSpy(ids: string[], topOffset = 88): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: `-${topOffset}px 0px -65% 0px`, threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));

    function onScroll(): void {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) setActive(ids[ids.length - 1]);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids, topOffset]);

  return active;
}
