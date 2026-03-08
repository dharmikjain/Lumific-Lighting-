"use client";
import { useState } from "react";
import Link from "next/link";

interface QuoteItem { id: number; name: string; emoji: string; cat: string; price: Record<string, number>; watt: string; qty: number; }

const PRODUCTS: Omit<QuoteItem, "qty">[] = [
  { id: 1, name: "Axis Track 48V", cat: "Track", price: { retail: 4200, dealer: 3360, project: 3024, architect: 2940 }, watt: "15–60W", emoji: "💡" },
  { id: 2, name: "Corona Pendant", cat: "Pendant", price: { retail: 8900, dealer: 7120, project: 6408, architect: 6230 }, watt: "24W", emoji: "🔆" },
  { id: 3, name: "Stratum Linear", cat: "Linear", price: { retail: 3100, dealer: 2480, project: 2232, architect: 2170 }, watt: "20W/m", emoji: "📏" },
  { id: 4, name: "Vela Recessed", cat: "Downlight", price: { retail: 1800, dealer: 1440, project: 1296, architect: 1260 }, watt: "12W", emoji: "⭕" },
  { id: 5, name: "Nova Surface", cat: "Surface", price: { retail: 2400, dealer: 1920, project: 1728, architect: 1680 }, watt: "18W", emoji: "🌟" },
  { id: 6, name: "Helix Wallwash", cat: "Wall", price: { retail: 3600, dealer: 2880, project: 2592, architect: 2520 }, watt: "24W", emoji: "🔅" },
  { id: 7, name: "Terra Bollard", cat: "Outdoor", price: { retail: 5200, dealer: 4160, project: 3744, architect: 3640 }, watt: "10W", emoji: "🏗️" },
  { id: 8, name: "Aura Magnetic Spot", cat: "Magnetic", price: { retail: 1950, dealer: 1560, project: 1404, architect: 1365 }, watt: "7–15W", emoji: "✨" },
];

