# Core Design System Foundation

## Implementation plan for Claude Code

**Repository:** `https://github.com/aatteia/core-design-system`  
**Baseline reviewed:** 4 August 2026  
**Plan status:** Strategic implementation plan  
**Primary audience:** Claude Code working inside the Core repository

---

## 1. Purpose of this document

This document defines the intended direction, desired outcomes, constraints, decision points and suggested order of work for the continued development of Core.

It is not a prescribed technical solution. Claude Code should inspect the repository, test the assumptions in this plan and decide how the outcomes are best implemented. It may adapt, combine, reorder or reject individual suggestions where the repository evidence supports a better approach.

The goal is to preserve clear product intent without constraining implementation unnecessarily.

---

## 2. Product definition

Core is a brand-neutral foundation from which other design systems can be built.

A derived design system should be able to:

- adopt only the Core foundations and capabilities it needs
- leave unrelated capabilities behind
- apply its own brand, content, domain patterns and governance
- extend Core without modifying undocumented internals
- add further Core capabilities later as its needs become more complex
- receive improvements from Core without repeatedly rebuilding its derived system
- contribute genuinely reusable improvements back to Core

Core should not attempt to become a complete design system for every product or domain. Its value is the quality, portability and extensibility of its shared foundation rather than the size of its component catalogue.

A concise statement of intent is:

> Core provides stable, accessible and brand-neutral foundations that other design systems can adopt selectively, extend independently and build upon over time.

A related governing principle is:

> Promote reusable capability upstream; keep brand, product and domain decisions downstream.

---

## 3. Current repository baseline

The current repository establishes a useful first version of this proposition:

- `tokens.css` and `components.css` are identified as the canonical, framework-neutral source.
- `tokens.css` contains colour, typography, spacing, radius, elevation and focus foundations.
- `components.css` contains a compact set of token-driven component recipes.
- `preview/` contains static review cards and additional compositions.
- `showcase/` provides an interactive Next.js presentation layer and demonstrates colour-ramp substitution.
- `SKILL.md` provides Claude with instructions for using or forking Core.
- `CHANGELOG.md` and the root package version establish an initial versioning model.
- The documented adoption method is currently centred on copying or forking the repository.

This is a credible version 1.0 starting point. The next stage should clarify how Core operates as a selectively adoptable and progressively extensible foundation, not only as a repository that is copied once.

---

## 4. Strategic principles

The following principles should guide implementation decisions.

### 4.1 Keep the kernel small

The mandatory foundation should contain only capabilities that are broadly reusable across substantially different derived systems.

A capability should not enter the Core kernel merely because it is useful in one system. The kernel should remain stable, understandable and inexpensive to adopt.

### 4.2 Make adoption selective

Consumers should not need to accept an entire catalogue to use one part of Core. Foundations and optional capabilities should be separable at a level that is useful to real downstream systems.

Selective adoption should not create unnecessary integration work or fragmented copies of source files.

### 4.3 Support progressive adoption

A derived system may begin with a limited Core subset and adopt additional capabilities later. This progression should be predictable and should not require the derived system to be recreated.

### 4.4 Preserve framework-neutral foundations

Core's source-level contracts should not depend on one application framework. Framework-specific implementations may exist, but they should express the same underlying tokens, anatomy, behaviour and accessibility requirements.

### 4.5 Make extension deliberate

Derived systems should extend documented contracts rather than override incidental implementation details. Core should make clear which parts are public, replaceable, composable or internal.

### 4.6 Inherit accessibility by default

Core should reduce the amount of accessibility work each derived system must rediscover. Accessible semantics, interaction expectations, focus behaviour and testing requirements should travel with the capability being adopted.

Core cannot guarantee that a derived product is accessible, but it should provide a sound baseline and make unsafe deviations visible.

### 4.7 Keep brand and domain decisions downstream

