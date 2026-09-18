# Core — implementation plan

**Repository:** `https://github.com/aatteia/core-design-system`
**Baseline audited:** 4 August 2026 (against working tree, not documentation)
**Supersedes:** `archive/2026-08-04-original-strategic-plan.md`
**Companion:** `../charter.md` — product definition, principles, admission criteria, non-goals

---

## 1. How to use this document

The product thinking lives in `docs/charter.md`. This document is only the work: what is
broken, what to do about it, in what order, and how to know it worked.

The audit in §2 was run against the source, not inferred. Every finding cites a file and line
and can be re-verified with the command given. Where a finding contradicts the README, SKILL.md
or the archived strategic plan, **the source wins.**

Two increments are specified in full — **Increment 0** (§4, publication readiness) and
**Increment 1** (§5, make the existing promise true). Everything beyond them is a trigger
condition, not a schedule (§7, and charter §6). This is deliberate: the repository is 583 lines
of CSS with one consumer. Planning ten stages of governance over it would cost more than the
source is worth.

**Increment 0 is a gate, not a phase.** The repository is already public with unresolved
provenance (F8). Nothing else should be worked on, and Core should not be shown to anyone,
until it is done.

---

## 2. Audit findings

Run on the working tree at 4 August 2026.

### F1 — `preview/` is a second design system, not a preview

**Resolved 18 September 2026.** `preview/` was deleted. Showcase is the demonstration.
Static HTML use is documented in `docs/extending.md`.

```css
/* preview/components-alerts.html:9 */
background:#EBF3FB;color:#00386B;border-radius:4px;padding:12px 14px;
font-family:'Open Sans';font-size:14px;line-height:20px
```

This is not drift from a shared source — there is no shared source. `preview/` is an
independent, hand-maintained set of design decisions that happens to resemble the canonical
CSS today and has no mechanism to stay resembling it.

It also carries two things the charter forbids:

- **An external CDN dependency** — Font Awesome from `cdnjs.cloudflare.com`, in 6 files.
- **Domain-specific content** — resolved 17 September 2026. Preview sample copy is generic.

`package.json` ships `preview/` to consumers.

```bash
grep -c 'ds-' preview/*.html | grep -v ':0' || echo "no ds-* classes in any preview file"
```

### F2 — The README's central promise is false

README line 20:

> replace the ten `--brand-*` values … **nothing else needs touching for colour**

`components.css` reached past the semantic layer into primitive palettes at **13 sites**, plus
one hardcoded hex (4 August 2026). **Resolved 17 September 2026:** those sites now use semantic
roles (`--bg-disabled`, `--fg-disabled`, `--fg-placeholder`, `--border-hover`, `--fg-info`,
`--fg-success`, `--fg-warning`, and siblings). `components.css` contains no primitive-palette
references and no hardcoded hex colours.

The theme switcher in the showcase still overrides `--brand-*` only. Hue switching works.
Neutral, type, radius, and density remain a single Core choice until T5.

```bash
grep -nE '#[0-9a-fA-F]{3,6}' components.css   # → empty when T1 holds
```

### F3 — The showcase hand-copies the canonical CSS

`showcase/src/app/core-tokens.css` and `core-components.css` are **byte-identical** to the
canonical files, except that font URLs gain a leading `/`. They are kept in sync by hand.

```bash
diff <(sed 's|url("fonts/|url("/fonts/|g' tokens.css) showcase/src/app/core-tokens.css
diff components.css showcase/src/app/core-components.css
```

Both are currently clean. Nothing keeps them that way.

Note: the archived plan characterised the showcase as possibly "duplicating or reinterpreting
canonical component decisions." It does not. The showcase consumes the real `ds-*` API
faithfully and is the only artefact in the repository that does. Its defect is file
duplication, which is a build-step problem, not an architecture problem.

### F4 — There is no accessibility baseline to inherit

Charter §2.6 commits Core to carrying accessibility downstream. The source currently has:

- **zero** occurrences of `prefers-reduced-motion`, `forced-colors`, `prefers-contrast` or
  `prefers-color-scheme`
