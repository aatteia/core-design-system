# Extending Core

Core is a kernel. A derived system overrides tokens. It does not fork `components.css`
unless it is replacing a recipe.

## Layers

| Layer | Where | Override? |
|---|---|---|
| Primitives | `--brand-*`, `--neutral-*`, `--font-*`, `--text-*`, `--space-*`, `--radius-*`, `--control-*` | Yes. This is the public contract. |
| Semantic roles | `--primary`, `--fg-*`, `--bg-*`, `--border-*` | Yes, if a primitive remap is not enough. |
| Recipes | `.ds-*` in `components.css` | No, unless you are replacing that component. |
| Showcase chrome | `.sc-*` | Not part of Core. Do not ship it. |

`--border-default` is decorative. Interactive edges use `--border-strong`.

`--hit-target` aliases `--control-height` (44px). Compact variants use
`--control-height-sm` (32px) and must be labelled as compact.

`--font-icon` is an empty slot. Core does not ship an icon font and must not load a CDN.

## How to derive a theme

1. Pin the Core version you branched from (`package.json` `version`, currently `1.0.0`).
2. Override primitives on a wrapper such as `html[data-theme="name"]`.
3. Keep role tokens pointing at primitives unless a role must diverge.
4. Check `docs/accessibility.md` against the new primitives. Re-run `node scripts/check-contrast.mjs`.

The showcase **Forge** theme is the falsification case: hue, warm neutrals, type, radius,
and density, tokens only.

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
