# Badges

**Class:** `.ds-badge`

Small status or category labels. Not buttons. Not chips.

## Variants and states

| Modifier | Fill / text |
|---|---|
| (none) | `--bg-disabled` / `--fg-default` |
| `.ds-badge--primary` | `--primary-tint` / `--primary-strong` |
| `.ds-badge--info` | `--bg-info` / `--fg-info` |
| `.ds-badge--success` | `--bg-success` / `--fg-success` |
| `.ds-badge--warning` | `--bg-warning` / `--fg-warning` |
| `.ds-badge--error` | `--bg-error` / `--fg-error` |

No hover, focus, or disabled recipe. Badges are not interactive.

## Public tokens

**Shared:** `--radius-xs`, `--font-ui`, `--fw-medium`, `--bg-disabled`, `--fg-default`.

**Primary:** `--primary-tint`, `--primary-strong`.

**Status:** `--bg-info`, `--fg-info`, `--bg-success`, `--fg-success`, `--bg-warning`, `--fg-warning`, `--bg-error`, `--fg-error`.

## Do

- Use status badges for state (success, warning, error, info).
- Keep copy short. One or two words.

## Don’t

- Put `onclick` or `href` on a badge. Use a [chip](chips.md) or [button](buttons.md).
- Read `--info-*` ramp steps in product CSS.

```html
<span class="ds-badge ds-badge--success">Active</span>
<span class="ds-badge ds-badge--warning">Due soon</span>
```
