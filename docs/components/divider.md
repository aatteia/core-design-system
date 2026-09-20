# Divider

**Class:** `.ds-divider`

A 1px horizontal rule. Decorative.

## Variants and states

None. Height is 1px. Border is 0. Colour is `--border-default`.

## Public tokens

`--border-default`.

That token is decorative. It is not a control edge and does not need 3:1 contrast.

## Do

- Use it between sections of content.
- Prefer a real `<hr class="ds-divider">` so the structure is in HTML.

## Don’t

- Use it as the only boundary of an interactive control.
- Recolour it with `--border-strong` unless you mean a control edge.

```html
<hr class="ds-divider">
```
