# Changelog

All notable changes to the Core design system are recorded here.
Core is versioned independently of any fork; forks pin to the Core version they branched from.

---

## v1.0.0 — 2026-06-28

First formally-versioned release. Core is the brand-agnostic foundation distilled from
Attica 2.0, with every organisation- and brand-specific decision factored out.

### Added
- Root `package.json` (version field) and this changelog — formal SemVer versioning.
- Showcase navigation system: a left sidebar with category tree (Overview / Tokens /
  Components), a search/filter box, scroll-spy active highlighting, and deep-linkable
  section anchors. Rendered in a neutral `.sc-*` chrome namespace (monospace labels,
  `--showcase-*` surfaces) so the app frame never reads as a `.ds-*` artefact.
- Showcase sections split to finer granularity (Spacing, Radii & elevation, Focus ring,
  Links, Breadcrumbs broken out) and made individually addressable.

### Confirmed (parity verification against Attica)
- Core's `tokens.css` and `components.css` are a brand-stripped **superset** of Attica's
  (Core adds the `--primary-tint` / `--primary-strong` roles); every non-brand preview
  card is present. No brand-agnostic content was missing.

### Deliberately excluded (AEC / Attica-brand only)
- Colour ramps `eminence` / `waratah` / `buff` / `lomandra` / `hibiscus`.
- Brand assets (AEC logos, Attica wordmark glyphs, electoral photography).
- The `aec-website` UI kit and the AEC voice/content guide.
- Preview cards `brand-logo` / `brand-imagery` / `brand-hero` / `colors-eminence` /
  `colors-restricted`.
