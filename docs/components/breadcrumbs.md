# Breadcrumbs

**Class:** `.ds-breadcrumb`

A trail of ancestors plus the current page. Body-S size.

## Variants and states

| Piece | Role |
|---|---|
| `.ds-breadcrumb` | Flex row. Wraps. |
| `.ds-breadcrumb a` | Ancestor link. `--fg-link`. |
| `.ds-breadcrumb__sep` | Separator. `--fg-subtle`. |
| `.ds-breadcrumb__current` | Current page. `--fg-strong`, semibold. |

No hover or focus rules on the nav itself. Links inside inherit `.ds a` or `.ds-link` focus if those classes apply.

## Public tokens

`--text-body-s`, `--fg-muted`, `--fg-link`, `--fg-subtle`, `--fg-strong`, `--fw-semibold`.

## Do

- Mark the current page with `.ds-breadcrumb__current`. Do not link it.
- Put the list in a `<nav>` with an accessible name (`aria-label="Breadcrumb"`).

## Don’t

- Use breadcrumbs as primary navigation.
- Colour separators with `--fg-muted` if you want the quiet tick. The recipe uses `--fg-subtle`.

```html
<nav class="ds-breadcrumb" aria-label="Breadcrumb">
  <a href="/">Home</a>
  <span class="ds-breadcrumb__sep" aria-hidden="true">/</span>
  <a href="/projects">Projects</a>
  <span class="ds-breadcrumb__sep" aria-hidden="true">/</span>
  <span class="ds-breadcrumb__current">North workshop</span>
</nav>
```