Core may include a neutral reference theme and generic examples. It should not impose a recognisable brand, organisation-specific content model, government-service methodology or enterprise-product structure on every consumer.

### 4.8 Avoid premature architecture

Modularity is an outcome, not a requirement to adopt a particular repository structure or toolchain. Claude Code should select architecture only after assessing the actual source, likely consumers and maintenance cost.

### 4.9 Prefer compatibility over copying

A derived system should not need to copy and permanently own every Core file to customise it. Where practical, the relationship should allow downstream systems to receive compatible additions and corrections from Core.

### 4.10 Validate through derived systems

Core's architecture should be proven by building or modelling meaningfully different derived systems. Colour switching alone is not enough to demonstrate extensibility.

---

## 5. Intended product layers

The following model describes product responsibilities. It does not prescribe folder or package structure.

### 5.1 Core kernel

The kernel is the smallest stable foundation likely to be required by most derived design systems. Candidate responsibilities include:

- primitive and semantic design tokens
- typography and spacing foundations
- colour roles and contrast expectations
- focus treatment
- layout and sizing primitives
- baseline element treatment
- common state conventions
- component anatomy and naming conventions
- theming and override contracts
- accessibility and testing conventions
- compatibility and versioning rules

Claude Code should determine which existing capabilities belong in this layer and whether any should move out of it.

### 5.2 Optional Core capabilities

Capabilities that are reusable but not universally required should be independently adoptable. Potential groupings include:

- forms
- navigation
- feedback and notifications
- data display
- overlays and disclosure
- application layout
- utilities
- icon integration
- framework-specific implementations
- testing support

These groupings are illustrative. Claude Code should establish boundaries based on cohesion, dependency direction, consumer value and maintenance cost.

### 5.3 Derived design systems

A derived design system owns the decisions that make it specific to an organisation, product family or domain, including:

- brand identity and assets
- brand colour choices
- typography choices
- iconography
- density and shape decisions
- content standards
- domain-specific components
- end-to-end patterns
- page templates
- research evidence
- product-specific behaviour
- governance and contribution rules

A derived system may override appropriate Core decisions, but it should not need to understand or modify undocumented Core internals.

### 5.4 Products

Individual products consume their derived design system. Product-specific exceptions should remain at the product layer unless they demonstrate wider reuse.

---

## 6. Admission criteria for Core capabilities

Before adding or promoting a capability into Core, assess whether it meets the following criteria:

1. **Generality:** It solves a recognisable need across materially different potential systems.
2. **Neutrality:** It does not depend on one brand, organisation, product or content model.
3. **Distinct value:** It is not already achievable through straightforward composition of existing Core capabilities.
4. **Stable behaviour:** Its semantic and interaction model is understood well enough to support downstream use.
5. **Accessibility:** Its accessible behaviour and test expectations can be documented.
6. **Extensibility:** Derived systems can customise appropriate aspects without replacing the whole capability.
7. **Dependency discipline:** Adopting it does not force unrelated dependencies or modules on consumers.
8. **Maintenance value:** The shared value justifies the long-term maintenance burden.
9. **Evidence:** It has been validated through use, prototyping, research or established external practice.
10. **Upstream suitability:** The generic part can be separated from any domain-specific composition that prompted it.

Capabilities that do not meet these criteria should remain experimental, optional, downstream or outside Core.

---

## 7. Suggested implementation programme

The stages below represent a suggested order of work. Claude Code should adjust the sequence where dependencies or repository evidence make another order more effective.

### Stage 0: Repository audit and decision record

#### Objective

Establish an accurate baseline before changing the architecture.

#### Areas to assess

- The relationship between `tokens.css`, `components.css`, `preview/` and `showcase/`.
- Whether all previewed components are represented in the canonical source.
- Whether the showcase faithfully consumes the canonical source or contains parallel design decisions.
- Direct use of primitive palette values inside components where semantic or component roles may be more appropriate.
- Current public and internal token boundaries.
- Dependencies between component recipes.
- The implications of the current copy-and-fork adoption model.
- The purpose and accuracy of `SKILL.md` relative to the new product direction.
- Existing build, validation, test, publishing and release mechanisms.
- Licence and package metadata implications.

