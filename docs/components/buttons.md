# Buttons

**Class:** `.ds-btn`

Pill actions. Three hierarchies, three sizes, optional destructive, optional icon-only.

## Variants and states

| Modifier | Role |
|---|---|
| `.ds-btn--primary` | Filled. Default action. |
| `.ds-btn--secondary` | Outlined. |
| `.ds-btn--tertiary` | Text only. |
| `.ds-btn--destructive` | Stacks on primary, secondary, or tertiary. Irreversible action. |
| `.ds-btn--icon` | Square hit target. Same heights as text buttons. |
| `.ds-btn--sm` | Compact. `--control-height-sm` (32px). Label as compact. |
| `.ds-btn--lg` | Large. `--control-height-lg`. |

States: hover, active, `:disabled` / `aria-disabled="true"`, `:focus-visible`.

Default min-height is `--control-height` (44px).

## Public tokens

**Shared:** `--control-pad-y`, `--control-pad-x`, `--radius-pill`, `--font-heading`, `--fw-bold`, `--tracking-button`, `--motion-duration`, `--motion-easing`, `--control-height`, `--focus-ring`.

**Sizes:** `--control-pad-y-sm` / `--control-pad-x-sm` / `--control-height-sm`; `--control-pad-y-lg` / `--control-pad-x-lg` / `--control-height-lg`.

**Primary:** `--primary`, `--fg-on-primary`, `--primary-hover`, `--primary-active`, `--bg-disabled`, `--fg-disabled`.

**Secondary:** `--white` (opaque fill; prefer `--bg-base` in new recipes), `--primary`, `--primary-bg`, `--primary-tint`, `--border-disabled`, `--fg-disabled`.

**Tertiary:** `--primary`, `--bg-hover-subtle`, `--bg-disabled`, `--primary-active`, `--fg-disabled`.

**Destructive:** `--bg-error-strong`, `--fg-on-error`, `--bg-error-strong-hover`, `--fg-error`, `--border-error`, `--bg-error-subtle`.

Focus is `outline: var(--focus-ring)` with `outline-offset: 2px`.

## Do

- Pair a hierarchy with a size. Example: `ds-btn ds-btn--primary ds-btn--sm`.
- Put destructive on a hierarchy. `ds-btn--destructive` alone has no fill rules.
- Keep labels sentence case.

## Don’t

- Point the recipe at `--brand-*` or `--error-*` ramp steps.
- Use a box-shadow for focus.
- Treat `.ds-btn--sm` as the default hit target.

```html
<button class="ds-btn ds-btn--primary" type="button">Save</button>
<button class="ds-btn ds-btn--secondary" type="button">Cancel</button>
<button class="ds-btn ds-btn--destructive ds-btn--primary" type="button">Delete</button>
```
