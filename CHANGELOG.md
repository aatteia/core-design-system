# Changelog

All notable changes to the Core design system are recorded here.
Core is versioned independently of any fork; forks pin to the Core version they branched from.

**SemVer.** Renaming or removing a public token is a breaking change. Bump the major version.
When a public token is renamed, this changelog includes an old→new map.
See `docs/token-contract.md`.

---

## Unreleased

Nothing yet.

## v1.2.0 — 2026-09-20

Research leftovers: token contract, override layers, SemVer policy, `--border-control`
alias. Also ships the unreleased kernel work from after 1.1.0 (status roles, focus ring,
Forge modern, on-fill contrast, Font Awesome hooks removed).

### Added
- Status surface and text roles: `--fg-error`, `--fg-on-error`, `--bg-info` /
  `--bg-success` / `--bg-warning` / `--bg-error`, plus `--bg-error-subtle`,
  `--bg-error-strong`, `--bg-error-strong-hover`, and `--border-error`.
- Public `--focus-ring` (`2px solid var(--border-focus)`). All keyboard-focus
  outlines use it.
- `--border-control`, an alias of `--border-strong` (control edges, 3:1 on the
  adjacent background). `--border-strong` remains.
- `docs/token-contract.md`: public API, private ramps, brand/neutral step tables,
  SemVer rules.
- `docs/research/comparable-foundations.md`: condensed steward notes from the
  comparable-systems pass.
- Override layers in `docs/extending.md`: kernel, fork, product. Overrides stay
  type-compatible. Deep forks record why they changed roles.

### Changed
- Component recipes use those status roles only. They no longer read
  `--info-*`, `--success-*`, `--warning-*`, or `--error-*` ramp steps.
- Icon buttons size to `--control-height` / `--control-height-sm` /
  `--control-height-lg`. Large icon buttons no longer hardcode 56px.
- Showcase **Forge** theme: token-only modern copper mood. Refined brand and
  warm-stone ramps, Fraunces + Plus Jakarta Sans + JetBrains Mono, softer
  radii with pill primaries, 40/32/48 controls, and a copper `--focus-500`.
  Placeholder and strong-border roles remap onto darker stone steps so those
  pairs still meet WCAG on white. Recipes in `components.css` are unchanged.
- Keyboard focus is a 2px outline. Recipes use `--focus-ring`, not
  `--focus-500`. Strong fills use `--fg-on-primary` / `--fg-on-error`.
  Selected chips no longer hardcode `--white`.
- Contrast script checks default and Forge themes, including `on-*` fill
  pairs. Charter last reviewed 20 September 2026.

### Removed
- Unused `--shadow-focus`. Focus is not a drop shadow.
- Unused Font Awesome class hooks in `components.css`. The showcase uses
  inline SVGs.

## v1.1.0 — 2026-09-18

Public portfolio pin after Increments 0–2. Kernel recast, MIT, live showcase, Forge
falsification theme, and a README a recruiter can read in two minutes.

### Changed
- Removed named-system derivation claims from README, changelog, and token comments.
  Core describes itself as original work. Method and judgement, never derivation from
  a named third-party system.
- Replaced inherited named palettes with an original `--neutral-*` spine and regenerated
  info / success / warning / error ramps. Component recipes now use semantic roles
  (`--bg-disabled`, `--fg-placeholder`, `--fg-info`, and siblings) instead of primitive
  palette steps. Input border and placeholder contrast meet WCAG 2.2 SC 1.4.11 and 1.4.3
  on the default theme.
- Replaced electoral-service sample copy in `preview/` with generic account, booking, and
  project content.
- Licensed Core under MIT. Bundled fonts ship with SIL OFL 1.1 (`fonts/OFL.txt`).
- Hosted the showcase on Cloudflare Pages at `https://core-design-system.pages.dev`.
  Public, unauthenticated. README and `package.json` homepage point at that URL.
- README describes the kernel versus a fork. It no longer uses a kept/dropped inventory.
- Deleted `preview/`. It was a second hardcoded design system, not a `ds-*` consumer.
- Documented type-scale and radius derivation on the 4px grid. Control height tokens
  (`--control-height`, `--hit-target` 44px) drive recipes. Compact is `--control-height-sm`.
- `prefers-reduced-motion` and `forced-colors` in the kernel. Contrast table generated
  at `docs/accessibility.md`.
- Showcase copies `tokens.css` and `components.css` at build time. No CDN.
- Showcase **Forge** theme changes hue, neutrals, type, radius, and density by tokens only.
  Amber `--brand-600` now meets 4.5:1 on white.
- README fork step for colour: hue-only work is `--brand-*`. A deeper fork may also recast
  neutrals, type, radius, and density in tokens. Do not edit `components.css` for those.

### Added
- README "What this is and why", with Indigo and Forge screenshots of the same page.

## v1.0.0 — 2026-06-28

First formally-versioned release. Core is a brand-agnostic foundation. Organisation-
and brand-specific decisions sit in an overridable layer.

### Added
- Root `package.json` (version field) and this changelog — formal SemVer versioning.
- Showcase navigation system: a left sidebar with category tree (Overview / Tokens /
  Components), a search/filter box, scroll-spy active highlighting, and deep-linkable
  section anchors. Rendered in a neutral `.sc-*` chrome namespace (monospace labels,
  `--showcase-*` surfaces) so the app frame never reads as a `.ds-*` artefact.
- Showcase sections split to finer granularity (Spacing, Radii & elevation, Focus ring,
  Links, Breadcrumbs broken out) and made individually addressable.
