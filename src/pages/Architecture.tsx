import { useState, useRef } from 'react';
import '../styles/architecture.css';

/* ─── Data ─── */
interface PageDetail {
  title: string;
  body: string;
  tags: string[];
}

const details: Record<string, PageDetail> = {
  home: {
    title: 'Homepage',
    body: "The brand's digital front door. Combines editorial-quality hero imagery with curated product spotlights, latest project features, and direct calls to action for each audience. The layout adapts to guide different visitor types — a client sees inspiration; a professional sees technical routes.",
    tags: ['Brand Identity', 'Product Spotlight', 'Latest Projects', 'CTAs per Role'],
  },
  products: {
    title: 'Product Catalogue',
    body: 'The full Antigravity range presented with rich filtering (family, application, IP rating, CCT, finish). Each product page includes: photometric data, downloadable IES/DWG files, dimensional drawings, installation docs, compatible accessories, and a direct link to the configurator.',
    tags: ['Advanced Filters', 'IES Downloads', 'BIM/DWG', 'Spec Sheet PDF', 'Configurator CTA'],
  },
  projects: {
    title: 'Projects & Portfolio',
    body: 'A curated showcase of completed installations. Filtered by project type (hospitality, retail, residential, office, public), region, and product family. Each project features high-quality photography, the brief, the lighting design challenge, and the Antigravity products used.',
    tags: ['Project Type Filter', 'Region Filter', 'Products Used', 'Design Story'],
  },
  brand: {
    title: 'Brand Story & About',
    body: "Antigravity's heritage, design philosophy, manufacturing approach, and commitment to quality. Positions the brand for high-end clients and specifiers who want to understand who they're working with. Includes team profiles, sustainability commitments, and manufacturing insights.",
    tags: ['Heritage', 'Philosophy', 'Team', 'Sustainability'],
  },
  inspiration: {
    title: 'Inspiration / Lookbook',
    body: 'Editorial-grade content — mood boards, spatial photography, designer interviews, and trend features. This section builds desire and positions Antigravity as a creative partner. Essential for interior designers and marketing campaigns. Updated seasonally.',
    tags: ['Mood Boards', 'Editorial Photography', 'Designer Interviews', 'Trends'],
  },
  contact: {
    title: 'Contact & Showroom',
    body: 'Multiple contact routes: general enquiry, project consultation, showroom appointments, press contact. Includes a showroom locator (Ahmedabad + other locations), virtual showroom booking, and a directory of sales representatives by region.',
    tags: ['Showroom Booking', 'Project Enquiry', 'Rep Finder', 'Press Contact'],
  },
  configurator: {
    title: 'Product Configurator',
    body: "The centrepiece tool. Allows precise customisation of luminaires across finish, CCT, CRI, beam angle, dimming type, and mounting. Generates a live 3D preview, an auto-populated spec sheet PDF, and project save for later use. Architects can export directly to BIM-compatible files. Sales teams use it to build visual quotes.",
    tags: ['3D Live Preview', 'Spec Sheet PDF', 'BIM Export', 'Save & Share', 'Quote Integration'],
  },
  portal: {
    title: 'Partner & Sales Portal',
    body: 'Gated behind login. Provides sales team and distributor/integrator partners with trade pricing, project-specific pricing request forms, a quote builder, order placement and tracking, warranty registration, and a library of co-branded marketing assets and sell sheets.',
    tags: ['Trade Pricing', 'Quote Builder', 'Order Tracking', 'Marketing Assets', 'Warranty Registration'],
  },
  techlib: {
    title: 'Technical Library',
    body: "A comprehensive, searchable repository of all technical documentation. Architects and interior designers can download IES/LDT photometric files, Revit families, AutoCAD DWG drawings, installation & wiring guides, CE/ETL certifications, and LEED contribution documentation per product.",
    tags: ['IES / LDT Files', 'Revit Families', 'AutoCAD DWG', 'Certifications', 'LEED Docs'],
  },
  projectcollaboration: {
    title: 'Project Collaboration Workspace',
    body: 'Named project rooms where sales, designer, and client collaborate. Designers pin products, add notes, and request approvals. Clients can approve or comment. Sales teams see the status of every active project. Includes version history so changes are always tracked.',
    tags: ['Shared Pinboards', 'Comments & Annotations', 'Approval Workflow', 'Version History', 'Role Permissions'],
  },
  specguide: {
    title: 'Specification Guide',
    body: 'A guided tool that helps interior designers and architects identify the right luminaire for a given application. Input: room type, target lux level, mounting type, aesthetic preference. Output: a shortlist of recommended products with reasoning and direct links to product pages.',
    tags: ['Application Selector', 'Lux Calculator', 'Product Recommendations', 'Spec Shortlist'],
  },
  knowledge: {
    title: 'Knowledge Base & FAQs',
    body: 'Searchable support content covering installation how-tos, CCT/CRI explained, warranty terms, compliance by region, troubleshooting, and maintenance schedules. Structured for both professional specifiers seeking technical depth and end clients with general questions.',
    tags: ['Installation Guides', 'Warranty Terms', 'CCT / CRI Education', 'Regional Compliance', 'Troubleshooting'],
  },
  training: {
    title: 'Training Academy',
    body: "A gated learning hub for sales teams and distributor partners. Short video modules, product knowledge quizzes, and certification badges. Includes Lunch & Learn presentation downloads, product launch briefings, and competitive positioning materials.",
    tags: ['Video Modules', 'Product Certifications', 'Lunch & Learn Packs', 'Launch Briefings'],
  },
  sustainability: {
    title: 'Sustainability Hub',
    body: "Documents Antigravity's environmental credentials. Per-product carbon data, LEED/BREEAM contribution statements, material declarations, and lifecycle analysis. Supports architects and clients who need to evidence sustainability in their projects.",
    tags: ['Carbon Data', 'LEED / BREEAM Support', 'Material Declarations', 'EPD Reports'],
  },
  news: {
    title: 'News & Press',
    body: 'Latest news, award wins, and industry features. Includes a media kit with brand assets, approved photography, logos, and spokesperson bio. Marketing teams can easily distribute and PR teams can access everything they need.',
    tags: ['Press Releases', 'Awards', 'Media Kit', 'Brand Assets', 'Photography'],
  },
  search: {
    title: 'Global Search',
    body: "An intelligent, cross-content search that indexes products, projects, technical documents, FAQs, and inspiration content. Results are grouped by content type and filtered by relevance. Essential for professionals who know what they need and want it fast.",
    tags: ['Cross-content Index', 'Grouped Results', 'Product Search', 'Doc Search', 'Autocomplete'],
  },
};

