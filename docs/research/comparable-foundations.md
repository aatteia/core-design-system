# Comparable foundations

**Last reviewed:** 2026-09-20

Steward notes from the September 2026 comparable-systems pass. Core is original work.
These systems were read as public practice, not as parents. Do not describe Core as
derived from any of them.

Full research lives outside this repo. Keep this page short.

Reopen deferred items when a derived consumer needs them and they pass charter §4.
Until then they stay deferred.

## Peers

| System | Why it was on the list |
|---|---|
| [Open Props](https://open-props.style/) | CSS custom-property kernel. Alias-first theming. MIT. |
| [Adobe Spectrum Design Data](https://opensource.adobe.com/spectrum-design-data/spec/cascade/) | Foundation → platform → product cascade. Type-compatible overrides. Concepts only. No Spectrum tooling. |
| [Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) / [Themes](https://www.radix-ui.com/themes/docs/theme/color) | Documented step→use-case maps. `tokens.css` / `components.css` split. Token rename = breaking. |
| [Primer Primitives](https://primer.style/product/primitives/) | Base vs functional. Recipes use functional names. Theme via `data-*`. |
| [Shopify Polaris colour tokens](https://polaris.shopify.com/design/colors/color-tokens) | Private palette vs public aliases. UI must not consume the palette. |
| [IBM Carbon colour](https://carbondesignsystem.com/elements/color/overview/) | Stable roles across themes. Border / focus / support groups. Contrast tables. |
| [Atlassian Design Tokens](https://atlassian.design/foundations/tokens/design-tokens) | Meaning-first names. Deprecation honesty. Theme attributes. |
| [Tailwind CSS v4 `@theme`](https://tailwindcss.com/docs/theme) | One CSS file as the shared theme. Showcase imports the kernel. |

Also read: [Material 3 roles](https://m3.material.io/foundations/design-tokens) (`onPrimary` vocabulary).
[Salesforce Lightning tokens](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-design-tokens.html) as a negative case: compile-time token baking breaks runtime rebrand.

## Already in Core

| Borrow | Source | Where it landed |
|---|---|---|
| Public roles vs private ramps | Polaris, Primer | Recipes use `--primary`, `--fg-*`, `--bg-*`, `--border-*`. Ramps stay in `tokens.css`. See [token-contract.md](../token-contract.md). |
| Status as roles, not ramp steps | Radix, Carbon | `--fg-info` and matching `--bg-*` / `--border-error`. |
| One focus mechanism | Radix, Carbon | `--focus-ring` outline. `--focus-500` is private. `--shadow-focus` removed. |
| Decorative vs control borders | Carbon, Radix steps 6 to 8 | `--border-default` vs `--border-strong`. `--border-control` aliases `--border-strong` (v1.2.0). |
| `on-*` partners for solid fills | Radix, Material 3 | `--fg-on-primary`, `--fg-on-error`, `--fg-on-inverse`. |
| Showcase consumes canonical CSS | Open Props, Tailwind share-theme | Showcase copies `tokens.css` and `components.css` at build time. `preview/` deleted. |
| Theme via `data-*` | Primer, Atlassian, Open Props | `html[data-theme]`. Hue themes remap `--brand-*`. Forge remaps five axes. |
| MIT and provenance honesty | Open Props norms, Core charter | `LICENSE`, OFL, no named-system derivation claims. |
| Token rename = breaking | Radix releases, Atlassian | [token-contract.md](../token-contract.md) SemVer section. Changelog old→new maps. |
| Kernel / fork / product layers | Spectrum cascade | [extending.md](../extending.md). No Spectrum data pipeline. |

## Documented in 1.2.0, not built as tooling

- Public vs private list and Core-specific step→use-case tables (Radix idea, Core's 10-step ramps).
- Three override layers and type-compatible overrides (Spectrum idea).
- SemVer policy for public tokens.

## Deferred

Do not start these without a consumer and a charter check.

| Item | Source | Why later |
|---|---|---|
| Style Dictionary / JS `token()` | Primer, Atlassian, Spectrum | Fights the small CSS kernel. |
| OKLCH dynamic brand pack | Open Props palette | Discrete `--brand-*` is the default. |
| High-contrast / colorblind theme packs | Primer | Valuable. Not required for the kernel contract. |
| Full 12-step ramps | Radix Colors | Core's ramp is 10 steps (`25` to `800`). Document use. Do not fake 12. |
| Catalogue growth | (none) | Charter: no new components without a derived consumer. |

Known leftover: recipes still name `--white` for opaque fills. Prefer `--bg-base` in new work.
