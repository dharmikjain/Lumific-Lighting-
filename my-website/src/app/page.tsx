"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="lumi-home">
      {/* Hero Section */}
      <section className="lumi-hero">
        <div className="lumi-hero-bg" />
        <div className="lumi-hero-content">
          <div className="lumi-hero-badge">
            <span className="lumi-hero-badge-dot" />
            Premium Architectural Lighting
          </div>
          <h1 className="lumi-hero-h1">
            Where Light Meets
            <br />
            <span className="lumi-hero-accent">Intelligence</span>
          </h1>
          <p className="lumi-hero-sub">
            Premium architectural lighting solutions powered by AI. From specification to installation, 
            Lumific transforms how architects, designers, and specifiers work with light.
          </p>
          <div className="lumi-hero-btns">
            <Link href="/products" className="lumi-btn-gold">
              Explore Products →
            </Link>
            <Link href="/redesigned-sections" className="lumi-btn-outline">
              Platform Features
            </Link>
            <Link href="/smart-quotation" className="lumi-btn-outline">
              Smart Quotation
            </Link>
            <Link href="/chat-ai" className="lumi-btn-outline lumi-btn-ai">
              💬 Chat with AI
            </Link>
          </div>
          <div className="lumi-hero-stats">
            {[
              { val: "2,400+", label: "Products" },
              { val: "500+", label: "Projects" },
              { val: "50+", label: "Cities" },
              { val: "12+", label: "Segments" },
            ].map((s) => (
              <div key={s.label} className="lumi-hero-stat">
                <div className="lumi-hero-stat-val">{s.val}</div>
                <div className="lumi-hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="lumi-section">
        <div className="lumi-section-header">
          <span className="lumi-eyebrow">Product Range</span>
          <h2 className="lumi-h2">Architectural <em>Lighting</em> Solutions</h2>
          <p className="lumi-sub">Engineered with precision. Designed for impact.</p>
        </div>
        <div className="lumi-grid-4">
          {[
            { emoji: "💡", name: "Track Systems", desc: "48V magnetic & conventional", link: "/products" },
            { emoji: "🔆", name: "Pendants", desc: "Statement architectural pendants", link: "/products" },
            { emoji: "📏", name: "Linear", desc: "Seamless recessed & surface", link: "/products" },
            { emoji: "⭕", name: "Downlights", desc: "IP65 premium downlight range", link: "/products" },
            { emoji: "🌟", name: "Decorative", desc: "Bespoke artistic luminaires", link: "/products" },
            { emoji: "🏗️", name: "Outdoor", desc: "Facade, landscape & bollards", link: "/products" },
            { emoji: "💎", name: "Custom", desc: "RAL/NCS custom finishes", link: "/products" },
            { emoji: "🔌", name: "Smart Controls", desc: "DALI, KNX, Casambi, BLE", link: "/smart-automation" },
          ].map((cat) => (
            <Link key={cat.name} href={cat.link} className="lumi-cat-card">
              <div className="lumi-cat-emoji">{cat.emoji}</div>
              <div className="lumi-cat-name">{cat.name}</div>
              <div className="lumi-cat-desc">{cat.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Segments */}
      <section className="lumi-section lumi-section-dark">
        <div className="lumi-section-header">
          <span className="lumi-eyebrow">Market Segments</span>
          <h2 className="lumi-h2">Lighting for Every <em>Application</em></h2>
        </div>
        <div className="lumi-grid-3">
          {[
            { emoji: "🏨", name: "Hospitality", desc: "Hotels, restaurants, resorts", color: "#3d2d4a" },
            { emoji: "🏢", name: "Commercial", desc: "Offices & corporate spaces", color: "#1a2d4a" },
            { emoji: "🏪", name: "Retail", desc: "Shops & brand showrooms", color: "#4a2d1a" },
            { emoji: "🏡", name: "Residential", desc: "Premium homes & villas", color: "#2d4a3e" },
            { emoji: "🏥", name: "Healthcare", desc: "Hospitals & wellness centres", color: "#1a4a3a" },
            { emoji: "🌃", name: "Outdoor", desc: "Facade & landscape", color: "#1a1a3d" },
          ].map((seg) => (
            <Link key={seg.name} href="/segments" className="lumi-seg-card" style={{ background: seg.color }}>
              <div className="lumi-seg-emoji">{seg.emoji}</div>
              <div className="lumi-seg-overlay">
                <div className="lumi-seg-name">{seg.name}</div>
                <div className="lumi-seg-desc">{seg.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Platform Features */}
      <section className="lumi-section">
        <div className="lumi-section-header">
          <span className="lumi-eyebrow">Platform</span>
          <h2 className="lumi-h2">The Ultimate Lighting <em>Platform</em></h2>
          <p className="lumi-sub">Everything you need to specify, quote, and procure — all in one place.</p>
        </div>
        <div className="lumi-grid-3">
          {[
            { icon: "⚡", title: "Smart Quotation", desc: "Role-based pricing with AI. Generate quotes in seconds.", href: "/smart-quotation" },
            { icon: "💬", title: "AI Lighting Advisor", desc: "Chat with Lumi — your 24/7 expert on architectural lighting.", href: "/chat-ai" },
            { icon: "📐", title: "Layout Engine", desc: "Upload floor plans. AI detects rooms and auto-generates BOQ.", href: "/platform" },
            { icon: "🎨", title: "Product Configurator", desc: "10-step configurator with 200+ finishes and real-time preview.", href: "/platform" },
            { icon: "🤖", title: "Smart Automation", desc: "DALI, KNX, Casambi control integration & scene programming.", href: "/smart-automation" },
            { icon: "📋", title: "Catalogue Hub", desc: "Browse and download product catalogues instantly.", href: "/catalogue" },
          ].map((f) => (
            <Link key={f.title} href={f.href} className="lumi-feature-card">
              <div className="lumi-feature-icon">{f.icon}</div>
              <h3 className="lumi-feature-title">{f.title}</h3>
              <p className="lumi-feature-desc">{f.desc}</p>
              <span className="lumi-feature-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="lumi-cta-section">
        <div className="lumi-cta-inner">
          <h2 className="lumi-cta-h2">&ldquo;Every space deserves light that understands it.&rdquo;</h2>
          <p className="lumi-cta-sub">Join 500+ architects and designers who trust Lumific for their premium projects.</p>
          <div className="lumi-cta-btns">
            <Link href="/franchise" className="lumi-btn-gold">Become a Franchise Partner</Link>
            <Link href="/contact" className="lumi-btn-outline">Contact Us</Link>
            <Link href="/get-catalogue" className="lumi-btn-outline">Get Catalogue</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lumi-footer">
        <div className="lumi-footer-inner">
          <div className="lumi-footer-col">
            <div className="lumi-footer-brand">Lumific</div>
            <p className="lumi-footer-tagline">Premium Architectural Lighting Intelligence</p>
          </div>
          <div className="lumi-footer-col">
            <div className="lumi-footer-heading">Products</div>
            <Link href="/products">All Products</Link>
            <Link href="/segments">Segments</Link>
            <Link href="/catalogue">Catalogues</Link>
            <Link href="/get-catalogue">Get Catalogue</Link>
          </div>
          <div className="lumi-footer-col">
            <div className="lumi-footer-heading">Platform</div>
            <Link href="/smart-quotation">Smart Quotation</Link>
            <Link href="/smart-automation">Smart Automation</Link>
            <Link href="/chat-ai">Chat with AI</Link>
            <Link href="/platform">Full Platform</Link>
          </div>
          <div className="lumi-footer-col">
            <div className="lumi-footer-heading">Company</div>
            <Link href="/projects">Projects</Link>
            <Link href="/franchise">Franchise</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/complaints">Complaints</Link>
          </div>
        </div>
        <div className="lumi-footer-bottom">
          <p>© 2026 Lumific — Premium Architectural Lighting. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .lumi-home { font-family: 'Outfit', sans-serif; color: #f0f0f0; }

        /* HERO */
        .lumi-hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 8rem 2rem 4rem; overflow: hidden; }
        .lumi-hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(100,80,200,0.06) 0%, transparent 50%); z-index: 0; }
        .lumi-hero-content { position: relative; z-index: 1; max-width: 900px; text-align: center; }
        .lumi-hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 30px; background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.25); font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; color: #c9a96e; margin-bottom: 2rem; }
        .lumi-hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #c9a96e; animation: pulse-dot 2s infinite; }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .lumi-hero-h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 300; line-height: 1.05; margin-bottom: 1.5rem; letter-spacing: -1px; }
        .lumi-hero-accent { background: linear-gradient(135deg, #c9a96e, #e8c98a, #c9a96e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-style: italic; }
        .lumi-hero-sub { font-size: 1.1rem; color: #8a8a8a; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.8; }
        .lumi-hero-btns { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 4rem; }
        .lumi-hero-stats { display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap; }
        .lumi-hero-stat { text-align: center; }
        .lumi-hero-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 400; color: #c9a96e; }
        .lumi-hero-stat-label { font-size: 0.75rem; color: #8a8a8a; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.2rem; }

        /* BUTTONS */
        .lumi-btn-gold { display: inline-flex; align-items: center; padding: 0.7rem 2rem; border-radius: 10px; background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808; font-size: 0.88rem; font-weight: 700; text-decoration: none; transition: all 0.2s; letter-spacing: 0.02em; }
        .lumi-btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(201,169,110,0.3); }
        .lumi-btn-outline { display: inline-flex; align-items: center; padding: 0.7rem 2rem; border-radius: 10px; border: 1.5px solid #2a2a2a; color: #c4c4c4; font-size: 0.88rem; font-weight: 600; text-decoration: none; transition: all 0.2s; }
        .lumi-btn-outline:hover { border-color: #c9a96e; color: #c9a96e; }
        .lumi-btn-ai { border-color: rgba(201,169,110,0.3); }

        /* SECTIONS */
        .lumi-section { max-width: 1280px; margin: 0 auto; padding: 6rem 2rem; }
        .lumi-section-dark { background: rgba(14,14,14,0.5); max-width: 100%; }
        .lumi-section-dark > * { max-width: 1280px; margin: 0 auto; }
        .lumi-section-header { text-align: center; margin-bottom: 3.5rem; }
        .lumi-eyebrow { display: block; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.75rem; }
        .lumi-h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 300; line-height: 1.15; margin-bottom: 0.75rem; }
        .lumi-h2 em { color: #c9a96e; font-style: italic; }
        .lumi-sub { color: #8a8a8a; font-size: 0.95rem; max-width: 550px; margin: 0 auto; line-height: 1.7; }

        /* GRIDS */
        .lumi-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .lumi-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }

        /* CATEGORY CARDS */
        .lumi-cat-card { display: flex; flex-direction: column; align-items: center; padding: 2rem 1rem; background: #1c1c1c; border: 1px solid #2a2a2a; border-radius: 16px; text-align: center; text-decoration: none; color: #f0f0f0; transition: all 0.25s; }
        .lumi-cat-card:hover { border-color: rgba(201,169,110,0.4); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
        .lumi-cat-emoji { font-size: 2.5rem; margin-bottom: 1rem; }
        .lumi-cat-name { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.3rem; }
        .lumi-cat-desc { font-size: 0.75rem; color: #8a8a8a; }

        /* SEGMENT CARDS */
        .lumi-seg-card { position: relative; border-radius: 16px; aspect-ratio: 16/9; display: flex; align-items: flex-end; overflow: hidden; text-decoration: none; border: 1px solid #2a2a2a; transition: all 0.3s; }
        .lumi-seg-card:hover { transform: translateY(-4px); border-color: rgba(201,169,110,0.4); }
        .lumi-seg-emoji { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -60%); font-size: 4rem; opacity: 0.3; }
        .lumi-seg-overlay { position: relative; z-index: 1; padding: 1.5rem; background: linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent); width: 100%; }
        .lumi-seg-name { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; color: #f0f0f0; margin-bottom: 0.2rem; }
        .lumi-seg-desc { font-size: 0.75rem; color: #8a8a8a; }

        /* FEATURE CARDS */
        .lumi-feature-card { padding: 2rem; background: #1c1c1c; border: 1px solid #2a2a2a; border-radius: 16px; text-decoration: none; color: #f0f0f0; transition: all 0.25s; position: relative; overflow: hidden; display: block; }
        .lumi-feature-card:hover { border-color: rgba(201,169,110,0.4); transform: translateY(-3px); }
        .lumi-feature-icon { font-size: 2rem; margin-bottom: 1rem; }
        .lumi-feature-title { font-size: 1.05rem; font-weight: 600; margin-bottom: 0.5rem; }
        .lumi-feature-desc { font-size: 0.82rem; color: #8a8a8a; line-height: 1.6; }
        .lumi-feature-arrow { position: absolute; bottom: 1.5rem; right: 1.5rem; color: #c9a96e; font-size: 1.2rem; opacity: 0; transition: all 0.2s; }
        .lumi-feature-card:hover .lumi-feature-arrow { opacity: 1; transform: translateX(4px); }

        /* CTA */
        .lumi-cta-section { padding: 6rem 2rem; text-align: center; background: linear-gradient(135deg, rgba(201,169,110,0.08), rgba(201,169,110,0.02)); }
        .lumi-cta-inner { max-width: 700px; margin: 0 auto; }
        .lumi-cta-h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 300; font-style: italic; margin-bottom: 1rem; color: #c9a96e; }
        .lumi-cta-sub { color: #8a8a8a; font-size: 0.95rem; margin-bottom: 2rem; }
        .lumi-cta-btns { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }

        /* FOOTER */
        .lumi-footer { border-top: 1px solid rgba(201,169,110,0.1); padding: 4rem 2rem 2rem; }
        .lumi-footer-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
        .lumi-footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 400; letter-spacing: 0.08em; margin-bottom: 0.5rem; }
        .lumi-footer-tagline { color: #5a5a5a; font-size: 0.82rem; }
        .lumi-footer-heading { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #c9a96e; margin-bottom: 1rem; }
        .lumi-footer-col a { display: block; color: #5a5a5a; font-size: 0.82rem; text-decoration: none; padding: 0.3rem 0; transition: color 0.15s; }
        .lumi-footer-col a:hover { color: #c9a96e; }
        .lumi-footer-bottom { max-width: 1280px; margin: 0 auto; padding-top: 2rem; border-top: 1px solid #1c1c1c; }
        .lumi-footer-bottom p { font-size: 0.72rem; color: #3d3d3d; text-align: center; }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .lumi-grid-4 { grid-template-columns: repeat(2, 1fr); }
          .lumi-grid-3 { grid-template-columns: 1fr; }
          .lumi-footer-inner { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .lumi-grid-4 { grid-template-columns: 1fr 1fr; }
          .lumi-hero-stats { gap: 1.5rem; }
          .lumi-footer-inner { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