type Role = 'sales' | 'marketing' | 'client' | 'interior' | 'architect' | 'partner';

interface CardDef {
  key: string;
  icon: string;
  name: string;
  desc: string;
  roles: Role[];
}

const publicCards: CardDef[] = [
  { key: 'home', icon: '🏠', name: 'Homepage', desc: 'Brand statement, hero visuals, curated product spotlights, latest projects.', roles: ['client', 'interior', 'architect', 'marketing'] },
  { key: 'products', icon: '💡', name: 'Product Catalogue', desc: 'Full product range with filters, specs, IES files, photometry data.', roles: ['client', 'interior', 'architect', 'sales', 'partner'] },
  { key: 'projects', icon: '🏛️', name: 'Projects / Portfolio', desc: 'Completed installations. Searchable by type, sector, region.', roles: ['client', 'interior', 'architect', 'marketing'] },
  { key: 'brand', icon: '✦', name: 'Brand Story / About', desc: "Antigravity's philosophy, heritage, sustainability, craftsmanship.", roles: ['marketing', 'client'] },
  { key: 'inspiration', icon: '🖼️', name: 'Inspiration / Lookbook', desc: 'Editorial content, mood boards, spatial photography.', roles: ['client', 'interior', 'marketing'] },
  { key: 'contact', icon: '✉️', name: 'Contact / Showroom', desc: 'Get in touch, book a showroom visit, find local reps.', roles: ['client', 'interior', 'architect', 'sales', 'partner'] },
];

interface CoreCardDef {
  key: string;
  icon: string;
  name: string;
  desc: string;
  features: string[];
  roles: Role[];
  isMain?: boolean;
}

const coreCards: CoreCardDef[] = [
  {
    key: 'configurator', icon: '🔧', name: 'Product Configurator', isMain: true,
    desc: 'Interactive tool to customise fixtures — finish, CCT, beam angle, dimming, mounting. Generates spec sheets and project saves.',
    features: ['3D Preview', 'Spec Export PDF', 'Save Project', 'BIM / Revit Files'],
    roles: ['interior', 'architect', 'sales'],
  },
  {
    key: 'portal', icon: '🔐', name: 'Partner & Sales Portal',
    desc: 'Gated area for sales team, distributors, and integrators. Pricing, project pricing requests, sales materials, order tracking.',
    features: ['Price Lists', 'Quote Builder', 'Order Status', 'Marketing Assets'],
    roles: ['sales', 'partner'],
  },
  {
    key: 'techlib', icon: '📐', name: 'Technical Library',
    desc: 'Downloadable resources: IES/LDT files, DWG/BIM, installation guides, photometric reports, certifications, compliance docs.',
    features: ['IES / LDT', 'DWG / BIM', 'Revit Families', 'Install Guides'],
    roles: ['architect', 'interior', 'partner'],
  },
  {
    key: 'projectcollaboration', icon: '🤝', name: 'Project Collaboration',
    desc: 'Named project workspaces. Clients, designers, and sales reps share selections, annotations, and approval workflows.',
    features: ['Shared Boards', 'Comments', 'Approval Flow', 'Version History'],
    roles: ['client', 'interior', 'sales'],
  },
];

