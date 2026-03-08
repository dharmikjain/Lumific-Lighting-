"use client";
import { useState } from "react";
import Link from "next/link";

export default function GetCataloguePage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", designation: "", city: "", catalogues: [] as string[], format: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleCatalogue = (cat: string) => {
    setForm({
      ...form,
      catalogues: form.catalogues.includes(cat) ? form.catalogues.filter((c) => c !== cat) : [...form.catalogues, cat],
    });
  };

  const catalogueOptions = [
    { name: "Premium Catalogue 2024", emoji: "📕", desc: "Complete product range — 200+ pages" },
    { name: "Magnetic Track Systems", emoji: "💡", desc: "48V magnetic track catalogue" },
    { name: "Automation Guide", emoji: "🤖", desc: "DALI, KNX, Casambi integration" },
    { name: "Outdoor Collection", emoji: "🌃", desc: "Facade, landscape & bollards" },
    { name: "Linear Systems", emoji: "📏", desc: "Recessed & surface linear" },
    { name: "Decorative Range", emoji: "🎨", desc: "Pendants, chandeliers & wall lights" },
  ];

  return (
    <main className="lumi-page">
      <div className="lumi-page-hero">
        <span className="lumi-eyebrow">Request Catalogue</span>
        <h1 className="lumi-page-h1">Get Your <em>Catalogue</em></h1>
        <p className="lumi-page-sub">Request printed catalogues delivered to your office, or download digital versions instantly.</p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem 4rem" }}>
        {submitted ? (
          <div className="gc-success">
            <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>📦</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", marginBottom: "0.75rem" }}>Request Received!</h2>
            <p style={{ color: "#8a8a8a", fontSize: "0.95rem", marginBottom: "0.5rem" }}>Your catalogues will be dispatched within 2 business days.</p>
            <p style={{ color: "#c9a96e", fontSize: "0.85rem", marginBottom: "2rem" }}>
              Selected: {form.catalogues.length > 0 ? form.catalogues.join(", ") : "All catalogues"}
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="gc-btn-gold" onClick={() => setSubmitted(false)}>Request More</button>
              <Link href="/catalogue" className="gc-btn-outline">Download Digital Versions</Link>
            </div>
          </div>
        ) : (
          <div className="gc-grid">
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", marginBottom: "1.25rem" }}>Select Catalogues</h3>
              <div className="gc-select-grid">
                {catalogueOptions.map((cat) => (
                  <div
                    key={cat.name}
                    className={`gc-catalogue-option ${form.catalogues.includes(cat.name) ? "selected" : ""}`}
                    onClick={() => toggleCatalogue(cat.name)}
                  >
                    <div className="gc-cat-check">{form.catalogues.includes(cat.name) ? "✓" : ""}</div>
                    <span style={{ fontSize: "1.75rem" }}>{cat.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{cat.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "#5a5a5a" }}>{cat.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.75rem", color: "#5a5a5a", marginTop: "1rem" }}>Select none to receive all catalogues.</p>

              <div style={{ marginTop: "2rem" }}>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "1rem" }}>Format Preference</h4>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {["Printed + Delivered", "Digital (PDF)", "Both"].map((f) => (
                    <button
                      key={f}
                      className={`gc-format-btn ${form.format === f ? "active" : ""}`}
                      onClick={() => setForm({ ...form, format: f })}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="gc-form-card">
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", marginBottom: "1.5rem" }}>Your Details</h3>
              <div className="gc-fields">
                <div className="gc-field"><label>Full Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="Your name" /></div>
                <div className="gc-field"><label>Email *</label><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" /></div>
                <div className="gc-field"><label>Phone *</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" /></div>
                <div className="gc-field"><label>Company / Studio</label><input name="company" value={form.company} onChange={handleChange} placeholder="Your company" /></div>
                <div className="gc-field">
                  <label>Designation</label>
                  <select name="designation" value={form.designation} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Architect</option>
                    <option>Interior Designer</option>
                    <option>Lighting Designer</option>
                    <option>Contractor</option>
                    <option>Dealer</option>
                    <option>End Customer</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="gc-field"><label>City *</label><input name="city" value={form.city} onChange={handleChange} placeholder="Delivery city" /></div>
              </div>
              <button className="gc-btn-gold" style={{ width: "100%", marginTop: "1.5rem" }} onClick={() => setSubmitted(true)}>
                Request Catalogue →
              </button>
              <p style={{ fontSize: "0.72rem", color: "#3d3d3d", marginTop: "0.75rem", textAlign: "center" }}>
                Free shipping within India. Typically delivered in 2–5 business days.
              </p>
            </div>
          </div>
        )}

        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <p style={{ color: "#5a5a5a", fontSize: "0.85rem" }}>
            Need catalogues immediately? <Link href="/catalogue" style={{ color: "#c9a96e", textDecoration: "underline" }}>Download digital versions here →</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .lumi-page { font-family: 'Outfit', sans-serif; color: #f0f0f0; }
        .lumi-page-hero { padding: 8rem 2rem 3rem; text-align: center; background: radial-gradient(ellipse at 50% 80%, rgba(201,169,110,0.08), transparent 60%); }
        .lumi-page-h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; margin-bottom: 0.75rem; }
        .lumi-page-h1 em { color: #c9a96e; font-style: italic; }
        .lumi-page-sub { color: #8a8a8a; font-size: 0.95rem; max-width: 600px; margin: 0 auto; line-height: 1.7; }
        .lumi-eyebrow { display: block; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.75rem; }

        .gc-success { text-align: center; padding: 6rem 2rem; background: #141414; border: 1px solid #2a2a2a; border-radius: 20px; }
        .gc-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 2.5rem; align-items: start; }
        .gc-select-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .gc-catalogue-option { display: flex; gap: 0.75rem; align-items: center; padding: 1rem; background: #141414; border: 1.5px solid #2a2a2a; border-radius: 12px; cursor: pointer; transition: all 0.2s; position: relative; }
        .gc-catalogue-option:hover { border-color: rgba(201,169,110,0.3); }
        .gc-catalogue-option.selected { border-color: #c9a96e; background: rgba(201,169,110,0.06); }
        .gc-cat-check { width: 22px; height: 22px; border-radius: 6px; border: 1.5px solid #2a2a2a; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #c9a96e; flex-shrink: 0; }
        .gc-catalogue-option.selected .gc-cat-check { background: #c9a96e; color: #080808; border-color: #c9a96e; }

        .gc-format-btn { padding: 0.5rem 1.25rem; border-radius: 8px; border: 1.5px solid #2a2a2a; background: none; color: #8a8a8a; font-size: 0.78rem; cursor: pointer; transition: all 0.15s; font-family: 'Outfit', sans-serif; }
        .gc-format-btn.active { background: rgba(201,169,110,0.15); border-color: #c9a96e; color: #c9a96e; }

        .gc-form-card { background: #141414; border: 1px solid #2a2a2a; border-radius: 16px; padding: 2rem; position: sticky; top: 80px; }
        .gc-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .gc-field { display: flex; flex-direction: column; gap: 0.3rem; }
        .gc-field label { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #5a5a5a; }
        .gc-field input, .gc-field select { padding: 0.65rem 1rem; background: #0e0e0e; border: 1.5px solid #2a2a2a; border-radius: 8px; color: #f0f0f0; font-size: 0.85rem; outline: none; transition: border 0.15s; font-family: 'Outfit', sans-serif; }
        .gc-field input:focus, .gc-field select:focus { border-color: #c9a96e; }
        .gc-field select option { background: #0e0e0e; }
        .gc-btn-gold { padding: 0.7rem 2rem; border-radius: 10px; background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808; font-size: 0.88rem; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }
        .gc-btn-gold:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,169,110,0.3); }
        .gc-btn-outline { padding: 0.7rem 2rem; border-radius: 10px; border: 1.5px solid #2a2a2a; color: #c4c4c4; font-size: 0.85rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; }
        .gc-btn-outline:hover { border-color: #c9a96e; color: #c9a96e; }

        @media (max-width: 900px) { .gc-grid { grid-template-columns: 1fr; } .gc-select-grid { grid-template-columns: 1fr; } .gc-fields { grid-template-columns: 1fr; } .gc-form-card { position: static; } }
      `}</style>
    </main>
  );
}