#### Expected outcomes

- A concise current-state assessment.
- A record of material architectural decisions.
- A proposed scope for the first implementation increment.
- Identification of changes that can be made safely without premature restructuring.

#### Exit criteria

- The current source-of-truth relationship is understood.
- Known drift, duplication and undocumented coupling are identified.
- Major architecture choices are supported by evidence rather than assumed from this plan.

---

### Stage 1: Clarify the Core product contract

#### Objective

Align the public documentation and Claude guidance with Core's role as a selectively adoptable foundation.

#### Outcomes to consider

- Replace a solely fork-centred proposition with a broader adoption model.
- Preserve forking or copying as a legitimate option where it remains useful.
- Describe the kernel, optional capabilities, derived systems and products clearly.
- State what Core owns and deliberately does not own.
- Explain progressive adoption and downstream extension.
- Introduce the upstream-promotion principle.
- Remove claims that imply every derived system needs only a brand hue, fonts, logo and content.
- Distinguish the neutral reference presentation from the permanent structural contract.
- Update `SKILL.md` so Claude does not assume that every use case is either an unchanged Core interface or a complete repository fork.

#### Exit criteria

A new user can understand:

- what Core is
- what it is not
- what can be adopted independently
- what a derived system must own
- how a derived system can grow later
- how Core and downstream systems are expected to evolve together

---

### Stage 2: Define the public extension and inheritance contracts

#### Objective

Make downstream customisation and future upgrades deliberate rather than accidental.

#### Questions for Claude Code to resolve

- Which tokens are primitive, semantic, component-level or internal?
- Which token layers may derived systems override safely?
- How should a derived system add or replace component variants?
- Which component parts and states form the public styling contract?
- How are assets, fonts and icon systems replaced?
- Which behaviours are fixed accessibility requirements and which are customisable product decisions?
- How should downstream systems declare their Core baseline or compatibility version?
- How will deprecated contracts be communicated and removed?
- How will a downstream system avoid relying on private implementation details?

#### Expected outcomes

- A documented extension model.
- Clear public and internal boundaries.
- Naming and dependency conventions that support downstream use.
- A compatibility approach for derived systems that adopt future Core capabilities.

#### Exit criteria

A derived system can customise Core using documented mechanisms, and a maintainer can identify whether a proposed Core change is compatible or breaking.

---

### Stage 3: Mature the token architecture

#### Objective

Ensure the token model supports multiple derived systems, themes, modes and future modules without forcing consumers to rewrite component CSS.

#### Areas to assess

- The current relationship between palette values and semantic roles.
- Whether component recipes refer directly to primitive colours where a semantic or component role would be more resilient.
- Whether the existing brand ramp is sufficiently flexible for different brand structures.
- Whether secondary palettes are true Core capabilities, optional references or inherited historical material.
- The need for component-level tokens.
- The need for motion, breakpoint, container, layer, opacity, density and data-visualisation foundations.
- Support for light, dark, high-contrast and forced-colour contexts.
- Support for reduced motion and right-to-left layouts.
- Whether CSS should remain the authored source or be generated from a structured token source.
- Whether adopting a standard token format would improve portability enough to justify the change.

#### Constraints

- Do not replace the current working model solely to follow an external convention.
- Preserve stable public names where practical.
- Treat token migration as a compatibility problem.
- Keep brand-specific values outside reusable component logic.

#### Exit criteria

- The token hierarchy is explicit.
- Supported overrides are documented.
- Components depend on appropriate roles rather than incidental palette values.
- The architecture can accommodate at least two meaningfully different derived themes without copying component definitions.

---

### Stage 4: Reconcile the canonical source, previews and showcase

#### Objective

