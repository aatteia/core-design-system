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

The 26 files in `preview/` contain **zero** `ds-*` classes and load neither `tokens.css` nor
`components.css`. Every value is hardcoded.

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
- **Domain-specific content** — "You're successfully enrolled to vote", "Enrolments close at
  8 pm tonight". Electoral-service copy inside a brand-neutral foundation (charter §2.7).

`package.json` ships `preview/` to consumers.

```bash
grep -c 'ds-' preview/*.html | grep -v ':0' || echo "no ds-* classes in any preview file"
```

### F2 — The README's central promise is false

README line 20:

> replace the ten `--brand-*` values … **nothing else needs touching for colour**

`components.css` reaches past the semantic layer into primitive palettes at **13 sites**, plus
one hardcoded hex:

| Line | Declaration | Problem |
|---|---|---|
| 55, 68, 81, 176 | `var(--nobel-100 / -200 / -400 / -50)` | disabled states pinned to a fixed grey ramp |
| 77, 78 | `var(--nobel-50 / -100)` | tertiary button hover |
| 164 | `var(--nobel-400)` | input placeholder |
| 167 | `var(--nobel-700)` | input hover border |
| 189, 190 | `var(--nobel-100 / -800)` | neutral badge |
| 234 | `var(--nobel-400)` | breadcrumb separator |
| 193 | `var(--smalt-700)` | **info badge text — inherited Attica navy** |
| 194 | `var(--cerulean-700)` | **success badge text — inherited Attica teal** |
| 195 | `#6B4400` | **hardcoded hex, no token at all** |

Rebrand today and the info badge stays Attica navy, the success badge stays Attica teal, the
warning badge stays an untokenised brown, and every grey in the system is immovable. The
theme switcher in the showcase overrides `--brand-*` only — so it demonstrates precisely the
one axis that works.

This is the single highest-value defect in the repository. It is the difference between the
derived-system thesis being true and being aspirational, and it is roughly 20 lines of edits.

