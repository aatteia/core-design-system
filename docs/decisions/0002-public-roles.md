# 0002: Recipes use public roles, not private ramps

**Status:** Accepted  
**Date:** 2026-09-18

## Context

Hue-only rebrand only works if recipes read semantic names. References to `--brand-*`, `--neutral-*`, or `--error-*` in `components.css` force every fork to edit recipes.

## Decision

`components.css` may read public roles only: `--primary*`, `--fg-*`, `--bg-*`, `--border-*`, `--focus-ring`, plus type, space, radius, elevation, and control tokens listed in [token-contract.md](../token-contract.md). Numbered ramps stay private.

**Exception:** some opaque fills still use `--white`. New recipes should use `--bg-base`.

## Consequences

- Renaming a public token is a breaking change. Changelog must include an old→new map.
- Adding `--border-control` as an alias of `--border-strong` is a minor.
- Product CSS that styles `.ds-*` follows the same rule.
