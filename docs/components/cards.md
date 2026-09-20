# Cards

**Class:** `.ds-card`

A contained surface for grouping content. Default is a 1px decorative border, `--radius-sm`, and `--shadow-sm`.

## Variants and states

| Modifier | Role |
|---|---|
| (none) | Default raised card. |
| `.ds-card--hover-lift` | Hover raises shadow to `--shadow-md` and tints the border `--primary`. |
| `.ds-card--highlight-top` | 4px inset bar on the top edge. |
| `.ds-card--highlight-left` | 4px inset bar on the left edge. |
| `.ds-card--flat` | No shadow. |

No disabled or selected card recipe.

## Public tokens

`--white` (opaque fill; prefer `--bg-base` in new recipes), `--border-default`, `--radius-sm`, `--shadow-sm`, `--space-x-big`, `--motion-duration`, `--motion-easing`.

**Hover-lift:** `--shadow-md`, `--primary`.

**Highlights:** `--shadow-sm`, `--primary`.

`--border-default` is decorative. It is not a control edge.

## Do

- Put interactive controls *inside* the card. Don’t make the whole card a button unless you add a real control.
- Use highlight variants for emphasis, not for status. Status colour is badges.

## Don’t

- Use `--border-strong` on a static card. That token is for controls.
- Add a focus ring to a non-interactive card.

```html
<article class="ds-card">
  <h3 class="h-xxs">Project brief</h3>
  <p class="body-s">Due Friday. Review the outline before the meeting.</p>
</article>
```