```bash
grep -nE 'var\(--(nobel|smalt|cerulean|mauve)|#[0-9a-fA-F]{3,6}' components.css
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

Measured contrast on shipped defaults (sRGB, WCAG 2.2):

| Pair | Ratio | Required | Result |
|---|---|---|---|
| Input border `--border-strong` (#ADADAD) on white | **2.24** | 3.0 (SC 1.4.11) | **fail** |
| `--border-default` (#EBEBEB) on white | **1.19** | 3.0 (SC 1.4.11) | **fail** |
| Placeholder `--nobel-400` (#868686) on white | **3.64** | 4.5 (SC 1.4.3) | **fail** |
| `--fg-subtle` (#868686) on white | 3.64 | 4.5 | fail as body text; ok for large/UI |
| Disabled text #868686 on #F2F2F2 | 3.25 | — | exempt (SC 1.4.3 disabled exemption) |
| All four badge tint/text pairs | 6.70 – 12.30 | 4.5 | pass |
| Primary button, link, focus ring | 5.15 – 9.07 | 4.5 | pass |

The default state of every text input in the system fails non-text contrast. Placeholder text
fails normal-text contrast and is **not** covered by the disabled exemption.

Separately, `--hit-target: 48px` ([tokens.css:284](../../tokens.css)) is declared and consumed
by nothing. Actual minimums are 40px (`.ds-btn`), 32px (`.ds-btn--sm`), 44px (inputs). The
token is documentation, not a constraint.

### F8 — Core is already public, with unresolved provenance `[GATE]`

`github.com/aatteia/core-design-system` returns **HTTP 200 unauthenticated**. It has been public
since at least the 2026-07-29 push, with `license: None`.

Three categories of material are publicly visible that should not be.

**(a) Derivation claims about a client system — 12 references across 4 shipped files:**

| File | Content |
|---|---|
| `README.md:8` | "Core is distilled from **Attica 2.0** (a large, production-grade system)" |
| `CHANGELOG.md:11` | "Attica 2.0, with every organisation- and brand-specific decision factored out" |
| `CHANGELOG.md:22–23` | a **"Confirmed (parity verification against Attica)"** section stating Core is "a brand-stripped **superset** of Attica's" tokens |
| `CHANGELOG.md:27–30` | **"Deliberately excluded (AEC / Attica-brand only)"** — itemises AEC logos, Attica wordmark glyphs, electoral photography, the `aec-website` UI kit, the AEC voice/content guide |
| `tokens.css:3` | "Brand-agnostic foundation distilled from Attica 2.0" |
| `tokens.css:219` | "Source: Attica Typography — Headings (Desktop), Body & Paragraphs" |
| `tokens.css:261` | "RADII — Attica leans on 8px (cards) + 200px (pill buttons)" |
| `showcase/src/app/core-tokens.css` | duplicates the three `tokens.css` comments (F3) |

The CHANGELOG is the most exposed document in the repository — a public derivation audit trail,
more explicit than the README it sits beside.

Note `tokens.css:219` and `:261`: **the type scale and the radius ramp are also attributed to
Attica**, not only the colour palettes. The scope of "recast as original" is wider than the four
colour ramps of F6.

**(b) Client-derived values.** The `--mauve-*`, `--smalt-*`, `--cerulean-*`, `--nobel-*` ramps
(F6) are Attica's colour names carrying Attica's hex values. Their presence contradicts the
README's own next line — "with all product- and organisation-specific content removed."

**(c) Client-domain sample content — 5 preview files:**

| File | Content |
|---|---|
| `components-alerts.html:11,16,21` | "Your enrolment is up to date", "You're successfully enrolled to vote", "Enrolments close at 8 pm tonight" |
| `components-breadcrumbs-pagination.html:11,13` | "Enrolment" / "Check my enrolment" |
| `components-cards.html:10` | "Check your enrolment" |
| `components-selection.html:9,11` | "Postal vote", "Phone vote" |
| `components-table.html:9` | **Division · State · Party · First-pref % · 2PP %** — an election-results schema |
| `README.md:59` | "Restricted/parliamentary & ballot palettes" |

**Why this is the gate.** Per the record (D26, refined 2026-07-12), Attica was authored and
maintained by two dedicated designers; Adam consumed and extended it, with a subset of his
DEM-specific components adopted upstream through the design lead's governance. That is a real
and creditable contribution — but it is not ownership, and it is not a basis for publishing a
system described as distilled from Attica. A self-directed public artefact must never read as
private reuse of client work (charter §2.10). The same guardrail already governs the retired
MAMS prototype and the two outstanding Attica mentions in `poc-mhr-connect-prototype`.

```bash
git grep -ci attica -- . ':!docs/'        # → 0 when resolved
git grep -niE 'enrol|ballot|postal vote|first-pref|2PP' -- . ':!docs/'
```

### F9 — The showcase is deployed but authentication-gated

`core-design-system.vercel.app` returns 200 — but serves Vercel's Deployment Protection page
("CORE Design System – Authentifizierung erforderlich"), not the showcase.

So the artefact that makes Core legible to a human — the themeable, interactive gallery — is the
one part nobody can reach. A reader today gets a CSS file and a README, which is the least
persuasive possible form of a design system.

Disabling Deployment Protection is a Vercel dashboard setting. It is the single highest-value
action for the portfolio goal and costs nothing.

```bash
curl -s https://core-design-system.vercel.app | grep -c 'ds-btn'    # → >0 when reachable
```

### F5 — The licence blocks the product thesis `[DECIDED: MIT]`

```json
"license": "UNLICENSED",
"private": true,
"files": ["tokens.css", "components.css", "fonts/", "preview/", "README.md", "SKILL.md"]
```

A foundation that others adopt, extend, upgrade from and contribute back to cannot be
UNLICENSED and private. `private: true` also contradicts the `files` array, which only has
meaning when publishing.

This is not an "implication to consider." It is a gate: no packaging, versioning, compatibility
or contribution work means anything until it is resolved.

**Resolved 2026-08-04 (owner decision): MIT.** Core is published as an openly reusable
foundation. Implementation in P2.

Font licensing needs the same check — Roboto, Open Sans and Inter are all SIL OFL, which
permits redistribution, but the repository ships no licence files for them.

### F6 — Inherited palettes are brand residue

`--mauve-*`, `--smalt-*`, `--cerulean-*` (30 tokens, [tokens.css:83–119](../../tokens.css)) are
named for an Attica palette, are not wired to `--brand-*`, and are referenced by exactly two
declarations in `components.css`. `--info-*` and `--success-*` duplicate some of their values
under neutral names — `--info-600` and `--smalt-600` are both `#265C97`; `--success-600` and
`--cerulean-600` are both `#006D3D`.

