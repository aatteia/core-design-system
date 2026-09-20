# 0003: Forge is the five-axis falsification theme

**Status:** Accepted  
**Date:** 2026-09-18

## Context

Switching `--brand-*` only proves one variable is indirected. Charter §2.11 requires derived systems that differ on more than hue.

## Decision

Showcase **Forge** (`html[data-theme="forge"]`) is the falsification case. It changes hue, neutrals, type, radius, and density by tokens only. `components.css` does not change. The live mood is copper, Fraunces, Plus Jakarta Sans, JetBrains Mono, softer radii with pill primaries, and 40/32/48 control heights.

Hue-only themes (Teal, Violet, Amber) remain. They are not the proof.

## Consequences

- Contrast script overlays Teal, Violet, Amber, and Forge and checks the same pairs as default.
- A deep fork should record which public roles it remapped and re-run contrast.
- Do not edit recipes to “make Forge look right.”
