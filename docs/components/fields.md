# Fields and inputs

**Classes:** `.ds-field`, `.ds-field__label`, `.ds-field__hint`, `.ds-field__error`, `.ds-input`, `.ds-textarea`, `.ds-select`

A labelled control stack plus the three native field types. Input, textarea, and select share one chrome recipe.

## Variants and states

| Piece | Role |
|---|---|
| `.ds-field` | Column. Label, control, hint or error. |
| `.ds-input` | Single-line text. |
| `.ds-textarea` | Multiline. |
| `.ds-select` | Native select. |

States on the control: hover (`--border-hover`), focus (`--primary` border + `--focus-ring`), invalid (`aria-invalid="true"` → `--border-error`), disabled (`--bg-disabled` / `--fg-disabled`).

Placeholder uses `--fg-placeholder` (4.5:1 on `--bg-base`).

Default min-height is `--control-height` (44px). There is no compact field modifier.

## Public tokens

**Field chrome:** `--font-body`, `--text-body-m`, `--fw-semibold`, `--fg-strong`, `--text-body-s`, `--fg-muted`, `--fg-error`.

**Control:** `--font-body`, `--text-body-m`, `--lh-body-m`, `--fg-strong`, `--white` (opaque fill; prefer `--bg-base` in new recipes), `--border-strong`, `--radius-xs`, `--control-height`, `--motion-duration`, `--motion-easing`, `--fg-placeholder`, `--border-hover`, `--primary`, `--focus-ring`, `--border-error`, `--bg-disabled`, `--fg-disabled`.

Focus offset is 1px.

`--border-strong` is the control edge (3:1). `--border-control` is an alias. Do not use `--border-default` here.

## Do

- Associate the label with the control (`for` / `id`).
- Point hint and error text at the control with `aria-describedby`.
- Set `aria-invalid="true"` when showing `.ds-field__error`.
- Keep `--border-error` as a second cue alongside the error text.

## Don’t

- Use `--border-default` on an input.
- Point invalid styles at `--error-600`. Use `--border-error` and `--fg-error`.

```html
<div class="ds-field">
  <label class="ds-field__label" for="email">Email</label>
  <input class="ds-input" id="email" type="email" autocomplete="email" aria-describedby="email-hint">
  <p class="ds-field__hint" id="email-hint">We’ll only use this to send the receipt.</p>
</div>
```
