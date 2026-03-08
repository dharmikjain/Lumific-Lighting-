"use client";
import { useState } from "react";
import Link from "next/link";

const PRODUCTS = [
  { id: 1, name: "Axis Track 48V", cat: "Track System", price: 4200, watt: "15–60W", cct: ["2700K","3000K","4000K"], beam: ["15°","24°","36°","60°"], finish: ["Matt Black","Matt White","Brushed Gold"], ip: "IP20", emoji: "💡", lux: 850, rating: 4.9, desc: "Premium magnetic track system with modular heads, infinite repositioning, and toolless installation. Perfect for retail, hospitality, and gallery applications." },
  { id: 2, name: "Corona Pendant", cat: "Pendant", price: 8900, watt: "24W", cct: ["2700K","3000K"], beam: ["60°","120°"], finish: ["Matt Black","Bronze","Custom RAL"], ip: "IP20", emoji: "🔆", lux: 1200, rating: 4.8, desc: "Statement architectural pendant with die-cast aluminium body and precision-engineered optic. Ideal for lobbies, atriums, and fine dining." },
  { id: 3, name: "Stratum Linear", cat: "Linear", price: 3100, watt: "20W/m", cct: ["3000K","4000K","Tunable"], beam: ["90°","120°"], finish: ["Anodised Silver","Matt Black"], ip: "IP44", emoji: "📏", lux: 620, rating: 4.7, desc: "Seamless recessed linear system with no visible joints. Available in continuous runs up to 30m. Perfect for offices, corridors, and retail ceilings." },
  { id: 4, name: "Vela Recessed", cat: "Downlight", price: 1800, watt: "12W", cct: ["2700K","3000K","4000K"], beam: ["20°","36°","50°"], finish: ["Matt White","Matt Black","Brushed Aluminium"], ip: "IP65", emoji: "⭕", lux: 920, rating: 4.9, desc: "Ultra-slim recessed downlight with IP65 rating for wet areas. Deep anti-glare optic with UGR<19 for visual comfort." },
  { id: 5, name: "Nova Surface", cat: "Surface Mount", price: 2400, watt: "18W", cct: ["3000K","4000K"], beam: ["60°","90°"], finish: ["Matt White","Matt Black"], ip: "IP20", emoji: "🌟", lux: 780, rating: 4.6, desc: "Elegant surface-mount luminaire with micro-prismatic diffuser. Clean architectural lines for contemporary interiors." },
  { id: 6, name: "Helix Wallwash", cat: "Wall Light", price: 3600, watt: "24W", cct: ["2700K","3000K"], beam: ["Wall wash"], finish: ["Matt Black","Bronze","Brushed Gold"], ip: "IP20", emoji: "🔅", lux: 550, rating: 4.8, desc: "Precision wall washer with asymmetric optic. Creates uniform vertical illumination for galleries, corridors, and feature walls." },
  { id: 7, name: "Terra Bollard", cat: "Outdoor", price: 5200, watt: "10W", cct: ["2700K","3000K","4000K"], beam: ["360°"], finish: ["Graphite","Matt Black","Corten Effect"], ip: "IP66", emoji: "🏗️", lux: 320, rating: 4.7, desc: "Robust outdoor bollard in marine-grade aluminium. IK10 impact resistance, suitable for pathways, gardens, and commercial landscapes." },
  { id: 8, name: "Aura Magnetic Spot", cat: "Magnetic Track", price: 1950, watt: "7–15W", cct: ["2700K","3000K","4000K"], beam: ["15°","24°","36°"], finish: ["Matt Black","Matt White"], ip: "IP20", emoji: "✨", lux: 680, rating: 4.9, desc: "Ultra-compact magnetic track spotlight with 355° rotation and 90° tilt. Quick-snap magnetic mounting for flexible retail displays." },
];

const CATEGORIES = ["All", "Track System", "Pendant", "Linear", "Downlight", "Surface Mount", "Wall Light", "Outdoor", "Magnetic Track"];

