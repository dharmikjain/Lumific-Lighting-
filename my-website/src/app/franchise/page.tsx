"use client";
import { useState } from "react";
import Link from "next/link";

export default function FranchisePage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", investment: "", experience: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="lumi-page">
      <div className="lumi-page-hero">
        <span className="lumi-eyebrow">Partnership</span>
        <h1 className="lumi-page-h1">Become a Lumific <em>Franchise</em> Partner</h1>
        <p className="lumi-page-sub">Join India&apos;s fastest-growing premium architectural lighting brand. Exclusive territories, training, and technology support.</p>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div className="fr-grid">
          {/* Benefits */}
          <div>
            <h3 className="fr-section-title">Why Partner with Lumific?</h3>
            <div className="fr-benefits">
              {[
                { icon: "🏢", title: "Exclusive Territory", desc: "Protected market territory with no internal competition. First-mover advantage in your city." },
                { icon: "📚", title: "Complete Training", desc: "4-week intensive training: product knowledge, lighting design, sales techniques, and platform mastery." },
                { icon: "🛠️", title: "Tech Platform Access", desc: "Full access to Lumific Platform: AI quotation, configurator, layout engine, and CRM system." },
                { icon: "💰", title: "Attractive Margins", desc: "35–50% dealer margins on retail pricing. Project-tier pricing for large-scale orders." },
                { icon: "📦", title: "Inventory Support", desc: "Centralised inventory with direct-ship capability. No dead stock with our exchange policy." },
                { icon: "🎯", title: "Marketing Support", desc: "Co-branded marketing materials, digital campaigns, and architect engagement programs." },
                { icon: "🏆", title: "Premium Brand", desc: "Align with India's most innovative lighting brand. Award-winning product design and engineering." },
                { icon: "🤝", title: "Dedicated Support", desc: "Regional business manager, technical support hotline, and quarterly business reviews." },
              ].map((b) => (
                <div key={b.title} className="fr-benefit-card">
                  <span className="fr-benefit-icon">{b.icon}</span>
                  <div>
                    <div className="fr-benefit-title">{b.title}</div>
                    <div className="fr-benefit-desc">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="fr-models">
              <h3 className="fr-section-title" style={{ marginTop: "2.5rem" }}>Investment Models</h3>
              <div className="fr-model-grid">
                {[
                  { tier: "City Partner", invest: "₹15–25 Lakh", area: "500+ sq ft showroom", support: "Full setup + training", color: "#2a2a2a" },
                  { tier: "Regional Hub", invest: "₹30–50 Lakh", area: "1000+ sq ft experience centre", support: "Premium support + marketing", color: "rgba(201,169,110,0.1)" },
                  { tier: "Master Franchise", invest: "₹75 Lakh+", area: "State-level exclusivity", support: "Multi-city deployment rights", color: "rgba(201,169,110,0.15)" },
                ].map((m) => (
                  <div key={m.tier} className="fr-model-card" style={{ background: m.color }}>
                    <div className="fr-model-tier">{m.tier}</div>
                    <div className="fr-model-invest">{m.invest}</div>
                    <div className="fr-model-detail">{m.area}</div>
                    <div className="fr-model-detail">{m.support}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div>
            <div className="fr-form-card">
              {submitted ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✦</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", marginBottom: "0.75rem" }}>Application Received!</h3>
                  <p style={{ color: "#8a8a8a", fontSize: "0.88rem", marginBottom: "2rem" }}>Our franchise team will review your application and get back within 48 hours.</p>
                  <button className="fr-btn-gold" onClick={() => setSubmitted(false)}>Submit Another</button>
                </div>
              ) : (
                <>
                  <h3 className="fr-form-title">Apply for Franchise</h3>
                  <p className="fr-form-sub">Fill in your details and our franchise team will reach out within 48 hours.</p>
                  <div className="fr-form-fields">
                    <div className="fr-field"><label>Full Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" /></div>
                    <div className="fr-field"><label>Email *</label><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" /></div>
                    <div className="fr-field"><label>Phone *</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" /></div>
                    <div className="fr-field"><label>City *</label><input name="city" value={form.city} onChange={handleChange} placeholder="Your city" /></div>
                    <div className="fr-field">
                      <label>Investment Range</label>
                      <select name="investment" value={form.investment} onChange={handleChange}>
                        <option value="">Select range</option>
                        <option>₹15–25 Lakh</option>
                        <option>₹30–50 Lakh</option>
                        <option>₹75 Lakh+</option>
                      </select>
                    </div>
                    <div className="fr-field">
                      <label>Experience in Lighting Industry</label>
                      <select name="experience" value={form.experience} onChange={handleChange}>
                        <option value="">Select experience</option>
                        <option>No prior experience</option>
                        <option>1–3 years</option>
                        <option>3–5 years</option>
                        <option>5+ years</option>
                      </select>
                    </div>
                    <div className="fr-field" style={{ gridColumn: "1 / -1" }}>
                      <label>Message</label>
                      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your background and why you'd like to partner with Lumific" rows={4} />
                    </div>
                  </div>
                  <button className="fr-btn-gold" style={{ width: "100%", marginTop: "1rem" }} onClick={() => setSubmitted(true)}>Submit Application →</button>
                </>
              )}
            </div>
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

        .fr-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 3rem; align-items: start; }
        .fr-section-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 400; margin-bottom: 1.5rem; }
        .fr-benefits { display: flex; flex-direction: column; gap: 1rem; }
        .fr-benefit-card { display: flex; gap: 1rem; padding: 1.25rem; background: #1c1c1c; border: 1px solid #2a2a2a; border-radius: 12px; transition: all 0.2s; }
        .fr-benefit-card:hover { border-color: rgba(201,169,110,0.3); }
        .fr-benefit-icon { font-size: 1.5rem; flex-shrink: 0; }
        .fr-benefit-title { font-weight: 600; font-size: 0.88rem; margin-bottom: 0.2rem; }
        .fr-benefit-desc { font-size: 0.78rem; color: #8a8a8a; line-height: 1.6; }
        .fr-model-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .fr-model-card { padding: 1.5rem; border: 1px solid #2a2a2a; border-radius: 12px; text-align: center; }
        .fr-model-tier { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.5rem; }
        .fr-model-invest { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 0.75rem; }
        .fr-model-detail { font-size: 0.78rem; color: #8a8a8a; margin-bottom: 0.3rem; }

        .fr-form-card { background: #141414; border: 1px solid #2a2a2a; border-radius: 16px; padding: 2rem; position: sticky; top: 80px; }
        .fr-form-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 0.3rem; }
        .fr-form-sub { color: #5a5a5a; font-size: 0.82rem; margin-bottom: 1.5rem; }
        .fr-form-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .fr-field { display: flex; flex-direction: column; gap: 0.3rem; }
        .fr-field label { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #5a5a5a; }
        .fr-field input, .fr-field select, .fr-field textarea { padding: 0.65rem 1rem; background: #0e0e0e; border: 1.5px solid #2a2a2a; border-radius: 8px; color: #f0f0f0; font-size: 0.85rem; outline: none; transition: border 0.15s; font-family: 'Outfit', sans-serif; resize: none; }
        .fr-field input:focus, .fr-field select:focus, .fr-field textarea:focus { border-color: #c9a96e; }
        .fr-field select option { background: #0e0e0e; }
        .fr-btn-gold { padding: 0.7rem 2rem; border-radius: 10px; background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808; font-size: 0.88rem; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif; }
        .fr-btn-gold:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,169,110,0.3); }

        @media (max-width: 900px) { .fr-grid { grid-template-columns: 1fr; } .fr-model-grid { grid-template-columns: 1fr; } .fr-form-card { position: static; } }
      `}</style>
    </main>
  );
}
