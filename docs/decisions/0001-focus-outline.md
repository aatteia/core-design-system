# 0001: Keyboard focus is an outline, not a shadow

**Status:** Accepted  
**Date:** 2026-09-20

## Context

Focus used to be documented as a magenta ring via `--shadow-focus` (`0 0 0 3px`). Recipes already drew a 2px `outline`. Two mechanisms meant forks could recolour the unused shadow and think they had changed focus.

## Decision

Public keyboard focus is `--focus-ring`: `2px solid var(--border-focus)`. Recipes set `outline: var(--focus-ring)`. Recolour through `--focus-500` (private) → `--border-focus` (public). `--shadow-focus` is removed.

## Consequences

- Forced-colors still restyles focus to `3px solid Highlight` in `components.css`.
- Changing focus colour is a token override, not a recipe edit.
- A drop-shadow must not be the only focus cue.
