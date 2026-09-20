# 0004: No catalogue expansion without a derived consumer

**Status:** Accepted  
**Date:** 2026-08-04

## Context

Component count is not a maturity measure. A small kernel with honest contracts is the product. Adding tables, alerts, or modals because other systems have them fails charter §4 (generality, evidence, a real consumer).

## Decision

Do not add a `.ds-*` recipe unless a derived consumer needs it and the generic part separates from that consumer’s domain. Build the pattern in the fork first. Promote it only when a second use appears, or when the first use is clearly reusable and passes admission criteria.

Deferred catalogue items are listed in [research/comparable-foundations.md](../research/comparable-foundations.md).

## Consequences

- Docs must not describe unshipped components.
- Steward releases do not grow the catalogue “to look complete.”
- Optional capabilities stay optional. See charter §3.2 and §6.
