# Typography helpers

These live in `tokens.css` on a `.ds` root. They are not `.ds-*` component recipes. Use them for page type without inventing heading components.

## Scope

Apply `class="ds"` to a root (usually `<body>`). Headings, paragraphs, and links inside pick up the scale.

| Helper | Maps to |
|---|---|
| `.h-display-m` / `h1` | `--text-display-m` |
| `.h-display-s` | `--text-display-s` |
| `.h-xl` | `--text-h-xl` |
| `.h-l` / `h2` | `--text-h-l` |
| `.h-m` / `h3` | `--text-h-m` |
| `.h-s` / `h4` | `--text-h-s` |
| `.h-xs` / `h5` | `--text-h-xs` |
| `.h-xxs` / `h6` | `--text-h-xxs` |
| `.body-l` | `--text-body-l` |
| `.body-m` / `p` | `--text-body-m` |
| `.body-s` | `--text-body-s` |
| `.body-xs` | `--text-body-xs` |
| `.eyebrow` | Uppercase UI label |

## Public tokens

**Root:** `--font-body`, `--text-body-m`, `--lh-body-m`, `--fg-default`, `--bg-base`.

**Headings:** `--font-heading`, `--fw-light`, `--fg-strong`, `--tracking-tight`, matching `--text-*` / `--lh-*`, `--tracking-h-xl`, `--fw-regular`, `--fw-medium`.

**Links:** `--fg-link`, `--fg-link-hover`, `--focus-ring`.

**Eyebrow:** `--font-ui`, `--text-body-xs`, `--fw-semibold`, `--tracking-eyebrow`, `--fg-muted`.

## Do

- Keep heading rank in HTML honest. A class can change size. It must not skip meaning.
- Use `.ds-link` when you need the semibold link recipe. See [links](links.md).

## Don’t

- Add a `.ds-heading` component. These helpers are the type API.
- Hardcode pixel sizes next to a helper class.

```html
<body class="ds">
  <p class="eyebrow">Foundation</p>
  <h1>Account overview</h1>
  <p>Your next booking is Tuesday at 10:00.</p>
</body>
```
