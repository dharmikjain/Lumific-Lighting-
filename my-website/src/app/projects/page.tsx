"use client";
import { useState } from "react";
import Link from "next/link";

const PROJECTS = [
  { name: "Grand Aria Hotel", location: "Mumbai, Maharashtra", segment: "Hospitality", fixtures: 480, value: "₹32,00,000", image: "🏨", desc: "Comprehensive lighting design for a 5-star hotel spanning lobby, restaurants, conference halls, and 200 guest rooms. Custom bronze pendants and DALI-integrated track systems.", products: ["Corona Pendant", "Axis Track 48V", "Vela Recessed", "Stratum Linear"], year: "2025" },
  { name: "Tech Park Horizon", location: "Bangalore, Karnataka", segment: "Commercial", fixtures: 1200, value: "₹85,00,000", image: "🏢", desc: "Smart office lighting for a 5-floor tech campus with daylight harvesting, occupancy sensing, and circadian-tuned 4000K linear systems. BMS integration via KNX.", products: ["Stratum Linear", "Vela Recessed", "Nova Surface"], year: "2025" },
  { name: "Luxe Fashion House", location: "New Delhi", segment: "Retail", fixtures: 96, value: "₹8,50,000", image: "🏪", desc: "High-CRI track lighting for a luxury fashion boutique. Custom gold-finish magnetic tracks with adjustable spotlight heads for mannequin and display illumination.", products: ["Axis Track 48V", "Aura Magnetic Spot", "Helix Wallwash"], year: "2024" },
  { name: "Villa Serenity", location: "Ludhiana, Punjab", segment: "Residential", fixtures: 64, value: "₹9,50,000", image: "🏡", desc: "Full residential lighting design for a 12,000 sq ft villa including landscaping. Casambi wireless control throughout. Custom chandelier with RAL-matched finish.", products: ["Corona Pendant", "Stratum Linear", "Vela Recessed", "Terra Bollard"], year: "2024" },
  { name: "Coastal Resort & Spa", location: "Goa", segment: "Hospitality", fixtures: 320, value: "₹24,00,000", image: "🌅", desc: "Beachside resort with IP66 outdoor fixtures, pool-area underwater lighting, and wellness spa Tunable White system for circadian-aligned guest relaxation.", products: ["Terra Bollard", "Vela Recessed", "Stratum Linear"], year: "2024" },
  { name: "Apollo Medical Centre", location: "Chennai, Tamil Nadu", segment: "Healthcare", fixtures: 560, value: "₹18,00,000", image: "🏥", desc: "Multi-department hospital lighting with flicker-free drivers, antimicrobial finishes, and Tunable White for patient rooms. Emergency lighting integration.", products: ["Stratum Linear", "Vela Recessed", "Nova Surface"], year: "2023" },
];

