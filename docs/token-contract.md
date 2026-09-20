# Token contract

Recipes and forks consume **public** tokens. Numbered colour ramps are **private**.
The kernel is `tokens.css` plus `components.css`. If a name is not public here, do not
use it in a recipe.

Override layers: [extending.md](extending.md). Comparable practice:
[research/comparable-foundations.md](research/comparable-foundations.md).

## Public API

Forks may override these. Recipes may only read these colour names (plus `--white` as
noted below).

### Colour roles

| Token | Role |
|---|---|
| `--primary` | Solid brand fill. Link-weight text on `--bg-base`. |
| `--primary-hover` | Hover fill for primary chrome. |
| `--primary-active` | Pressed fill for primary chrome. |
| `--primary-bg` | Light brand wash (secondary hover). |
| `--primary-tint` | Stronger wash (secondary active, primary badge fill). |
| `--primary-strong` | Brand text on a tint (primary badge). |
| `--bg-base` | Page background. |
| `--bg-subtle` / `--bg-canvas` | Light wash behind content. |
| `--bg-muted` | Muted surface. |
| `--bg-inverse` | Inverted brand surface. |
| `--bg-disabled` | Disabled fill. Tertiary pressed fill. |
| `--bg-hover-subtle` | Tertiary hover wash. |
| `--bg-info` / `--bg-success` / `--bg-warning` / `--bg-error` | Status badge fills. |
| `--bg-error-subtle` | Destructive hover wash. |
| `--bg-error-strong` | Destructive solid fill. |
| `--bg-error-strong-hover` | Destructive solid hover. |
| `--fg-default` | Body text. |
| `--fg-strong` | Headings, field labels, chip text. |
| `--fg-muted` | Supporting copy. |
| `--fg-subtle` | Quiet text (breadcrumb separator). |
| `--fg-disabled` | Disabled text. |
| `--fg-placeholder` | Placeholder text. 4.5:1 on `--bg-base`. |
| `--fg-on-primary` | Text on `--primary` fills. |
| `--fg-on-inverse` | Text on `--bg-inverse`. |
| `--fg-on-error` | Text on `--bg-error-strong`. |
| `--fg-link` / `--fg-link-hover` | Link colour. |
| `--fg-info` / `--fg-success` / `--fg-warning` / `--fg-error` | Status text. |
| `--border-default` | Decorative edge only. Cards, dividers. Not a control. |
| `--border-strong` | Control edge. 3:1 on `--bg-base`. |
| `--border-control` | Alias of `--border-strong`. Same contrast contract. |
| `--border-subtle` | Hairline. |
| `--border-focus` | Focus colour. |
| `--border-disabled` | Disabled control edge. |
| `--border-hover` | Control hover edge. |
| `--border-error` | Invalid field edge. |
| `--focus-ring` | Keyboard outline. `2px solid var(--border-focus)`. |

### Type, space, radius, elevation

`--font-heading`, `--font-body`, `--font-ui`, `--font-mono`, `--font-icon`.
`--fw-light` through `--fw-bold`. `--text-*` / `--lh-*`. `--tracking-*`.
`--space-*`. `--radius-xs` / `--radius-sm` / `--radius-md` / `--radius-lg` / `--radius-pill`.
`--shadow-none` through `--shadow-lg`. `--container-max`. `--container-pad`.

### Control and motion

`--control-height` (default 44px). `--control-height-sm` (compact 32px).
`--control-height-lg` (48px). `--control-pad-y` / `--control-pad-x` and `-sm` / `-lg`.
`--hit-target` aliases `--control-height`. `--motion-duration` (120ms; `0ms` under
`prefers-reduced-motion`). `--motion-easing`.

## Private primitives

Do not reference these in `components.css` or in product CSS that styles `.ds-*`.
Override them on a theme wrapper so public roles follow.

