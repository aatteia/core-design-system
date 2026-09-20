"use client";

import { useMood } from "@/lib/mood-context";

const COOKBOOK_HREF =
  "https://github.com/aatteia/core-design-system/blob/main/docs/fork-cookbook.md";
const TOKEN_CONTRACT_HREF =
  "https://github.com/aatteia/core-design-system/blob/main/docs/token-contract.md";

function CookbookLink(): React.JSX.Element {
  return (
    <a
      className="sc-cta sc-cta--primary"
      href={COOKBOOK_HREF}
      target="_blank"
      rel="noopener noreferrer"
    >
      Open cookbook<span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function ContractLink(): React.JSX.Element {
  return (
    <a
      className="sc-cta sc-cta--secondary"
      href={TOKEN_CONTRACT_HREF}
      target="_blank"
      rel="noopener noreferrer"
    >
      Token contract<span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function ProductOverview(): React.JSX.Element {
  return (
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
          <CookbookLink />
          <ContractLink />
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
  );
}

function EditorialOverview(): React.JSX.Element {
  return (
    <section id="overview" className="sc-hero">
      <p className="sc-hero__eyebrow">Overview</p>
      <h1 className="sc-hero__title">A kernel you rebrand. Not a product UI kit.</h1>
      <p className="sc-hero__lede">
        Tokens and <code className="sc-hero__code">.ds-*</code> recipes stay stable. A fork
        supplies hue, fonts, logo, and content. Judgement lives in the charter.
      </p>
      <div className="sc-hero__actions">
        <CookbookLink />
        <ContractLink />
      </div>
    </section>
  );
}

function PortfolioOverview(): React.JSX.Element {
  return (
    <section id="overview" className="sc-hero">
      <div className="sc-hero__grid">
        <div>
          <p className="sc-hero__eyebrow">Portfolio artefact · v1.2</p>
          <h1 className="sc-hero__title">Prove the fork. Keep the kernel small.</h1>
          <p className="sc-hero__lede">
            A brand-agnostic foundation: tokens and recipes, with brand decisions factored
            out. Indigo is the placeholder. Forge is the five-axis proof.
          </p>
          <div className="sc-hero__actions">
            <CookbookLink />
            <ContractLink />
          </div>
        </div>
        <div className="sc-proof">
          <div className="sc-proof__card">
            <p className="sc-proof__label">Indigo</p>
            <p className="sc-proof__value">Placeholder brand ramp</p>
            <div className="sc-proof__ramp sc-proof__ramp--indigo" aria-hidden="true" />
          </div>
          <div className="sc-proof__card">
            <p className="sc-proof__label sc-proof__label--forge">Forge</p>
            <p className="sc-proof__value">Hue · neutrals · type · radius · density</p>
            <div className="sc-proof__ramp sc-proof__ramp--forge" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

function GlassOverview(): React.JSX.Element {
  return (
    <section id="overview" className="sc-hero">
      <div className="sc-panel">
        <p className="sc-hero__eyebrow">What this is</p>
        <h1 className="sc-hero__title">A calm foundation you can fork.</h1>
        <p className="sc-hero__lede">
          Brand-agnostic tokens and recipes. Showcase chrome stays out of the kernel.
          Switch themes without rewriting components.
        </p>
        <div className="sc-stats">
          <div className="sc-stat">
            <p className="sc-stat__label">Why</p>
            <p className="sc-stat__value">Structure is not identity</p>
          </div>
          <div className="sc-stat">
            <p className="sc-stat__label">How</p>
            <p className="sc-stat__value">Override public tokens</p>
          </div>
          <div className="sc-stat">
            <p className="sc-stat__label">Proof</p>
            <p className="sc-stat__value">Forge five-axis theme</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Overview(): React.JSX.Element {
  const { mood } = useMood();
  if (mood === "editorial") return <EditorialOverview />;
  if (mood === "portfolio") return <PortfolioOverview />;
  if (mood === "glass") return <GlassOverview />;
  return <ProductOverview />;
}
