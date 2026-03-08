"use client";
import { useState } from "react";
import { PRODUCTS_DB, FINISHES } from "./data";

export function ProductListing({ notify }: { notify: (msg: string) => void }) {
  const [selected, setSelected] = useState(PRODUCTS_DB[0]);
  const [selFinish, setSelFinish] = useState(PRODUCTS_DB[0].finish[0]);
  const [selCCT, setSelCCT] = useState(PRODUCTS_DB[0].cct[0]);
  const [selBeam, setSelBeam] = useState(PRODUCTS_DB[0].beam[0]);
  const [viewMode, setViewMode] = useState("3d");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("overview");

  const selectProduct = (p: typeof PRODUCTS_DB[0]) => { setSelected(p); setSelFinish(p.finish[0]); setSelCCT(p.cct[0]); setSelBeam(p.beam[0]); };
  const finishColor = FINISHES.find((f) => f.name === selFinish)?.hex || "#888";

  return (
    <div className="sec">
      <div className="sec-eyebrow">Section 06</div>
      <h2 className="sec-title">Product <em>Architecture</em></h2>
      <p className="sec-sub">14-element product page: 3D viewer, AR preview, photometric data, driver compatibility, deep variant system.</p>

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "2rem" }}>
        <div>
          {PRODUCTS_DB.map((p) => (
            <div key={p.id} className="card" style={{ marginBottom: "0.75rem", cursor: "pointer", borderColor: selected.id === p.id ? "rgba(201,169,110,0.4)" : "var(--steel)", background: selected.id === p.id ? "rgba(201,169,110,0.06)" : "var(--graphite)" }} onClick={() => selectProduct(p)}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{p.emoji}</div>
              <div style={{ fontWeight: 600, fontSize: "0.82rem", marginBottom: "0.2rem" }}>{p.name}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--fog)" }}>{p.cat}</div>
              <div style={{ fontWeight: 700, color: "var(--gold)", fontSize: "0.85rem", marginTop: "0.4rem" }}>₹{p.price.retail.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
            <div>
              <div className="viewer" style={{ marginBottom: "0.75rem" }}>
                <div className="viewer-glow" style={{ background: `radial-gradient(circle,${finishColor}44,transparent 70%)` }} />
                <div className="product-emoji">{selected.emoji}</div>
                <div style={{ position: "absolute", top: "1rem", right: "1rem", display: "flex", gap: "0.5rem" }}>
                  {["3d", "ar", "360"].map((m) => (<button key={m} className={`btn btn-sm ${viewMode === m ? "btn-gold" : "btn-outline"}`} onClick={() => setViewMode(m)} style={{ padding: "0.25rem 0.6rem", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{m}</button>))}
                </div>
                <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}><span className="info-chip">⭐ {selected.rating}</span></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.5rem" }}>
                {["Front", "Side", "Detail", "Install"].map((v) => (<div key={v} style={{ background: "var(--graphite)", border: "1px solid var(--steel)", borderRadius: "8px", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", cursor: "pointer" }}>{selected.emoji}</div>))}
              </div>
            </div>
            <div>
              <div className="badge badge-gold" style={{ marginBottom: "0.75rem" }}>{selected.cat}</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", marginBottom: "0.5rem", letterSpacing: "-0.5px" }}>{selected.name}</h2>
              <div style={{ color: "var(--fog)", fontSize: "0.85rem", marginBottom: "1.25rem", lineHeight: 1.7 }}>High-performance {selected.watt} luminaire engineered for precision illumination. {selected.ip} rated, DALI-2 compatible, 5-year warranty included.</div>
              <div style={{ marginBottom: "1.5rem" }}><label className="lbl">CCT</label><div className="var-row">{selected.cct.map((c) => <button key={c} className={`var-btn ${selCCT === c ? "sel" : ""}`} onClick={() => setSelCCT(c)}>{c}</button>)}</div></div>
              <div style={{ marginBottom: "1.5rem" }}><label className="lbl">Beam Angle</label><div className="var-row">{selected.beam.map((b) => <button key={b} className={`var-btn ${selBeam === b ? "sel" : ""}`} onClick={() => setSelBeam(b)}>{b}</button>)}</div></div>
              <div style={{ marginBottom: "1.75rem" }}><label className="lbl">Finish — {selFinish}</label><div className="swatch-grid">{FINISHES.filter((f) => selected.finish.includes(f.name)).map((f) => (<div key={f.name} title={f.name}><div className={`swatch ${selFinish === f.name ? "sel" : ""}`} style={{ background: f.hex, border: f.hex === "#f5f5f5" ? "2px solid var(--steel)" : "" }} onClick={() => setSelFinish(f.name)} /></div>))}</div></div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1.5rem" }}><div className="price-tag">₹{selected.price.retail.toLocaleString()}</div><div className="price-sub">/ unit incl. GST</div></div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "var(--obsidian)", borderRadius: "8px", padding: "0.5rem", border: "1px solid var(--steel)" }}><button className="btn btn-ghost btn-sm" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button><span style={{ minWidth: "2rem", textAlign: "center", fontWeight: 700 }}>{qty}</span><button className="btn btn-ghost btn-sm" onClick={() => setQty((q) => q + 1)}>+</button></div>
                <button className="btn btn-gold" style={{ flex: 1, padding: "0.65rem" }} onClick={() => notify(`${qty}× ${selected.name} added to quote`)}>Add to Quote</button>
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}><button className="btn btn-outline" style={{ flex: 1 }} onClick={() => notify("Added to project wishlist")}>♡ Wishlist</button><button className="btn btn-outline" style={{ flex: 1 }} onClick={() => notify("AR preview launched")}>AR Preview</button></div>
            </div>
          </div>

          <div className="tabs">{["overview", "photometric", "drivers", "downloads", "reviews"].map((t) => (<button key={t} className={`tab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>))}</div>

          {tab === "overview" && (
            <div className="g2" style={{ gap: "1.5rem" }}>
              <div className="card"><div className="sec-eyebrow" style={{ marginBottom: "1rem" }}>Technical Specifications</div>{([["Wattage", selected.watt], ["CCT", selCCT], ["Beam Angle", selBeam], ["IP Rating", selected.ip], ["CRI", "≥95"], ["Lifetime", "L80B10 @ 50,000h"], ["Dimming", "DALI-2 / PWM / 0–10V"], ["Warranty", "5 Years"]] as [string, string][]).map(([k, v]) => (<div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "0.82rem" }}><span style={{ color: "var(--fog)" }}>{k}</span><span style={{ fontWeight: 500 }}>{v}</span></div>))}</div>
              <div className="card"><div className="sec-eyebrow" style={{ marginBottom: "1rem" }}>Certifications</div>{["CE · UKCA · RoHS", "EN 60598-1", "ENEC 10", "Zhaga Book 11", "DLC Premium", "BIS Certified"].map((c) => (<div key={c} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "0.82rem" }}><span style={{ color: "var(--gold)" }}>✓</span><span>{c}</span></div>))}</div>
            </div>
          )}

          {tab === "photometric" && (
            <div className="g2" style={{ gap: "1.5rem" }}>
              <div className="card"><div className="sec-eyebrow" style={{ marginBottom: "1rem" }}>Lux Distribution</div>{[{ d: "0m", lux: selected.lux, pct: 100 }, { d: "1m", lux: Math.round(selected.lux * 0.65), pct: 65 }, { d: "2m", lux: Math.round(selected.lux * 0.35), pct: 35 }, { d: "3m", lux: Math.round(selected.lux * 0.18), pct: 18 }].map((r) => (<div key={r.d} className="lux-bar"><span className="lux-label">{r.d} distance</span><div className="prog-bar" style={{ flex: 1 }}><div className="prog-fill" style={{ width: `${r.pct}%` }} /></div><span className="lux-value">{r.lux} lx</span></div>))}<div style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--obsidian)", borderRadius: "8px", fontSize: "0.78rem", color: "var(--fog)" }}>Measurements at 3000K, {selBeam} beam angle on horizontal plane.</div></div>
              <div className="card"><div className="sec-eyebrow" style={{ marginBottom: "1rem" }}>IES / LDT Files</div>{[`${selected.name.replace(" ", "_")}_${selBeam}_3000K.ies`, `${selected.name.replace(" ", "_")}_${selBeam}_4000K.ies`].map((f) => (<div key={f} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", background: "var(--obsidian)", borderRadius: "8px", marginBottom: "0.5rem", border: "1px solid var(--steel)" }}><span style={{ fontSize: "0.78rem", color: "var(--fog)" }}>{f}</span><button className="btn btn-ghost btn-sm" onClick={() => notify("IES file downloaded")}>⬇</button></div>))}</div>
            </div>
          )}

          {tab === "drivers" && (
            <div className="g2" style={{ gap: "1.5rem" }}>
              {[{ brand: "Helvar", model: "TE 30W DALI-2", compat: "✓ Verified", type: "DALI-2" }, { brand: "Tridonic", model: "LC 60W PREMIUM", compat: "✓ Verified", type: "DALI-2 / Bluetooth" }, { brand: "Osram", model: "OPTOTRONIC 75", compat: "✓ Verified", type: "0–10V" }, { brand: "Eaglerise", model: "ELP60W-L1400", compat: "⚠ Tested", type: "PWM" }].map((d) => (
                <div key={d.model} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{d.brand} {d.model}</div><div style={{ fontSize: "0.75rem", color: "var(--fog)", marginTop: "0.2rem" }}>{d.type}</div></div><span className={`badge ${d.compat.includes("Verified") ? "badge-green" : "badge-teal"}`}>{d.compat}</span></div>
              ))}
            </div>
          )}

          {tab === "downloads" && (
            <div className="g3" style={{ gap: "1rem" }}>{["Datasheet (PDF)", "Installation Guide", "3D Model (STEP)", "3D Model (SKP)", "IES Files (ZIP)", "BIM Object (RFA)", "AutoCAD Block", "Specification Doc"].map((d) => (<div key={d} className="card" style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => notify(`${d} downloaded`)}><span style={{ fontSize: "1.25rem" }}>⬇</span><span style={{ fontSize: "0.82rem", fontWeight: 500 }}>{d}</span></div>))}</div>
          )}

          {tab === "reviews" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[{ name: "Arjun Mehta, Architect", rating: 5, text: "Exceptional beam quality and the DALI integration worked flawlessly on our hotel project. CRI consistency across 400 units was remarkable.", project: "Taj Hotel Lobby" }, { name: "Priya Lighting Studio", rating: 5, text: "The variant system is incredibly well thought out. Custom RAL matching was perfect — clients were thrilled.", project: "Luxury Villa" }, { name: "Coastal Builders Ltd", rating: 4, text: "Solid performance, IP65 rating lived up to spec in our coastal resort installation.", project: "Resort Complex" }].map((r, i) => (
                <div key={i} className="card"><div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}><div><div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{r.name}</div><div style={{ fontSize: "0.72rem", color: "var(--fog)" }}>{r.project}</div></div><div style={{ color: "var(--gold)", fontSize: "0.85rem" }}>{"★".repeat(r.rating)}</div></div><p style={{ fontSize: "0.82rem", color: "var(--silver)", lineHeight: 1.7 }}>{r.text}</p></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
