"use client";
import Link from "next/link";

const ARCHITECTURAL_CATALOGUES = [
  { name: "Magnetic Track System 2024", format: "PDF", size: "18 MB", year: "2024", desc: "Complete 48V magnetic track catalogue with modular heads, accessories, and configuration guide.", url: "https://cdn.shopify.com/s/files/1/0396/4728/1306/files/ANKUR_LIGHTING_MAGNETIC_CATALOGUE_2024_compressed.pdf?v=1718697303" },
  { name: "Premium Catalogue 2023-24", format: "PDF", size: "42 MB", year: "2023", desc: "Full product range including track, pendant, linear, recessed, outdoor, and decorative lighting.", url: "https://cdn.shopify.com/s/files/1/0396/4728/1306/files/ANKUR_Lighting_2023_-_24_Premium_Catalogue.pdf?v=1697801548" },
  { name: "Volume 3.1 — 2021-22", format: "PDF", size: "35 MB", year: "2021", desc: "Comprehensive product catalogue featuring architectural and decorative lighting collections.", url: "https://cdn.shopify.com/s/files/1/0396/4728/1306/files/ANKUR_VOLUMN_3.1_2021-22_-_compressed_1.pdf?v=1691567078" },
  { name: "Euro Collection 2020-21", format: "PDF", size: "28 MB", year: "2020", desc: "European-inspired design collection with premium pendant, wall, and ceiling luminaires.", url: "https://cdn.shopify.com/s/files/1/0396/4728/1306/files/Euro_Collection_20-21.pdf?v=1608621891" },
  { name: "Automation Catalogue", format: "PDF", size: "12 MB", year: "2020", desc: "Smart lighting automation systems: DALI, KNX, Casambi, and sensor-based controls.", url: "https://cdn.shopify.com/s/files/1/0396/4728/1306/files/Automation.pdf?v=1606978310" },
  { name: "Xpertz Catalogue 2020-21", format: "PDF", size: "22 MB", year: "2020", desc: "Professional-grade architectural lighting for commercial and hospitality applications.", url: "https://cdn.shopify.com/s/files/1/0396/4728/1306/files/XPERTZ_CATALOGUE_2020-2021.pdf?v=1607665789" },
];

const DECORATIVE_CATALOGUES = [
  { name: "5mm Magnetic Lighting System", format: "PDF", size: "15 MB", year: "2024", desc: "Ultra-slim 5mm magnetic lighting system for modern residential and retail applications.", url: "https://cdn.shopify.com/s/files/1/0396/4728/1306/files/5mm_Magnetic_Lighting_System.pdf?v=1726032144" },
  { name: "Picture & Mirror Catalogue", format: "PDF", size: "8 MB", year: "2024", desc: "Dedicated catalogue for picture lights and mirror illumination fixtures.", url: "https://cdn.shopify.com/s/files/1/0396/4728/1306/files/Ankur_Picture_And_Mirror_Catalogue.pdf?v=1725516060" },
  { name: "Euro Series 2019-20", format: "PDF", size: "20 MB", year: "2019", desc: "European-style decorative chandeliers, pendants, and wall sconces.", url: "https://cdn.shopify.com/s/files/1/0396/4728/1306/files/Euro_series_19-20.pdf?v=1607666802" },
  { name: "Vintage Catalogue 2019-20", format: "PDF", size: "16 MB", year: "2019", desc: "Vintage and industrial-style lighting collection for cafes, restaurants, and character spaces.", url: "https://cdn.shopify.com/s/files/1/0396/4728/1306/files/VINTAGE_CATALOG_2019-2020.pdf?v=1607666737" },
];

