# Chips

**Class:** `.ds-chip`

Compact, selectable tokens. Filter or toggle a value. Compact height (`--control-height-sm`).

## Variants and states

Default: outlined on `--white` with `--border-strong`.

Hover: border `--primary`.

Selected: `.ds-chip--selected` or `aria-pressed="true"`. Fill `--primary`, text `--fg-on-primary`.

`:focus-visible` uses `--focus-ring`.

No size modifiers. No destructive chip.

## Public tokens

`--radius-pill`, `--white` (opaque fill; prefer `--bg-base` in new recipes), `--border-strong`, `--fg-strong`, `--font-body`, `--fw-semibold`, `--control-height-sm`, `--primary`, `--focus-ring`, `--fg-on-primary`.

## Do

- Use `aria-pressed` when the chip is a toggle.
- Keep the compact height. This is not the default 44px control.

## Don’t

- Use a chip for status. Use a [badge](badges.md).
- Colour selected text with `--white`. Use `--fg-on-primary`.

```html
<button class="ds-chip" type="button" aria-pressed="false">Design</button>
<button class="ds-chip ds-chip--selected" type="button" aria-pressed="true">Engineering</button>
```
