# Steward runbook

Release checklist for people who maintain Core. Judgement sits in the [charter](charter.md) and [token-contract.md](token-contract.md).

**Do not expand the catalogue without a derived consumer.** See [0004](decisions/0004-no-catalogue-without-consumer.md).

## Before you tag

1. **Contrast.** `node scripts/check-contrast.mjs` must exit 0. The script writes `docs/accessibility.md` for default, Teal, Violet, Amber, and Forge. Do not edit that file by hand.
2. **Showcase build.** From `showcase/`: `npm run build`. Confirm the copy of `tokens.css` / `components.css` is generated at build, not hand-edited in `out/`.
3. **Changelog.** Add the release notes. If a **public** token was renamed or removed, include an old→new map. That is a **major** bump. Aliases are a minor. See the SemVer section in the token contract.
4. **Version.** Bump `package.json` `version`. Forks pin this number. Docs-only work may sit under Unreleased until the next kernel patch.
5. **Screenshots.** If the default or Forge look changed, recapture `docs/images/showcase-indigo.png` and `docs/images/showcase-forge.png`.
6. **Pages.** After merge to `main`, open https://core-design-system.pages.dev. Check Indigo and Forge. Preview deployments stay public. Do not put Access in front of production.
7. **Honesty.** Sweep the diff:
   - No claim that Core is derived from a named third-party system.
   - No claim that Core is production-ready or in client use.
   - No client-domain sample copy in the showcase.
   - Recipes still read public roles only (`grep` in `components.css` for `--brand-`, `--neutral-`, `--info-`, `--success-`, `--warning-`, `--error-`, `--focus-500` should be empty). `--white` is a known leftover.

## After you tag

- Confirm README “Versioning” still names the current public release.
- Confirm `docs/extending.md` pin line matches `package.json`.
- File nothing as “complete” if contrast or the showcase build failed.

## Honesty rules (always)

Do not claim Core is derived from Attica or any named third-party design system.  
Do not claim Core is in production.  
Do not put client-domain copy in examples.

Agent-facing copy of these rules: [agents.md](agents.md).
