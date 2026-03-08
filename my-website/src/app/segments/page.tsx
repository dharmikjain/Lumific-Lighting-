"use client";
import { useState } from "react";
import Link from "next/link";

const SEGMENTS = [
  { name: "Hospitality", emoji: "🏨", color: "#3d2d4a", desc: "Hotels, restaurants, resorts & fine dining", details: "Create immersive guest experiences with layered lighting — from dramatic lobby chandeliers to circadian-tuned guest room lights. Our hospitality range includes DALI-2 dimming, Tunable White for wellness, and custom RAL finishes for brand alignment.", products: ["Corona Pendant", "Axis Track 48V", "Vela Recessed", "Helix Wallwash"], lux: "200–750 lux", standards: "EN 12464-1, WELL Building Standard" },
  { name: "Commercial", emoji: "🏢", color: "#1a2d4a", desc: "Offices, coworking spaces & corporate HQ", details: "Productivity-optimised lighting with UGR<19 and circadian rhythm support. Our linear systems deliver uniform, glare-free illumination at 500+ lux compliant with EN 12464-1. Smart DALI controls enable occupancy sensing and daylight harvesting.", products: ["Stratum Linear", "Vela Recessed", "Nova Surface"], lux: "300–750 lux", standards: "EN 12464-1, IS 3646" },
  { name: "Retail", emoji: "🏪", color: "#4a2d1a", desc: "Shops, showrooms & brand flagship stores", details: "High-CRI (≥95) track and accent lighting for accurate colour rendering on merchandise. Our retail solutions include flexible magnetic track systems, adjustable beam angles, and scene-setting capabilities for visual merchandising excellence.", products: ["Axis Track 48V", "Aura Magnetic Spot", "Helix Wallwash"], lux: "500–1500 lux", standards: "CRI ≥95, CIE Retail Guidelines" },
  { name: "Residential", emoji: "🏡", color: "#2d4a3e", desc: "Premium homes, villas & luxury apartments", details: "Bespoke lighting for high-end residential projects. From statement pendants for double-height lobbies to concealed linear profiles in coffered ceilings. Casambi wireless control for seamless smart home integration.", products: ["Corona Pendant", "Stratum Linear", "Vela Recessed", "Aura Magnetic Spot"], lux: "150–500 lux", standards: "Casambi, KNX Compatible" },
  { name: "Healthcare", emoji: "🏥", color: "#1a4a3a", desc: "Hospitals, clinics & wellness centres", details: "Patient-centric lighting with Tunable White for circadian alignment. Antimicrobial finishes, IP65 for hygienic areas, and flicker-free drivers for sensitive environments. Compliant with healthcare lighting codes.", products: ["Stratum Linear", "Vela Recessed", "Nova Surface"], lux: "300–1000 lux", standards: "EN 12464-1, IS 3646, NABH" },
  { name: "Outdoor", emoji: "🌃", color: "#1a1a3d", desc: "Facades, landscapes, pathways & gardens", details: "Weather-resistant luminaires rated IP65–IP67 with IK10 impact resistance. Marine-grade aluminium construction for coastal environments. Precision optics for facade up-lighting, pathway bollards, and tree illumination.", products: ["Terra Bollard", "Helix Wallwash"], lux: "50–300 lux", standards: "IP65–IP67, IK10, IS 1944" },
];

