# Fork cookbook

Short path from Core to a named system. Detail lives in [extending.md](extending.md) and [token-contract.md](token-contract.md).

## Checklist

1. **Pin the Core version.** Read `package.json` `version` (currently `1.2.0`). Record it in the fork README.
2. **Copy or fork** this repository into a new folder or repo.
3. **Hue-only.** Replace the ten `--brand-*` values (`25` → `800`). Stop here if identity is one hue. Do not edit `components.css` for colour.
4. **Optional five-axis.** Recast neutrals, type, radius, and density in tokens. Showcase **Forge** is the proof: same recipes, different identity. Record which public roles changed and why.
5. **Fonts and assets.** Swap files in `fonts/`. Update `--font-*` and the `@font-face` block. Drop a logo into `assets/` (Core ships none).
6. **Re-run contrast.** `node scripts/check-contrast.mjs`. The script checks the default theme and Forge. A fork that remaps roles must still pass those pairs, or extend the script for the new theme.
7. **Showcase (optional).** Point `showcase/src/app/globals.css` Layer 2 at the new ramp. Run `npm run dev` in `showcase/`.

## Done when

- Core version is pinned in writing.
- Recipes still read public roles only. No `--brand-*`, `--neutral-*`, or status ramp steps in product CSS that styles `.ds-*`.
- Keyboard focus is `outline: var(--focus-ring)`. Recolour via `--focus-500`, not a shadow.
- Contrast script exits 0.
- Sample copy is generic. No client-domain names.
- The fork does not claim Core is a client product or in production use.

## Do not

- Add `.ds-*` components to Core without a derived consumer. Build them in the fork first.
- Paste Style Dictionary or Magic Patterns output into the kernel.
- Ship showcase chrome (`.sc-*`).
