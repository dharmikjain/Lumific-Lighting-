"use client";
import { useState } from "react";
import { FINISHES, SEGMENTS, CONFIGURATOR_STEPS } from "./data";

export function LumificConfigurator({ notify }: { notify: (msg: string) => void }) {
  const [view, setView] = useState("segments");
  const [configStep, setConfigStep] = useState(0);
  const [config, setConfig] = useState<Record<string, string>>({
    series: "Axis", formFactor: "Track", output: "3000lm", cct: "3000K", beam: "24°",
    finish: "Matt Black", accessories: "None", driver: "DALI-2",
  });
  const [selSwatch, setSelSwatch] = useState(0);
  const [myProjects] = useState([
    { name: "Grand Aria Hotel", progress: 75, fixtures: 48, value: "₹3,20,000" },
    { name: "Studio Karma Boutique", progress: 40, fixtures: 24, value: "₹1,85,000" },
    { name: "Private Villa — Ludhiana", progress: 100, fixtures: 18, value: "₹95,500" },
  ]);

  const configOptions: Record<string, string[]> = {
    series: ["Axis", "Corona", "Stratum", "Vela", "Nova", "Helix"],
    formFactor: ["Track", "Pendant", "Recessed", "Linear", "Surface", "Suspended"],
    output: ["1000lm", "2000lm", "3000lm", "4500lm", "6000lm"],
    cct: ["2700K", "3000K", "3500K", "4000K", "Tunable White", "RGBW"],
    beam: ["8°", "15°", "24°", "36°", "60°", "120°"],
    finish: FINISHES.map((f) => f.name),
    accessories: ["None", "Glare Shield", "Snoot", "Barn Door", "Colour Filter", "Linear Spread"],
    driver: ["On/Off", "DALI-2", "0-10V", "PWM", "Casambi", "KNX"],
  };
  const stepKey = ["series", "formFactor", "output", "cct", "beam", "finish", "accessories", "driver"];

  return (
    <div className="sec">
      <div className="sec-eyebrow">Section 07</div>
      <h2 className="sec-title">Lumific Premium <em>Configurator</em></h2>
      <p className="sec-sub">Prolicht-inspired 10-step configurator, My Lumific project portal, Colour World finish explorer, and 6 segment landing pages.</p>
      <div className="tabs">
        {([["segments", "🌐 Segments"], ["configurator", "⚙ Configurator"], ["portal", "📁 My Lumific"], ["colourworld", "🎨 Colour World"]] as [string, string][]).map(([k, l]) => (
          <button key={k} className={`tab ${view === k ? "on" : ""}`} onClick={() => setView(k)}>{l}</button>
        ))}
      </div>

      {view === "segments" && (
        <div>
          <div className="g3" style={{ gap: "1.5rem" }}>
            {SEGMENTS.map((seg) => (
              <div key={seg.name} className="seg-card" onClick={() => { setView("configurator"); notify(`${seg.name} segment loaded`); }}>
                <div className="seg-bg" style={{ background: seg.color }}>{seg.emoji}</div>
                <div className="seg-overlay"><div className="seg-name">{seg.name}</div><div className="seg-desc">{seg.desc}</div></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "3rem", background: "linear-gradient(135deg,rgba(201,169,110,0.1),rgba(201,169,110,0.04))", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "var(--r)", padding: "2.5rem", textAlign: "center" }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", marginBottom: "0.75rem", fontStyle: "italic" }}>&ldquo;Every space deserves light that understands it.&rdquo;</div>
            <p style={{ color: "var(--fog)", fontSize: "0.9rem", marginBottom: "2rem" }}>Built for architects, lighting designers, and specifiers who demand precision.</p>
            <button className="btn btn-gold" style={{ padding: "0.75rem 2.5rem" }} onClick={() => setView("configurator")}>Start Configuring →</button>
          </div>
        </div>
      )}

      {view === "configurator" && (
        <div className="g2" style={{ gap: "2rem", alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", gap: "0", marginBottom: "2rem", overflowX: "auto" }}>
              {CONFIGURATOR_STEPS.map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }} onClick={() => setConfigStep(i)}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, background: i < configStep ? "var(--gold)" : "var(--graphite)", border: i === configStep ? "2px solid var(--gold)" : i < configStep ? "none" : "1px solid var(--steel)", color: i < configStep ? "var(--void)" : i === configStep ? "var(--gold)" : "var(--fog)" }}>{i < configStep ? "✓" : i + 1}</div>
                    <div style={{ fontSize: "0.58rem", marginTop: "0.2rem", color: i === configStep ? "var(--gold)" : "var(--ash)", whiteSpace: "nowrap" }}>{s}</div>
                  </div>
                  {i < CONFIGURATOR_STEPS.length - 1 && <div style={{ width: 20, height: 1, background: i < configStep ? "var(--gold)" : "var(--steel)", flexShrink: 0, marginBottom: "0.85rem" }} />}
                </div>
              ))}
            </div>

            {configStep < 8 ? (
              <div className="config-panel">
                <div className="config-title">{CONFIGURATOR_STEPS[configStep]}</div>
                <div className="config-sub">Select your preferred {CONFIGURATOR_STEPS[configStep].toLowerCase()} option</div>
                <div className="var-row" style={{ flexWrap: "wrap" }}>
                  {configOptions[stepKey[configStep]]?.map((opt) =>
                    stepKey[configStep] === "finish" ? (
                      <div key={opt} title={opt}><div className={`swatch ${config.finish === opt ? "sel" : ""}`} style={{ background: FINISHES.find((f) => f.name === opt)?.hex || "#888" }} onClick={() => setConfig({ ...config, finish: opt })} /></div>
                    ) : (
                      <button key={opt} className={`var-btn ${config[stepKey[configStep]] === opt ? "sel" : ""}`} onClick={() => setConfig({ ...config, [stepKey[configStep]]: opt })}>{opt}</button>
                    )
                  )}
                </div>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
                  {configStep > 0 && <button className="btn btn-outline" onClick={() => setConfigStep((s) => s - 1)}>← Back</button>}
                  <button className="btn btn-gold" style={{ flex: 1 }} onClick={() => setConfigStep((s) => Math.min(s + 1, 9))}>{configStep === 7 ? "Review Configuration →" : "Next →"}</button>
                </div>
              </div>
            ) : configStep === 8 ? (
              <div className="config-panel">
                <div className="config-title">Review Configuration</div>
                <div className="config-sub">Confirm your custom specification below</div>
                {Object.entries(config).map(([k, v]) => (<div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.82rem" }}><span style={{ color: "var(--fog)", textTransform: "capitalize" }}>{k.replace(/([A-Z])/g, " $1")}</span><span style={{ fontWeight: 600, color: "var(--gold)" }}>{v}</span></div>))}
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}><button className="btn btn-outline" onClick={() => setConfigStep(7)}>← Edit</button><button className="btn btn-gold" style={{ flex: 1 }} onClick={() => setConfigStep(9)}>Generate Quote →</button></div>
              </div>
            ) : (
              <div className="config-panel" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✦</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", marginBottom: "0.75rem" }}>Configuration Complete</div>
                <p style={{ color: "var(--fog)", fontSize: "0.85rem", marginBottom: "2rem" }}>Your custom Lumific specification has been generated. An estimated price and delivery timeline has been added to your project.</p>
                <div style={{ background: "var(--obsidian)", borderRadius: "10px", padding: "1.25rem", marginBottom: "1.5rem", border: "1px solid var(--steel)" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "0.8rem", color: "var(--fog)", marginBottom: "0.4rem" }}>ESTIMATED UNIT PRICE</div>
                  <div className="price-tag">₹6,200 – ₹7,800</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--fog)", marginTop: "0.3rem" }}>8–12 week lead time · Custom RAL</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}><button className="btn btn-gold" onClick={() => notify("Quote created in My Lumific")}>Save to My Lumific</button><button className="btn btn-outline" onClick={() => notify("PDF specification exported")}>Export Spec</button></div>
              </div>
            )}
          </div>

          <div>
            <div className="viewer" style={{ marginBottom: "1.5rem", minHeight: "280px" }}>
              <div className="viewer-glow" style={{ background: `radial-gradient(circle,${FINISHES.find((f) => f.name === config.finish)?.hex || "#888"}44,transparent 70%)` }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "5rem", filter: "drop-shadow(0 0 30px rgba(201,169,110,0.4))", animation: "float 3s ease-in-out infinite" }}>💡</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", marginTop: "1rem", color: "var(--gold)" }}>{config.series} {config.formFactor}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--fog)", marginTop: "0.3rem" }}>{config.cct} · {config.beam} · {config.finish}</div>
              </div>
            </div>
            <div className="card card-gold">
              <div className="sec-eyebrow" style={{ marginBottom: "0.75rem" }}>Configuration Summary</div>
              {([["Series", config.series], ["Form Factor", config.formFactor], ["Output", config.output], ["CCT", config.cct], ["Beam", config.beam], ["Finish", config.finish], ["Driver", config.driver]] as [string, string][]).map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", padding: "0.3rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}><span style={{ color: "var(--fog)" }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === "portal" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
            <div><h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem" }}>My Projects</h3><p style={{ color: "var(--fog)", fontSize: "0.85rem" }}>3 active projects · ₹6,00,500 total pipeline</p></div>
            <button className="btn btn-gold" onClick={() => notify("New project created")}>+ New Project</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {myProjects.map((p) => (
              <div key={p.name} className="card" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1.5rem", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.5rem" }}>{p.name}</div>
                  <div style={{ display: "flex", gap: "2rem", fontSize: "0.78rem", color: "var(--fog)", marginBottom: "0.75rem" }}><span>{p.fixtures} fixtures specified</span><span style={{ color: "var(--gold)", fontWeight: 600 }}>{p.value}</span><span>{p.progress === 100 ? "Completed" : p.progress + "% complete"}</span></div>
                  <div className="prog-bar" style={{ width: "300px" }}><div className="prog-fill" style={{ width: `${p.progress}%`, background: p.progress === 100 ? "linear-gradient(90deg,var(--green),var(--green))" : "linear-gradient(90deg,var(--gold),var(--gold2))" }} /></div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}><button className="btn btn-outline btn-sm" onClick={() => notify("Project opened")}>Open →</button><button className="btn btn-gold btn-sm" onClick={() => notify("Quote exported")}>Quote</button></div>
              </div>
            ))}
          </div>
          <div className="g4" style={{ marginTop: "2rem" }}>
            {([["📊", "Quotes", "12 total"], ["📋", "Specifications", "8 approved"], ["📦", "Orders", "3 active"], ["🎨", "Configurations", "24 saved"]] as [string, string, string][]).map(([e, l, v]) => (
              <div key={l} className="card" style={{ textAlign: "center", padding: "1.5rem" }}><div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{e}</div><div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{l}</div><div style={{ fontSize: "0.75rem", color: "var(--fog)", marginTop: "0.2rem" }}>{v}</div></div>
            ))}
          </div>
        </div>
      )}

      {view === "colourworld" && (
        <div>
          <div style={{ marginBottom: "2rem" }}><h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", marginBottom: "0.5rem" }}>Colour World</h3><p style={{ color: "var(--fog)", fontSize: "0.85rem" }}>200+ standard finishes. Custom RAL/NCS matching. All Lumific luminaires available in any colour.</p></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem" }}>
            <div>
              {([["Architectural Neutrals", FINISHES.slice(0, 4)], ["Designer Palette", FINISHES.slice(4, 8)], ["Statement Colours", FINISHES.slice(8, 12)]] as [string, typeof FINISHES][]).map(([group, swatches]) => (
                <div key={group} style={{ marginBottom: "2rem" }}>
                  <div className="sec-eyebrow" style={{ marginBottom: "1rem" }}>{group}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: "1rem" }}>
                    {swatches.map((s) => (
                      <div key={s.name} style={{ cursor: "pointer" }} onClick={() => setSelSwatch(FINISHES.indexOf(s))}>
                        <div style={{ height: "80px", borderRadius: "10px", background: s.hex, marginBottom: "0.5rem", border: `2px solid ${selSwatch === FINISHES.indexOf(s) ? "var(--gold)" : "transparent"}`, boxShadow: s.hex === "#f5f5f5" ? "inset 0 0 0 1px rgba(0,0,0,0.15)" : "none", transition: "all 0.18s" }} />
                        <div style={{ fontSize: "0.72rem", fontWeight: 500 }}>{s.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="card card-gold" style={{ position: "sticky", top: "80px" }}>
                <div style={{ height: "120px", borderRadius: "10px", background: FINISHES[selSwatch]?.hex, marginBottom: "1.25rem", border: "1px solid rgba(255,255,255,0.06)" }} />
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", marginBottom: "0.25rem" }}>{FINISHES[selSwatch]?.name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--fog)", marginBottom: "1.5rem" }}>{FINISHES[selSwatch]?.hex}</div>
                <div className="sec-eyebrow" style={{ marginBottom: "0.75rem" }}>Available On</div>
                {["All Track Systems", "All Pendants", "Linear Range", "Downlight Series"].map((a) => (<div key={a} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", padding: "0.3rem 0" }}><span style={{ color: "var(--gold)" }}>✦</span><span style={{ color: "var(--fog)" }}>{a}</span></div>))}
                <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}><button className="btn btn-gold" style={{ flex: 1 }} onClick={() => notify("Finish sample requested")}>Request Sample</button><button className="btn btn-outline btn-sm" onClick={() => notify("Custom RAL requested")}>Custom RAL</button></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