export default function SegmentsPage() {
  const [active, setActive] = useState<typeof SEGMENTS[0] | null>(null);

  return (
    <main className="lumi-page">
      <div className="lumi-page-hero">
        <span className="lumi-eyebrow">Market Segments</span>
        <h1 className="lumi-page-h1">Lighting for Every <em>Application</em></h1>
        <p className="lumi-page-sub">Tailored lighting solutions for 12+ market segments. Every product tested and certified for its intended application.</p>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div className="seg-grid">
          {SEGMENTS.map((seg) => (
            <div
              key={seg.name}
              className={`seg-card-large ${active?.name === seg.name ? "active" : ""}`}
              onClick={() => setActive(active?.name === seg.name ? null : seg)}
              style={{ background: `linear-gradient(135deg, ${seg.color}, ${seg.color}cc)` }}
            >
              <div className="seg-emoji-big">{seg.emoji}</div>
              <div className="seg-card-content">
                <h3 className="seg-card-name">{seg.name}</h3>
                <p className="seg-card-desc">{seg.desc}</p>
                {active?.name === seg.name && (
                  <div className="seg-detail" onClick={(e) => e.stopPropagation()}>
                    <p style={{ color: "#c4c4c4", fontSize: "0.85rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>{seg.details}</p>
                    <div className="seg-meta-grid">
                      <div><span className="seg-meta-label">Target Illuminance</span><span className="seg-meta-value">{seg.lux}</span></div>
                      <div><span className="seg-meta-label">Standards</span><span className="seg-meta-value">{seg.standards}</span></div>
                    </div>
                    <div style={{ marginTop: "1.25rem" }}>
                      <span className="seg-meta-label">Recommended Products</span>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                        {seg.products.map((p) => (
                          <span key={p} className="seg-product-tag">{p}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                      <Link href="/products" className="seg-btn-gold">View Products →</Link>
                      <Link href="/chat-ai" className="seg-btn-outline">Ask AI Advisor</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "4rem", padding: "3rem", background: "linear-gradient(135deg, rgba(201,169,110,0.08), rgba(201,169,110,0.02))", border: "1px solid rgba(201,169,110,0.15)", borderRadius: "16px", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", marginBottom: "0.75rem" }}>Need Help Choosing?</h3>
          <p style={{ color: "#8a8a8a", fontSize: "0.9rem", marginBottom: "2rem", maxWidth: 500, margin: "0 auto 2rem" }}>Our AI lighting advisor can recommend the perfect products for your segment and application.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Link href="/chat-ai" className="seg-btn-gold">Chat with AI →</Link>
            <Link href="/get-catalogue" className="seg-btn-outline">Get Catalogue</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .lumi-page { font-family: 'Outfit', sans-serif; color: #f0f0f0; }
        .lumi-page-hero { padding: 8rem 2rem 3rem; text-align: center; background: radial-gradient(ellipse at 50% 80%, rgba(201,169,110,0.08), transparent 60%); }
        .lumi-page-h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; margin-bottom: 0.75rem; }
        .lumi-page-h1 em { color: #c9a96e; font-style: italic; }
        .lumi-page-sub { color: #8a8a8a; font-size: 0.95rem; max-width: 600px; margin: 0 auto; line-height: 1.7; }
        .lumi-eyebrow { display: block; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.75rem; }

        .seg-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .seg-card-large { border-radius: 16px; padding: 2.5rem; cursor: pointer; border: 1px solid rgba(255,255,255,0.06); transition: all 0.3s; position: relative; overflow: hidden; }
        .seg-card-large:hover, .seg-card-large.active { border-color: rgba(201,169,110,0.4); transform: translateY(-2px); }
        .seg-emoji-big { font-size: 3rem; margin-bottom: 1rem; opacity: 0.6; }
        .seg-card-name { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 400; margin-bottom: 0.3rem; }
        .seg-card-desc { color: rgba(255,255,255,0.6); font-size: 0.85rem; }
        .seg-detail { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); animation: slideDown 0.3s ease; }
        @keyframes slideDown { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 500px; } }
        .seg-meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .seg-meta-label { display: block; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(201,169,110,0.8); margin-bottom: 0.3rem; }
        .seg-meta-value { font-size: 0.85rem; color: #f0f0f0; }
        .seg-product-tag { padding: 0.25rem 0.7rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; font-size: 0.72rem; color: #c4c4c4; }
        .seg-btn-gold { display: inline-flex; padding: 0.6rem 1.5rem; border-radius: 10px; background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808; font-size: 0.82rem; font-weight: 700; text-decoration: none; transition: all 0.2s; }
        .seg-btn-gold:hover { transform: translateY(-1px); }
        .seg-btn-outline { display: inline-flex; padding: 0.6rem 1.5rem; border-radius: 10px; border: 1.5px solid rgba(255,255,255,0.2); color: #c4c4c4; font-size: 0.82rem; font-weight: 600; text-decoration: none; transition: all 0.2s; }
        .seg-btn-outline:hover { border-color: #c9a96e; color: #c9a96e; }

        @media (max-width: 768px) { .seg-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
