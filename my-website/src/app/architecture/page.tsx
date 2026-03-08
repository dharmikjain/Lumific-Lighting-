"use client";

import { useState } from "react";
import Link from "next/link";
import "./architecture.css";

// Architecture data mapped to actual Lumific modules
const DETAILS: Record<string, { title: string; body: string; tags: string[]; href?: string }> = {
  home: {
    title: "Homepage",
    body: "Brand hero, product categories, segments, platform features, and CTAs. The digital front door with stats (2,400+ products, 500+ projects), links to Products, Platform Features, Smart Quotation, and Chat with AI.",
    tags: ["Hero", "Product Categories", "Platform CTA", "Stats"],
    href: "/",
  },
  products: {
    title: "Product Catalogue",
    body: "8 products with filters, search, and modal. Categories: Track, Pendant, Linear, Downlight, Surface, Wall, Outdoor, Magnetic. Each card shows specs (wattage, IP, CCT), pricing, and ratings. Axis Track 48V, Corona Pendant, Stratum Linear, Vela Recessed, Nova, Helix, Terra Bollard, Aura Spot.",
    tags: ["Filters", "Search", "Specs", "Modal Detail"],
    href: "/products",
  },
  segments: {
    title: "Segments",
    body: "6 market segments: Hospitality, Commercial, Retail, Residential, Healthcare, Outdoor. Each card expands with target lux, standards, recommended products, and links to Products + Chat AI advisor.",
    tags: ["6 Segments", "Product Mapping", "Standards"],
    href: "/segments",
  },
  projects: {
    title: "Projects",
    body: "Project portfolio — completed installations, case studies, and lighting applications. Filtered by type and region.",
    tags: ["Portfolio", "Case Studies"],
    href: "/projects",
  },
  franchise: {
    title: "Franchise / Partner",
    body: "Partner and franchise programme. Distribution, dealer opportunities, and collaboration models for Lumific.",
    tags: ["Partners", "Distribution"],
    href: "/franchise",
  },
  contact: {
    title: "Contact",
    body: "Contact form for enquiries, project consultations, and general support. Primary CTA for lead generation.",
    tags: ["Form", "Enquiry", "Support"],
    href: "/contact",
  },
  complaints: {
    title: "Complaints",
    body: "Support channel for warranty claims and complaint resolution. Integrates with Lumific's warranty process.",
    tags: ["Support", "Warranty"],
    href: "/complaints",
  },
  about: {
    title: "About",
    body: "Brand story, Lumific's heritage, philosophy, and values. Team and company information.",
    tags: ["Brand", "Story", "Team"],
    href: "/about",
  },
  pricing: {
    title: "Pricing",
    body: "Pricing information, tier structure, and transparency for architects, dealers, and specifiers.",
    tags: ["Tiers", "Transparency"],
    href: "/pricing",
  },
  quotation: {
    title: "Quotation Engine",
    body: "Platform module: Upload project specs, AI-driven cost estimation, material and labor breakdown. Export to PDF/Excel. Role-based pricing (retail, dealer, project, architect) with discount management.",
    tags: ["AI Estimation", "PDF Export", "Role Pricing"],
    href: "/platform",
  },
  ai: {
    title: "AI Integration Layer",
    body: "Intelligent lighting assistant. Natural language queries, product recommendations, lux calculations, energy optimisation, and code compliance. Powers the Chat with AI experience.",
    tags: ["Lumi AI", "NLP", "Recommendations"],
    href: "/chat-ai",
  },
  layout: {
    title: "Layout Engine",
    body: "Platform module: Upload PDF/DWG floor plans. AI room detection, automated zone mapping, lux level calculations, and complete BOQ generation. Design-to-spec automation.",
    tags: ["Floor Plan", "Lux Calc", "BOQ"],
    href: "/platform",
  },
  productsplatform: {
    title: "Product Listing (Platform)",
    body: "Platform module: Full product database within the unified platform. Detailed specs, multi-tier pricing, compatibility matrix, and photometric data access.",
    tags: ["Catalog", "Specs", "Photometry"],
    href: "/platform",
  },
  configurator: {
    title: "Lumific Configurator",
    body: "Platform module: Custom product builder. Finish selection, optical options, control system integration, and real-time pricing. Build bespoke luminaire configurations.",
    tags: ["3D Preview", "Finishes", "Controls", "Pricing"],
    href: "/platform",
  },
  chat: {
    title: "Chat with AI (Lumi)",
    body: "Standalone AI assistant page. Knowledge base covering products, segments (retail, hotel, office, hospital, outdoor), CCT/CRI, DALI, lux, IP, UGR, beam angle, energy, warranty. Fuzzy keyword matching for instant responses.",
    tags: ["Lumi", "Knowledge Base", "Instant Help"],
    href: "/chat-ai",
  },
  smartquote: {
    title: "Smart Quotation Maker",
    body: "Standalone role-based quote builder. 8 products with tiered pricing (retail, dealer, project, architect). Add items, quantities, discount, GST. Export to PDF.",
    tags: ["Quote Builder", "PDF Export", "Role Pricing"],
    href: "/smart-quotation",
  },
  automation: {
    title: "Smart Automation",
    body: "Control systems hub: DALI-2, KNX, Casambi, DMX512. Each protocol with features, compatibility, and automation scenarios. Links to AI advisor for driver recommendations.",
    tags: ["DALI-2", "KNX", "Casambi", "DMX512"],
    href: "/smart-automation",
  },
  sections: {
    title: "Redesigned Platform Sections",
    body: "Feature showcase page for 5 platform modules: Quotation Engine, AI Integration, Layout Engine, Product Catalog, Configurator. Cards with feature lists and links to Platform.",
    tags: ["Showcase", "Platform Intro"],
    href: "/redesigned-sections",
  },
  platform: {
    title: "Unified Platform",
    body: "Tabbed application with 5 sections: Quotation, AI Layer, Layout Engine, Products, Configurator. Own top nav, main navbar hidden. Book Demo CTA. Toast notifications.",
    tags: ["5 Tabs", "Full Platform", "Book Demo"],
    href: "/platform",
  },
  catalogue: {
    title: "Catalogue Hub",
    body: "Product catalogue hub and resource centre. Access to downloadable catalogues and lighting literature.",
    tags: ["Catalogue", "Downloads"],
    href: "/catalogue",
  },
  getcatalogue: {
    title: "Get Catalogue",
    body: "Request or download product catalogue. Lead capture for catalogue access.",
    tags: ["Lead Capture", "Catalogue"],
    href: "/get-catalogue",
  },
  dashboard: {
    title: "User Dashboard",
    body: "Authenticated user area (Clerk). Stats, projects, subscription. Available after sign-in.",
    tags: ["Auth", "Projects", "Subscription"],
    href: "/dashboard",
  },
};

