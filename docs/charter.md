# Core — product charter

**Status:** Standing document. Changes here are product decisions, not implementation detail.
**Last reviewed:** 4 August 2026

This charter states what Core is, what it deliberately is not, and the criteria by which
capabilities enter it. It does not describe work to be done — see `docs/plans/` for that.

---

## 1. Product definition

Core is a brand-neutral foundation from which other design systems can be built.

It is **published publicly under MIT** and serves two audiences at once:

- **As a resource** — any team may adopt, fork, extend and ship it.
- **As a portfolio artefact** — it is public evidence of design-system authorship, and is
  recorded as such in the Career Profile record (`PROTOTYPES-2026`). This second role imposes
  an obligation the first does not: every claim Core makes about its own origins must be true
  and independently checkable, because the artefact is offered as proof of authorship.

A derived design system should be able to:

- adopt only the Core foundations and capabilities it needs
- leave unrelated capabilities behind
- apply its own brand, content, domain patterns and governance
- extend Core without modifying undocumented internals
- add further Core capabilities later as its needs become more complex
- receive improvements from Core without repeatedly rebuilding its derived system
- contribute genuinely reusable improvements back to Core

Core should not attempt to become a complete design system for every product or domain. Its
value is the quality, portability and extensibility of its shared foundation rather than the
size of its component catalogue.

> Core provides stable, accessible and brand-neutral foundations that other design systems can
> adopt selectively, extend independently and build upon over time.

The governing principle:

> Promote reusable capability upstream; keep brand, product and domain decisions downstream.

---

## 2. Principles

### 2.1 Keep the kernel small

The mandatory foundation contains only capabilities broadly reusable across substantially
different derived systems. A capability does not enter the kernel merely because it is useful
in one system.

### 2.2 Make adoption selective

Consumers should not need to accept an entire catalogue to use one part of Core.

**Qualification:** selective adoption is a *property to preserve*, not a structure to build in
advance. At the current source size, "selective" means a consumer can ignore what they don't
use at no cost. Packaging is a response to evidence of pain, not a design goal — see §6.

### 2.3 Support progressive adoption

A derived system may begin with a limited Core subset and adopt more later. That progression
must not require the derived system to be recreated.

### 2.4 Preserve framework-neutral foundations

Core's source-level contracts do not depend on one application framework. Framework-specific
implementations may exist, but express the same tokens, anatomy, behaviour and accessibility
requirements.

### 2.5 Make extension deliberate

Derived systems extend documented contracts rather than override incidental implementation
details. Core must make clear which parts are public, replaceable, composable or internal.

### 2.6 Inherit accessibility by default

Accessible semantics, interaction expectations, focus behaviour and testing requirements
travel with the capability being adopted.

**Qualification:** this obliges Core to *hold* a baseline, not merely to intend one. An
accessibility claim in documentation that is not met by the source is worse than no claim.
Every stated contract must be verifiable from the source.

Core cannot guarantee that a derived product is accessible, but it provides a sound baseline
and makes unsafe deviations visible.

### 2.7 Keep brand and domain decisions downstream

Core may include a neutral reference theme and generic examples. It does not impose a
recognisable brand, organisation-specific content model, government-service methodology or
enterprise-product structure on any consumer.

This applies to *every* artefact the repository ships, including previews and examples.
Sample content must be generic. Inherited palettes carrying a former brand's names are brand
residue, not neutral foundations.

### 2.8 Avoid premature architecture

Modularity is an outcome, not a requirement to adopt a particular repository structure or
toolchain. Architecture follows evidence from actual source, likely consumers and maintenance
cost.

### 2.9 Prefer compatibility over copying

A derived system should not need to copy and permanently own every Core file to customise it.
Where practical, downstream systems should be able to receive compatible additions and
corrections from Core.

### 2.10 Ship only what is Core's to ship

Everything in this repository must be original work, or carry a licence permitting
redistribution. This is absolute and applies to values, not only to assets:

- **No client-derived values** — colour ramps, type scales, radius scales or spacing systems
  lifted from a system built for or by a client, however transformed.
