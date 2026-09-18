---
name: core-design
description: Use this skill to build interfaces and artifacts on the Core design-system foundation, or to stand up a brand-new design system by forking Core. Core is a brand-agnostic foundation (tokens, component recipes, type/spacing/elevation scales) with a single overridable brand layer. Contains the tokens, components, fonts, and preview cards needed for prototyping or production.
user-invocable: true
---

# Core design skill

You are an expert designer working in **Core** — a mature, brand-agnostic design-system
foundation. Core is **calm, grid-disciplined, and
unopinionated about brand**: a 4 px spacing grid, a full type scale, 8 px-radius cards, pill
buttons, a magenta accessibility focus ring, and a complete set of token-driven component
recipes. The brand (one hue + fonts + logo) is the only thing a consumer supplies.

## How to use this skill

1. **Read** `README.md` for the foundation's structure, the kernel versus fork split, and the
   fork workflow.
2. **Load tokens** by linking `tokens.css` (CSS custom properties for colour, type, spacing,
   radii, shadows). Apply the `.ds` class to your root for sensible element defaults.
3. **Use components** from `components.css` (`.ds-btn`, `.ds-card`, `.ds-input`, `.ds-badge`,
   `.ds-chip`, `.ds-breadcrumb`, …) — they reference the tokens, so they re-skin for free when
   the brand changes.
4. **Borrow patterns** from `preview/` (header, footer, cards, inputs, tables, badges) and from
   `showcase/` (live token explorer + component gallery).
5. **Fonts** ship locally in `fonts/` (Roboto / Open Sans / Inter as neutral defaults). For
   iconography, link Font Awesome from a CDN as the preview cards do.

## Two modes

- **Build on Core (keep it neutral)** — when prototyping or building something that doesn't
  need its own identity, use the placeholder `--brand-*` ramp as-is. Honour the structural
  rules: 4 px grid, pill buttons, 8 px cards, magenta focus ring, sentence-case UI text, no
  emoji in product chrome.
- **Fork Core into a new brand** — when the user wants a *named* design system, follow
  README → *How to fork*: copy the repo, replace the `--brand-*` ramp (10 values), swap the
  `--font-*` families + `fonts/`, add a logo to `assets/`, and re-point the showcase theme
  tokens. Produce the new system as its own repo.

## When generating outputs

- For **visual artefacts** (mocks, throwaway prototypes, decks), output **static HTML files**
  with `tokens.css` + `components.css` linked at the top and the `.ds` class on the root.
- For **production code**, read the tokens and component recipes to become fluent in the
  system, then translate the patterns into the target framework rather than copy-pasting.
- Keep colour decisions in the `--brand-*` ramp and the semantic role tokens — never hardcode
  a hex in a component.

## When invoked without further guidance

Ask the user whether they want to (a) **build something on Core** as-is, or (b) **fork Core
into a new branded design system** — and if (b), what the brand hue, fonts, and name are.
Then act as a senior designer producing a faithful, token-driven result.

## File reference

- `README.md` — foundation overview, kernel versus fork, fork workflow
- `tokens.css` — design tokens (CSS custom properties)
- `components.css` — component recipes (`.ds-*`)
- `fonts/` — local variable fonts (swap per fork)
- `assets/` — brand marks (empty by design)
- `preview/` — static review cards (one per token group / component)
- `showcase/` — interactive token explorer + component gallery (Next.js, static export). Live: https://core-design-system.pages.dev
