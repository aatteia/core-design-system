# 0005: Preview deleted; showcase is the demo

**Status:** Accepted  
**Date:** 2026-09-18

## Context

`preview/` was a second, hand-maintained design system. It did not use `.ds-*`. It drifted. It pulled a CDN. It was not a consumer of the kernel.

## Decision

Delete `preview/`. The Next.js showcase is the demonstration. It copies `tokens.css` and `components.css` at build time. Static HTML use is documented in [extending.md](../extending.md).

## Consequences

- Do not restore `preview/` as a parallel source of truth.
- Showcase chrome (`.sc-*`) is not part of Core. Forks must not ship it.
- Claims about “what Core looks like” point at https://core-design-system.pages.dev.
