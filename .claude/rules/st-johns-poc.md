<!-- managed by Automatic — do not edit by hand -->

# St John's Churchyard PoC

Five-family proof of concept for a historical knowledge base of St John the Baptist Churchyard, Reid, Canberra. Seed families: Guise, Kinlyside, Alward, Lindop, Baker.

Read these before changing data or the demo:
- `docs/plans/POC_FIVE_FAMILIES.md`
- `docs/data-model-mvp.md`
- `docs/demo-design.md`
- `docs/decisions/entity-resolution-golden.md`

## Claims vs structure

Typed tables hold stable links: person, plot, interment, memorial, relationship, place, source.

Contested values live as claims with evidence: dates, inscriptions, burial vs memorial-only, name variants, reinterment narrative.

Never store a single flattened "correct" death date on `person` without a claim trail.
Never silently resolve conflicting sources.
Never invent precision. Keep approximate dates approximate.
Never treat a memorial as proof of burial.
Never merge same-name people without evidence. Follow the golden cases.

AI-assisted prose in family research packs is `source_type=research_note`. It is never primary evidence beside Salisbury, ACI, registers, or newspapers.

## Demonstrator

The parish site is static HTML generated from `data/canonical/poc.sqlite` into `app/demo/`.

No SPA. No backend. No login. No public hosting in this PoC.
Do not hand-edit facts in generated HTML. Change YAML claim packs or ingest scripts, then rebuild.

Audience: older parish volunteers. Body text at least 18px. High contrast. Visible skip link and focus. Do not use colour alone for conflict status. Respect `prefers-reduced-motion`.

Public pages use short copyright-safe summaries and source locators. Do not paste Salisbury biographical prose wholesale.

Visual foundation: vendored Core at `app/demo/vendor/core/` plus St John's `theme.css` and `demo.css`. Do not introduce a new design system or purple-gradient product styling.

## How to run

Always from the repository root, not from `app/demo/`:

```bash
python3 -m pip install -r requirements.txt
python3 scripts/ingest/load_poc.py
python3 scripts/demo/build_demo.py
```

Canonical database: `data/canonical/poc.sqlite` (gitignored). Rebuild it. Do not treat a missing sqlite file as a schema bug.

## Out of scope until the PoC passes

Bulk ACI ingest, columbarium, military-graves pack, GPS/GIS, public internet deployment, NL/AI assistant, full life-event graph.