export default function CataloguePage() {
  return (
    <main className="lumi-page">
      <div className="lumi-page-hero">
        <span className="lumi-eyebrow">Catalogues</span>
        <h1 className="lumi-page-h1">Product <em>Catalogues</em></h1>
        <p className="lumi-page-sub">Download our complete product catalogues. Comprehensive specifications, photometric data, and design inspiration.</p>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem 4rem" }}>
        {/* Architectural */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 className="cat-section-title">📐 Architectural Lighting</h2>
          <div className="cat-grid">
            {ARCHITECTURAL_CATALOGUES.map((c) => (
              <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="cat-card">
                <div className="cat-card-top">
                  <div className="cat-icon">📄</div>
                  <div className="cat-year-badge">{c.year}</div>
                </div>
                <h3 className="cat-name">{c.name}</h3>
                <p className="cat-desc">{c.desc}</p>
                <div className="cat-bottom">
                  <div className="cat-meta">
                    <span className="cat-chip">{c.format}</span>
                    <span className="cat-chip">{c.size}</span>
                  </div>
                  <span className="cat-download">Download ⬇</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Decorative */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 className="cat-section-title">🎨 Decorative Lighting</h2>
          <div className="cat-grid">
            {DECORATIVE_CATALOGUES.map((c) => (
              <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="cat-card">
                <div className="cat-card-top">
                  <div className="cat-icon">📄</div>
                  <div className="cat-year-badge">{c.year}</div>
                </div>
                <h3 className="cat-name">{c.name}</h3>
                <p className="cat-desc">{c.desc}</p>
                <div className="cat-bottom">
                  <div className="cat-meta">
                    <span className="cat-chip">{c.format}</span>
                    <span className="cat-chip">{c.size}</span>
                  </div>
                  <span className="cat-download">Download ⬇</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Request Physical Catalogue CTA */}
        <div className="cat-cta">
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", marginBottom: "0.75rem" }}>Want a Physical Catalogue?</h3>
          <p style={{ color: "#8a8a8a", maxWidth: 500, margin: "0 auto 2rem", fontSize: "0.9rem" }}>Request a beautifully printed catalogue delivered to your office or studio.</p>
          <Link href="/get-catalogue" className="cat-btn-gold">Request Printed Catalogue →</Link>
        </div>
      </div>

      <style jsx>{`
        .lumi-page { font-family: 'Outfit', sans-serif; color: #f0f0f0; }
        .lumi-page-hero { padding: 8rem 2rem 3rem; text-align: center; background: radial-gradient(ellipse at 50% 80%, rgba(201,169,110,0.08), transparent 60%); }
        .lumi-page-h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; margin-bottom: 0.75rem; }
        .lumi-page-h1 em { color: #c9a96e; font-style: italic; }
        .lumi-page-sub { color: #8a8a8a; font-size: 0.95rem; max-width: 600px; margin: 0 auto; line-height: 1.7; }
        .lumi-eyebrow { display: block; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.75rem; }

        .cat-section-title { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 400; margin-bottom: 1.5rem; padding-bottom: 0.75rem; border-bottom: 1px solid #2a2a2a; }
        .cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
        .cat-card { display: flex; flex-direction: column; background: #1c1c1c; border: 1px solid #2a2a2a; border-radius: 16px; padding: 1.75rem; text-decoration: none; color: #f0f0f0; transition: all 0.25s; }
        .cat-card:hover { border-color: rgba(201,169,110,0.4); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
        .cat-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .cat-icon { font-size: 2rem; }
        .cat-year-badge { padding: 0.2rem 0.6rem; background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.2); border-radius: 20px; font-size: 0.68rem; font-weight: 600; color: #c9a96e; }
        .cat-name { font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem; }
        .cat-desc { font-size: 0.78rem; color: #8a8a8a; line-height: 1.6; flex: 1; margin-bottom: 1.25rem; }
        .cat-bottom { display: flex; justify-content: space-between; align-items: center; }
        .cat-meta { display: flex; gap: 0.5rem; }
        .cat-chip { padding: 0.2rem 0.5rem; background: #0e0e0e; border: 1px solid #2a2a2a; border-radius: 6px; font-size: 0.68rem; color: #5a5a5a; }
        .cat-download { font-size: 0.78rem; color: #c9a96e; font-weight: 600; transition: color 0.15s; }
        .cat-card:hover .cat-download { color: #e8c98a; }

        .cat-cta { text-align: center; padding: 3rem; background: linear-gradient(135deg, rgba(201,169,110,0.08), rgba(201,169,110,0.02)); border: 1px solid rgba(201,169,110,0.15); border-radius: 16px; }
        .cat-btn-gold { display: inline-flex; padding: 0.7rem 2rem; border-radius: 10px; background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808; font-size: 0.88rem; font-weight: 700; text-decoration: none; transition: all 0.2s; }
        .cat-btn-gold:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,169,110,0.3); }

        @media (max-width: 768px) { .cat-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
