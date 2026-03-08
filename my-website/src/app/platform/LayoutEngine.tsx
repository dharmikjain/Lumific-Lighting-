"use client";
import { useState } from "react";
import { PRODUCTS_DB, UPLOAD_STEPS } from "./data";

interface Zone {
  id: number; name: string; area: number; targetLux: number;
  selectedFixture: typeof PRODUCTS_DB[0]; qty: number; actualLux: number;
}

export function LayoutEngine({ notify }: { notify: (msg: string) => void }) {
  const [step, setStep] = useState(0);
  const [zones] = useState<Zone[]>([
    { id: 1, name: "Reception Lobby", area: 45, targetLux: 500, selectedFixture: PRODUCTS_DB[0], qty: 8, actualLux: 520 },
    { id: 2, name: "Dining Zone", area: 80, targetLux: 300, selectedFixture: PRODUCTS_DB[1], qty: 12, actualLux: 315 },
    { id: 3, name: "Circulation", area: 30, targetLux: 200, selectedFixture: PRODUCTS_DB[3], qty: 6, actualLux: 210 },
  ]);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);

  const nextStep = () => {
    if (step === 0 && !processed) { setProcessing(true); setTimeout(() => { setProcessing(false); setProcessed(true); setStep(1); }, 2000); }
    else { setStep((s) => Math.min(s + 1, 7)); }
  };

  const boqTotal = zones.reduce((s, z) => s + z.selectedFixture.price.project * z.qty, 0);

  return (
    <div className="sec">
      <div className="sec-eyebrow">Section 05</div>
      <h2 className="sec-title">Layout Upload & <em>Auto-Quotation</em></h2>
      <p className="sec-sub">8-step intelligent process: PDF/DWG upload → AI room detection → zone mapping → lux calculation → BOQ, photometric report & presentation pack.</p>

      <div className="stepper" style={{ marginBottom: "2.5rem" }}>
        {UPLOAD_STEPS.map((s, i) => (
          <div key={s} className="step">
            <div className="step-wrap">
              <div className={`step-dot ${i < step ? "done" : i === step ? "active" : "todo"}`}>{i < step ? "✓" : i + 1}</div>
              <div className="step-label" style={{ color: i === step ? "var(--gold)" : i < step ? "var(--silver)" : "var(--ash)" }}>{s}</div>
            </div>
            {i < UPLOAD_STEPS.length - 1 && <div className={`step-line ${i < step ? "done" : ""}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="g2" style={{ gap: "2rem" }}>
          <div>
            <div className="upload-zone" style={{ marginBottom: "1.5rem", background: processing ? "rgba(201,169,110,0.04)" : "" }}>
              <div className="upload-icon">{processing ? "⚙️" : "📐"}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", marginBottom: "0.5rem" }}>{processing ? "Processing layout…" : "Upload Floor Plan"}</div>
              <p style={{ color: "var(--fog)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>{processing ? "AI is detecting rooms, zones and architectural elements…" : "Supports PDF, DWG, DXF, RVT, or high-res image"}</p>
              {processing && (<div style={{ width: "200px", margin: "0 auto" }}><div className="prog-bar"><div className="prog-fill" style={{ width: "60%" }} /></div></div>)}
              {!processing && (<div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>{["PDF", "DWG", "DXF", "RVT", "PNG"].map((f) => <span key={f} className="info-chip">{f}</span>)}</div>)}
            </div>
            <button className="btn btn-gold" style={{ width: "100%" }} onClick={nextStep} disabled={processing}>{processing ? "Analysing…" : "Upload & Analyse →"}</button>
          </div>
          <div className="card card-gold">
            <div className="sec-eyebrow" style={{ marginBottom: "1rem" }}>AI Detection Capabilities</div>
            {([["🏠", "Room Segmentation", "Identifies all rooms, zones and boundaries automatically"], ["📏", "Scale Detection", "Reads drawing scale and calculates actual dimensions"], ["🚪", "Obstruction Mapping", "Detects doors, windows, columns, and ceiling features"], ["💡", "Fixture Zones", "Suggests optimal fixture positions per zone"]] as [string, string, string][]).map(([e, t, d]) => (
              <div key={t} style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}><span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{e}</span><div><div style={{ fontWeight: 600, fontSize: "0.82rem" }}>{t}</div><div style={{ fontSize: "0.75rem", color: "var(--fog)" }}>{d}</div></div></div>
            ))}
          </div>
        </div>
      )}

      {step >= 1 && step <= 3 && (
        <div className="g2" style={{ gap: "2rem" }}>
          <div>
            <div className="card" style={{ marginBottom: "1.5rem" }}>
              <div className="sec-eyebrow" style={{ marginBottom: "1rem" }}>Detected Zones ({zones.length})</div>
              {zones.map((z) => (
                <div key={z.id} style={{ padding: "1rem", background: "var(--obsidian)", borderRadius: "10px", marginBottom: "0.75rem", border: "1px solid var(--steel)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}><span style={{ fontWeight: 600, fontSize: "0.88rem" }}>{z.name}</span><span className="badge badge-gold">{z.area}m²</span></div>
                  <div style={{ display: "flex", gap: "2rem", fontSize: "0.78rem", color: "var(--fog)" }}><span>Target: {z.targetLux} lux</span><span>Actual: <strong style={{ color: "var(--green)" }}>{z.actualLux} lux</strong></span><span>Fixtures: {z.qty} × {z.selectedFixture.name}</span></div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button className="btn btn-outline" onClick={() => setStep((s) => Math.max(0, s - 1))}>← Back</button>
              <button className="btn btn-gold" style={{ flex: 1 }} onClick={nextStep}>Next Step →</button>
            </div>
          </div>
          <div>
            <div style={{ background: "var(--obsidian)", border: "1px solid var(--steel)", borderRadius: "var(--r)", padding: "1.5rem", aspectRatio: "4/3", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--fog)", marginBottom: "1rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>AI Floor Plan Analysis</div>
              {zones.map((z, i) => {
                const positions = [{ top: "15%", left: "10%", width: "35%", height: "30%" }, { top: "15%", left: "52%", width: "40%", height: "45%" }, { top: "55%", left: "10%", width: "35%", height: "25%" }];
                return (<div key={z.id} style={{ position: "absolute", ...positions[i], background: `rgba(201,169,110,${0.08 + i * 0.04})`, border: "1px solid rgba(201,169,110,0.3)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "0.25rem" }}><div style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--gold)", textAlign: "center" }}>{z.name}</div><div style={{ fontSize: "0.6rem", color: "var(--fog)" }}>{z.actualLux} lux</div></div>);
              })}
            </div>
          </div>
        </div>
      )}

      {step >= 4 && step <= 6 && (
        <div>
          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}><div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem" }}>Bill of Quantities (BOQ)</div><span className="badge badge-gold">Auto-Generated</span></div>
            <table className="tbl">
              <thead><tr><th>Zone</th><th>Fixture</th><th>Qty</th><th>Unit Price</th><th>Total</th><th>Lux Achieved</th></tr></thead>
              <tbody>
                {zones.map((z) => (<tr key={z.id}><td style={{ fontWeight: 600 }}>{z.name}</td><td>{z.selectedFixture.name}</td><td>{z.qty}</td><td>₹{z.selectedFixture.price.project.toLocaleString()}</td><td style={{ fontWeight: 700, color: "var(--gold)" }}>₹{(z.selectedFixture.price.project * z.qty).toLocaleString()}</td><td><span className="badge badge-green">{z.actualLux} lux</span></td></tr>))}
                <tr style={{ background: "rgba(201,169,110,0.06)" }}><td colSpan={4} style={{ fontWeight: 700, fontFamily: "'Cormorant Garamond',serif" }}>Project Total</td><td colSpan={2} style={{ fontWeight: 700, color: "var(--gold)", fontSize: "1.1rem" }}>₹{boqTotal.toLocaleString()}</td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}><button className="btn btn-outline" onClick={() => setStep((s) => Math.max(0, s - 1))}>← Back</button><button className="btn btn-gold" style={{ flex: 1 }} onClick={nextStep}>Generate Reports →</button></div>
        </div>
      )}

      {step === 7 && (
        <div>
          <div className="g3" style={{ marginBottom: "2rem" }}>
            {[{ icon: "📊", name: "BOQ Report", desc: "Full bill of quantities with pricing breakdown", format: "XLSX / PDF" }, { icon: "💡", name: "Photometric Report", desc: "Zone-by-zone lux calculation & light distribution", format: "PDF" }, { icon: "🎨", name: "Presentation Pack", desc: "Client-ready visual deck with layout renders", format: "PPTX / PDF" }].map((r) => (
              <div key={r.name} className="card card-gold" style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{r.icon}</div><div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", marginBottom: "0.5rem" }}>{r.name}</div><div style={{ fontSize: "0.78rem", color: "var(--fog)", marginBottom: "1.25rem", lineHeight: 1.6 }}>{r.desc}</div><div style={{ marginBottom: "1.25rem" }}><span className="info-chip">{r.format}</span></div>
                <button className="btn btn-gold btn-sm" style={{ width: "100%" }} onClick={() => notify(`${r.name} exported successfully`)}>⬇ Download</button>
              </div>
            ))}
          </div>
          <button className="btn btn-gold" style={{ width: "100%", padding: "1rem", fontSize: "0.9rem" }} onClick={() => { setStep(0); setProcessed(false); notify("New project started"); }}>↩ Start New Project</button>
        </div>
      )}
    </div>
  );
}