They are either an unstated Core capability, a neutral secondary palette that needs renaming,
or leftovers. Today they read as leftovers with brand names attached.

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
background rather than as a claim to verify. The README says the Attica-derived content was
removed; the token files say otherwise in their own comments. This is the house rule in
practice — a producer doc is raw input, never evidence. Check the source.

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

Three foundations are currently attributed to Attica and must be regenerated:

1. **Colour.** Delete `--mauve-*`, `--smalt-*`, `--cerulean-*`, `--nobel-*` (40 tokens,
   [tokens.css:83–130](../../tokens.css)). Generate replacements from scratch:
   - one **neutral ramp** (`--neutral-25 … -800`), authored to hit the contrast targets in T3
     by construction rather than by luck — this is the fix for F4's two border failures and the
     placeholder failure, done once, correctly
   - **status ramps** — `--info-*`, `--success-*`, `--warning-*`, `--error-*` already exist under
     neutral names, but `--info-600`/`--smalt-600` and `--success-600`/`--cerulean-600` are the
     same hex. Regenerate the status ramps too, or they carry the same provenance under a
     different label. Add the missing `-700` steps T1 needs.
   - keep `--brand-*` (the indigo-slate placeholder) only if it is confirmed as Adam's own choice
     rather than inherited; regenerate if uncertain
2. **Type scale.** `tokens.css:219` attributes it to "Attica Typography — Headings (Desktop),
   Body & Paragraphs". Re-derive the scale from a stated ratio (e.g. a 1.25 modular scale from a
   16px base) and document the derivation. A scale generated from a published rule is
   self-evidently original *and* better documented than one lifted from a source.
3. **Radii.** `tokens.css:261` attributes the 8px/200px choices to Attica. Choose and state
   Core's own radius ramp.

**This subsumes F6 and the palette half of T1.** Do P1 before T1 — T1's semantic-role mapping
should target the new ramps, not the old ones.

**Done when:** `git grep -ci attica -- . ':!docs/'` → 0, and every ramp in `tokens.css` has a
documented derivation rule rather than a source attribution.

### P2 — Licence and package metadata

- Add `LICENSE` (MIT, © Adam Atteia 2026); set `"license": "MIT"` in `package.json`.
- Add SIL OFL licence files under `fonts/` for Roboto, Open Sans and Inter.
- Resolve `private: true` against the `files` array (see T0 — now folded here).
- Set the GitHub repo description and homepage (currently "Core design system repo." and null).
- Decide the `.ds-` prefix's status: public API, or renameable? README step 6 currently offers
  renaming, which makes it not an API.

**Done when:** `test -f LICENSE` passes and a prospective consumer can determine their rights
from the repository alone.

### P3 — Purge client-domain sample content

Replace the electoral content in the 5 preview files (F8c) and `README.md:59` with generic
sample copy — an account, a booking, a form submission. Nothing that identifies a service.

If T2 option (a) is chosen (delete `preview/`), this is largely moot for those files — but
`README.md:59` and the `CHANGELOG.md` exclusion list still need doing, and the showcase must be
checked with the same sweep.

**Done when:** `git grep -niE 'enrol|ballot|postal vote|first-pref|2PP' -- . ':!docs/'` → empty.

### P4 — Rewrite README and CHANGELOG as original work

- **`README.md:8–12`** — delete the Attica derivation paragraph. Replace with what Core is and
  the judgement behind it: which decisions are genuinely universal across design systems and
  which are always organisation-specific. That is the more interesting claim, it is Adam's own,
  and it needs no third party to stand up.
- **`CHANGELOG.md:11, 22–30`** — delete the "parity verification against Attica" and
  "Deliberately excluded (AEC / Attica-brand only)" sections outright. A changelog records
  changes to Core, not its relationship to another system.
- Add a short **provenance note**: Core is original work, released under MIT, informed by the
  author's professional practice in government and enterprise design systems. Method and
  judgement, never derivation from a named system (charter §2.10).

**Done when:** no shipped file names a third-party system, and the README's account of Core's
origins is true as written.

### P5 — Make it reachable

- **Disable Vercel Deployment Protection** on the `core-design-system` project so the showcase
  serves publicly (F9). *Owner action — Vercel dashboard.*
