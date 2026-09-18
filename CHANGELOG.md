# Changelog

All notable changes to the Core design system are recorded here.
Core is versioned independently of any fork; forks pin to the Core version they branched from.

---

## Unreleased

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