export default function SmartQuotationPage() {
  const [role, setRole] = useState("retail");
  const [items, setItems] = useState<QuoteItem[]>([
    { ...PRODUCTS[0], qty: 12 },
    { ...PRODUCTS[3], qty: 24 },
  ]);
  const [clientName, setClientName] = useState("My Lighting Project");
  const [discount, setDiscount] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [exported, setExported] = useState(false);

  const roles = ["retail", "dealer", "project", "architect"];
  const subtotal = items.reduce((s, i) => s + (i.price[role] || 0) * i.qty, 0);
  const discAmt = subtotal * (discount / 100);
  const total = subtotal - discAmt;
  const gst = total * 0.18;
  const grand = total + gst;

  const addItem = (p: typeof PRODUCTS[0]) => {
    if (!items.find((i) => i.id === p.id)) { setItems([...items, { ...p, qty: 1 }]); }
    setShowAdd(false);
  };
  const updateQty = (id: number, qty: number) => setItems(items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const removeItem = (id: number) => setItems(items.filter((i) => i.id !== id));

  return (
    <main className="lumi-page">
      <div className="lumi-page-hero">
        <span className="lumi-eyebrow">Quotation Tool</span>
        <h1 className="lumi-page-h1">Smart <em>Quotation</em> Maker</h1>
        <p className="lumi-page-sub">Create professional lighting quotations in seconds. Role-based pricing, discount management, and instant PDF export.</p>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div className="sq-grid">
          <div>
            {/* Project & Role */}
            <div className="sq-card" style={{ marginBottom: "1.5rem" }}>
              <label className="sq-label">Project / Client Name</label>
              <input className="sq-input" value={clientName} onChange={(e) => setClientName(e.target.value)} />
              <div style={{ marginTop: "1rem" }}>
                <label className="sq-label">Pricing Role</label>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {roles.map((r) => (
                    <button key={r} className={`sq-role-pill ${role === r ? "active" : ""}`} onClick={() => setRole(r)}>
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="sq-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>Line Items ({items.length})</h3>
                <button className="sq-btn-gold sq-btn-sm" onClick={() => setShowAdd(true)}>+ Add Product</button>
              </div>

              {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "#5a5a5a" }}>
                  <p>No items in quote. Click &quot;Add Product&quot; to start.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="sq-line-item">
                    <span style={{ fontSize: "1.75rem" }}>{item.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{item.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "#5a5a5a" }}>{item.cat} · {item.watt} · <span style={{ color: "#c9a96e" }}>{role}</span></div>
                    </div>
                    <div className="sq-qty-control">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                    <div style={{ textAlign: "right", minWidth: "100px" }}>
                      <div style={{ fontWeight: 700, color: "#c9a96e", fontSize: "0.88rem" }}>₹{((item.price[role] || 0) * item.qty).toLocaleString()}</div>
                      <button className="sq-remove" onClick={() => removeItem(item.id)}>✕ Remove</button>
                    </div>
                  </div>
                ))
              )}

              <div style={{ marginTop: "1.25rem" }}>
                <label className="sq-label">Discount (%)</label>
                <input className="sq-input" type="number" min="0" max="40" value={discount} onChange={(e) => setDiscount(+e.target.value)} style={{ width: "120px" }} />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="sq-summary-card" style={{ marginBottom: "1.5rem" }}>
              <span className="sq-summary-eyebrow">Quote Summary</span>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#c4c4c4", marginBottom: "1.5rem" }}>{clientName}</div>
              {[
                ["Subtotal", `₹${subtotal.toLocaleString()}`],
                [`Discount (${discount}%)`, `− ₹${discAmt.toLocaleString()}`],
                ["Net Total", `₹${total.toLocaleString()}`],
                ["GST 18%", `₹${Math.round(gst).toLocaleString()}`],
              ].map(([l, v]) => (
                <div key={l} className="sq-summary-row">
                  <span style={{ color: "#5a5a5a" }}>{l}</span>
                  <span style={{ fontWeight: l === "Net Total" ? 700 : 400, color: l.includes("Discount") ? "#e03e3e" : "#f0f0f0" }}>{v}</span>
                </div>
              ))}
              <div className="sq-grand-total">
                <span>Grand Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#c9a96e" }}>₹{Math.round(grand).toLocaleString()}</span>
              </div>
            </div>

            <div className="sq-card" style={{ marginBottom: "1.5rem" }}>
              <span className="sq-summary-eyebrow">Export & Share</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "0.75rem" }}>
                <button className="sq-btn-gold" onClick={() => setExported(true)}>⬇ Export PDF</button>
                <button className="sq-btn-outline" style={{ borderColor: "#25d366", color: "#25d366" }}>📱 WhatsApp</button>
                <button className="sq-btn-outline">✉ Email Quote</button>
                <button className="sq-btn-outline">💾 Save Draft</button>
              </div>
            </div>

            <button className="sq-btn-gold" style={{ width: "100%", padding: "0.85rem", fontSize: "0.9rem" }}>Convert to Order →</button>

            {exported && (
              <div className="sq-exported-notice">
                ✦ PDF generated successfully! Your quote is ready for download.
                <button onClick={() => setExported(false)} style={{ background: "none", border: "none", color: "#c9a96e", cursor: "pointer", marginLeft: "0.5rem" }}>✕</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAdd && (
        <div className="sq-modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="sq-modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", marginBottom: "1.5rem" }}>Add Product to Quote</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {PRODUCTS.map((p) => (
                <div key={p.id} className="sq-product-option" onClick={() => addItem(p)}>
                  <span style={{ fontSize: "2rem" }}>{p.emoji}</span>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{p.name}</div><div style={{ fontSize: "0.72rem", color: "#5a5a5a" }}>{p.cat} · {p.watt}</div></div>
                  <span style={{ fontWeight: 700, color: "#c9a96e" }}>₹{(p.price[role] || 0).toLocaleString()}</span>
                </div>
              ))}
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

        .sq-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 2.5rem; align-items: start; }
        .sq-card { background: #141414; border: 1px solid #2a2a2a; border-radius: 16px; padding: 1.75rem; }
        .sq-label { display: block; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #5a5a5a; margin-bottom: 0.4rem; }
        .sq-input { padding: 0.65rem 1rem; background: #0e0e0e; border: 1.5px solid #2a2a2a; border-radius: 8px; color: #f0f0f0; font-size: 0.88rem; outline: none; width: 100%; transition: border 0.15s; font-family: 'Outfit', sans-serif; }
        .sq-input:focus { border-color: #c9a96e; }
        .sq-role-pill { padding: 0.35rem 1rem; border-radius: 20px; font-size: 0.78rem; font-weight: 600; border: 1.5px solid #2a2a2a; color: #5a5a5a; background: none; cursor: pointer; transition: all 0.15s; font-family: 'Outfit', sans-serif; }
        .sq-role-pill.active { background: rgba(201,169,110,0.15); border-color: #c9a96e; color: #c9a96e; }

        .sq-line-item { display: grid; grid-template-columns: auto 1fr auto auto; gap: 1rem; align-items: center; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .sq-qty-control { display: flex; align-items: center; gap: 0.4rem; background: #0e0e0e; border-radius: 8px; padding: 0.3rem; border: 1px solid #2a2a2a; }
        .sq-qty-control button { width: 28px; height: 28px; border-radius: 6px; border: none; background: none; color: #8a8a8a; cursor: pointer; font-size: 1rem; }
        .sq-qty-control button:hover { background: rgba(255,255,255,0.06); color: #f0f0f0; }
        .sq-qty-control span { min-width: 2rem; text-align: center; font-weight: 600; font-size: 0.85rem; }
        .sq-remove { background: none; border: none; color: #e03e3e; font-size: 0.68rem; cursor: pointer; margin-top: 0.3rem; font-family: 'Outfit', sans-serif; }

        .sq-summary-card { background: linear-gradient(135deg, rgba(201,169,110,0.1), rgba(201,169,110,0.04)); border: 1px solid rgba(201,169,110,0.25); border-radius: 16px; padding: 1.75rem; }
        .sq-summary-eyebrow { display: block; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #c9a96e; margin-bottom: 1rem; }
        .sq-summary-row { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 0.85rem; }
        .sq-grand-total { display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; margin-top: 0.5rem; }

        .sq-btn-gold { padding: 0.6rem 1.5rem; border-radius: 8px; background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808; font-size: 0.82rem; font-weight: 700; border: none; cursor: pointer; transition: all 0.18s; font-family: 'Outfit', sans-serif; }
        .sq-btn-gold:hover { transform: translateY(-1px); }
        .sq-btn-sm { padding: 0.4rem 1rem; font-size: 0.75rem; }
        .sq-btn-outline { padding: 0.6rem 1rem; border-radius: 8px; background: none; border: 1.5px solid #2a2a2a; color: #c4c4c4; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.15s; font-family: 'Outfit', sans-serif; }
        .sq-btn-outline:hover { border-color: #c9a96e; color: #c9a96e; }

        .sq-exported-notice { margin-top: 1rem; padding: 1rem; background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.2); border-radius: 10px; font-size: 0.82rem; color: #c9a96e; display: flex; align-items: center; }

        .sq-modal-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; }
        .sq-modal { background: #141414; border: 1px solid #2a2a2a; border-radius: 16px; padding: 2rem; width: 500px; max-width: 90vw; max-height: 80vh; overflow-y: auto; }
        .sq-product-option { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: #0e0e0e; border-radius: 10px; border: 1px solid #2a2a2a; cursor: pointer; transition: all 0.15s; }
        .sq-product-option:hover { border-color: rgba(201,169,110,0.3); }

        @media (max-width: 900px) { .sq-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
