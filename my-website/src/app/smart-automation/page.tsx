"use client";
import { useState } from "react";
import Link from "next/link";

export default function SmartAutomationPage() {
  const [activeTab, setActiveTab] = useState("dali");

  const protocols = {
    dali: { name: "DALI-2", icon: "🔌", desc: "Digital Addressable Lighting Interface — the industry standard for intelligent lighting control. Individual addressability of 64 devices per line, bi-directional communication, and emergency lighting integration.", features: ["Individual luminaire addressing", "Scene management (16 scenes)", "Group control (16 groups)", "Bi-directional status feedback", "Emergency lighting support", "Energy monitoring & logging", "Automatic fault detection", "Daylight-linked dimming"] },
    knx: { name: "KNX", icon: "🏢", desc: "Open building automation standard for HVAC, blinds, security, and lighting integration. Perfect for large commercial and institutional projects requiring BMS connectivity.", features: ["Building-wide integration", "HVAC & blind coordination", "Multi-vendor interoperability", "Visualisation dashboards", "BACnet gateway support", "Advanced scheduling", "Presence detection zones", "Energy reporting"] },
    casambi: { name: "Casambi", icon: "📱", desc: "Bluetooth mesh-based wireless control — no gateway, no wiring, no cloud dependency. Ideal for residential, boutique retail, and hospitality where wired infrastructure is difficult.", features: ["No additional wiring", "Bluetooth Low Energy mesh", "iOS & Android app control", "Scene & animation support", "Timer & calendar scheduling", "Proximity-based automation", "Firmware over-the-air updates", "Up to 250 devices per network"] },
    dmx: { name: "DMX512", icon: "🎭", desc: "Entertainment-grade protocol for dynamic colour-changing and RGBW installations. Used for facade lighting, event spaces, and architectural feature walls.", features: ["512 channels per universe", "RGBW & pixel control", "Real-time colour mixing", "Art-Net / sACN support", "Dynamic chase sequences", "Music-reactive modes", "Master/slave configuration", "Compatible with lighting consoles"] },
  };

  type ProtocolKey = keyof typeof protocols;
  const active = protocols[activeTab as ProtocolKey];

  return (
    <main className="lumi-page">
      <div className="lumi-page-hero">
        <span className="lumi-eyebrow">Smart Controls</span>
        <h1 className="lumi-page-h1">Smart <em>Automation</em></h1>
        <p className="lumi-page-sub">Intelligent lighting control systems: DALI-2, KNX, Casambi, DMX512. From individual luminaire control to building-wide automation.</p>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem 4rem" }}>
        {/* Protocol Tabs */}
        <div className="auto-tabs">
          {(Object.keys(protocols) as ProtocolKey[]).map((key) => (
            <button key={key} className={`auto-tab ${activeTab === key ? "active" : ""}`} onClick={() => setActiveTab(key)}>
              <span>{protocols[key].icon}</span> {protocols[key].name}
            </button>
          ))}
        </div>

        <div className="auto-detail">
          <div className="auto-detail-main">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", marginBottom: "0.5rem" }}>{active.icon} {active.name}</h2>
            <p style={{ color: "#c4c4c4", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "2rem" }}>{active.desc}</p>
            <div className="auto-features">
              {active.features.map((f) => (
                <div key={f} className="auto-feature">
                  <span style={{ color: "#c9a96e", flexShrink: 0 }}>✦</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="auto-detail-side">
            <div className="auto-card-gold">
              <span className="auto-card-eyebrow">Compatibility</span>
              <p style={{ fontSize: "0.82rem", color: "#c4c4c4", lineHeight: 1.7, marginBottom: "1rem" }}>All Lumific luminaires with DALI-2 drivers are compatible with {active.name} systems. Ask our AI advisor for specific driver recommendations.</p>
              <Link href="/chat-ai" className="auto-btn-gold">Ask AI Advisor →</Link>
            </div>
          </div>
        </div>

        {/* Automation Scenarios */}
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", margin: "4rem 0 1.5rem" }}>Automation <em style={{ color: "#c9a96e", fontStyle: "italic" }}>Scenarios</em></h2>
        <div className="auto-scenario-grid">
          {[
            { icon: "🌅", name: "Circadian Rhythm", desc: "Auto-adjusts CCT from warm 2700K at dawn/dusk to energising 4000K at midday. Promotes occupant wellness.", segment: "Hospitality · Healthcare" },
            { icon: "👤", name: "Occupancy Sensing", desc: "Dim to 10% when zones are unoccupied. Full brightness on detection. Saves up to 40% energy.", segment: "Commercial · Office" },
            { icon: "☀️", name: "Daylight Harvesting", desc: "Photosensors reduce artificial light as natural light increases. Maintains constant lux level.", segment: "Office · Retail" },
            { icon: "🎭", name: "Scene Programming", desc: "Pre-programmed lighting scenes: Meeting, Presentation, Cleaning, Emergency, After-Hours.", segment: "Commercial · Hospitality" },
            { icon: "🔒", name: "Security Integration", desc: "Lights respond to alarm triggers, CCTV events, and after-hours intrusion detection.", segment: "Retail · Warehouse" },
            { icon: "📊", name: "Energy Dashboard", desc: "Real-time energy monitoring per luminaire. Historical trends, carbon offset tracking.", segment: "All Segments" },
          ].map((s) => (
            <div key={s.name} className="auto-scenario-card">
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{s.icon}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.3rem" }}>{s.name}</h3>
              <p style={{ fontSize: "0.78rem", color: "#8a8a8a", lineHeight: 1.6, marginBottom: "0.75rem" }}>{s.desc}</p>
              <span style={{ fontSize: "0.68rem", color: "#c9a96e", fontWeight: 600, letterSpacing: "0.04em" }}>{s.segment}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "3rem", textAlign: "center", padding: "3rem", background: "linear-gradient(135deg, rgba(201,169,110,0.08), rgba(201,169,110,0.02))", border: "1px solid rgba(201,169,110,0.15)", borderRadius: "16px" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", marginBottom: "0.75rem" }}>Need an Automation Consultation?</h3>
          <p style={{ color: "#8a8a8a", fontSize: "0.88rem", marginBottom: "1.5rem" }}>Our team can design a custom automation system for your project.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="/contact" className="auto-btn-gold">Contact Us</Link>
            <Link href="/smart-quotation" className="auto-btn-outline">Get Smart Quote</Link>
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

        .auto-tabs { display: flex; gap: 0.5rem; background: #0e0e0e; padding: 0.35rem; border-radius: 12px; border: 1px solid #2a2a2a; margin-bottom: 2.5rem; }
        .auto-tab { flex: 1; padding: 0.65rem 1rem; border: none; background: none; font-size: 0.85rem; font-weight: 500; color: #5a5a5a; border-radius: 10px; cursor: pointer; transition: all 0.18s; font-family: 'Outfit', sans-serif; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
        .auto-tab.active { background: #1c1c1c; color: #c9a96e; border: 1px solid rgba(201,169,110,0.2); }

        .auto-detail { display: grid; grid-template-columns: 1.5fr 1fr; gap: 2.5rem; align-items: start; }
        .auto-features { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .auto-feature { display: flex; gap: 0.6rem; align-items: center; font-size: 0.85rem; color: #c4c4c4; padding: 0.5rem 0; }
        .auto-card-gold { background: linear-gradient(135deg, rgba(201,169,110,0.1), rgba(201,169,110,0.04)); border: 1px solid rgba(201,169,110,0.2); border-radius: 16px; padding: 1.75rem; }
        .auto-card-eyebrow { display: block; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.75rem; }
        .auto-btn-gold { display: inline-flex; padding: 0.6rem 1.5rem; border-radius: 10px; background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808; font-size: 0.82rem; font-weight: 700; text-decoration: none; transition: all 0.2s; }
        .auto-btn-outline { display: inline-flex; padding: 0.6rem 1.5rem; border-radius: 10px; border: 1.5px solid #2a2a2a; color: #c4c4c4; font-size: 0.82rem; font-weight: 600; text-decoration: none; transition: all 0.15s; }
        .auto-btn-outline:hover { border-color: #c9a96e; color: #c9a96e; }

        .auto-scenario-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .auto-scenario-card { background: #1c1c1c; border: 1px solid #2a2a2a; border-radius: 16px; padding: 1.75rem; transition: all 0.25s; }
        .auto-scenario-card:hover { border-color: rgba(201,169,110,0.3); transform: translateY(-3px); }

        @media (max-width: 900px) { .auto-detail { grid-template-columns: 1fr; } .auto-features { grid-template-columns: 1fr; } .auto-scenario-grid { grid-template-columns: 1fr; } .auto-tabs { flex-wrap: wrap; } }
      `}</style>
    </main>
  );
}
