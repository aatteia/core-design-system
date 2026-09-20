# Links

**Class:** `.ds-link`

Inline navigation and actions that are links, not buttons.

`.ds a` in `tokens.css` styles raw anchors inside a `.ds` root. `.ds-link` is the recipe when you need the semibold link treatment on a specific element.

## Variants and states

Default underlined link. Hover thickens the underline. `:focus-visible` uses `--focus-ring`.

No size modifiers. No visited style in the kernel.

## Public tokens

`--fg-link`, `--fw-semibold`, `--fg-link-hover`, `--focus-ring`.

Focus offset is 2px. Border radius on the outline is 2px.

## Do

- Use a real `<a href="…">`.
- Use `.ds-btn` when the control submits or toggles.

## Don’t

- Remove the underline as the only affordance.
- Colour the link with `--brand-600` in product CSS. Use `--fg-link`.

```html
<a class="ds-link" href="/account">Account settings</a>
```
