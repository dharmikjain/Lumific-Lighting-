"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", segment: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="lumi-page">
      <div className="lumi-page-hero">
        <span className="lumi-eyebrow">Get In Touch</span>
        <h1 className="lumi-page-h1"><em>Contact</em> Us</h1>
        <p className="lumi-page-sub">Have a project in mind? Need technical support? We&apos;d love to hear from you.</p>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div className="ct-grid">
          <div>
            {submitted ? (
              <div className="ct-success">
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✦</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", marginBottom: "0.75rem" }}>Message Sent!</h3>
                <p style={{ color: "#8a8a8a", marginBottom: "2rem" }}>We&apos;ll get back to you within 24 hours.</p>
                <button className="ct-btn-gold" onClick={() => setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <div className="ct-form-card">
                <h3 className="ct-form-title">Send us a message</h3>
                <div className="ct-fields">
                  <div className="ct-field"><label>Full Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="Your name" /></div>
                  <div className="ct-field"><label>Email *</label><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" /></div>
                  <div className="ct-field"><label>Phone</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" /></div>
                  <div className="ct-field"><label>Company</label><input name="company" value={form.company} onChange={handleChange} placeholder="Company or studio name" /></div>
                  <div className="ct-field">
                    <label>Subject</label>
                    <select name="subject" value={form.subject} onChange={handleChange}>
                      <option value="">Select subject</option>
                      <option>Product Inquiry</option>
                      <option>Project Consultation</option>
                      <option>Technical Support</option>
                      <option>Franchise Inquiry</option>
                      <option>Catalogue Request</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="ct-field">
                    <label>Segment</label>
                    <select name="segment" value={form.segment} onChange={handleChange}>
                      <option value="">Your segment</option>
                      <option>Architect / Designer</option>
                      <option>Contractor / Builder</option>
                      <option>Dealer / Distributor</option>
                      <option>End Customer</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="ct-field" style={{ gridColumn: "1 / -1" }}>
                    <label>Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project or question..." rows={5} />
                  </div>
                </div>
                <button className="ct-btn-gold" style={{ width: "100%", marginTop: "1rem" }} onClick={() => setSubmitted(true)}>Send Message →</button>
              </div>
            )}
          </div>

          <div>
            <div className="ct-info-card">
              <h3 className="ct-info-title">Contact Information</h3>
              {[
                { icon: "📍", label: "Corporate Office", value: "Lumific Lighting Pvt. Ltd.\nPlot 42, Industrial Area Phase-2\nLudhiana, Punjab 141003" },
                { icon: "📧", label: "Email", value: "info@lumific.com\nsupport@lumific.com" },
                { icon: "📞", label: "Phone", value: "+91 161 XXX XXXX\n+91 98XXX XXXXX" },
                { icon: "⏰", label: "Working Hours", value: "Mon–Sat: 9:30 AM – 6:30 PM\nSunday: Closed" },
              ].map((info) => (
                <div key={info.label} className="ct-info-row">
                  <span className="ct-info-icon">{info.icon}</span>
                  <div>
                    <span className="ct-info-label">{info.label}</span>
                    <span className="ct-info-value">{info.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="ct-quick-links">
              <h4 className="ct-quick-title">Quick Links</h4>
              <div className="ct-quick-grid">
                <Link href="/complaints" className="ct-quick-link">📋 File a Complaint</Link>
                <Link href="/franchise" className="ct-quick-link">🤝 Franchise</Link>
                <Link href="/chat-ai" className="ct-quick-link">💬 Chat with AI</Link>
                <Link href="/get-catalogue" className="ct-quick-link">📖 Get Catalogue</Link>
              </div>
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

        .ct-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 2.5rem; align-items: start; }
        .ct-form-card { background: #141414; border: 1px solid #2a2a2a; border-radius: 16px; padding: 2rem; }
        .ct-form-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 1.5rem; }
        .ct-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .ct-field { display: flex; flex-direction: column; gap: 0.3rem; }
        .ct-field label { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #5a5a5a; }
        .ct-field input, .ct-field select, .ct-field textarea { padding: 0.65rem 1rem; background: #0e0e0e; border: 1.5px solid #2a2a2a; border-radius: 8px; color: #f0f0f0; font-size: 0.85rem; outline: none; transition: border 0.15s; font-family: 'Outfit', sans-serif; resize: none; }
        .ct-field input:focus, .ct-field select:focus, .ct-field textarea:focus { border-color: #c9a96e; }
        .ct-field select option { background: #0e0e0e; }
        .ct-success { text-align: center; padding: 4rem 2rem; background: #141414; border: 1px solid #2a2a2a; border-radius: 16px; }
        .ct-btn-gold { padding: 0.7rem 2rem; border-radius: 10px; background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808; font-size: 0.88rem; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif; }
        .ct-btn-gold:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,169,110,0.3); }

        .ct-info-card { background: linear-gradient(135deg, rgba(201,169,110,0.08), rgba(201,169,110,0.02)); border: 1px solid rgba(201,169,110,0.15); border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; }
        .ct-info-title { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; margin-bottom: 1.5rem; }
        .ct-info-row { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
        .ct-info-icon { font-size: 1.3rem; flex-shrink: 0; }
        .ct-info-label { display: block; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.3rem; }
        .ct-info-value { font-size: 0.82rem; color: #c4c4c4; white-space: pre-line; line-height: 1.7; }

        .ct-quick-links { background: #141414; border: 1px solid #2a2a2a; border-radius: 16px; padding: 1.5rem; }
        .ct-quick-title { font-size: 0.82rem; font-weight: 600; margin-bottom: 1rem; }
        .ct-quick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .ct-quick-link { padding: 0.75rem 1rem; background: #0e0e0e; border: 1px solid #2a2a2a; border-radius: 10px; font-size: 0.78rem; color: #c4c4c4; text-decoration: none; transition: all 0.15s; }
        .ct-quick-link:hover { border-color: rgba(201,169,110,0.3); color: #c9a96e; }

        @media (max-width: 900px) { .ct-grid { grid-template-columns: 1fr; } .ct-fields { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
