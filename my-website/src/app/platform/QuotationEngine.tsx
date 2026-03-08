"use client";
import { useState } from "react";
import { PRODUCTS_DB, type Product } from "./data";

export function QuotationEngine({ notify }: { notify: (msg: string) => void }) {
  const [role, setRole] = useState("retail");
  const [items, setItems] = useState<Product[]>([
    { ...PRODUCTS_DB[0], qty: 12, customNote: "" },
    { ...PRODUCTS_DB[3], qty: 24, customNote: "" },
  ]);
  const [activeTab, setActiveTab] = useState("builder");
  const [clientName, setClientName] = useState("Luminos Hotel — Lobby Renovation");
  const [discount, setDiscount] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);

  const subtotal = items.reduce((s, i) => s + (i.price[role] || 0) * (i.qty || 1), 0);
  const discAmt = subtotal * (discount / 100);
  const total = subtotal - discAmt;
  const vat = total * 0.18;
  const grand = total + vat;

  const addItem = (p: Product) => {
    if (!items.find((i) => i.id === p.id)) setItems([...items, { ...p, qty: 1, customNote: "" }]);
    setShowAddModal(false);
    notify("Product added to quote");
  };
  const updateQty = (id: number, qty: number) => setItems(items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const removeItem = (id: number) => setItems(items.filter((i) => i.id !== id));
  const roles = ["retail", "dealer", "project", "architect"];

  return (
    <div className="sec">
      <div className="sec-eyebrow">Section 03</div>
      <h2 className="sec-title">Smart <em>Quotation</em> Engine</h2>
      <p className="sec-sub">10-feature quotation system with role-based pricing, PDF export, WhatsApp share, and quote-to-order conversion.</p>
      <div className="tabs">
        {["builder", "history", "templates"].map((t) => (
          <button key={t} className={`tab ${activeTab === t ? "on" : ""}`} onClick={() => setActiveTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
        ))}
      </div>

      {activeTab === "builder" && (
        <div className="g2" style={{ gap: "2rem" }}>
          <div>
            <div className="card" style={{ marginBottom: "1.5rem" }}>
              <label className="lbl">Project / Client Name</label>
              <input className="inp" value={clientName} onChange={(e) => setClientName(e.target.value)} />
              <div style={{ marginTop: "1.25rem" }}>
                <label className="lbl">Pricing Role</label>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
                  {roles.map((r) => (<button key={r} className={`role-pill ${role === r ? "sel" : ""}`} onClick={() => setRole(r)}>{r.charAt(0).toUpperCase() + r.slice(1)}</button>))}
                </div>
              </div>
            </div>
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem" }}>Line Items</span>
                <button className="btn btn-gold btn-sm" onClick={() => setShowAddModal(true)}>+ Add Product</button>
              </div>
              {items.map((item) => (
                <div key={item.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: "0.75rem", alignItems: "center", padding: "0.9rem 0", borderBottom: "1px solid var(--steel)" }}>
                  <div style={{ fontSize: "1.75rem" }}>{item.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{item.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--fog)" }}>{item.cat} · {item.watt} · <span className="badge badge-gold">{role}</span></div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => updateQty(item.id, (item.qty || 1) - 1)}>−</button>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, minWidth: "2rem", textAlign: "center" }}>{item.qty}</span>
                    <button className="btn btn-ghost btn-sm" onClick={() => updateQty(item.id, (item.qty || 1) + 1)}>+</button>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--gold)" }}>₹{((item.price[role] || 0) * (item.qty || 1)).toLocaleString()}</div>
                    <button className="btn btn-ghost btn-sm" style={{ color: "var(--red)" }} onClick={() => removeItem(item.id)}>✕</button>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "1rem" }}>
                <label className="lbl">Discount (%)</label>
                <input className="inp" type="number" min="0" max="40" value={discount} onChange={(e) => setDiscount(+e.target.value)} style={{ width: "120px" }} />
              </div>
            </div>
          </div>
          <div>
            <div className="card card-gold" style={{ marginBottom: "1.5rem" }}>
              <div className="sec-eyebrow" style={{ marginBottom: "1rem" }}>Quote Summary</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--silver)" }}>{clientName}</div>
              {[["Subtotal", `₹${subtotal.toLocaleString()}`], [`Discount (${discount}%)`, "− ₹" + discAmt.toLocaleString()], ["Net Total", `₹${total.toLocaleString()}`], ["GST 18%", `₹${vat.toLocaleString()}`]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.85rem" }}>
                  <span style={{ color: "var(--fog)" }}>{l}</span>
                  <span style={{ fontWeight: (l as string).includes("Net") ? 700 : 400, color: (l as string).includes("Discount") ? "var(--red)" : "var(--snow)" }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "1rem", marginTop: "0.5rem" }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem" }}>Grand Total</span>
                <div className="price-tag">₹{grand.toLocaleString()}</div>
              </div>
            </div>
            <div className="card" style={{ marginBottom: "1rem" }}>
              <div className="sec-eyebrow" style={{ marginBottom: "0.75rem" }}>Export & Share</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <button className="btn btn-gold" onClick={() => notify("PDF generated & downloaded")}>⬇ Export PDF</button>
                <button className="btn btn-outline" style={{ borderColor: "#25d366", color: "#25d366" }} onClick={() => notify("Quote shared via WhatsApp")}>📱 WhatsApp</button>
                <button className="btn btn-outline" onClick={() => notify("Quote sent via email")}>✉ Email Quote</button>
                <button className="btn btn-outline" onClick={() => notify("Quote saved to drafts")}>💾 Save Draft</button>
              </div>
            </div>
            <button className="btn btn-gold" style={{ width: "100%", padding: "0.85rem", fontSize: "0.9rem", letterSpacing: "0.05em" }} onClick={() => notify("Quote converted to Purchase Order!")}>Convert to Order →</button>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="card">
          <table className="tbl">
            <thead><tr><th>Quote #</th><th>Client</th><th>Value</th><th>Role</th><th>Status</th><th>Date</th><th></th></tr></thead>
            <tbody>
              {([["Q-2611", "Aria Hotels", grand, "Project", "Approved", "Mar 4"], ["Q-2610", "Studio Karma", "₹1,84,200", "Architect", "Pending", "Mar 2"], ["Q-2609", "Retail Chain Co", "₹3,21,000", "Dealer", "Sent", "Mar 1"], ["Q-2608", "Private Villa", "₹96,500", "Retail", "Draft", "Feb 28"]] as [string, string, string | number, string, string, string][]).map(([n, c, v, r, s, d]) => (
                <tr key={n}>
                  <td style={{ fontWeight: 600, color: "var(--gold)" }}>{n}</td><td>{c}</td>
                  <td style={{ fontWeight: 700 }}>{typeof v === "number" ? "₹" + v.toLocaleString() : v}</td>
                  <td><span className="badge badge-gold">{r}</span></td>
                  <td><span className={`badge ${s === "Approved" ? "badge-green" : s === "Pending" ? "badge-teal" : ""}`} style={s === "Draft" ? { background: "rgba(255,255,255,0.05)", color: "var(--fog)" } : {}}>{s}</span></td>
                  <td style={{ color: "var(--fog)" }}>{d}</td>
                  <td><button className="btn btn-ghost btn-sm">Open →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "templates" && (
        <div className="g3">
          {["Hospitality Standard", "Retail Showcase", "Office Fitout", "Residential Luxury", "Healthcare Specification", "Outdoor Architectural"].map((t) => (
            <div key={t} className="card" style={{ cursor: "pointer" }} onClick={() => notify(`Template "${t}" loaded`)}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>📋</div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.3rem" }}>{t}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--fog)" }}>Pre-configured line items</div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300 }} onClick={() => setShowAddModal(false)}>
          <div style={{ background: "var(--graphite)", border: "1px solid var(--steel)", borderRadius: "var(--r)", padding: "2rem", width: "480px", maxWidth: "90vw" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", marginBottom: "1.5rem" }}>Add Product to Quote</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {PRODUCTS_DB.map((p) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "var(--obsidian)", borderRadius: "10px", border: "1px solid var(--steel)", cursor: "pointer" }} onClick={() => addItem(p)}>
                  <span style={{ fontSize: "2rem" }}>{p.emoji}</span>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{p.name}</div><div style={{ fontSize: "0.75rem", color: "var(--fog)" }}>{p.cat} · {p.watt}</div></div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--gold)" }}>₹{(p.price[role] || 0).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
