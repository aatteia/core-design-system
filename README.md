# Core Design System 1.0

**Live showcase:** [https://core-design-system.pages.dev](https://core-design-system.pages.dev)

**Core** is a brand-agnostic design-system *foundation* — a mature set of design
tokens, component recipes, and documentation patterns with every brand decision
factored out into a single layer you override. Fork it when you need a token
layer and recipes rather than a blank file.

Core holds the part of a design system that is *the same no matter who you are*:
the 4 px spacing grid, the type scale, the elevation and radius ramps, the
accessible focus model, and the component anatomy. Brand, organisation, and
product decisions stay out of the kernel. A fork supplies a **brand hue**,
**fonts**, a **logo**, and **content**.

> Core is the foundation; a *brand* (e.g. Atteia) is an instance built on it.

## How to fork Core into a new design system

1. **Copy** this repository to a new folder / repo (e.g. `acme-design-system`).
2. **Rebrand the colour** — open `tokens.css` and replace the ten `--brand-*` values
   (lines under *COLOUR — Primary "Brand"*) with your brand ramp (25 → 800). That single
   ramp drives `--primary`, links, focus-adjacent accents and the inverse surface; nothing
   else needs touching for colour.
3. **Swap the fonts** — replace the files in `fonts/` and update the three `--font-*`
   family tokens in `tokens.css` (and the `@font-face` block at the top).
4. **Add brand assets** — drop a logo/wordmark into `assets/` (Core ships none on purpose).
5. **Rebrand the showcase** — in `showcase/src/app/globals.css`, point the theme tokens at
   your new ramp (see that file's Layer 2). Run it locally to review.
6. **Optional** — rename the `.ds-*` component prefix if you want an ownable class API,
   though keeping `.ds-*` means future Core updates merge cleanly.

That's the whole job. The neutral indigo-slate placeholder you see out of the box is
*deliberately* unopinionated — it should look like a starting point, not a brand.

## What's in the box

```
.
├── LICENSE            — MIT
├── README.md          — this file
├── SKILL.md           — Claude Skill entry-point (generate on-brand artifacts)
├── tokens.css         — design tokens (CSS custom properties): colour, type, spacing, radii, shadows
├── components.css     — component recipes (.ds-btn, .ds-card, .ds-input, .ds-badge, …)
├── fonts/             — local variable fonts (Roboto / Open Sans / Inter — swap per fork)
├── docs/              — charter, plan, accessibility table, extending
├── assets/            — brand marks (empty by design — a fork adds its own)
└── showcase/          — Next.js static export; live at core-design-system.pages.dev
```

`tokens.css` + `components.css` are the **canonical, framework-agnostic source**. Link them
into any HTML page (`<link rel="stylesheet" href="tokens.css">`) and apply the `.ds` class to
a root element for sensible element defaults. See `docs/extending.md`. The `showcase/`
is a faithful, interactive realisation of the same tokens. It copies `tokens.css` and
`components.css` at build time. It is not a second source of truth.

## Kernel and fork

Core ships the decisions that stay stable across products. A fork adds identity.

| In the kernel | A fork supplies |
|---|---|
| 4 px spacing, radii (4/8/12/16/pill), 5-step elevation | Brand hue (`--brand-*`) |
| Type scale Display through Body XS, weights, tracking | Fonts |
| Neutral spine (cool grey + true grey) and white | Logo and other brand marks |
| Semantic ramps: info, success, warning, error | Copy, photography, and product chrome |
| Magenta focus ring and `--shadow-focus` | |
| Token-driven component recipes (`.ds-*`) | |

`--neutral-*` and the semantic ramps belong to Core. Recolour `--brand-*` for a named
identity. Recolour the semantic ramps only if status colours must match that brand.

## Tokens at a glance

- **Colour roles** — `--primary` / `--primary-hover` / `--primary-active` / `--primary-bg` /
  `--primary-tint` / `--primary-strong` (all derived from `--brand-*`); surface roles
  (`--bg-base`, `--bg-subtle`, `--bg-inverse`), text roles (`--fg-default`, `--fg-strong`,
  `--fg-muted`, `--fg-link`), and borders (`--border-default`, `--border-strong`,
  `--border-focus`).
- **Type** — `--font-heading` / `--font-body` / `--font-ui` / `--font-mono`; weights
  `--fw-light…bold`; a 4 px-baseline scale from `--text-display-m` (52) to `--text-body-xs` (12).
- **Spacing** — `--space-xx-sm` (4) → `--space-xxx-huge` (192), every step on the 4 px grid.
- **Radii** — `--radius-xs/sm/md/lg` (4/8/12/16) + `--radius-pill` (200) for fully-rounded buttons.
- **Elevation** — `--shadow-xs…lg` plus `--shadow-focus`.

## Components

`components.css` ships pill **buttons** (primary / secondary / tertiary / destructive / icon ×
3 sizes), **links**, **cards** (hover-lift, highlight-top/left, flat), **inputs / textareas /
selects** with error + focus states, **badges**, **chips**, **dividers**, and **breadcrumbs** —
all driven entirely by `tokens.css`, so a brand swap re-skins everything for free.

## Visual character (override freely)

Core inherits a *calm, institutional, grid-disciplined* baseline: airy layouts on a 4 px
grid, 8 px card radius with a 1 px border + soft shadow, fully-rounded pill buttons, a 3 px
magenta keyboard-focus ring, and minimal motion (instant or 120 ms linear; no spring or
scroll animation). These are sensible defaults, not commitments — a fork is free to change
radius, motion, and density.

## Viewing the showcase

Public URL: [https://core-design-system.pages.dev](https://core-design-system.pages.dev)

To run it locally:

```bash
cd showcase
npm install
npm run dev          # http://localhost:3000 — interactive token explorer + component gallery
npm run build        # static export to showcase/out/
npx serve out        # serve the static build
```

The showcase is a **static export** (`output: 'export'`). Cloudflare Pages builds `showcase/`
from `main` and publishes `out/`. Preview deployments stay public. Do not put Access in front
of production. Indigo, Teal, Violet, and Amber switch hue. **Forge** also changes neutrals,
type, radius, and density. Contrast data: `docs/accessibility.md`.

## Licence

Core is released under the MIT License. See `LICENSE`. The bundled Inter, Roboto, and
Open Sans variable fonts are SIL OFL 1.1. See `fonts/OFL.txt`.

## Versioning

Core is versioned independently of any fork. `1.0` is the first public release. The version
advances as the foundation matures. Forks pin to the Core version they branched from.