- no dark mode, no high-contrast mode
- no published contrast data

Measured contrast on shipped defaults (sRGB, WCAG 2.2). Re-measured 17 September 2026 after
the `--neutral-*` recast:

| Pair | Ratio | Required | Result |
|---|---|---|---|
| Input border `--border-strong` (`--neutral-300` #8A8C99) on white | 3.34 | 3.0 (SC 1.4.11) | **pass** (was 2.24) |
| `--border-default` (`--neutral-200` #DDDEE3) on white | 1.34 | 3.0 if used as a control edge | decorative only; documented as such |
| Placeholder `--fg-placeholder` (`--neutral-400` #6E7181) on white | 4.84 | 4.5 (SC 1.4.3) | **pass** (was 3.64) |
| `--fg-default` on white | 14.68 | 4.5 | pass |
| Badge tint/text pairs (700 on 100) | 5.06 – 8.45 | 4.5 | pass |
| Primary button, link, focus ring (default theme) | 5.15 – 9.07 | 4.5 | pass |
| Showcase Amber `--brand-600` #B97700 with white | 3.68 | 4.5 | **fail** (demo theme only) |

`--hit-target: 48px` is still declared and consumed by nothing. Actual minimums are 40px
(`.ds-btn`), 32px (`.ds-btn--sm`), 44px (inputs). The token is documentation, not a constraint.

### F8 — Core is already public, with unresolved provenance `[GATE]`

`github.com/aatteia/core-design-system` returns **HTTP 200 unauthenticated**. `LICENSE` is MIT
as of 17 September 2026. `package.json` still has `"private": true` (packaging remains deferred).

Three categories of material are publicly visible that should not be.

**(a) Derivation claims about a named third-party system.**

On 4 August 2026, twelve comments and changelog lines across README, CHANGELOG, `tokens.css`,
and the showcase copy of `tokens.css` described Core as distilled from, parity-checked against,
or a superset of a named third-party design system. Token comments attributed the type scale
and the radius ramp to that system, not only the colour palettes.

Those named-system strings were removed on 17 September 2026. Remaining provenance work is
values and sample content, not the name. Do not reintroduce a named third-party system as
Core's source (charter §2.10).

**(b) Client-derived values.** **Resolved 17 September 2026.** Former named secondary palettes
were deleted. Core now ships `--neutral-*` (cool grey, contrast-authored) and regenerated
status ramps. `--brand-*` indigo-slate remains the placeholder identity layer.

**(c) Client-domain sample content.** **Resolved 17 September 2026** in `preview/` and
`README.md`. Sample copy is generic (account, booking, project table). Do not restore
service-specific enrolment, ballot, or election-results content.

**Why this is the gate.** Per the record (D26, refined 2026-07-12), the client system Adam
worked with was authored and maintained by two dedicated designers. Adam consumed and
extended it. A subset of his DEM-specific components was adopted upstream through the design
lead's governance. That is a real and creditable contribution. It is not ownership, and it is
not a basis for publishing Core as distilled from that system. A self-directed public artefact
must never read as private reuse of client work (charter §2.10). The same guardrail already
governs the retired MAMS prototype and named-system mentions in `poc-mhr-connect-prototype`.

```bash
# Named-system attribution strings must not reappear in this repository.
git grep -niE 'enrol|ballot|postal vote|first-pref|2PP' -- . ':!docs/'
```

### F9 — The showcase is deployed but authentication-gated

**Resolved 18 September 2026.** The showcase is public on Cloudflare Pages:
`https://core-design-system.pages.dev`. Production is `main`. Preview Access is off.

The old `core-design-system.vercel.app` host was a gated project on another Vercel account.
This Hobby Vercel team has no Core project. Do not send readers there.

```bash
curl -s https://core-design-system.pages.dev | grep -c 'ds-btn'    # → >0 when reachable
```

### F5 — The licence blocks the product thesis `[DECIDED: MIT]`

```json
"license": "MIT",
"private": true,
"files": ["tokens.css", "components.css", "fonts/", "preview/", "README.md", "SKILL.md", "LICENSE"]
```

**Resolved 17 September 2026 (P2):** `LICENSE` is MIT, `package.json` declares `"license": "MIT"`,
and `fonts/OFL.txt` covers Inter, Roboto, and Open Sans. `"private": true` is kept because
charter §6 still defers npm packaging. GitHub repo description and homepage remain owner
actions.

### F6 — Inherited palettes are brand residue

**Resolved 17 September 2026 (P1 colour + T1).** Former named secondary palettes are gone.
`--neutral-*` is the spine. Status ramps were regenerated so they no longer alias another
palette's hex values. `-700` steps exist for badge text.

### F7 — Where the archived plan was right

Recorded so the rewrite is not mistaken for a rejection:

- Stage 3's hypothesis about primitive colour references (F2) — correct, and understated.
- Stage 4's suspicion about preview/canonical divergence (F1) — correct, and badly understated.
- §4.10 "colour switching alone is not enough" — an accurate criticism of the current showcase.
- §9 Non-goals — kept nearly intact in the charter.
- §6 admission criteria — kept, with the scope qualification that they gate additions, not repairs.

---

## 3. What the audit changes about the sequence

The archived plan ordered work as: contract → extension model → tokens → reconcile sources →
packaging → components → derived systems → testing → contribution → documentation, with the
derived-system proof at stage 7 of 10.

Invert it. **The proof is the audit.** A second theme that changes more than hue costs an
afternoon and fails immediately at F2 — which tells you more about the token architecture than
a stage of analysis would. Build the cheap falsification first and let it drive the fixes.

Four further re-orderings follow from the findings:

- **Provenance and publication (F8, F9, F5) become Increment 0**, ahead of everything. The
  archived plan had no concept of this because it assumed the repository was not yet public. It
  is. Nothing else matters while Core publicly claims a derivation it should not claim.
- **Accessibility (F4) moves ahead of new components**, not after them. A baseline that
  constrains design is worth something; an audit bolted on afterwards is rework. P1's palette
  regeneration is where it gets designed in, since the ramps are being rebuilt anyway.
- **Packaging (archived Stage 5) leaves the plan entirely** and becomes a trigger in charter §6.
  It contradicted the archived plan's own §4.8 and non-goals.
- **The portfolio and record work becomes a named increment (§6)** rather than an afterthought.
  Core is already cited in the Career Profile record; the record and the artefact have to agree.

**A note on why F8 was missed.** The archived plan's Stage 0 asked good questions about source
relationships and licence metadata, but it took the README's account of Core's origins as
background rather than as a claim to verify. The README said organisation-specific content
was removed; the token files still carried named-system attribution in their comments. This
is the house rule in practice. A producer doc is raw input, never evidence. Check the source.

---

## 4. Increment 0 — publication readiness `[GATE]`

**Goal:** Core is honestly and legally publishable, and reachable by a human.
**Size:** 3–5 days. **Owner decisions taken 2026-08-04:** recast as original work; MIT.

Until P1–P3 are done, the repository is publicly asserting a derivation it should not assert.
That is the reason this increment precedes everything, including work already specified below.

### P0 — Stop the exposure `[owner action, immediate]`

Set `github.com/aatteia/core-design-system` to **private** while P1–P3 are in progress, and
restore public visibility at P5. This is the MAMS precedent: private first, then remediate, then
republish.

If you would rather not flip visibility, P1–P3 are ~2 days of work and can be done on a branch
and landed in one commit — but the repository stays exposed meanwhile. That is a judgement call
about exposure duration, not about whether to remediate.

### P1 — Recast the token foundations as original work

The decision is **recast, not attribute**: Core becomes what it already claims to be — a
brand-neutral foundation authored by Adam — with nothing traceable to a client system.

Three foundations were attributed to a named third-party system and must be regenerated:

1. **Colour. Done 17 September 2026.** Former named secondary palettes are deleted.
   `--neutral-25 … -800` is authored to hit the T3 contrast targets. Status ramps were
   regenerated (no longer aliases of another palette) and gained `-700` steps for badge text.
   `--brand-*` indigo-slate remains the placeholder identity layer.
2. **Type scale. Done 18 September 2026.** 16px base. Sizes snap to the 4px grid.
   Body 12–18. Headings 20–36. Display 44 and 52.
3. **Radii. Done 18 September 2026.** 4, 8, 12, 16 on the 4px grid. Pill 200px so
   capsules stay round at shipped control heights.

**This subsumes F6 and the palette half of T1.** Do P1 before T1 — T1's semantic-role mapping
should target the new ramps, not the old ones.

**Done when:** no file names a third-party system as Core's source, and every ramp in
`tokens.css` has a documented derivation rule rather than a source attribution.

### P2 — Licence and package metadata

**Done 17 September 2026** except GitHub description/homepage (owner). Remaining: `.ds-`
prefix status (public API vs renameable).

### P3 — Purge client-domain sample content

**Done 17 September 2026.** Preview and README sample copy is generic. Keep it that way.

### P4 — Rewrite README and CHANGELOG as original work

- **`README.md` origin paragraph** — done 17 September 2026. Keep the text as what Core is and
  the judgement behind it: which decisions are genuinely universal across design systems and
  which are always organisation-specific. That is the more interesting claim, it is Adam's own,
  and it needs no third party to stand up. Do not restore a named-system derivation sentence.
- **`CHANGELOG.md`** — named-system parity and client-brand exclusion sections removed
  17 September 2026. A changelog records changes to Core, not its relationship to another
  system. Do not restore them.
- Add a short **provenance note**: Core is original work, released under MIT, informed by the
  author's professional practice in government and enterprise design systems. Method and
  judgement, never derivation from a named system (charter §2.10).

**Done when:** no shipped file names a third-party system, and the README's account of Core's
origins is true as written.

### P5 — Make it reachable

**Done 18 September 2026.** Showcase is public at `https://core-design-system.pages.dev`
(Cloudflare Pages, Git-connected, root `showcase`, output `out`). GitHub About homepage is
set. README leads with the live URL. Keep Preview Access public. Do not add noindex headers.

**Holds when:** `curl -s https://core-design-system.pages.dev | grep -c 'ds-btn'` returns > 0.

---

## 5. Increment 1 — make the existing promise true

**Goal:** everything Core currently claims about itself becomes verifiable from the source.
No new capabilities. No new architecture.

**Size:** 1–2 weeks. **Prerequisite:** Increment 0 complete.

> **T0 (licence and package metadata) has moved to P2.** It was the blocking owner decision;
> it is now decided (MIT) and belongs with the publication gate.

### T1 — Purge primitive references from `components.css`

**Done 17 September 2026.** Semantic roles `--bg-disabled`, `--bg-hover-subtle`, `--fg-disabled`,
`--fg-placeholder`, `--border-disabled`, `--border-hover`, `--fg-info`, `--fg-success`, and
`--fg-warning` exist in `tokens.css` and are consumed by `components.css`. Placeholder contrast
meets 4.5:1 on white.

**Constraint:** `--fg-subtle` and friends already exist and are correct — extend the semantic
layer, don't build a parallel one.

**Holds when:**

```bash
grep -cE '#[0-9a-fA-F]{3,6}' components.css   # → 0
```

### T2 — Resolve `preview/`

**Done 18 September 2026 (a): deleted.** Showcase is the canonical demonstration.
`package.json` no longer ships `preview/`. No `cdnjs` dependency remains.

### T3 — Establish the accessibility baseline

**Done 18 September 2026.** Default-theme pairs in `docs/accessibility.md` pass.
`--motion-duration` is 0ms under `prefers-reduced-motion`. `forced-colors` restyles
focus and borders. `--hit-target` aliases `--control-height` (44px). Compact is 32px.
Amber `--brand-600` is `#8A5800` (4.5:1 on white).

**Holds when:** `node scripts/check-contrast.mjs` exits 0.

### T4 — Single-source the showcase CSS

**Done 18 September 2026.** `showcase/next.config.ts` copies `tokens.css` and
`components.css` on every Next load. `showcase/src/app/core-*.css` is gitignored.

**Holds when:** `test ! -f showcase/src/app/core-tokens.css` in a clean checkout before build,
and `npx next build` recreates the copies.

### T5 — The falsification theme

**Done 18 September 2026.** Showcase theme `forge` overrides hue, warm neutrals, type,
radius, and density. `components.css` is untouched by the theme.

**Holds when:** Forge is visually distinct from Indigo, and the theme lives in
`showcase/src/app/globals.css` plus `theme-context.tsx` only.

### T6 — Correct the documentation

**Done 18 September 2026.** README kernel/fork, live URL, no hours claim, no `preview/`.
SKILL.md has a derive-through-tokens mode. `docs/extending.md` names public layers.
CHANGELOG records the breaking token and preview changes.

**Done when:** every factual claim in README and SKILL.md can be checked by a command, and the
commands pass.

---

## 6. Increment 2 — portfolio and record

**Goal:** Core is legible as evidence of design-system authorship, and the Career Profile
record says so accurately.
**Size:** 2–3 days. **Prerequisite:** Increment 0. (T5's falsification theme makes R1 much
stronger, so prefer running it after Increment 1.)

Core is **already backed** in the record — `PROTOTYPES-2026` claims C04, C07–C11 describe this
system directly (reusable component library, swappable brand layer, four-palette switcher,
framework-agnostic CSS, theme reuse across prototypes), and C27 covers publishing for public
inspection. This is an **update**, not an intake. Do not author a new project.

### R1 — Make the repository legible to a human reader

A recruiter or panel member spends two minutes here. Today they land on a README describing a
fork workflow.

- **Showcase link at the top**, above everything (depends on P5).
- **A short "what this is and why" section** — the problem Core solves, the judgement about what
  belongs in a foundation versus a derived system, and the swappable-brand demonstration. Point
  at `docs/charter.md` for the reasoning; the charter is itself portfolio evidence, because it
  shows the thinking, not just the output.
- **Screenshots** of the same components under two themes — the fastest possible proof of the
  central claim, and it survives someone who never clicks through.
- Do **not** describe Core as production-ready or in use. It is a self-directed foundation with
  one derived theme. Overstating is the failure mode the record's own disclosure rules exist to
  prevent.

### R2 — Update the record `[career-profile repo]`

Four changes, all in `AAA – Career Profile.json`. Record first, outputs second (D01).

1. **Fix the repo name.** The evidence line at `:95` cites `atteia-design-system`, first commit
   2026-06-27. That repo now 404s — it was renamed `core-design-system`. Correct the evidence
   string; the date and the corroboration remain valid.
2. **Add the public URL** to `PROTOTYPES-2026`'s artefact references — repo plus the showcase,
   once P5 makes it reachable. C27 currently names only the two `poc-*` demos as live; Core
   becomes the third and is the one that best evidences design-system authorship.
3. **Add an MIT/open-source claim** if it survives the constitutions' bar — releasing a
   foundation under an open licence for others to adopt is a distinct, evidenced act, and no
   current claim covers it. Draft it; let the gauntlet decide.
4. **Check the disclosure obligation.** D43 requires self-directed work modelling a public
   government service to carry a non-deselectable disclosure claim. Core models no service, so
   C12/C19/C26's disclosure pattern may not apply — but P3 removes the electoral sample content
   precisely so that no reader could infer one. Confirm the position rather than assuming it.

**Constraint:** do not claim derivation from a named third-party design system in the record
either. The record's existing position (D26 — consumed and extended, subset adopted upstream,
never operated) is accurate and creditable, and it belongs to `DEM-2025`, not to Core. Keeping
the two separate is the whole point of P1.

### R3 — Close the sibling provenance items

The same sweep that produced F8 has two known outstanding siblings, both already logged:

- **named-system mentions in `poc-mhr-connect-prototype`** — public, unresolved
- **`aatteia/mams`** — still public and unarchived; the decision to make it private and archive
  it was taken 2026-07-25 and remains the owner's action

Run the F8 sweep across every public `aatteia` repo, not just this one. A provenance rule
enforced on one artefact is not enforced.

```bash
git grep -ciE 'electoral|enrol' -- . ':!docs/'   # in each public repo; also sweep for named-system attribution
```

---

## 7. Verification

**Increment 0** is complete when all of these pass:

```bash
# F8a — no named third-party design system claimed as Core's source
# Confirm with a repo-wide case-insensitive search for retired system names.
# The tree must return no matches. Do not commit the search term back into docs.

# F8c — no client-domain sample content
test -z "$(git grep -niE 'enrol|ballot|postal vote|first-pref|2PP' -- . ':!docs/')"

# F5 — licence present and declared
test -f LICENSE && grep -q '"license": "MIT"' package.json

# F9 — showcase reachable without authentication
test "$(curl -s https://core-design-system.pages.dev | grep -c 'ds-btn')" -gt 0
```

**Increment 1** is complete when all of these pass:

```bash
# F2 — no hardcoded colour in component recipes
test "$(grep -cE '#[0-9a-fA-F]{3,6}' components.css)" = "0"

# F3 — no duplicated canonical source in git
test ! -f showcase/src/app/core-tokens.css

# F1 — no CDN dependency
! grep -rq 'cdnjs\|cdn\.' showcase/src 2>/dev/null

# F4 — accessibility contract exists and is generated
test -f docs/accessibility.md && node scripts/check-contrast.mjs

# T5 — the derived theme touches no component CSS
git diff --name-only main..theme-falsification | grep -qv components.css
```

Plus two manual checks no script can make:

1. **Read the README as a stranger and confirm every claim it makes is true.** F2 and F8 both
   existed because nobody did that.
2. **Read the repository as a hiring panel.** Would a reader conclude this is Adam's own work?
   Would anything make them wonder whose it was? That question is the whole of charter §2.10.

---

## 8. After increment 2

There is no increment 3 specified, and that is intentional. What comes next depends on what the
earlier increments reveal and on whether a second consumer appears.

The candidates, each gated:

| Work | Gate |
|---|---|
| New components (selection controls, alerts, tables, navigation) | A consumer needs one. Each passes charter §4 admission criteria and arrives with the behavioural contract from archived plan §7 Stage 6 — semantics, states, keyboard, focus, content, responsive, a11y, tests, extension points. That standard was good; it is retained. |
| Second derived system | T5's theme proves insufficient — i.e. a real consumer needs structural divergence, not just visual. |
| Packaging / selective consumption | charter §6 trigger: a second consumer demonstrates concrete cost from taking the whole source. |
| Versioning, deprecation, compatibility metadata | A consumer exists to break. |
| Contribution / upstream promotion | An outside contributor exists. |
| Dark mode, RTL, motion, density, data-viz foundations | Separate triggers; a consumer requires each. |

**Stopping rule:** after increment 2, Core is a coherent, honest, accessible, rebrandable
foundation with one proven derived theme, published under MIT, publicly demonstrable, and
accurately recorded. That is a legitimate resting state and a complete portfolio artefact. It is
better to stop there than to build governance for consumers who do not exist.

---

## 9. Working approach

1. Verify each audit finding before acting on it. They were true on 4 August 2026; check them
   again. If one has changed, update §2 rather than working from this text.
2. **Do Increment 0 first, in order.** It is a gate, not a phase — the repository is publicly
   asserting a derivation it should not assert until P1–P4 land. P0 and P5 are owner actions.
3. Prefer substitution over accumulation. If a fix adds a parallel mechanism to an existing one,
   it is the wrong fix.
4. Record consequential decisions and their trade-offs as they are made, in `docs/decisions/`.
   Not a heavyweight ADR process — one file, one decision, the alternative rejected and why.
5. Update documentation in the same change as the code it describes. F2 exists because they
   drifted apart.
6. Record deferred work as a charter §6 trigger, not as a backlog item. A gate with a condition
   is a decision; a backlog item is a debt.
