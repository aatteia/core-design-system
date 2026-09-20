#!/usr/bin/env node
/**
 * Resolve colour roles from tokens.css, check WCAG 2.2 pairs, write
 * docs/accessibility.md. Exit 1 if a required pair fails.
 *
 * Overlays showcase themes from globals.css: Teal, Violet, Amber (hue-only)
 * and Forge (five-axis). Fail the run if any required pair is below threshold.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const tokensPath = path.join(root, "tokens.css");
const showcaseCssPath = path.join(root, "showcase", "src", "app", "globals.css");
const outPath = path.join(root, "docs", "accessibility.md");

function parseDecls(css) {
  const decls = new Map();
  const re = /--([a-z0-9-]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = re.exec(css)) !== null) {
    decls.set(`--${match[1]}`, match[2].trim());
  }
  return decls;
}

function extractThemeBlock(css, theme) {
  const re = new RegExp(`html\\[data-theme="${theme}"\\]\\s*\\{([\\s\\S]*?)\\n\\}`);
  const match = css.match(re);
  if (!match) throw new Error(`Missing html[data-theme="${theme}"] block in ${path.relative(root, showcaseCssPath)}`);
  return match[1];
}

function resolveHex(name, decls, seen = new Set()) {
  if (seen.has(name)) return undefined;
  seen.add(name);
  const raw = decls.get(name);
  if (!raw) return undefined;
  const hex = raw.match(/^#([0-9A-Fa-f]{6})\b/);
  if (hex) return `#${hex[1].toUpperCase()}`;
  const alias = raw.match(/^var\((--[a-z0-9-]+)\)/);
  if (!alias) return undefined;
  return resolveHex(alias[1], decls, seen);
}

function channel(value) {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const h = hex.replace("#", "");
  const r = channel(parseInt(h.slice(0, 2), 16));
  const g = channel(parseInt(h.slice(2, 4), 16));
  const b = channel(parseInt(h.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

const pairs = [
  { name: "Body text", fg: "--fg-default", bg: "--bg-base", min: 4.5, sc: "1.4.3" },
  { name: "Placeholder", fg: "--fg-placeholder", bg: "--bg-base", min: 4.5, sc: "1.4.3" },
  { name: "Control border", fg: "--border-strong", bg: "--bg-base", min: 3.0, sc: "1.4.11" },
  { name: "Primary fill / link", fg: "--primary", bg: "--bg-base", min: 4.5, sc: "1.4.3" },
  { name: "Focus ring", fg: "--border-focus", bg: "--bg-base", min: 3.0, sc: "1.4.11" },
  { name: "Info badge", fg: "--fg-info", bg: "--bg-info", min: 4.5, sc: "1.4.3" },
  { name: "Success badge", fg: "--fg-success", bg: "--bg-success", min: 4.5, sc: "1.4.3" },
  { name: "Warning badge", fg: "--fg-warning", bg: "--bg-warning", min: 4.5, sc: "1.4.3" },
  { name: "Error badge", fg: "--fg-error", bg: "--bg-error", min: 4.5, sc: "1.4.3" },
  { name: "Field error", fg: "--fg-error", bg: "--bg-base", min: 4.5, sc: "1.4.3" },
  { name: "Error border", fg: "--border-error", bg: "--bg-base", min: 3.0, sc: "1.4.11" },
  { name: "On primary", fg: "--fg-on-primary", bg: "--primary", min: 4.5, sc: "1.4.3" },
  { name: "On primary hover", fg: "--fg-on-primary", bg: "--primary-hover", min: 4.5, sc: "1.4.3" },
  { name: "On primary active", fg: "--fg-on-primary", bg: "--primary-active", min: 4.5, sc: "1.4.3" },
  { name: "On error", fg: "--fg-on-error", bg: "--bg-error-strong", min: 4.5, sc: "1.4.3" },
  { name: "On error hover", fg: "--fg-on-error", bg: "--bg-error-strong-hover", min: 4.5, sc: "1.4.3" },
  { name: "On inverse", fg: "--fg-on-inverse", bg: "--bg-inverse", min: 4.5, sc: "1.4.3" },
  // Non-base surfaces used by recipes. Do not add pairs the CSS does not paint.
  { name: "Tertiary hover", fg: "--primary", bg: "--bg-hover-subtle", min: 4.5, sc: "1.4.3" },
  { name: "Default badge", fg: "--fg-default", bg: "--bg-disabled", min: 4.5, sc: "1.4.3" },
  { name: "Primary badge", fg: "--primary-strong", bg: "--primary-tint", min: 4.5, sc: "1.4.3" },
];

const overlayThemes = [
  {
    id: "teal",
    heading: "Teal theme",
    blurb: "Hue-only. Showcase `html[data-theme=\"teal\"]` overlays `--brand-*` on the default tokens.",
  },
  {
    id: "violet",
    heading: "Violet theme",
    blurb: "Hue-only. Showcase `html[data-theme=\"violet\"]` overlays `--brand-*` on the default tokens.",
  },
  {
    id: "amber",
    heading: "Amber theme",
    blurb: "Hue-only. Showcase `html[data-theme=\"amber\"]` overlays `--brand-*` on the default tokens.",
  },
  {
    id: "forge",
    heading: "Forge theme",
    blurb: "Showcase `html[data-theme=\"forge\"]` overlays on the default tokens. Forge remaps `--border-strong`, `--fg-placeholder`, `--fg-subtle`, `--fg-disabled`, and `--focus-500`.",
  },
];

function checkTheme(decls) {
  const white = resolveHex("--white", decls);
  if (!white) throw new Error("Missing --white");
  const rows = [];
  let failed = 0;
  for (const pair of pairs) {
    const fg = resolveHex(pair.fg, decls);
    const bg = resolveHex(pair.bg, decls);
    if (!fg || !bg) {
      rows.push({ ...pair, fgHex: fg || "missing", bgHex: bg || "missing", ratio: 0, pass: false });
      failed += 1;
      continue;
    }
    const ratio = contrast(fg, bg);
    const pass = ratio + 1e-9 >= pair.min;
    if (!pass) failed += 1;
    rows.push({ ...pair, fgHex: fg, bgHex: bg, ratio, pass });
  }
  const decorativeToken = "--border-default";
  const decorativeHex = resolveHex(decorativeToken, decls);
  const decorative = {
    name: "Decorative border",
    token: decorativeToken,
    hex: decorativeHex || "missing",
    ratio: decorativeHex ? contrast(decorativeHex, white) : 0,
    white,
  };
  return { rows, failed, decorative, white };
}

function tableLines(result) {
  const lines = [];
  lines.push("| Pair | Foreground | Background | Ratio | Required | Result |");
  lines.push("|---|---|---|---:|---:|---|");
  for (const row of result.rows) {
    lines.push(
      `| ${row.name} (${row.sc}) | \`${row.fg}\` ${row.fgHex} | \`${row.bg}\` ${row.bgHex} | ${row.ratio.toFixed(2)}:1 | ${row.min.toFixed(1)} | ${row.pass ? "pass" : "**fail**"} |`,
    );
  }
  lines.push(
    `| ${result.decorative.name} | \`${result.decorative.token}\` ${result.decorative.hex} | \`--bg-base\` ${result.white} | ${result.decorative.ratio.toFixed(2)}:1 | n/a (decorative) | documented |`,
  );
  return lines;
}

const tokensCss = fs.readFileSync(tokensPath, "utf8");
const showcaseCss = fs.readFileSync(showcaseCssPath, "utf8");

const defaultResult = checkTheme(parseDecls(tokensCss));
const overlayResults = overlayThemes.map((theme) => {
  const block = extractThemeBlock(showcaseCss, theme.id);
  return { ...theme, result: checkTheme(parseDecls(`${tokensCss}\n${block}`)) };
});
const failed = defaultResult.failed + overlayResults.reduce((sum, theme) => sum + theme.result.failed, 0);

const lines = [];
lines.push("# Accessibility baseline");
lines.push("");
lines.push("Generated from `tokens.css` by `scripts/check-contrast.mjs`.");
lines.push("Do not edit this file by hand. Re-run the script after token changes.");
lines.push("");
lines.push("Pairs use WCAG 2.2 contrast: **4.5:1** for text (SC 1.4.3), **3:1** for UI (SC 1.4.11).");
lines.push("`--border-default` (`--neutral-200`) is decorative. It must not be the only cue on a control edge.");
lines.push("`--border-control` aliases `--border-strong`. Interactive edges must meet 3:1 on the adjacent background.");
lines.push("`--hit-target` aliases `--control-height` (44px). Compact controls use `--control-height-sm` (32px). Large controls use `--control-height-lg`.");
lines.push("`prefers-reduced-motion` sets `--motion-duration` to `0ms`. `forced-colors` restyles focus and borders in `components.css`.");
lines.push("Focus is a 2px `outline` in `--focus-ring`, coloured by `--border-focus` (from `--focus-500`). Strong fills pair with `--fg-on-primary`, `--fg-on-error`, and `--fg-on-inverse`.");
lines.push("Non-`--bg-base` pairs are recipe surfaces: tertiary hover (`--bg-hover-subtle`), default badge (`--bg-disabled`), primary badge (`--primary-tint`). Recipes do not paint text on `--bg-subtle` or `--bg-muted`.");
lines.push("");
lines.push("## Default theme");
lines.push("");
lines.push(...tableLines(defaultResult));
lines.push("");
for (const theme of overlayResults) {
  lines.push(`## ${theme.heading}`);
  lines.push("");
  lines.push(theme.blurb);
  lines.push("");
  lines.push(...tableLines(theme.result));
  lines.push("");
}
lines.push("Run:");
lines.push("");
lines.push("```bash");
lines.push("node scripts/check-contrast.mjs");
lines.push("```");
lines.push("");

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"));

if (failed > 0) {
  console.error(`Contrast check failed: ${failed} pair(s) below threshold. See ${path.relative(root, outPath)}`);
  process.exit(1);
}
console.log(`Contrast check passed. Wrote ${path.relative(root, outPath)}`);
