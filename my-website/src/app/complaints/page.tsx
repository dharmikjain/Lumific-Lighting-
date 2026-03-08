"use client";
import { useState } from "react";
import Link from "next/link";

export default function ComplaintsPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", orderId: "", product: "", category: "", desc: "", priority: "" });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId] = useState(`CR-${Math.floor(10000 + Math.random() * 90000)}`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="lumi-page">
      <div className="lumi-page-hero">
        <span className="lumi-eyebrow">Service & Support</span>
        <h1 className="lumi-page-h1">Customer <em>Complaints</em></h1>
        <p className="lumi-page-sub">We take every complaint seriously. Our team resolves most issues within 3 business days.</p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div className="cp-grid">
          <div>
            {submitted ? (
              <div className="cp-success">
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Complaint Registered</h3>
                <p style={{ color: "#c9a96e", fontWeight: 600, fontSize: "1.1rem", marginBottom: "0.5rem" }}>Ticket ID: {ticketId}</p>
                <p style={{ color: "#8a8a8a", fontSize: "0.88rem", marginBottom: "2rem", maxWidth: 400, margin: "0 auto 2rem" }}>You&apos;ll receive a confirmation email shortly. Our support team will respond within 24 hours.</p>
                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                  <button className="cp-btn-gold" onClick={() => setSubmitted(false)}>Submit Another</button>
                  <Link href="/contact" className="cp-btn-outline">Contact Support</Link>
                </div>
              </div>
            ) : (
              <div className="cp-form-card">
                <h3 className="cp-form-title">Register a Complaint</h3>
                <p style={{ color: "#5a5a5a", fontSize: "0.82rem", marginBottom: "1.5rem" }}>Provide details and we&apos;ll assign a support agent to your case.</p>
                <div className="cp-fields">
                  <div className="cp-field"><label>Your Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="Full name" /></div>
                  <div className="cp-field"><label>Email *</label><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" /></div>
                  <div className="cp-field"><label>Phone *</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" /></div>
                  <div className="cp-field"><label>Order / Invoice ID</label><input name="orderId" value={form.orderId} onChange={handleChange} placeholder="e.g. ORD-12345" /></div>
                  <div className="cp-field"><label>Product Name</label><input name="product" value={form.product} onChange={handleChange} placeholder="e.g. Axis Track 48V" /></div>
                  <div className="cp-field">
                    <label>Category *</label>
                    <select name="category" value={form.category} onChange={handleChange}>
                      <option value="">Select category</option>
                      <option>Product Defect</option>
                      <option>Delivery Issue</option>
                      <option>Wrong Product Received</option>
                      <option>Installation Problem</option>
                      <option>Warranty Claim</option>
                      <option>Billing Issue</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="cp-field">
                    <label>Priority</label>
                    <select name="priority" value={form.priority} onChange={handleChange}>
                      <option value="">Select priority</option>
                      <option>Low — General feedback</option>
                      <option>Medium — Needs attention</option>
                      <option>High — Urgent issue</option>
                      <option>Critical — Safety concern</option>
                    </select>
                  </div>
                  <div className="cp-field" style={{ gridColumn: "1 / -1" }}>
                    <label>Description *</label>
                    <textarea name="desc" value={form.desc} onChange={handleChange} placeholder="Describe your issue in detail. Include model numbers, installation dates, and photos if relevant." rows={5} />
                  </div>
                </div>
                <button className="cp-btn-gold" style={{ width: "100%", marginTop: "1rem" }} onClick={() => setSubmitted(true)}>Submit Complaint →</button>
              </div>
            )}
          </div>

          <div>
            <div className="cp-sla-card">
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", marginBottom: "1rem" }}>Our SLA Commitment</h4>
              {[
                { label: "Acknowledgment", time: "< 4 hours", icon: "📧" },
                { label: "Support Agent Assigned", time: "< 12 hours", icon: "👤" },
                { label: "First Response", time: "< 24 hours", icon: "💬" },
                { label: "Resolution Target", time: "< 3 business days", icon: "✅" },
              ].map((s) => (
                <div key={s.label} className="cp-sla-row">
                  <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.82rem" }}>{s.label}</div>
                    <div style={{ fontSize: "0.75rem", color: "#c9a96e" }}>{s.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cp-alt-card">
              <h4 style={{ fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.75rem" }}>Other Ways to Get Help</h4>
              <Link href="/chat-ai" className="cp-alt-link">💬 Chat with AI — instant answers</Link>
              <Link href="/contact" className="cp-alt-link">📧 Email Support Team</Link>
              <a href="tel:+911610000000" className="cp-alt-link">📞 Call: +91 161 XXX XXXX</a>
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

        .cp-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 2.5rem; align-items: start; }
        .cp-form-card { background: #141414; border: 1px solid #2a2a2a; border-radius: 16px; padding: 2rem; }
        .cp-form-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 0.3rem; }
        .cp-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .cp-field { display: flex; flex-direction: column; gap: 0.3rem; }
        .cp-field label { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #5a5a5a; }
        .cp-field input, .cp-field select, .cp-field textarea { padding: 0.65rem 1rem; background: #0e0e0e; border: 1.5px solid #2a2a2a; border-radius: 8px; color: #f0f0f0; font-size: 0.85rem; outline: none; transition: border 0.15s; font-family: 'Outfit', sans-serif; resize: none; }
        .cp-field input:focus, .cp-field select:focus, .cp-field textarea:focus { border-color: #c9a96e; }
        .cp-field select option { background: #0e0e0e; }
        .cp-success { text-align: center; padding: 4rem 2rem; background: #141414; border: 1px solid #2a2a2a; border-radius: 16px; }
        .cp-btn-gold { padding: 0.7rem 2rem; border-radius: 10px; background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808; font-size: 0.88rem; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif; text-decoration: none; }
        .cp-btn-outline { padding: 0.7rem 2rem; border-radius: 10px; border: 1.5px solid #2a2a2a; color: #c4c4c4; font-size: 0.85rem; font-weight: 600; text-decoration: none; transition: all 0.15s; }
        .cp-btn-outline:hover { border-color: #c9a96e; color: #c9a96e; }

        .cp-sla-card { background: linear-gradient(135deg, rgba(201,169,110,0.08), rgba(201,169,110,0.02)); border: 1px solid rgba(201,169,110,0.15); border-radius: 16px; padding: 1.75rem; margin-bottom: 1.5rem; }
        .cp-sla-row { display: flex; gap: 1rem; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .cp-alt-card { background: #141414; border: 1px solid #2a2a2a; border-radius: 16px; padding: 1.5rem; }
        .cp-alt-link { display: block; padding: 0.6rem 0; font-size: 0.82rem; color: #8a8a8a; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.04); transition: color 0.15s; }
        .cp-alt-link:hover { color: #c9a96e; }

        @media (max-width: 900px) { .cp-grid { grid-template-columns: 1fr; } .cp-fields { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