- **No client-derived names** — a palette named for another system's colours carries that
  system's provenance regardless of the hex values beside it.
- **No client or domain sample content** — examples use generic content. Service-specific copy
  identifies the engagement it came from.
- **No derivation claims about systems Core does not own** — describing Core as distilled from,
  parity-checked against, or a superset of a named third-party system asserts a relationship
  Core has no standing to assert, and invites the question of what else came across.

The rule is not "remove the logo." A self-directed public artefact must never read as private
reuse of client work. Where Core's design was *informed* by professional experience — as any
practitioner's work is — that is described as method and judgement, never as derivation from a
named system.

### 2.11 Validate through derived systems

Core's architecture is proven by building derived systems that differ meaningfully. **Colour
switching alone is not enough.** A theme that changes only hue proves only that one variable
is indirected.

---

## 3. Product layers

Responsibilities, not folder structure.

### 3.1 Core kernel

The smallest stable foundation most derived systems will need:

primitive and semantic design tokens · typography and spacing foundations · colour roles and
contrast expectations · focus treatment · layout and sizing primitives · baseline element
treatment · common state conventions · component anatomy and naming conventions · theming and
override contracts · accessibility and testing conventions · compatibility and versioning rules

### 3.2 Optional Core capabilities

Reusable but not universally required. Illustrative groupings: forms · navigation · feedback
and notifications · data display · overlays and disclosure · application layout · utilities ·
icon integration · framework implementations · testing support.

Boundaries are set by cohesion, dependency direction, consumer value and maintenance cost —
not by this list.

### 3.3 Derived design systems

Owns what makes it specific: brand identity and assets · brand colour · typography choices ·
iconography · density and shape · content standards · domain components · end-to-end patterns
· page templates · research evidence · product behaviour · governance and contribution rules.

A derived system may override appropriate Core decisions; it must not need to understand or
modify undocumented Core internals.

### 3.4 Products

Products consume their derived design system. Product-specific exceptions stay at the product
layer unless they demonstrate wider reuse.

---

## 4. Admission criteria

Before adding or promoting a capability into Core:

1. **Generality** — solves a recognisable need across materially different systems.
2. **Neutrality** — does not depend on one brand, organisation, product or content model.
3. **Distinct value** — not already achievable by composing existing Core capabilities.
4. **Stable behaviour** — semantic and interaction model understood well enough for downstream use.
5. **Accessibility** — accessible behaviour and test expectations can be documented *and demonstrated*.
6. **Extensibility** — derived systems can customise appropriate aspects without replacing the whole.
7. **Dependency discipline** — adopting it forces no unrelated dependencies on consumers.
8. **Maintenance value** — shared value justifies long-term maintenance burden.
9. **Evidence** — validated through use, prototyping, research or established external practice.
10. **Upstream suitability** — the generic part separates cleanly from the domain composition that prompted it.

Capabilities failing these remain experimental, optional, downstream or outside Core.

**Applicability:** these criteria govern *additions*. They are not a gate on fixing what Core
already ships. Correcting an existing capability to meet Core's own stated contracts needs no
admission review.

---

## 5. Non-goals

Core does not aim to:

- become a complete design system for government services, enterprise software or content websites
- match the component count of established design systems
- include every pattern shown in a reference system
- prescribe a single design language for all derived systems
- require a particular application framework
- require every consumer to use the showcase
- replace native HTML with custom widgets unnecessarily
- absorb product-specific content, workflows or templates
- move every downstream innovation into Core
- introduce a complex package or monorepo architecture before its value is proven
- rewrite working foundations solely to conform to current industry fashion
- guarantee the accessibility of products built from Core

---

## 6. Deferred by design

The following are **deliberately not being built**, each with the condition that would change
that. Recording the trigger prevents both premature construction and silent drift.