Ensure every presentation layer reflects one source of truth and clearly distinguishes canonical capabilities from illustrative compositions.

#### Areas to resolve

- Components or patterns shown in `preview/` but absent from `components.css`.
- Showcase code that duplicates or reinterprets canonical component decisions.
- The distinction between a Core component, a composed example and showcase-only chrome.
- How each token or component is documented and demonstrated.
- How responsive, interactive and error states are represented.
- How unsupported or experimental work is labelled.

#### Expected outcomes

- A clear catalogue of canonical capabilities.
- No accidental second source of truth.
- Explicit labelling of examples, experiments and downstream patterns.
- A showcase that demonstrates selective adoption and extensibility, not only visual inventory.

#### Exit criteria

A maintainer can trace every canonical visual example to its source, and a consumer can tell what is stable, optional, experimental or illustrative.

---

### Stage 5: Establish selective consumption

#### Objective

Allow consumers to take what they need without carrying unrelated Core capabilities.

#### Questions for Claude Code to resolve

- What is the smallest useful consumable unit?
- Are separate files, build outputs, packages, documented copy boundaries or another mechanism most appropriate?
- Which capabilities have genuine independence and which should remain together?
- How should dependencies be declared and validated?
- Can consumers add a new capability later without replacing their existing integration?
- How can the framework-neutral source remain primary while supporting framework-specific consumption?
- How should versioning work across the kernel and optional capabilities?

#### Illustrative capability boundaries

The following are possible boundaries, not required package names:

- tokens and foundations
- primitives
- forms
- navigation
- feedback
- data display
- overlays
- application layout
- framework bindings
- testing utilities

#### Constraints

- Do not split the repository merely to create the appearance of modularity.
- Avoid dependency chains that make selective adoption nominal rather than real.
- Do not require consumers to adopt the showcase application or its framework.
- Preserve a straightforward path for small prototypes and static HTML use.

#### Exit criteria

At least two consumers with substantially different needs can adopt different Core subsets without manual deletion of unrelated source or duplicated ownership of the same Core capability.

---

### Stage 6: Strengthen component and behavioural foundations

#### Objective

Expand Core where generic capabilities are missing, while avoiding the growth of a comprehensive domain catalogue.

#### Initial areas to assess

- Field grouping and selection controls.
- Validation relationships and error communication.
- Feedback and status components.
- Disclosure and overlay behaviour.
- Loading, empty and unavailable states.
- Basic navigation and layout primitives.
- Data presentation foundations.

#### Behavioural standard

For interactive capabilities, Core should define:

- purpose and appropriate use
- semantic structure
- component anatomy
- supported states
- keyboard interaction
- focus behaviour
- content requirements
- responsive behaviour
- accessibility expectations
- test requirements
- supported extension points

Established accessibility resources such as the WAI-ARIA Authoring Practices Guide and behaviour-oriented libraries such as React Aria may inform implementation. They should not force Core to adopt a framework or external visual language.

#### Constraints

- Prefer native HTML behaviour where it satisfies the requirement.
- Do not promote a capability solely because it exists in another design system.
- Keep end-to-end service patterns and domain-specific components downstream unless a generic primitive emerges from them.
- Separate generic interaction behaviour from optional framework implementations.

#### Exit criteria

New interactive capabilities have documented behaviour and accessibility contracts and can be used by derived systems without adopting a fixed brand or product methodology.

---

### Stage 7: Prove the derived-system model

#### Objective

Validate that Core can support divergent derived systems and progressive adoption.

#### Suggested proof scenarios

Create or model at least two derived systems with materially different characteristics, for example:

- a public-service system focused on forms, content and task completion
- an enterprise application system focused on dense navigation, records and data

The proof should extend beyond replacing one colour ramp. It should test differences such as:

- typography
- colour architecture
- shape and radius
- density
- focus presentation
- component variants
- selected module set
- content conventions
- optional capability adoption

#### Progressive-adoption scenario