- Restore GitHub visibility to public if P0 was taken.
- Set the repo `homepage` to the showcase URL so the demo is one click from the repo.
- Add the showcase link to the top of the README — a design system whose demo is buried is
  read as a CSS file.

**Done when:** `curl -s https://core-design-system.vercel.app | grep -c 'ds-btn'` returns > 0.

---

## 5. Increment 1 — make the existing promise true

**Goal:** everything Core currently claims about itself becomes verifiable from the source.
No new capabilities. No new architecture.

**Size:** 1–2 weeks. **Prerequisite:** Increment 0 complete.

> **T0 (licence and package metadata) has moved to P2.** It was the blocking owner decision;
> it is now decided (MIT) and belongs with the publication gate.

### T1 — Purge primitive references from `components.css`

Fixes F2. **Do P1 first** — the semantic roles below must target the regenerated ramps, not the
Attica-derived ones. Where the table says `--neutral-*`, that is P1's new ramp.

Add the missing semantic roles to `tokens.css`, then rewrite the 13 sites + 1 hex against them:

| New role | Value | Replaces |
|---|---|---|
| `--bg-disabled` | `var(--neutral-100)` | `--nobel-100` at :55, :189 |
| `--bg-hover-subtle` | `var(--neutral-50)` | `--nobel-50` at :77 |
| `--fg-disabled` | `var(--neutral-400)` | `--nobel-400` at :55, :68, :81, :176 |
| `--fg-placeholder` | *(see T3 — must meet 4.5:1)* | `--nobel-400` at :164 |
| `--border-disabled` | `var(--neutral-200)` | `--nobel-200` at :68 |
| `--border-hover` | `var(--neutral-700)` | `--nobel-700` at :167 |
| `--fg-info` | `var(--info-700)` *(add)* | `--smalt-700` at :193 |
| `--fg-success` | `var(--success-700)` *(add)* | `--cerulean-700` at :194 |
| `--fg-warning` | `var(--warning-700)` *(add)* | hardcoded hex at :195 |

The old ramp deletions that used to sit here (F6: `--nobel-*` rename, `--mauve-*`/`--smalt-*`/
`--cerulean-*` removal) are now **P1's** job, because provenance made them mandatory rather than
optional.

**Constraint:** `--fg-subtle` and friends already exist and are correct — extend the semantic
layer, don't build a parallel one.

**Done when:**

```bash
grep -cE 'var\(--(nobel|smalt|cerulean|mauve)|#[0-9a-fA-F]{3,6}' components.css   # → 0
```

### T2 — Resolve `preview/`

Fixes F1. Two acceptable outcomes; pick one, don't hybridise:

**(a) Delete it.** The showcase already demonstrates every canonical component against the
real API. 26 hand-maintained mockups that cannot drift *into* correctness are a liability.
Remove `preview/` from `package.json:files`.

**(b) Rebuild it as a real static consumer.** Each card loads `../tokens.css` and
`../components.css` and uses `ds-*` classes only. This has genuine value — it proves the
charter's "straightforward path for static HTML use" — but it is a rebuild, not an edit.

Either way: remove the `cdnjs.cloudflare.com` Font Awesome dependency (Core cannot require a
CDN), and remove the electoral-service content. If icons are needed, that is an icon-integration
decision, not a CDN link.

**Done when:** no file in the repository specifies a colour, font or spacing value that is not
resolved from `tokens.css` — or `preview/` no longer exists.

### T3 — Establish the accessibility baseline

Fixes F4. This is the contract charter §2.6 promises; today it is unbacked.