const ROLES = ["client", "architect", "interior", "sales", "all"] as const;

// Audience mapping for each module
const MODULE_ROLES: Record<string, (typeof ROLES)[number][]> = {
  home: ["client", "architect", "interior", "sales"],
  products: ["client", "architect", "interior", "sales"],
  segments: ["client", "architect", "interior", "sales"],
  projects: ["client", "architect", "interior"],
  franchise: ["sales"],
  contact: ["client", "architect", "interior", "sales"],
  complaints: ["client", "architect", "sales"],
  about: ["client", "architect"],
  pricing: ["architect", "interior", "sales"],
  quotation: ["architect", "interior", "sales"],
  ai: ["architect", "interior", "sales", "client"],
  layout: ["architect", "interior"],
  productsplatform: ["architect", "interior", "sales"],
  configurator: ["architect", "interior", "sales"],
  chat: ["architect", "interior", "sales", "client"],
  smartquote: ["architect", "interior", "sales"],
  automation: ["architect", "interior"],
  sections: ["client", "architect", "interior"],
  platform: ["architect", "interior", "sales"],
  catalogue: ["architect", "interior", "sales"],
  getcatalogue: ["client", "architect", "interior"],
  dashboard: ["architect", "interior", "sales"],
};

export default function ArchitecturePage() {
  const [activeRole, setActiveRole] = useState<(typeof ROLES)[number] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const d = selected ? DETAILS[selected] : null;

  const matchesRole = (key: string) => {
    if (!activeRole || activeRole === "all") return true;
    return MODULE_ROLES[key]?.includes(activeRole) ?? false;
  };

  return (
    <div className="arch-page">
      <header className="arch-header">
        <Link href="/" className="arch-logo">Lumi<span>fic</span></Link>
        <span className="arch-tag">Website Architecture</span>
      </header>

      <section className="arch-hero">
        <div className="arch-hero-label">Lighting Platform</div>
        <h1>Website <em>Architecture</em></h1>
        <p className="arch-hero-desc">
          A unified digital platform built around Lumific&apos;s lighting products and tools.
          Mapped to the currently implemented modules in the Lumific website.
        </p>
      </section>

      <div className="arch-filters">
        <span className="arch-filter-label">Filter by audience</span>
        {ROLES.map((r) => (
          <button
            key={r}
            className={`arch-badge ${r} ${activeRole === r ? "active" : ""} ${activeRole && activeRole !== r ? "dimmed" : ""}`}
            onClick={() => setActiveRole(activeRole === r ? null : r)}
          >
            {r === "all" ? "All" : r === "client" ? "Client" : r === "interior" ? "Interior" : r === "sales" ? "Sales/Partner" : "Architect"}
          </button>
        ))}
      </div>

      <div className="arch-main">
        <div className="arch-section-title">Site Architecture</div>

        <div className="arch-grid">
          {/* LEFT: Public & Discovery */}
          <div className="arch-col">
            <div className="arch-col-label">Public & Discovery</div>
            {[
              { key: "home", icon: "🏠", name: "Homepage", desc: "Hero, categories, segments, platform CTA, stats.", roles: ["client", "architect", "interior", "sales"] },
              { key: "products", icon: "💡", name: "Products", desc: "8 products, filters, search, modal detail.", roles: ["client", "architect", "interior", "sales"] },
              { key: "segments", icon: "🏛️", name: "Segments", desc: "6 market segments with product mapping.", roles: ["client", "architect", "interior", "sales"] },
              { key: "projects", icon: "📁", name: "Projects", desc: "Portfolio, case studies.", roles: ["client", "architect", "interior"] },
              { key: "franchise", icon: "🤝", name: "Franchise", desc: "Partner & distribution programme.", roles: ["sales"] },
              { key: "contact", icon: "✉️", name: "Contact", desc: "Enquiry form, lead capture.", roles: ["client", "architect", "interior", "sales"] },
              { key: "complaints", icon: "📋", name: "Complaints", desc: "Warranty & support channel.", roles: ["client", "architect", "sales"] },
              { key: "about", icon: "✦", name: "About", desc: "Brand story, heritage, team.", roles: ["client", "architect"] },
              { key: "pricing", icon: "₹", name: "Pricing", desc: "Tier structure, transparency.", roles: ["architect", "interior", "sales"] },
            ].map((m) => (
              <Link
                key={m.key}
                href={DETAILS[m.key]?.href ?? "#"}
                className={`arch-card ${matchesRole(m.key) ? "" : "faded"} ${selected === m.key ? "highlighted" : ""}`}
                onClick={(e) => { e.preventDefault(); setSelected(m.key); }}
              >
                <div className="arch-card-icon">{m.icon}</div>
                <div className="arch-card-name">{m.name}</div>
                <div className="arch-card-desc">{m.desc}</div>
                <div className="arch-card-users">
                  {m.roles.map((r) => (
                    <span key={r} className={`arch-cu ${r}`} title={r} />
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="arch-divider" />

          {/* CENTER: Core Platform */}
          <div className="arch-col">
            <div className="arch-col-label">Core Platform</div>
            {[
              { key: "quotation", icon: "💰", name: "Quotation Engine", desc: "AI-driven cost estimation, role-based pricing, PDF export.", roles: ["architect", "interior", "sales"], main: true },
              { key: "ai", icon: "🤖", name: "AI Integration", desc: "Lumi AI — product recs, lux calc, compliance.", roles: ["architect", "interior", "sales", "client"] },
              { key: "layout", icon: "📐", name: "Layout Engine", desc: "Floor plan upload, room detection, BOQ, lux calc.", roles: ["architect", "interior"] },
              { key: "productsplatform", icon: "📚", name: "Product Listing", desc: "Platform catalog, specs, photometry.", roles: ["architect", "interior", "sales"] },
              { key: "configurator", icon: "⚙️", name: "Lumific Configurator", desc: "Custom builder: finish, optics, controls, pricing.", roles: ["architect", "interior", "sales"] },
            ].map((m) => (
              <Link
                key={m.key}
                href={DETAILS[m.key]?.href ?? "#"}
                className={`arch-core-card ${m.main ? "main-core" : ""} ${matchesRole(m.key) ? "" : "faded"} ${selected === m.key ? "highlighted" : ""}`}
                onClick={(e) => { e.preventDefault(); setSelected(m.key); }}
              >
                <div className="arch-core-name">{m.icon} {m.name}</div>
                <div className="arch-core-desc">{m.desc}</div>
                <div className="arch-features">
                  {(DETAILS[m.key]?.tags ?? []).slice(0, 4).map((t) => (
                    <span key={t} className="arch-feature-chip">{t}</span>
                  ))}
                </div>
                <div className="arch-card-users">
                  {m.roles.map((r) => (
                    <span key={r} className={`arch-cu ${r}`} title={r} />
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="arch-divider" />

          {/* RIGHT: Tools & Support */}
          <div className="arch-col">
            <div className="arch-col-label">Tools & Support</div>
            {[
              { key: "chat", icon: "💬", name: "Chat with AI", desc: "Lumi — knowledge base, instant help.", roles: ["architect", "interior", "sales", "client"] },
              { key: "smartquote", icon: "📄", name: "Smart Quotation", desc: "Standalone quote builder, PDF export.", roles: ["architect", "interior", "sales"] },
              { key: "automation", icon: "🔌", name: "Smart Automation", desc: "DALI-2, KNX, Casambi, DMX512.", roles: ["architect", "interior"] },
              { key: "sections", icon: "✨", name: "Redesigned Sections", desc: "Platform feature showcase.", roles: ["client", "architect", "interior"] },
              { key: "platform", icon: "🖥️", name: "Unified Platform", desc: "5-tab full platform app.", roles: ["architect", "interior", "sales"] },
              { key: "catalogue", icon: "📖", name: "Catalogue Hub", desc: "Product catalogue access.", roles: ["architect", "interior", "sales"] },
              { key: "getcatalogue", icon: "⬇️", name: "Get Catalogue", desc: "Catalogue request / download.", roles: ["client", "architect", "interior"] },
              { key: "dashboard", icon: "📊", name: "Dashboard", desc: "User area (auth), projects.", roles: ["architect", "interior", "sales"] },
            ].map((m) => (
              <Link
                key={m.key}
                href={DETAILS[m.key]?.href ?? "#"}
                className={`arch-card ${matchesRole(m.key) ? "" : "faded"} ${selected === m.key ? "highlighted" : ""}`}
                onClick={(e) => { e.preventDefault(); setSelected(m.key); }}
              >
                <div className="arch-card-icon">{m.icon}</div>
                <div className="arch-card-name">{m.name}</div>
                <div className="arch-card-desc">{m.desc}</div>
                <div className="arch-card-users">
                  {m.roles.map((r) => (
                    <span key={r} className={`arch-cu ${r}`} title={r} />
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="arch-detail-panel">
          {d ? (
            <>
              <div className="arch-dp-label">Selected Module</div>
              <div className="arch-dp-title">{d.title}</div>
              <div className="arch-dp-body">{d.body}</div>
              <div className="arch-dp-tags">{d.tags.map((t) => <span key={t} className="arch-dp-tag">{t}</span>)}</div>
              {d.href && <Link href={d.href} className="arch-link">View page →</Link>}
            </>
          ) : (
            <div className="arch-dp-empty">← Click any module above to see details</div>
          )}
        </div>
      </div>
    </div>
  );
}