| Deferred | Build it when |
|---|---|
| Package/monorepo split, published artefacts | A second real consumer exists *and* has demonstrated a concrete cost from taking the whole source. |
| Formal contribution / upstream-promotion process | A contributor outside the maintainer proposes a capability. |
| Deprecation policy and migration tooling | The first breaking change to a contract a real consumer depends on. |
| Component-level token layer | A derived system needs a component customised in a way semantic roles cannot express. |
| Framework bindings (React/Vue/etc.) | A consumer needs behaviour Core's CSS cannot supply, and a second consumer would reuse the same binding. |
| Visual regression testing | The component set is stable enough that diffs signal defects rather than churn. |
| Data-visualisation, motion, density, RTL foundations | A derived system requires them. Each is a separate trigger. |

Until triggered, these are not gaps. They are decisions.

---

## 7. Success measures

Each measure names its instrument and current baseline, so progress is observable rather than
asserted. Component count is not a maturity measure.

| Measure | Instrument | Baseline (4 Aug 2026) | Target |
|---|---|---|---|
| **Provenance** | Named third-party design-system references in any repository file | 12 across 4 files | 0 |
| **Public usability** | Licence present, showcase reachable without authentication | MIT file present / showcase still gated | MIT / reachable |
| Rebrand completeness | Count of primitive-palette references in `components.css` | 13 refs + 1 hardcoded hex | 0 |
| Theme divergence | Axes a derived theme can change without editing `components.css` (hue, neutral ramp, type, radius, density) | 1 of 5 (hue) | ≥5 |
| Source-of-truth integrity | Files duplicated between canonical source and presentation layers | 2 | 0 |
| Contract honesty | Documented claims contradicted by source | ≥1 (README rebrand claim) | 0 |
| Accessibility baseline | Token pairs below their WCAG threshold in the published contrast table | 3 known (4 Aug 2026); input border and placeholder fixed 17 Sep 2026 | 0 |
| Omission cost | Lines a consumer must delete to drop an unused capability | not measured | 0 |
| Upgrade predictability | Can a Core version bump apply to a derived system without editing component CSS? | no | yes |
| Internal reliance | Consumer references to undocumented tokens or classes | not measured | 0 |

---

## 8. Reference systems

Treat external systems as evidence, not catalogues to reproduce.

- **React Aria, WAI-ARIA APG** — generic interaction behaviour, keyboard models, focus management, accessible composition.
- **Atlassian, USWDS** — semantic token layering, theme configuration, utilities, compatibility, component test guidance.
- **Agriculture Design System** — Australian public-service application structures, accessibility documentation, form architecture. End-to-end service patterns stay downstream.
- **GOV.UK** — distinguishing components from task patterns; documenting evidence-based interactions. Service patterns do not automatically become Core capabilities.
- **NSW Design System** — responsive behaviour, usage guidance, WCAG 2.2 considerations, contribution criteria.
- **Carbon** — application states, structured data, complex enterprise interfaces. Domain-heavy patterns stay optional or downstream.
- **Adobe Spectrum, Material 3** — modes, density, adaptive behaviour, motion, platform scale — without importing their visual identity.

---

## 9. Risks

| Risk | Mitigation |
|---|---|
| Core becomes too large | Admission criteria (§4), optional capabilities, clear downstream ownership. |
| Selective adoption creates fragmentation | Stable public contracts, dependency clarity, compatibility metadata. |
| Derived systems fork private internals | Document extension points; distinguish public from internal tokens and anatomy. |
| Modularity costs more than it returns | Validate boundaries against real consumer scenarios before restructuring (§6 triggers). |
| Framework implementations become the real source of truth | Preserve shared behavioural and token contracts; check parity continuously. |
| **A public artefact reads as reuse of client work** | §2.10. Sweep for named-system references, client-derived values and domain sample content before any publication, and treat the sweep as a release gate, not a one-off. |
| **Accessibility claims become overstated** | Publish only what is verified from source; maintain the contrast table as a test, not prose. |
| **Documentation claims outrun the source** | Any claim in README/SKILL must be checkable by a command. Where it cannot be, weaken the claim. |
| The showcase is mistaken for the product | Distinguish showcase chrome, illustrative compositions and canonical capabilities. |
| Downstream contribution causes uncontrolled expansion | Evidence requirements, maintenance ownership, upstream-promotion principle. |
| Versioning does not reflect downstream impact | Evaluate changes against documented consumer contracts and upgrade scenarios. |