1. **Fix the three failures.** Input border `--border-strong` must reach 3:1 against
   `--bg-base` (#767676 or darker; #ADADAD is 2.24:1). `--border-default` at 1.19:1 is
   decorative-only — either darken it or document that it must never be the sole indicator of
   an interactive boundary. `--fg-placeholder` must reach 4.5:1 (#767676 gives 4.54:1).
2. **Add the missing media queries** to `tokens.css`/`components.css`:
   `prefers-reduced-motion` (the input transition at [components.css:161](../../components.css)
   is currently unconditional), and `forced-colors` for focus and border treatment.
3. **Publish the contrast table** as `docs/accessibility.md`, generated from the tokens rather
   than hand-written, so it cannot drift.
4. **Reconcile `--hit-target`.** Either components honour 48px or the token states the real
   minimum. A token nothing consumes is a false claim.

Explicitly **out of scope**: dark mode, high-contrast themes, RTL, motion foundations. Those
are charter §6 triggers, not baseline.

**Done when:** every pair in the published table meets its threshold, and the table is produced
by a script.

### T4 — Single-source the showcase CSS

Fixes F3. Replace the two copied files with a build-time mechanism — a PostCSS import from the
repository root, a `prebuild` copy script, or symlinks. The font-path difference (`fonts/` vs
`/fonts/`) is the only real obstacle and is solvable with a `url()` rewrite or by serving fonts
from a matching path.

**Done when:** editing `tokens.css` changes the showcase with no second edit, and
`showcase/src/app/core-*.css` no longer exists as checked-in duplicates.

### T5 — The falsification theme

Fixes the charter §7 "theme divergence" measure, and validates T1.

Build **one** derived theme that changes five axes, not one:

- brand hue *(already works)*
- **neutral ramp** — a warm grey against Core's cool grey
- **typography** — a different family and scale
- **radius** — sharp (0–2px) against Core's rounded
- **density** — compact control heights and spacing

Constraint: it may only override tokens. **If it needs one line of `components.css`, T1 is
incomplete** — that is the test.

Keep it small: a single CSS file plus a showcase theme entry. This is not the "two derived
systems" of the archived plan; it is the cheapest thing that can falsify the token
architecture.

**Done when:** the theme is visually unrecognisable as Core, and `git diff` touches no
component CSS.

### T6 — Correct the documentation

Do this **last**, describing what is now true.

- **README** — the fork instructions are accurate only after T1. Add what Core does not own.
  Remove or qualify "stand up a new design system in hours." Fix the `preview/` description per
  T2.
- **SKILL.md** — currently assumes every use is either unmodified Core or a full fork. Add the
  middle case: a derived system that adopts Core and extends it through documented token
  contracts.
- **New: `docs/extending.md`** — which token layers are public and overridable
  (primitives / semantic roles / component-level), which are internal, and how a derived system
  declares its Core baseline version. This is the archived plan's Stage 2, reduced to what can
  actually be answered from a 583-line source.
- **CHANGELOG** — record the breaking token changes from P1/T1 (regenerated ramps, removed
  palettes, new semantic roles). This is Core's first real compatibility event and sets the
  precedent. Note that P4 has already stripped the Attica sections from this file.

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

**Constraint:** do not claim Attica derivation in the record either. The record's existing
position (D26 — consumed and extended, subset adopted upstream, never operated) is accurate and
creditable, and it belongs to `DEM-2025`, not to Core. Keeping the two separate is the whole
point of P1.

### R3 — Close the sibling provenance items

The same sweep that produced F8 has two known outstanding siblings, both already logged:

- **two Attica mentions in `poc-mhr-connect-prototype`** — public, unresolved
- **`aatteia/mams`** — still public and unarchived; the decision to make it private and archive
  it was taken 2026-07-25 and remains the owner's action

Run the F8 sweep across every public `aatteia` repo, not just this one. A provenance rule
enforced on one artefact is not enforced.

```bash
git grep -ciE 'attica|aec|electoral|enrol' -- . ':!docs/'   # in each public repo
```

---

## 7. Verification

**Increment 0** is complete when all of these pass:

```bash
# F8a — no named third-party system in shipped files
test "$(git grep -ci attica -- . ':!docs/' | wc -l)" = "0"

# F8c — no client-domain sample content
test -z "$(git grep -niE 'enrol|ballot|postal vote|first-pref|2PP' -- . ':!docs/')"

# F5 — licence present and declared
test -f LICENSE && grep -q '"license": "MIT"' package.json

# F9 — showcase reachable without authentication
test "$(curl -s https://core-design-system.vercel.app | grep -c 'ds-btn')" -gt 0
```

**Increment 1** is complete when all of these pass:

```bash
# F2 — no primitive palette or hardcoded colour in component recipes
test "$(grep -cE 'var\(--(nobel|smalt|cerulean|mauve)|#[0-9a-fA-F]{3,6}' components.css)" = "0"

# F3 — no duplicated canonical source
test ! -f showcase/src/app/core-tokens.css

# F1 — no CDN dependency
! grep -rq 'cdnjs\|cdn\.' preview/ showcase/src 2>/dev/null

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