export default function ProductsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof PRODUCTS[0] | null>(null);

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = filter === "All" || p.cat === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="lumi-page">
      <div className="lumi-page-hero">
        <span className="lumi-eyebrow">Our Collection</span>
        <h1 className="lumi-page-h1">Premium <em>Products</em></h1>
        <p className="lumi-page-sub">2,400+ architecturally engineered luminaires across track, pendant, linear, recessed, and outdoor categories.</p>
      </div>

      <div className="lumi-page-body" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem", alignItems: "center" }}>
          <input
            className="lumi-search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`lumi-filter-pill ${filter === c ? "active" : ""}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="lumi-products-grid">
          {filtered.map((p) => (
            <div key={p.id} className="lumi-product-card" onClick={() => setSelected(p)}>
              <div className="lumi-product-visual">
                <div className="lumi-product-emoji">{p.emoji}</div>
                <div className="lumi-product-badge">{p.cat}</div>
                <div className="lumi-product-rating">⭐ {p.rating}</div>
              </div>
              <div className="lumi-product-info">
                <h3 className="lumi-product-name">{p.name}</h3>
                <div className="lumi-product-specs">{p.watt} · {p.ip} · {p.cct.length} CCT</div>
                <div className="lumi-product-bottom">
                  <span className="lumi-product-price">₹{p.price.toLocaleString()}</span>
                  <span className="lumi-product-view">View →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: "#5a5a5a" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selected && (
        <div className="lumi-modal-overlay" onClick={() => setSelected(null)}>
          <div className="lumi-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lumi-modal-close" onClick={() => setSelected(null)}>✕</button>
            <div className="lumi-modal-grid">
              <div className="lumi-modal-visual">
                <div style={{ fontSize: "6rem", textAlign: "center", padding: "3rem 0" }}>{selected.emoji}</div>
              </div>
              <div className="lumi-modal-content">
                <span className="lumi-eyebrow">{selected.cat}</span>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", marginBottom: "0.5rem" }}>{selected.name}</h2>
                <p style={{ color: "#8a8a8a", fontSize: "0.88rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>{selected.desc}</p>
                <div className="lumi-modal-specs">
                  {[["Wattage", selected.watt], ["IP Rating", selected.ip], ["CRI", "≥95"], ["CCT Options", selected.cct.join(", ")], ["Beam Angles", selected.beam.join(", ")], ["Finishes", selected.finish.join(", ")], ["Lux Output", `${selected.lux} lx`], ["Warranty", "5 Years"]].map(([k, v]) => (
                    <div key={k} className="lumi-modal-spec-row">
                      <span style={{ color: "#5a5a5a" }}>{k}</span>
                      <span style={{ fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", margin: "1.5rem 0" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", color: "#c9a96e" }}>₹{selected.price.toLocaleString()}</span>
                  <span style={{ color: "#5a5a5a", fontSize: "0.78rem" }}>/ unit excl. GST</span>
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <Link href="/smart-quotation" className="lumi-btn-gold" style={{ flex: 1, justifyContent: "center" }}>Add to Quote</Link>
                  <Link href="/chat-ai" className="lumi-btn-outline-sm">Ask AI</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .lumi-page { font-family: 'Outfit', sans-serif; color: #f0f0f0; }
        .lumi-page-hero { padding: 8rem 2rem 3rem; text-align: center; background: radial-gradient(ellipse at 50% 80%, rgba(201,169,110,0.08), transparent 60%); }
        .lumi-page-h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; margin-bottom: 0.75rem; }
        .lumi-page-h1 em { color: #c9a96e; font-style: italic; }
        .lumi-page-sub { color: #8a8a8a; font-size: 0.95rem; max-width: 600px; margin: 0 auto; line-height: 1.7; }
        .lumi-eyebrow { display: block; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.75rem; }

        .lumi-search { padding: 0.65rem 1.25rem; background: #0e0e0e; border: 1.5px solid #2a2a2a; border-radius: 10px; color: #f0f0f0; font-size: 0.88rem; width: 280px; outline: none; transition: border-color 0.15s; font-family: 'Outfit', sans-serif; }
        .lumi-search:focus { border-color: #c9a96e; }
        .lumi-filter-pill { padding: 0.35rem 0.85rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; border: 1.5px solid #2a2a2a; color: #8a8a8a; background: none; cursor: pointer; transition: all 0.15s; font-family: 'Outfit', sans-serif; white-space: nowrap; }
        .lumi-filter-pill:hover { border-color: #c9a96e; color: #c9a96e; }
        .lumi-filter-pill.active { background: rgba(201,169,110,0.15); border-color: #c9a96e; color: #c9a96e; }

        .lumi-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }

        .lumi-product-card { background: #1c1c1c; border: 1px solid #2a2a2a; border-radius: 16px; overflow: hidden; cursor: pointer; transition: all 0.25s; }
        .lumi-product-card:hover { border-color: rgba(201,169,110,0.4); transform: translateY(-4px); box-shadow: 0 16px 50px rgba(0,0,0,0.3); }
        .lumi-product-visual { position: relative; background: radial-gradient(ellipse at center, #1a1a1a, #0e0e0e); padding: 2.5rem; text-align: center; }
        .lumi-product-emoji { font-size: 4rem; filter: drop-shadow(0 0 30px rgba(201,169,110,0.3)); }
        .lumi-product-badge { position: absolute; top: 1rem; left: 1rem; padding: 0.2rem 0.6rem; background: rgba(201,169,110,0.15); border: 1px solid rgba(201,169,110,0.25); border-radius: 20px; font-size: 0.65rem; font-weight: 600; color: #c9a96e; }
        .lumi-product-rating { position: absolute; top: 1rem; right: 1rem; font-size: 0.72rem; color: #8a8a8a; }
        .lumi-product-info { padding: 1.25rem; }
        .lumi-product-name { font-size: 1rem; font-weight: 600; margin-bottom: 0.3rem; }
        .lumi-product-specs { font-size: 0.75rem; color: #5a5a5a; margin-bottom: 1rem; }
        .lumi-product-bottom { display: flex; justify-content: space-between; align-items: center; }
        .lumi-product-price { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; color: #c9a96e; font-weight: 500; }
        .lumi-product-view { font-size: 0.78rem; color: #8a8a8a; transition: color 0.15s; }
        .lumi-product-card:hover .lumi-product-view { color: #c9a96e; }

        .lumi-modal-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; padding: 2rem; animation: fadeIn 0.2s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .lumi-modal { background: #141414; border: 1px solid #2a2a2a; border-radius: 20px; max-width: 900px; width: 100%; max-height: 85vh; overflow-y: auto; position: relative; }
        .lumi-modal-close { position: absolute; top: 1rem; right: 1rem; z-index: 10; width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.06); border: 1px solid #2a2a2a; color: #8a8a8a; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
        .lumi-modal-close:hover { background: rgba(255,255,255,0.12); color: #f0f0f0; }
        .lumi-modal-grid { display: grid; grid-template-columns: 1fr 1.2fr; }
        .lumi-modal-visual { background: radial-gradient(ellipse at center, #1a1a1a, #0a0a0a); display: flex; align-items: center; justify-content: center; border-radius: 20px 0 0 20px; }
        .lumi-modal-content { padding: 2.5rem; }
        .lumi-modal-specs { display: flex; flex-direction: column; }
        .lumi-modal-spec-row { display: flex; justify-content: space-between; padding: 0.55rem 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 0.82rem; }
        .lumi-btn-gold { display: inline-flex; align-items: center; padding: 0.65rem 1.5rem; border-radius: 10px; background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808; font-size: 0.85rem; font-weight: 700; text-decoration: none; transition: all 0.2s; }
        .lumi-btn-outline-sm { display: inline-flex; align-items: center; padding: 0.65rem 1.5rem; border-radius: 10px; border: 1.5px solid #2a2a2a; color: #c4c4c4; font-size: 0.85rem; font-weight: 600; text-decoration: none; transition: all 0.2s; }
        .lumi-btn-outline-sm:hover { border-color: #c9a96e; color: #c9a96e; }

        @media (max-width: 768px) {
          .lumi-modal-grid { grid-template-columns: 1fr; }
          .lumi-modal-visual { border-radius: 20px 20px 0 0; }
          .lumi-search { width: 100%; }
        }
      `}</style>
    </main>
  );
}
