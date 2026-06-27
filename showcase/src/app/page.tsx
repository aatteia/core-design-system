"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";

/* ── small helpers ──────────────────────────────────────────────────────── */

function Section({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <section style={{ padding: "48px 0", borderTop: "1px solid var(--showcase-border)" }}>
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
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: Number(s) <= 200 ? "#1a1a1a" : "#fff" }}>
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

/* ── page ───────────────────────────────────────────────────────────────── */

export default function Page(): React.JSX.Element {
  return (
    <div className="ds" style={{ background: "transparent", minHeight: "100vh" }}>
      {/* header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "saturate(140%) blur(6px)",
          borderBottom: "1px solid var(--showcase-border)",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "var(--brand-600)" }}>
            <i className="fa-solid fa-circle-nodes" /> Core
          </span>
          <span className="ds-badge" style={{ fontFamily: "var(--font-ui)" }}>v1.0</span>
          <div style={{ marginLeft: "auto" }}>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px 96px" }}>
        {/* hero */}
        <section style={{ padding: "64px 0 8px" }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Brand-agnostic foundation</div>
          <h1 className="h-display-s" style={{ maxWidth: 760, marginBottom: 16 }}>
            A mature design-system foundation you rebrand from a single colour ramp.
          </h1>
          <p className="body-l" style={{ maxWidth: 620, color: "var(--fg-muted)" }}>
            Core is the part of a design system that&rsquo;s the same no matter who you are — the
            grid, type scale, elevation, focus model, and component anatomy. Switch the theme above:
            every surface re-skins from ten <code style={{ fontFamily: "var(--font-mono)" }}>--brand-*</code> values.
          </p>
        </section>

        {/* colour */}
        <Section eyebrow="Tokens" title="Colour" intro="One brand ramp drives every interactive surface. Neutrals and semantic ramps round out the palette.">
          <p className="body-s" style={{ fontWeight: 600, marginBottom: 8 }}>Brand (the override point)</p>
          <Ramp prefix="brand" shades={fullRamp} />
          <p className="body-s" style={{ fontWeight: 600, margin: "24px 0 8px" }}>Neutral spine — Nobel</p>
          <Ramp prefix="nobel" shades={fullRamp} />
          <p className="body-s" style={{ fontWeight: 600, margin: "24px 0 8px" }}>Semantic</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            <SemanticSwatch name="Info" role="info" />
            <SemanticSwatch name="Success" role="success" />
            <SemanticSwatch name="Warning" role="warning" />
            <SemanticSwatch name="Error" role="error" />
          </div>
        </Section>

        {/* type */}
        <Section eyebrow="Tokens" title="Typography" intro="Roboto headings, Open Sans body, Inter for UI/numerics — on a 4 px baseline. Swap the families per fork.">
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

        {/* buttons */}
        <Section eyebrow="Components" title="Buttons" intro="Three hierarchies × three sizes, a destructive modifier, and an icon-only variant. All pills.">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <button className="ds-btn ds-btn--primary">Primary</button>
            <button className="ds-btn ds-btn--secondary">Secondary</button>
            <button className="ds-btn ds-btn--tertiary">Tertiary</button>
            <button className="ds-btn ds-btn--primary ds-btn--destructive">Delete</button>
            <button className="ds-btn ds-btn--primary ds-btn--icon" aria-label="Add"><i className="fa-solid fa-plus" /></button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginTop: 16 }}>
            <button className="ds-btn ds-btn--primary ds-btn--sm">Small</button>
            <button className="ds-btn ds-btn--primary">Default</button>
            <button className="ds-btn ds-btn--primary ds-btn--lg">Large</button>
            <button className="ds-btn ds-btn--primary" disabled>Disabled</button>
          </div>
        </Section>

        {/* cards */}
        <Section eyebrow="Components" title="Cards" intro="8 px radius, 1 px border, soft shadow. Hover lifts; highlight stripes draw on the brand colour.">
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
        <Section eyebrow="Components" title="Inputs" intro="Labelled fields with hint, focus, and error states. Magenta focus ring on every interactive surface.">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, maxWidth: 760 }}>
            <div className="ds-field">
              <label className="ds-field__label">Full name</label>
              <input className="ds-input" placeholder="Ada Lovelace" />
              <span className="ds-field__hint">As it appears on your ID.</span>
            </div>
            <div className="ds-field">
              <label className="ds-field__label">Email</label>
              <input className="ds-input" aria-invalid="true" defaultValue="not-an-email" />
              <span className="ds-field__error"><i className="fa-solid fa-circle-exclamation" /> Enter a valid email address.</span>
            </div>
          </div>
        </Section>

        {/* badges + chips */}
        <Section eyebrow="Components" title="Badges &amp; chips" intro="Inter Medium 12 badges in semantic colours; selectable pill chips.">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span className="ds-badge">Default</span>
            <span className="ds-badge ds-badge--primary">Primary</span>
            <span className="ds-badge ds-badge--info">Info</span>
            <span className="ds-badge ds-badge--success">Success</span>
            <span className="ds-badge ds-badge--warning">Warning</span>
            <span className="ds-badge ds-badge--error">Error</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginTop: 16 }}>
            <button className="ds-chip">All</button>
            <button className="ds-chip ds-chip--selected">Selected</button>
            <button className="ds-chip">Filterable</button>
          </div>
          <nav className="ds-breadcrumb" style={{ marginTop: 24 }}>
            <a href="#">Home</a>
            <span className="ds-breadcrumb__sep">/</span>
            <a href="#">Components</a>
            <span className="ds-breadcrumb__sep">/</span>
            <span className="ds-breadcrumb__current">Badges</span>
          </nav>
        </Section>

        {/* spacing / radii / elevation */}
        <Section eyebrow="Tokens" title="Spacing, radii &amp; elevation" intro="A 4 px spacing grid, four surface radii plus the pill, and a five-step shadow ramp.">
          <p className="body-s" style={{ fontWeight: 600, marginBottom: 8 }}>Spacing</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {["x-sm", "sm", "md", "x-big", "lg", "xx-lg"].map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 64, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-muted)" }}>{s}</span>
                <div style={{ height: 16, width: `var(--space-${s})`, background: "var(--brand-300)", borderRadius: 4 }} />
              </div>
            ))}
          </div>
          <p className="body-s" style={{ fontWeight: 600, margin: "24px 0 8px" }}>Radii &amp; elevation</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            {["xs", "sm", "md", "lg"].map((r) => (
              <div key={r} style={{ width: 88, height: 64, background: "#fff", border: "1px solid var(--border-default)", borderRadius: `var(--radius-${r})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-muted)" }}>{r}</div>
            ))}
            {["sm", "md", "lg"].map((e) => (
              <div key={e} style={{ width: 88, height: 64, background: "#fff", borderRadius: 8, boxShadow: `var(--shadow-${e})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-muted)" }}>{e}</div>
            ))}
          </div>
        </Section>

        <footer style={{ paddingTop: 40, color: "var(--fg-muted)" }}>
          <p className="body-s">
            Core Design System 1.0 — a brand-agnostic foundation. Fork it, replace the
            <code style={{ fontFamily: "var(--font-mono)" }}> --brand-* </code> ramp and fonts, and ship.
          </p>
        </footer>
      </main>
    </div>
  );
}