const FILTERS = ["All", "Hospitality", "Commercial", "Retail", "Residential", "Healthcare"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);

  const filtered = PROJECTS.filter((p) => filter === "All" || p.segment === filter);

  return (
    <main className="lumi-page">
      <div className="lumi-page-hero">
        <span className="lumi-eyebrow">Portfolio</span>
        <h1 className="lumi-page-h1">Our <em>Projects</em></h1>
        <p className="lumi-page-sub">500+ completed projects across India. From boutique hotels to tech campuses, every space brought to life with precision lighting.</p>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {FILTERS.map((f) => (
            <button key={f} className={`proj-pill ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>

        <div className="proj-grid">
          {filtered.map((p) => (
            <div key={p.name} className="proj-card" onClick={() => setSelected(p)}>
              <div className="proj-visual">
                <span className="proj-emoji">{p.image}</span>
                <span className="proj-seg-badge">{p.segment}</span>
                <span className="proj-year">{p.year}</span>
              </div>
              <div className="proj-info">
                <h3 className="proj-name">{p.name}</h3>
                <p className="proj-loc">{p.location}</p>
                <div className="proj-stats">
                  <span>{p.fixtures} fixtures</span>
                  <span className="proj-value">{p.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="proj-modal-overlay" onClick={() => setSelected(null)}>
          <div className="proj-modal" onClick={(e) => e.stopPropagation()}>
            <button className="proj-modal-close" onClick={() => setSelected(null)}>✕</button>
            <div className="proj-modal-header">
              <span style={{ fontSize: "4rem" }}>{selected.image}</span>
              <div>
                <span className="lumi-eyebrow">{selected.segment} · {selected.year}</span>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", marginBottom: "0.3rem" }}>{selected.name}</h2>
                <p style={{ color: "#8a8a8a", fontSize: "0.85rem" }}>{selected.location}</p>
              </div>
            </div>
            <p style={{ color: "#c4c4c4", fontSize: "0.88rem", lineHeight: 1.8, margin: "1.5rem 0" }}>{selected.desc}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <div className="proj-stat-box"><span className="proj-stat-label">Total Fixtures</span><span className="proj-stat-val">{selected.fixtures}</span></div>
              <div className="proj-stat-box"><span className="proj-stat-label">Project Value</span><span className="proj-stat-val" style={{ color: "#c9a96e" }}>{selected.value}</span></div>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9a96e" }}>Products Used</span>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                {selected.products.map((p) => (
                  <span key={p} style={{ padding: "0.25rem 0.7rem", background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "20px", fontSize: "0.75rem", color: "#c9a96e" }}>{p}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Link href="/contact" className="seg-btn-gold" style={{ flex: 1, justifyContent: "center", textAlign: "center" }}>Start Your Project</Link>
              <Link href="/smart-quotation" className="seg-btn-outline">Get Quote</Link>
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

        .proj-pill { padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.78rem; font-weight: 600; border: 1.5px solid #2a2a2a; color: #8a8a8a; background: none; cursor: pointer; transition: all 0.15s; font-family: 'Outfit', sans-serif; }
        .proj-pill:hover, .proj-pill.active { background: rgba(201,169,110,0.15); border-color: #c9a96e; color: #c9a96e; }

        .proj-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.5rem; }
        .proj-card { background: #1c1c1c; border: 1px solid #2a2a2a; border-radius: 16px; overflow: hidden; cursor: pointer; transition: all 0.25s; }
        .proj-card:hover { border-color: rgba(201,169,110,0.4); transform: translateY(-3px); }
        .proj-visual { position: relative; background: radial-gradient(ellipse, #1a1a1a, #0e0e0e); padding: 3rem; text-align: center; }
        .proj-emoji { font-size: 4rem; }
        .proj-seg-badge { position: absolute; top: 1rem; left: 1rem; padding: 0.2rem 0.6rem; background: rgba(201,169,110,0.15); border: 1px solid rgba(201,169,110,0.25); border-radius: 20px; font-size: 0.65rem; font-weight: 600; color: #c9a96e; }
        .proj-year { position: absolute; top: 1rem; right: 1rem; font-size: 0.72rem; color: #5a5a5a; }
        .proj-info { padding: 1.25rem; }
        .proj-name { font-size: 1.05rem; font-weight: 600; margin-bottom: 0.2rem; }
        .proj-loc { font-size: 0.78rem; color: #5a5a5a; margin-bottom: 0.75rem; }
        .proj-stats { display: flex; justify-content: space-between; font-size: 0.82rem; color: #8a8a8a; }
        .proj-value { color: #c9a96e; font-weight: 700; }

        .proj-modal-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .proj-modal { background: #141414; border: 1px solid #2a2a2a; border-radius: 20px; max-width: 700px; width: 100%; padding: 2.5rem; position: relative; max-height: 85vh; overflow-y: auto; }
        .proj-modal-close { position: absolute; top: 1rem; right: 1rem; width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.06); border: 1px solid #2a2a2a; color: #8a8a8a; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .proj-modal-header { display: flex; align-items: center; gap: 1.5rem; }
        .proj-stat-box { background: #0e0e0e; border: 1px solid #2a2a2a; border-radius: 12px; padding: 1.25rem; text-align: center; }
        .proj-stat-label { display: block; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #5a5a5a; margin-bottom: 0.3rem; }
        .proj-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; }
        .seg-btn-gold { display: inline-flex; padding: 0.65rem 1.5rem; border-radius: 10px; background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808; font-size: 0.82rem; font-weight: 700; text-decoration: none; }
        .seg-btn-outline { display: inline-flex; padding: 0.65rem 1.5rem; border-radius: 10px; border: 1.5px solid #2a2a2a; color: #c4c4c4; font-size: 0.82rem; font-weight: 600; text-decoration: none; }

        @media (max-width: 768px) { .proj-grid { grid-template-columns: 1fr; } .proj-modal-header { flex-direction: column; align-items: flex-start; } }
      `}</style>
    </main>
  );
}