One derived system should begin with a limited Core subset and later adopt an additional Core capability. This should test whether Core can support growth without forcing a full rebase or replacement.

#### Upstream-promotion scenario

Identify one downstream improvement and assess whether its generic foundation can be promoted into Core without bringing its brand or domain assumptions with it.

#### Exit criteria

- The derived systems look and behave meaningfully differently.
- They share the intended Core contracts rather than copied incidental code.
- Each can omit unneeded capabilities.
- A later Core capability can be adopted predictably.
- A reusable downstream improvement can follow a credible upstream path.

---

### Stage 8: Establish quality, compatibility and release safeguards

#### Objective

Make Core safe enough for other systems to depend upon.

#### Areas to establish

- Automated validation appropriate to the chosen architecture.
- Accessibility checks for components and documented manual test expectations.
- Keyboard interaction tests for behavioural components.
- Visual regression coverage where it provides meaningful protection.
- Browser and assistive-technology support expectations.
- Build verification for all supported consumption outputs.
- Semantic versioning rules that reflect downstream impact.
- Deprecation and migration guidance.
- Changelog requirements.
- Release and compatibility metadata.
- Licence and contribution implications.

#### Compatibility principle

Core versioning should reflect the effect on derived systems, not only whether Core itself still builds.

#### Exit criteria

A maintainer can determine whether a change is patch, minor or breaking, and a downstream system has enough information to assess and perform an upgrade.

---

### Stage 9: Define contribution and upstream promotion

#### Objective

Create a controlled path for reusable downstream work to return to Core.

#### Contribution questions

- What evidence is required before a downstream capability is considered for Core?
- How is the generic requirement separated from its original domain context?
- Who owns accessibility validation and long-term maintenance?
- How are duplicates and overlapping capabilities avoided?
- When should a proposal remain an optional module, recipe, example or downstream component?
- How are experimental capabilities identified and matured?
- How are rejected or deferred proposals recorded?

#### Suggested proposal evidence

A proposal may include:

- the problem it solves
- evidence of reuse across contexts
- why existing Core composition is insufficient
- semantic and behavioural definition
- accessibility considerations
- dependency impact
- customisation needs
- downstream usage evidence
- maintenance implications

#### Exit criteria

Core has a clear mechanism for learning from derived systems without becoming an uncontrolled collection of downstream features.

---

### Stage 10: Complete the documentation model

#### Objective

Document Core as a foundation platform rather than only a gallery of tokens and components.

#### Documentation areas

- Product definition and boundaries.
- Adoption models.
- Kernel and optional capability model.
- Token and extension contracts.
- Component admission criteria.
- Derived-system responsibilities.
- Progressive adoption.
- Compatibility and upgrades.
- Contribution and upstream promotion.
- Accessibility and testing expectations.
- Canonical source versus examples and showcase chrome.

#### Component documentation standard

Each stable component should provide the information needed for safe downstream use, potentially including:

- purpose
- anatomy
- variants
- states
- behaviour
- content guidance
- responsive behaviour
- accessibility
- keyboard interaction
- extension points
- code or consumption guidance
- testing requirements
- when to use
- when not to use

Claude Code should determine the most maintainable way to store and present this information.

#### Exit criteria

A designer or developer unfamiliar with Core can make sound adoption, extension and upgrade decisions without relying on undocumented repository knowledge.

---

## 8. Reference systems and how to use them

External design systems should be treated as evidence and inspiration, not as catalogues to reproduce.

### React Aria and WAI-ARIA APG

Use as references for generic interaction behaviour, keyboard models, focus management and accessible composition.

### Atlassian Design System and USWDS

Use as references for semantic token layering, theme configuration, utilities, compatibility and component-level test guidance.

### Agriculture Design System

Use as a reference for Australian public-service application structures, accessibility documentation and form architecture. Most end-to-end service patterns should remain in a derived system rather than Core.

### GOV.UK Design System

