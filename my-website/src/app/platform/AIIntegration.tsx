"use client";
import { useState, useRef, useEffect } from "react";
import { PRODUCTS_DB, CHAT_RESPONSES, type Product } from "./data";

export function AIIntegration({ notify }: { notify: (msg: string) => void }) {
  const [activeAI, setActiveAI] = useState("chat");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm **Lumi**, your AI lighting advisor. I specialise in photometric analysis, product matching, and specification assistance. How can I help your project today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<(Product & { match: number })[]>([]);
  const [searching, setSearching] = useState(false);
  const [aiScore, setAiScore] = useState<number | null>(null);
  const msgEndRef = useRef<HTMLDivElement>(null);

  const scrollBottom = () => msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollBottom, [messages, typing]);

  const getResponse = (msg: string) => {
    const m = msg.toLowerCase();
    if (m.includes("retail") || m.includes("shop")) return CHAT_RESPONSES.retail;
    if (m.includes("hotel") || m.includes("hospital")) return CHAT_RESPONSES.hotel;
    if (m.includes("office") || m.includes("workspace")) return CHAT_RESPONSES.office;
    if (m.includes("help") || m.includes("what can")) return CHAT_RESPONSES.help;
    return CHAT_RESPONSES.default;
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setTyping(true);
    setTimeout(() => { setTyping(false); setMessages((m) => [...m, { role: "ai", text: getResponse(userMsg) }]); }, 1400);
  };

  const doVisualSearch = () => {
    setSearching(true);
    setTimeout(() => {
      setSearchResults(PRODUCTS_DB.slice(0, 3).map((p) => ({ ...p, match: Math.floor(75 + Math.random() * 24) })));
      setSearching(false);
    }, 2000);
  };

  const renderText = (t: string) => t.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--gold)">$1</strong>');

  return (
    <div className="sec">
      <div className="sec-eyebrow">Section 04</div>
      <h2 className="sec-title">AI <em>Intelligence</em> Layer</h2>
      <p className="sec-sub">Recommendation engine, 24/7 virtual lighting advisor, AI quotation intelligence, visual search, and warranty automation.</p>
      <div className="tabs" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
        {([["chat", "💬 Lumi AI"], ["visual", "🔍 Visual Search"], ["recommend", "⚡ Recommendations"], ["warranty", "🛡 Warranty AI"], ["intelligence", "🧠 Quote IQ"]] as [string, string][]).map(([k, l]) => (
          <button key={k} className={`tab ${activeAI === k ? "on" : ""}`} onClick={() => setActiveAI(k)}>{l}</button>
        ))}
      </div>

      {activeAI === "chat" && (
        <div className="g2" style={{ gap: "2rem", alignItems: "start" }}>
          <div>
            <div className="chat-window">
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--steel)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,var(--gold),var(--amber))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>✦</div>
                <div><div style={{ fontWeight: 600, fontSize: "0.88rem" }}>Lumi — Lighting Intelligence</div><div style={{ fontSize: "0.7rem", color: "var(--green)" }}>● Online · Avg response 1.2s</div></div>
              </div>
              <div className="chat-msgs">
                {messages.map((m, i) => (
                  <div key={i} className={`msg msg-${m.role}`}>
                    {m.role === "ai" && <div className="msg-ai-name">LUMI AI</div>}
                    <span dangerouslySetInnerHTML={{ __html: renderText(m.text) }} />
                  </div>
                ))}
                {typing && (<div className="msg msg-ai"><div className="msg-ai-name">LUMI AI</div><div className="chat-typing"><div className="dot-pulse" /><div className="dot-pulse" /><div className="dot-pulse" /></div></div>)}
                <div ref={msgEndRef} />
              </div>
              <div className="chat-input-row">
                <input className="inp" placeholder="Ask about products, lux levels, specifications..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
                <button className="btn btn-gold btn-sm" onClick={sendMessage} style={{ whiteSpace: "nowrap" }}>Send</button>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="card card-gold">
              <div className="sec-eyebrow" style={{ marginBottom: "0.75rem" }}>Quick Questions</div>
              {["Best fixture for a retail showroom?", "Lux recommendation for an office?", "Hospitality lighting layers", "What is DALI dimming?"].map((q) => (
                <div key={q} style={{ padding: "0.6rem 0.9rem", background: "var(--obsidian)", borderRadius: "8px", marginBottom: "0.5rem", cursor: "pointer", fontSize: "0.82rem", border: "1px solid var(--steel)" }} onClick={() => { setInput(q); notify("Question loaded"); }}>{q}</div>
              ))}
            </div>
            <div className="card">
              <div className="sec-eyebrow" style={{ marginBottom: "0.75rem" }}>Lumi Capabilities</div>
              {["Product matching by application", "Lux & photometric calculations", "CCT & CRI recommendations", "DALI/DMX control advice", "Energy compliance checks", "Specification writing"].map((c) => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontSize: "0.82rem" }}><span style={{ color: "var(--gold)" }}>✦</span><span style={{ color: "var(--fog)" }}>{c}</span></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeAI === "visual" && (
        <div className="g2" style={{ gap: "2rem" }}>
          <div>
            <div className="upload-zone" onClick={() => { setUploadedImg("📸"); doVisualSearch(); }} style={{ marginBottom: "1.5rem" }}>
              <div className="upload-icon">{uploadedImg || "📷"}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", marginBottom: "0.5rem" }}>Upload a reference photo</div>
              <p style={{ color: "var(--fog)", fontSize: "0.85rem" }}>AI will identify the lighting style and find matching products in our catalog</p>
              <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center" }}><span className="info-chip">JPG / PNG / WebP</span><span className="info-chip">Up to 10MB</span></div>
            </div>
            {searching && (<div style={{ textAlign: "center", padding: "2rem", color: "var(--fog)" }}><div style={{ fontSize: "2rem", marginBottom: "0.75rem", animation: "float 1s ease-in-out infinite" }}>🔍</div><div>Analysing image with computer vision...</div></div>)}
            {searchResults.length > 0 && !searching && (
              <>
                <div style={{ marginBottom: "1rem", fontSize: "0.82rem", color: "var(--fog)" }}>AI found <strong style={{ color: "var(--gold)" }}>{searchResults.length} matching products</strong> based on style, form factor and beam characteristics:</div>
                {searchResults.map((p) => (
                  <div key={p.id} className="card" style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem" }}>
                    <div style={{ fontSize: "2.5rem" }}>{p.emoji}</div>
                    <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{p.name}</div><div style={{ fontSize: "0.75rem", color: "var(--fog)" }}>{p.cat}</div><div className="prog-bar" style={{ marginTop: "0.5rem", width: "120px" }}><div className="prog-fill" style={{ width: `${p.match}%` }} /></div></div>
                    <div style={{ textAlign: "right" }}><div style={{ fontWeight: 700, color: "var(--gold)", fontSize: "1.1rem" }}>{p.match}%</div><div style={{ fontSize: "0.7rem", color: "var(--fog)" }}>match</div></div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div>
            <div className="card card-gold">
              <div className="sec-eyebrow" style={{ marginBottom: "1rem" }}>Visual Search Technology</div>
              {([["🎨", "Style Recognition", "Identifies design language (industrial, minimal, luxury)"], ["📐", "Form Factor", "Detects track, pendant, recessed, or linear typology"], ["☀️", "Light Quality", "Analyses beam spread and colour temperature in scene"], ["🔗", "Smart Matching", "Matches against 2,400+ product attributes"]] as [string, string, string][]).map(([e, t, d]) => (
                <div key={t} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}><div style={{ fontSize: "1.5rem", flexShrink: 0 }}>{e}</div><div><div style={{ fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.2rem" }}>{t}</div><div style={{ fontSize: "0.78rem", color: "var(--fog)" }}>{d}</div></div></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeAI === "recommend" && (
        <div className="g2" style={{ gap: "1.5rem", marginBottom: "2rem" }}>
          <div className="card">
            <label className="lbl">Application Type</label>
            <select className="inp" style={{ marginBottom: "1rem" }}>{["Hospitality — Hotel Lobby", "Retail — Fashion", "Office — Open Plan", "Residential — Living Room", "Healthcare — Corridor", "Outdoor — Facade"].map((o) => <option key={o}>{o}</option>)}</select>
            <label className="lbl">Target Illuminance (lux)</label>
            <input className="inp" defaultValue="750" style={{ marginBottom: "1rem" }} />
            <label className="lbl">Room Dimensions (m)</label>
            <div className="form-row" style={{ marginBottom: "1rem" }}><input className="inp" placeholder="Length" defaultValue="12" /><input className="inp" placeholder="Width" defaultValue="8" /></div>
            <button className="btn btn-gold" style={{ width: "100%" }} onClick={() => setAiScore(94)}>⚡ Generate AI Recommendations</button>
          </div>
          {aiScore && (
            <div className="card card-gold">
              <div className="sec-eyebrow" style={{ marginBottom: "1rem" }}>AI Recommendation Score</div>
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}><div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "4rem", color: "var(--gold)", lineHeight: 1 }}>{aiScore}</div><div style={{ fontSize: "0.75rem", color: "var(--fog)" }}>Confidence Score</div></div>
              {([["Primary Fixture", "Axis Track 48V", "96% match"], ["Ambient Layer", "Stratum Linear", "88% match"], ["Accent Light", "Vela Recessed", "91% match"]] as [string, string, string][]).map(([t, n, m]) => (
                <div key={t} style={{ padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}><div style={{ fontSize: "0.7rem", color: "var(--fog)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{t}</div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.2rem" }}><span style={{ fontWeight: 600, fontSize: "0.85rem" }}>{n}</span><span style={{ fontSize: "0.75rem", color: "var(--gold)", fontWeight: 700 }}>{m}</span></div></div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeAI === "warranty" && (
        <div className="g2" style={{ gap: "2rem" }}>
          <div className="card">
            <div className="sec-eyebrow" style={{ marginBottom: "1rem" }}>Warranty Automation</div>
            <div style={{ marginBottom: "1.5rem" }}>
              {[{ icon: "📋", step: "Registration", desc: "Auto-registers warranty on purchase confirmation" }, { icon: "📧", step: "Activation", desc: "Sends warranty certificate within 24 hours" }, { icon: "⏰", step: "Monitoring", desc: "AI tracks product lifetime & sends alerts at 80%" }, { icon: "🔧", step: "Claims", desc: "Smart claim routing to nearest service partner" }, { icon: "✅", step: "Resolution", desc: "Average claim resolved in 3.2 business days" }].map((w) => (
                <div key={w.step} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", flexShrink: 0 }}>{w.icon}</div>
                  <div><div style={{ fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.2rem" }}>{w.step}</div><div style={{ fontSize: "0.78rem", color: "var(--fog)" }}>{w.desc}</div></div>
                </div>
              ))}
            </div>
            <button className="btn btn-gold" style={{ width: "100%" }} onClick={() => notify("Warranty claim initiated")}>Register New Warranty</button>
          </div>
          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <div className="sec-eyebrow" style={{ marginBottom: "1rem" }}>Active Warranties</div>
            {[{ p: "Axis Track 48V", id: "WR-10249", exp: "Mar 2028", status: "Active" }, { p: "Corona Pendant", id: "WR-10247", exp: "Jan 2028", status: "Active" }, { p: "Stratum Linear", id: "WR-10240", exp: "Aug 2026", status: "Expiring" }].map((w) => (
              <div key={w.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div><div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{w.p}</div><div style={{ fontSize: "0.72rem", color: "var(--fog)" }}>{w.id} · Exp: {w.exp}</div></div>
                <span className={`badge ${w.status === "Active" ? "badge-green" : "badge-teal"}`}>{w.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeAI === "intelligence" && (
        <div className="g2" style={{ gap: "2rem" }}>
          <div className="card">
            <div className="sec-eyebrow" style={{ marginBottom: "1rem" }}>Quote Intelligence</div>
            {[{ label: "Win Probability", value: 78, color: "var(--green)" }, { label: "Price Competitiveness", value: 62, color: "var(--gold)" }, { label: "Spec Alignment", value: 91, color: "var(--teal)" }, { label: "Completion Score", value: 85, color: "var(--gold)" }].map((m) => (
              <div key={m.label} style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontSize: "0.82rem" }}><span style={{ color: "var(--fog)" }}>{m.label}</span><span style={{ fontWeight: 700, color: m.color }}>{m.value}%</span></div>
                <div className="prog-bar"><div className="prog-fill" style={{ width: `${m.value}%`, background: `linear-gradient(90deg,${m.color},${m.color})` }} /></div>
              </div>
            ))}
          </div>
          <div className="card card-gold">
            <div className="sec-eyebrow" style={{ marginBottom: "1rem" }}>AI Suggestions</div>
            {["Add 10% contingency for M&E coordination", "Recommend DALI driver upgrade (₹12,000 adds 23% value)", "Project timeline suggests Q2 delivery window — stock accordingly", "Competitor analysis: pricing is 8% above market for dealer tier", "Add photometric report to increase spec-in probability by 34%"].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.82rem" }}><span style={{ color: "var(--gold)", fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span><span style={{ color: "var(--silver)" }}>{s}</span></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
