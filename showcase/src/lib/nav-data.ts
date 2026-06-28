/* ---------------------------------------------------------------------------
   Navigation model for the showcase. One entry per addressable section. As the
   design system grows, add items here — the sidebar, search, and scroll-spy all
   derive from this single source.
   --------------------------------------------------------------------------- */

export interface NavItem {
  /** Must match the `id` of the corresponding <section> in page.tsx. */
  id: string;
  label: string;
  /** Extra terms the search box should match against. */
  keywords?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [{ id: "overview", label: "Introduction", keywords: "intro start fork getting started" }],
  },
  {
    label: "Tokens",
    items: [
      { id: "colour", label: "Colour", keywords: "color brand palette ramp neutral semantic nobel" },
      { id: "typography", label: "Typography", keywords: "type font heading body scale display" },
      { id: "spacing", label: "Spacing", keywords: "space grid 4px gap layout" },
      { id: "radii-elevation", label: "Radii & elevation", keywords: "radius corner shadow depth pill" },
      { id: "focus", label: "Focus ring", keywords: "focus accessibility keyboard outline a11y" },
    ],
  },
  {
    label: "Components",
    items: [
      { id: "buttons", label: "Buttons", keywords: "button primary secondary tertiary destructive pill icon" },
      { id: "links", label: "Links", keywords: "link anchor href external" },
      { id: "cards", label: "Cards", keywords: "card surface panel highlight" },
      { id: "inputs", label: "Inputs", keywords: "input form field text select textarea error" },
      { id: "badges-chips", label: "Badges & chips", keywords: "badge chip tag status filter" },
      { id: "breadcrumbs", label: "Breadcrumbs", keywords: "breadcrumb nav path trail" },
    ],
  },
];

/** Flat, document-order list of section ids — used by the scroll-spy. */
export const NAV_IDS: string[] = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id));