const toolCards: CardDef[] = [
  { key: 'specguide', icon: '📋', name: 'Specification Guide', desc: 'Step-by-step luminaire selection by application type and lux target.', roles: ['architect', 'interior'] },
  { key: 'knowledge', icon: '📚', name: 'Knowledge Base / FAQs', desc: 'Installation, maintenance, warranty, regulatory compliance, CCT/CRI guidance.', roles: ['architect', 'interior', 'sales', 'partner'] },
  { key: 'training', icon: '🎓', name: 'Training Academy', desc: 'Gated learning modules, product certifications, lunch & learn materials for sales and distributor teams.', roles: ['sales', 'partner'] },
  { key: 'sustainability', icon: '🌿', name: 'Sustainability Hub', desc: 'Environmental data, LEED/BREEAM support resources, carbon footprint per product.', roles: ['client', 'marketing', 'architect'] },
  { key: 'news', icon: '📰', name: 'News & Press', desc: 'Press releases, awards, industry news, media kit download.', roles: ['client', 'marketing', 'interior', 'architect'] },
  { key: 'search', icon: '🔍', name: 'Global Search', desc: 'Cross-content intelligent search — products, projects, docs, FAQs, specs.', roles: ['sales', 'partner', 'architect', 'interior', 'client'] },
];

interface JourneyDef {
  role: string;
  color: string;
  steps: string[];
}

const journeys: JourneyDef[] = [
  { role: 'Sales Team', color: '#4a9eff', steps: ['Log into Partner Portal', 'Pull pricing & availability', 'Build quote with configurator', 'Share project workspace with client', 'Track order status'] },
  { role: 'Marketing', color: '#ff6b6b', steps: ['Manage brand story content', 'Upload new portfolio projects', 'Publish inspiration lookbooks', 'Download press assets', 'Review analytics & SEO'] },
  { role: 'End Client', color: '#c8a96e', steps: ['Browse inspiration / lookbook', 'Explore product catalogue', 'View portfolio projects', 'Contact sales / showroom', 'Review project selections'] },
  { role: 'Interior Designer', color: '#7ecfa6', steps: ['Search product by application', 'Use configurator — CCT, finish', 'Download spec sheets', 'Build project mood board', 'Share with client for approval'] },
  { role: 'Architect', color: '#b57bff', steps: ['Download BIM / Revit families', 'Retrieve IES photometric files', 'Check compliance / certs', 'Spec with lux calculation ref.', 'Submit project for approval'] },
  { role: 'Distributor & Partner', color: '#ff9f43', steps: ['Access trade price lists', 'Complete training modules', 'Download marketing materials', 'Place & track orders', 'Access technical support'] },
];

/* ─── Components ─── */

