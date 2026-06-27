# Core Design System 1.0

**Core** is a brand-agnostic design-system *foundation* — a mature set of design
tokens, component recipes, and documentation patterns with every brand decision
factored out into a single layer you override. Fork it to stand up a new design
system in hours instead of weeks.

Core is distilled from **Attica 2.0** (a large, production-grade system) with all
product- and organisation-specific content removed. Everything that survived is the
part of a design system that is *the same no matter who you are*: the 4 px spacing
grid, the type scale, the elevation and radius ramps, the accessible focus model,
and the component anatomy. The only things a fork supplies are a **brand hue**,
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
├── README.md          — this file
├── SKILL.md           — Claude Skill entry-point (generate on-brand artifacts)
├── tokens.css         — design tokens (CSS custom properties): colour, type, spacing, radii, shadows
├── components.css     — component recipes (.ds-btn, .ds-card, .ds-input, .ds-badge, …)
├── fonts/             — local variable fonts (Roboto / Open Sans / Inter — swap per fork)
├── assets/            — brand marks (empty by design — a fork adds its own)
├── preview/           — 26 static review cards, one per token group / component
└── showcase/          — Next.js + Tailwind v4 + shadcn/@base-ui app (static export, run locally)
```

`tokens.css` + `components.css` are the **canonical, framework-agnostic source**. Link them
into any HTML page (`<link rel="stylesheet" href="tokens.css">`) and apply the `.ds` class to
a root element for sensible element defaults. The `showcase/` is a faithful, interactive
realisation of the same tokens — not a second source of truth.

## What Core keeps (and what it dropped)

| Kept (brand-agnostic) | Dropped (was organisation-specific) |
|---|---|
| 4 px spacing scale, radii (4/8/12/16/pill), 5-step elevation | The original brand hue (now a neutral `--brand-*` placeholder) |
| Full type scale (Display → Body XS), weights, tracking | Restricted/parliamentary & ballot palettes |
| Neutral spine (warm grey + true grey), white | Accent palette reserved for an internal product suite |
| Semantic ramps: info / success / warning / error | Organisation logos, photography, and product copy |
| Magenta accessibility focus ring + `--shadow-focus` | A product-specific website UI kit |
| Every component recipe (token-driven, zero hardcoded brand) | |

The neutral **Mauve / Smalt / Cerulean** palettes are retained as ready-made secondary and
semantic sources; keep, recolour, or ignore them per fork.

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

```bash
cd showcase
npm install
npm run dev          # http://localhost:3000 — interactive token explorer + component gallery
npm run build        # static export to showcase/out/
npx serve out        # serve the static build
```

The showcase is a **static export** (`output: 'export'`), so it needs no server and can be
presented locally or dropped on any static host.

## Versioning

Core is versioned independently of any fork. `1.0` is the first extraction; the version
advances as the foundation matures. Forks pin to the Core version they branched from.
