"use client";

import { useState } from "react";
import { IconError, IconExternal, IconPlus } from "@/components/icons";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SidebarNav } from "@/components/sidebar-nav";

/* ── small helpers ──────────────────────────────────────────────────────── */

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <section id={id} style={{ padding: "48px 0", borderTop: "1px solid var(--showcase-border)" }}>
      <div className="eyebrow" style={{ marginBottom: 8 }}>{eyebrow}</div>
      <h2 className="h-l" style={{ marginBottom: intro ? 8 : 24 }}>{title}</h2>
      {intro && (
        <p className="body-m" style={{ maxWidth: 640, color: "var(--fg-muted)", marginBottom: 24 }}>
          {intro}
        </p>
      )}
      {children}
    </section>
  );
}

function Ramp({ prefix, shades }: { prefix: string; shades: string[] }): React.JSX.Element {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${shades.length}, 1fr)`, gap: 6 }}>
      {shades.map((s) => (
        <div
          key={s}
          style={{
            background: `var(--${prefix}-${s})`,
            borderRadius: 8,
            height: 72,
            display: "flex",
            alignItems: "flex-end",
            padding: 8,
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: Number(s) <= 300 ? "#1a1a1a" : "#fff" }}>
            {s}
          </span>
        </div>
      ))}
    </div>
  );
}

function SemanticSwatch({ name, role }: { name: string; role: string }): React.JSX.Element {
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--border-default)" }}>
      <div style={{ background: `var(--${role}-500)`, height: 56 }} />
      <div style={{ background: `var(--${role}-100)`, padding: "8px 12px" }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600 }}>{name}</span>
      </div>
    </div>
  );
}

const fullRamp = ["25", "50", "100", "200", "300", "400", "500", "600", "700", "800"];

const CHIP_LABELS = ["All", "Selected", "Filterable"] as const;

function ChipRow(): React.JSX.Element {
  const [pressed, setPressed] = useState<Record<(typeof CHIP_LABELS)[number], boolean>>({
    All: false,
    Selected: true,
    Filterable: false,
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginTop: 16 }}>
      {CHIP_LABELS.map((label) => {
        const isPressed = pressed[label];
        return (
          <button
            key={label}
            type="button"
            className={isPressed ? "ds-chip ds-chip--selected" : "ds-chip"}
            aria-pressed={isPressed}
            onClick={() => setPressed((current) => ({ ...current, [label]: !current[label] }))}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

const COOKBOOK_HREF =
  "https://github.com/aatteia/core-design-system/blob/main/docs/fork-cookbook.md";
const TOKEN_CONTRACT_HREF =
  "https://github.com/aatteia/core-design-system/blob/main/docs/token-contract.md";

/* ── page ───────────────────────────────────────────────────────────────── */

export default function Page(): React.JSX.Element {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* top bar — full-width chrome */}
      <header className="sc-topbar">
        <div className="sc-topbar__inner">
          <span className="sc-brand">Core</span>
          <span className="sc-version">1.2.0</span>
          <div className="sc-topbar__tools">
            <ThemeSwitcher />
            <button
              type="button"
              className="sc-nav-toggle"
              aria-label={navOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={navOpen}
              onClick={() => setNavOpen((v) => !v)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* shell — sidebar + content */}
      <div className="sc-shell">
        <SidebarNav open={navOpen} onNavigate={() => setNavOpen(false)} />
        {navOpen && <div className="sc-backdrop" onClick={() => setNavOpen(false)} />}

        <main className="sc-content">
          {/* hero / overview */}
          <section id="overview" className="sc-hero">
            <div className="sc-hero__row">
              <div>
                <h1 className="sc-hero__title">Rebrand from one ramp. Ship from two CSS files.</h1>
                <p className="sc-hero__lede">
                  Core is a brand-agnostic kernel: tokens + recipes. Use the showcase to verify
                  forks. Not a client product.
                </p>
              </div>
              <div className="sc-hero__actions">
                <a
                  className="sc-cta sc-cta--primary"
                  href={COOKBOOK_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open cookbook<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a
                  className="sc-cta sc-cta--secondary"
                  href={TOKEN_CONTRACT_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Token contract<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
            <div className="sc-stats">
              <div className="sc-stat">
                <p className="sc-stat__label">Kernel</p>
                <p className="sc-stat__value">tokens.css · components.css</p>
              </div>
              <div className="sc-stat">
                <p className="sc-stat__label">Fork</p>
                <p className="sc-stat__value">data-theme overrides</p>
              </div>
              <div className="sc-stat">
                <p className="sc-stat__label">Proof</p>
                <p className="sc-stat__value">Forge five-axis theme</p>
              </div>
            </div>
          </section>

          <div className="ds">

          {/* colour */}
          <Section id="colour" eyebrow="Tokens" title="Colour" intro="One brand ramp drives every interactive surface. Neutrals and semantic ramps round out the palette.">
            <p className="body-s" style={{ fontWeight: 600, marginBottom: 8 }}>Brand (the override point)</p>
            <Ramp prefix="brand" shades={fullRamp} />
            <p className="body-s" style={{ fontWeight: 600, margin: "24px 0 8px" }}>Neutral spine</p>
            <Ramp prefix="neutral" shades={fullRamp} />
            <p className="body-s" style={{ fontWeight: 600, margin: "24px 0 8px" }}>Semantic</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              <SemanticSwatch name="Info" role="info" />
              <SemanticSwatch name="Success" role="success" />
              <SemanticSwatch name="Warning" role="warning" />
              <SemanticSwatch name="Error" role="error" />
            </div>
          </Section>

          {/* type */}
          <Section id="typography" eyebrow="Tokens" title="Typography" intro="Roboto headings, Open Sans body, Inter for UI/numerics — on a 4 px baseline. Swap the families per fork.">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="h-display-m">Display M</div>
              <div className="h-xl">Heading XL</div>
              <div className="h-l">Heading L</div>
              <div className="h-m">Heading M</div>
              <div className="h-s">Heading S</div>
              <div className="h-xs">Heading XS</div>
              <div className="body-l" style={{ marginTop: 8 }}>Body L — 18 / 28. The quick brown fox jumps over the lazy dog.</div>
              <div className="body-m">Body M — 16 / 24. The quick brown fox jumps over the lazy dog.</div>
              <div className="body-s" style={{ color: "var(--fg-muted)" }}>Body S — 14 / 20. Supporting copy and captions.</div>
            </div>
          </Section>

          {/* spacing */}
          <Section id="spacing" eyebrow="Tokens" title="Spacing" intro="Every step on a 4 px grid, from hairline gaps to page-level rhythm.">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["x-sm", "sm", "md", "x-big", "lg", "xx-lg"].map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 64, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-muted)" }}>{s}</span>
                  <div style={{ height: 16, width: `var(--space-${s})`, background: "var(--brand-300)", borderRadius: 4 }} />
                </div>
              ))}
            </div>
          </Section>

          {/* radii + elevation */}
          <Section id="radii-elevation" eyebrow="Tokens" title="Radii & elevation" intro="Four surface radii plus the pill, and a layered shadow ramp for depth.">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
              {["xs", "sm", "md", "lg"].map((r) => (
                <div key={r} style={{ width: 88, height: 64, background: "#fff", border: "1px solid var(--border-default)", borderRadius: `var(--radius-${r})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-muted)" }}>{r}</div>
              ))}
              {["sm", "md", "lg"].map((e) => (
                <div key={e} style={{ width: 88, height: 64, background: "#fff", borderRadius: 8, boxShadow: `var(--shadow-${e})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-muted)" }}>{e}</div>
              ))}
            </div>
          </Section>

          {/* focus */}
          <Section id="focus" eyebrow="Tokens" title="Focus ring" intro="A single high-contrast focus ring applies to every interactive surface. Tab through the controls to see it.">
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <button className="ds-btn ds-btn--secondary">Tab to me</button>
              <input
                className="ds-input"
                id="demo-focus-ring"
                name="focus-ring-demo"
                type="text"
                style={{ maxWidth: 220 }}
                placeholder="…then to me"
                aria-label="Focus ring demo"
              />
            </div>
            <p className="body-s" style={{ color: "var(--fg-muted)", marginTop: 12 }}>
              Driven by <code style={{ fontFamily: "var(--font-mono)" }}>--focus-ring</code> and <code style={{ fontFamily: "var(--font-mono)" }}>--border-focus</code> (from <code style={{ fontFamily: "var(--font-mono)" }}>--focus-500</code>).
            </p>
          </Section>

          {/* buttons */}
          <Section id="buttons" eyebrow="Components" title="Buttons" intro="Three hierarchies × three sizes, a destructive modifier, and an icon-only variant. All pills.">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <button className="ds-btn ds-btn--primary">Primary</button>
              <button className="ds-btn ds-btn--secondary">Secondary</button>
              <button className="ds-btn ds-btn--tertiary">Tertiary</button>
              <button className="ds-btn ds-btn--primary ds-btn--destructive">Delete</button>
              <button className="ds-btn ds-btn--primary ds-btn--icon ds-btn--sm" aria-label="Add compact"><IconPlus /></button>
              <button className="ds-btn ds-btn--primary ds-btn--icon" aria-label="Add"><IconPlus /></button>
              <button className="ds-btn ds-btn--primary ds-btn--icon ds-btn--lg" aria-label="Add large"><IconPlus /></button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginTop: 16 }}>
              <button className="ds-btn ds-btn--primary ds-btn--sm">Small</button>
              <button className="ds-btn ds-btn--primary">Default</button>
              <button className="ds-btn ds-btn--primary ds-btn--lg">Large</button>
              <button className="ds-btn ds-btn--primary" disabled>Disabled</button>
            </div>
          </Section>

          {/* links */}
          <Section id="links" eyebrow="Components" title="Links" intro="Underlined links on the link colour; the underline thickens on hover.">
            <p className="body-m">
              Read the <a className="ds-link" href="#links">getting-started guide</a>, or open an{" "}
              <a className="ds-link" href="#links">external reference <IconExternal /></a>.
            </p>
          </Section>

          {/* cards */}
          <Section id="cards" eyebrow="Components" title="Cards" intro="8 px radius, 1 px border, soft shadow. Hover lifts; highlight stripes draw on the brand colour.">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              <div className="ds-card ds-card--hover-lift">
                <div className="h-xs" style={{ marginBottom: 4 }}>Hover lift</div>
                <p className="body-s" style={{ color: "var(--fg-muted)" }}>Shadow steps up and the border tends toward the brand on hover.</p>
              </div>
              <div className="ds-card ds-card--highlight-top">
                <div className="h-xs" style={{ marginBottom: 4 }}>Highlight top</div>
                <p className="body-s" style={{ color: "var(--fg-muted)" }}>A 4 px inset stripe in the brand colour.</p>
              </div>
              <div className="ds-card ds-card--highlight-left">
                <div className="h-xs" style={{ marginBottom: 4 }}>Highlight left</div>
                <p className="body-s" style={{ color: "var(--fg-muted)" }}>Same stripe, drawn down the leading edge.</p>
              </div>
            </div>
          </Section>

          {/* inputs */}
          <Section id="inputs" eyebrow="Components" title="Inputs" intro="Labelled fields with hint, focus, and error states. The focus ring lands on every interactive surface.">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, maxWidth: 760 }}>
              <div className="ds-field">
                <label className="ds-field__label" htmlFor="demo-full-name">Full name</label>
                <input
                  className="ds-input"
                  id="demo-full-name"
                  name="full-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  aria-describedby="demo-full-name-hint"
                />
                <span className="ds-field__hint" id="demo-full-name-hint">As it appears on your ID.</span>
              </div>
              <div className="ds-field">
                <label className="ds-field__label" htmlFor="demo-email">Email</label>
                <input
                  className="ds-input"
                  id="demo-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid="true"
                  aria-describedby="demo-email-error"
                  defaultValue="not-an-email"
                />
                <span className="ds-field__error" id="demo-email-error"><IconError /> Enter a valid email address.</span>
              </div>
            </div>
          </Section>

          {/* badges + chips */}
          <Section id="badges-chips" eyebrow="Components" title="Badges & chips" intro="Inter Medium 12 badges in semantic colours; selectable pill chips.">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              <span className="ds-badge">Default</span>
              <span className="ds-badge ds-badge--primary">Primary</span>
              <span className="ds-badge ds-badge--info">Info</span>
              <span className="ds-badge ds-badge--success">Success</span>
              <span className="ds-badge ds-badge--warning">Warning</span>
              <span className="ds-badge ds-badge--error">Error</span>
            </div>
            <ChipRow />
          </Section>

          {/* breadcrumbs */}
          <Section id="breadcrumbs" eyebrow="Components" title="Breadcrumbs" intro="A compact path with separators and a current-page marker.">
            <nav className="ds-breadcrumb" aria-label="Breadcrumb">
              <a href="#overview">Home</a>
              <span className="ds-breadcrumb__sep" aria-hidden="true">/</span>
              <a href="#buttons">Components</a>
              <span className="ds-breadcrumb__sep" aria-hidden="true">/</span>
              <span className="ds-breadcrumb__current">Breadcrumbs</span>
            </nav>
          </Section>

          <footer style={{ paddingTop: 40, color: "var(--fg-muted)" }}>
            <p className="body-s">
              Core Design System 1.2. A brand-agnostic foundation. Fork it, replace the
              <code style={{ fontFamily: "var(--font-mono)" }}> --brand-* </code> ramp and fonts, and ship.
            </p>
          </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