Use as a reference for distinguishing components from task patterns and for documenting evidence-based service interactions. Its service patterns should not automatically become Core capabilities.

### NSW Design System

Use as a reference for responsive behaviour, detailed usage guidance, WCAG 2.2 considerations and contribution criteria.

### Carbon Design System

Use as a reference for application states, structured data and complex enterprise interfaces. Domain-heavy application patterns should remain optional or downstream.

### Adobe Spectrum and Material 3

Use selectively for modes, density, adaptive behaviour, motion and platform-scale considerations without importing their visual identity.

---

## 9. Non-goals

The implementation should not assume that Core must:

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

## 10. Risks to manage

### Core becomes too large

Mitigate through admission criteria, optional capabilities and clear downstream ownership.

### Selective adoption creates fragmentation

Mitigate through stable public contracts, dependency clarity, compatibility metadata and progressive-adoption testing.

### Derived systems fork private internals

Mitigate by documenting extension points and distinguishing public from internal tokens and anatomy.

### Modularity adds more complexity than value

Mitigate by validating boundaries against real consumer scenarios before restructuring.

### Framework implementations become the real source of truth

Mitigate by preserving shared behavioural and token contracts and continuously checking parity.

### Accessibility claims become overstated

Mitigate by documenting what Core provides, what has been tested and what remains the responsibility of derived systems and products.

### The showcase is mistaken for the product

Mitigate by clearly distinguishing showcase chrome, illustrative compositions and canonical capabilities.

### Downstream contribution causes uncontrolled expansion

Mitigate through evidence requirements, maintenance ownership and the upstream-promotion principle.

### Versioning does not reflect downstream impact

Mitigate by evaluating changes against documented consumer contracts and derived-system upgrade scenarios.

---

## 11. Success measures

Core should ultimately be assessed by outcomes such as:

- the time required to establish a credible new design system
- the proportion of Core a derived system can omit safely
- the ease of adding a new Core capability later
- the amount of downstream code that must be copied or forked
- the number of customisations achievable through supported contracts
- the consistency of inherited accessibility behaviour
- the predictability of Core upgrades
- the frequency with which consumers must depend on private internals
- the ability to support visually and structurally different derived systems
- the ability to promote reusable downstream improvements without importing domain assumptions

Component count should not be treated as the primary measure of maturity.

---

## 12. Definition of done for the first major implementation increment

The first significant increment should be considered complete when:

- Core's product proposition reflects selective and progressive adoption.
- The responsibilities of Core, optional capabilities, derived systems and products are documented.
- The canonical source and all presentation layers have a clear, verified relationship.
- Public extension and token contracts are defined.
- At least one practical selective-consumption mechanism exists.
- A derived system can adopt a limited subset without manually deleting unrelated Core capabilities.
- That derived system can add a further Core capability later through a documented process.
- At least two meaningfully different derived-system scenarios validate the architecture.
- Stable interactive capabilities have documented semantic, keyboard, focus and accessibility behaviour.
- Compatibility, versioning, deprecation and release expectations reflect downstream impact.
- A contribution and upstream-promotion model is documented.
- Known limitations and deferred decisions are recorded rather than hidden.

---

## 13. Expected working approach for Claude Code

Claude Code should:

1. Inspect the repository and validate the baseline in this document.
2. Identify the smallest coherent implementation increment that advances the product model.
3. Record consequential architecture decisions and their trade-offs.
4. Preserve strong existing work where it remains compatible with the clarified direction.
5. Prefer substitution and consolidation over accumulating parallel mechanisms.
6. Implement and validate changes using the repository's actual constraints.
7. Test the result through derived-system scenarios rather than relying only on internal consistency.
8. Update documentation and Claude guidance alongside implementation changes.
9. Record deferred work and unresolved questions separately from completed outcomes.

This sequence is a suggested approach. Claude Code should exercise judgement about implementation, tooling, structure and detailed sequencing.
