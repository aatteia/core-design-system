# Extending Core

Core is a kernel. A derived system overrides tokens. It does not fork `components.css`
unless it is replacing a recipe.

## Layers

| Layer | Where | Override? |
|---|---|---|
| Primitives (ramps) | `--brand-*`, `--neutral-*`, `--info-*`, `--success-*`, `--warning-*`, `--error-*`, `--focus-500`, `--font-*`, `--text-*`, `--space-*`, `--radius-*`, `--control-*` | Yes, on a theme wrapper. Recipes must not read these. |
| Semantic roles | `--primary`, `--fg-*`, `--bg-*`, `--border-*`, `--focus-ring` | Yes, if a primitive remap is not enough. This is what recipes consume. |
| Recipes | `.ds-*` in `components.css` | No, unless you are replacing that component. |
| Showcase chrome | `.sc-*` | Not part of Core. Do not ship it. |

Public roles vs private ramps: a fork recolours `--brand-*` or `--focus-500`. Recipes stay on roles (`--primary`, `--border-focus`, `--fg-on-primary`). Do not point a recipe at a ramp step.

`--border-default` is decorative. Interactive edges use `--border-strong`.
Invalid fields use `--border-error`.
Keyboard focus is `outline: var(--focus-ring)`. `--focus-ring` is `2px solid var(--border-focus)`. Recolour via `--focus-500`.

Status colour in recipes uses `--fg-info` / `--fg-success` / `--fg-warning` /
`--fg-error` and matching `--bg-*` roles (`--bg-error-subtle`, `--bg-error-strong`,
`--bg-error-strong-hover` for destructive chrome). Strong fills pair with
`--fg-on-primary`, `--fg-on-error`, and `--fg-on-inverse`. Recipes do not reference
`--info-*`, `--success-*`, `--warning-*`, or `--error-*` ramp steps.

`--hit-target` aliases `--control-height` (44px). Compact variants use
`--control-height-sm` (32px) and must be labelled as compact. Large controls
and large icon buttons use `--control-height-lg`. Icon buttons size to those
three height tokens.

`--font-icon` is an empty slot. Core does not ship an icon font and must not load a CDN.

## How to derive a theme

1. Pin the Core version you branched from (`package.json` `version`, currently `1.1.0`).
2. Override primitives on a wrapper such as `html[data-theme="name"]`.
3. Keep role tokens pointing at primitives unless a role must diverge.
4. Check `docs/accessibility.md` against the new primitives. Re-run `node scripts/check-contrast.mjs`.

The showcase **Forge** theme is the falsification case: hue, warm neutrals, type, radius,
and density, tokens only. The live Forge mood is copper, Fraunces, and pill primaries.

## Static HTML

Link the kernel. Apply `.ds` on a root.

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">
<body class="ds">
  <button class="ds-btn ds-btn--primary">Save</button>
</body>
```

Fonts resolve from `fonts/` next to `tokens.css`.
