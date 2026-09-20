# Component recipes

Shipped `.ds-*` surfaces in `components.css`. Nothing else.

[Documentation hub](../README.md).

Each page lists purpose, variants, the **public tokens** the recipe reads, and do/don’t. Classes are the public API. Token names must match [token-contract.md](../token-contract.md).

| Surface | Classes |
|---|---|
| [Buttons](buttons.md) | `.ds-btn` and modifiers |
| [Links](links.md) | `.ds-link` |
| [Cards](cards.md) | `.ds-card` and modifiers |
| [Fields and inputs](fields.md) | `.ds-field`, `.ds-input`, `.ds-textarea`, `.ds-select` |
| [Badges](badges.md) | `.ds-badge` and status modifiers |
| [Chips](chips.md) | `.ds-chip` |
| [Divider](divider.md) | `.ds-divider` |
| [Breadcrumbs](breadcrumbs.md) | `.ds-breadcrumb` |
| [Typography helpers](typography.md) | `.ds` scope in `tokens.css` |

There is no table, alert, modal, or nav recipe. Do not invent one in docs.

`--white` still appears on some opaque fills. New work should use `--bg-base`. See the token contract exception.