| Family | Names | Notes |
|---|---|---|
| Brand ramp | `--brand-25` … `--brand-800` | Hue-only rebrand. |
| Neutral spine | `--neutral-25` … `--neutral-800` | Cool grey. Forge remaps these. |
| Black tints | `--black-25` … `--black-900` | Behind `--fg-strong` and `--fg-muted`. |
| White | `--white` | Behind `--bg-base` and `on-*` fills. |
| Status ramps | `--info-*`, `--success-*`, `--warning-*`, `--error-*` | Roles only in recipes. |
| Focus primitive | `--focus-500` | Colour behind `--border-focus`. |

`--focus-500` is the primitive. `--border-focus` and `--focus-ring` are public.

**Exception.** `components.css` still uses `--white` for opaque fills on secondary
buttons, cards, inputs, and chips. New recipes should use `--bg-base`. Do not add
further ramp references.

## Brand steps

Core ships a **10-step** `--brand-*` ramp (`25` to `800`). It is not a Radix 12-step
scale. Unused steps stay in the ramp so a fork can fill them without renaming.

| Step | Public role today | Use in kernel recipes |
|---|---|---|
| 25 | none | Unused. Lightest wash. |
| 50 | `--primary-bg` | Secondary button hover. |
| 100 | `--primary-tint` | Secondary button active. Primary badge fill. |
| 200 | none | Unused. |
| 300 | none | Unused. |
| 400 | none | Unused. |
| 500 | none | Unused. |
| 600 | `--primary`, `--bg-inverse`, `--fg-link` | Solid fill. Inverse surface. Default link. |
| 700 | `--primary-hover`, `--primary-strong`, `--fg-link-hover` | Hover fill. Badge text. Link hover. |
| 800 | `--primary-active` | Pressed fill. |

Interactive brand surfaces use 50 and 100. Solid chrome and link text use 600 to 800.
There is no brand border step. Control borders use `--neutral-*` via `--border-strong`.

## Neutral steps

Same 10-step shape. Contrast comments in `tokens.css` are the contract:
`--neutral-400` meets 4.5:1 on white. `--neutral-300` meets 3:1 on white.

| Step | Public role today | Use in kernel recipes |
|---|---|---|
| 25 | `--bg-subtle`, `--bg-canvas` | Page wash. |
| 50 | `--bg-muted`, `--bg-hover-subtle` | Muted surface. Tertiary hover. |
| 100 | `--bg-disabled`, `--border-subtle` | Disabled fill. Hairline. |
| 200 | `--border-default`, `--border-disabled` | Decorative / disabled edge. |
| 300 | `--border-strong`, `--border-control` | Control edge. 3:1 on white. |
| 400 | `--fg-subtle`, `--fg-disabled`, `--fg-placeholder` | Supporting text. 4.5:1 on white. |
| 500 | none in default | Forge remaps `--border-strong` here. |
| 600 | none in default | Forge remaps placeholder / subtle / disabled text here. |
| 700 | `--border-hover` | Input hover edge. |
| 800 | `--fg-default` | Body text. |

`--fg-strong` and `--fg-muted` come from `--black-800` and `--black-500`, not from
`--neutral-*`.

Backgrounds sit at 25 to 50. Decorative borders at 100 to 200. Control borders at 300
(Forge: 500). Text at 400 and 800.

## Status ramps (private)

Recipes use roles only. Mapping in `tokens.css` today:

| Role | Primitive |
|---|---|
| `--bg-*-` badge fills | `*-100` |
| `--bg-error-subtle` | `--error-50` |
| `--bg-error-strong` | `--error-600` |
| `--bg-error-strong-hover` | `--error-500` |
| `--border-error` | `--error-600` |
| `--fg-info` / `--fg-success` / `--fg-warning` / `--fg-error` | `*-700` |

`--warning-400` exists and has no public role.

## SemVer

Public tokens are the API.

- **Renaming or removing a public token is a breaking change.** Bump the major version.
- When a public token is renamed, `CHANGELOG.md` must include an old→new map.
- Adding a public alias (`--border-control` → `--border-strong`) is a minor.
- Private ramp hex changes are minor if public roles still resolve and contrast still
  passes.
- Forks pin the Core version they branched from (`package.json` `version`).

Keep overrides type-compatible: a colour token stays a colour. A length stays a length.
Record why a deep fork overrode a role. See [extending.md](extending.md).