function RoleDots({ roles }: { roles: Role[] }) {
  return (
    <div className="arch-card-users">
      {roles.map((r) => (
        <span key={r} className={`arch-cu ${r}`} />
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function Architecture() {
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleFilter = (role: Role | null) => {
    setActiveRole(role);
  };

  const handleShowDetail = (key: string) => {
    setSelectedDetail(key);
    setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  };

  const cardClass = (roles: Role[]) => {
    if (!activeRole) return '';
    return roles.includes(activeRole) ? 'highlighted' : 'faded';
  };

  const badgeClass = (role: Role) => {
    if (!activeRole) return '';
    return activeRole === role ? 'active' : 'dimmed';
  };

  const detail = selectedDetail ? details[selectedDetail] : null;

  return (
    <div className="arch-page">
      {/* HEADER */}
      <header className="arch-header">
        <div className="arch-logo">
          Lumific
          <span>Website Architecture</span>
        </div>
        <div className="arch-tag">Internal Presentation</div>
      </header>

      {/* HERO */}
      <section className="arch-hero">
        <div className="arch-hero-label">Lighting Platform</div>
        <h1>
          Website<br />
          <em>Architecture</em>
        </h1>
        <p className="arch-hero-desc">
          A unified digital platform serving 6 distinct audiences — from sales teams to distribution partners — built around Lumific&apos;s lighting products and brand ecosystem.
        </p>
      </section>

      {/* AUDIENCE FILTER */}
      <div className="arch-audience-strip">
        <span className="arch-audience-label">Filter by audience</span>
        {([
          { role: 'sales' as Role, label: 'Sales' },
          { role: 'marketing' as Role, label: 'Marketing' },
          { role: 'client' as Role, label: 'Client' },
          { role: 'interior' as Role, label: 'Interior Design' },
          { role: 'architect' as Role, label: 'Architect' },
          { role: 'partner' as Role, label: 'Distributor & Partner' },
        ]).map(({ role, label }) => (
          <button
            key={role}
            className={`arch-badge ${role} ${badgeClass(role)}`}
            onClick={() => handleFilter(activeRole === role ? null : role)}
          >
            {label}
          </button>
        ))}
        <button
          className="arch-badge reset-badge"
          onClick={() => handleFilter(null)}
        >
          All
        </button>
      </div>

      {/* MAIN ARCHITECTURE */}
      <div className="arch-main">
        <div className="arch-section-title">Site Architecture</div>

        <div className="arch-grid">
          {/* LEFT COL: Public facing */}
          <div className="arch-col" id="col-public">
            <div className="arch-col-label">Public &amp; Discovery</div>
            {publicCards.map((card) => (
              <div
                key={card.key}
                className={`arch-page-card ${cardClass(card.roles)}`}
                onClick={() => handleShowDetail(card.key)}
              >
                <div className="arch-card-icon">{card.icon}</div>
                <div className="arch-card-name">{card.name}</div>
                <div className="arch-card-desc">{card.desc}</div>
                <RoleDots roles={card.roles} />
              </div>
            ))}
          </div>

          {/* DIVIDER */}
          <div className="arch-divider-v" />

          {/* CENTER: Core Platform */}
          <div className="arch-core-section">
            <div className="arch-col-label">Core Platform Features</div>
            {coreCards.map((card) => (
              <div
                key={card.key}
                className={`arch-core-card ${card.isMain ? 'main-core' : ''} ${cardClass(card.roles)}`}
                onClick={() => handleShowDetail(card.key)}
              >
                <div className="arch-core-name">
                  {card.icon} {card.name}
                </div>
                <div className="arch-core-desc">{card.desc}</div>
                <div className="arch-core-features">
                  {card.features.map((f) => (
                    <span key={f} className="arch-feature-chip">{f}</span>
                  ))}
                </div>
                <RoleDots roles={card.roles} />
              </div>
            ))}
          </div>

          {/* DIVIDER */}
          <div className="arch-divider-v" />

          {/* RIGHT COL: Tools & support */}
          <div className="arch-col" id="col-tools">
            <div className="arch-col-label">Support &amp; Pro Tools</div>
            {toolCards.map((card) => (
              <div
                key={card.key}
                className={`arch-page-card ${cardClass(card.roles)}`}
                onClick={() => handleShowDetail(card.key)}
              >
                <div className="arch-card-icon">{card.icon}</div>
                <div className="arch-card-name">{card.name}</div>
                <div className="arch-card-desc">{card.desc}</div>
                <RoleDots roles={card.roles} />
              </div>
            ))}
          </div>
        </div>

        {/* DETAIL PANEL */}
        <div ref={panelRef} className={`arch-detail-panel ${detail ? 'active' : ''}`}>
          {detail ? (
            <>
              <div className="arch-dp-label">Selected Page / Module</div>
              <div className="arch-dp-title">{detail.title}</div>
              <div className="arch-dp-body">{detail.body}</div>
              <div className="arch-dp-tags">
                {detail.tags.map((t) => (
                  <span key={t} className="arch-dp-tag">{t}</span>
                ))}
              </div>
            </>
          ) : (
            <div className="arch-dp-empty">← Click any page or module above to see details</div>
          )}
        </div>

        {/* USER JOURNEYS */}
        <div className="arch-journey-section">
          <div className="arch-section-title">Typical User Journeys</div>
          <div className="arch-journey-grid">
            {journeys.map((j) => (
              <div key={j.role} className="arch-journey-card">
                <div className="arch-jc-role">
                  <div className="arch-jc-dot" style={{ background: j.color }} />
                  <div className="arch-jc-name" style={{ color: j.color }}>{j.role}</div>
                </div>
                <ul className="arch-jc-path">
                  {j.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="arch-footer">
        <span>Lumific Lighting — Internal Architecture Document</span>
        <span>For presentation use only</span>
      </footer>
    </div>
  );
}
