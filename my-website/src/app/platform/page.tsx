"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import "./platform.css";
import { QuotationEngine } from "./QuotationEngine";
import { AIIntegration } from "./AIIntegration";
import { LayoutEngine } from "./LayoutEngine";
import { ProductListing } from "./ProductListing";
import { LumificConfigurator } from "./LumificConfigurator";

// Uses a ref to avoid re-firing the timer when parent re-renders
function Notif({ msg, onClose }: { msg: string; onClose: () => void }) {
  const onCloseRef = useRef(onClose);
  // Sync the ref inside an effect so we don't write to .current during render
  useEffect(() => { onCloseRef.current = onClose; });
  useEffect(() => {
    const t = setTimeout(() => onCloseRef.current(), 3500);
    return () => clearTimeout(t);
  }, []); // stable — runs once on mount
  return <div className="notif">✦ {msg}</div>;
}

export default function PlatformPage() {
  const [section, setSection] = useState("quotation");
  const [notif, setNotif] = useState<string | null>(null);

  // Single source of truth for dismissal — only the Notif component auto-clears
  const notify = useCallback((msg: string) => {
    setNotif(msg);
  }, []);

  const sections = [
    { key: "quotation", label: "Quotation" },
    { key: "ai", label: "AI Layer" },
    { key: "layout", label: "Layout Engine" },
    { key: "products", label: "Products" },
    { key: "configurator", label: "Configurator" },
  ];

  return (
    <div className="shell">
      <nav className="topnav">
        <div className="logo">lumific<em>.</em></div>
        <div className="navtabs">
          {sections.map((s) => (
            <button key={s.key} className={`ntab ${section === s.key ? "on" : ""}`} onClick={() => setSection(s.key)}>
              {s.label}
            </button>
          ))}
        </div>
        <button className="nav-cta" onClick={() => notify("Book a demo confirmed")}>Book Demo</button>
      </nav>

      <main>
        {section === "quotation" && <QuotationEngine notify={notify} />}
        {section === "ai" && <AIIntegration notify={notify} />}
        {section === "layout" && <LayoutEngine notify={notify} />}
        {section === "products" && <ProductListing notify={notify} />}
        {section === "configurator" && <LumificConfigurator notify={notify} />}
      </main>

      {notif && <Notif msg={notif} onClose={() => setNotif(null)} />}
    </div>
  );
}
