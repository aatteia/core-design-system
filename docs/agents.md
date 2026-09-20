# Agent pack

Read this before changing Core. Then stop. The files below are the source of judgement.

## Read first

1. [Charter](charter.md). What Core is, admission criteria, non-goals.
2. [Token contract](token-contract.md). Public roles vs private ramps. SemVer.
3. [Docs hub](README.md). External vs steward paths.

Canonical CSS is `tokens.css` and `components.css`. Docs that disagree with those files are wrong.

## Honesty

- Do not claim Core is derived from Attica or any named third-party design system. Method and judgement, never derivation.
- Do not claim Core is production-ready or in client use. It is a foundation with a live showcase.
- Do not put client-domain sample copy in the showcase or in examples.

## Tokens

Prefer public roles (`--primary`, `--fg-*`, `--bg-*`, `--border-*`, `--focus-ring`). Do not point recipes at `--brand-*`, `--neutral-*`, `--focus-500`, or status ramp steps.

Keyboard focus is `outline: var(--focus-ring)`, not a shadow.

## Catalogue

Do not add a `.ds-*` component unless a derived consumer needs it. See [0004](decisions/0004-no-catalogue-without-consumer.md).

Do not introduce Style Dictionary or Magic Patterns into the kernel.

## Fork vs kernel

Hue-only: `--brand-*`. Five-axis proof: showcase Forge. Do not edit `components.css` for brand, neutrals, type, radius, or density.

## Releases

Follow [steward-runbook.md](steward-runbook.md). Pin forks to the Core version in `package.json`.
