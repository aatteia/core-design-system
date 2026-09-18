# Core Design System

Brand-agnostic design-system kernel. Canonical source is `tokens.css` and `components.css`.

## Run the showcase

From `showcase/`: `npm install`, then `npm run dev` or `npm run build`.

Public URL: https://core-design-system.pages.dev

## Honesty

Do not claim Core is derived from a named third-party design system.
Do not claim Core is production-ready or in client use.
Do not put client-domain sample copy in the showcase.

## Kernel vs fork

Hue-only rebrand: override `--brand-*`.
A deeper fork can also recast neutrals, type, radius, and density in tokens.
Do not edit `components.css` for those. Forge is the five-axis proof.

## Version

See root `package.json` and `CHANGELOG.md`. Forks pin to the Core version they branched from.
