"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ── COMPREHENSIVE LIGHTING KNOWLEDGE BASE ──────────────────────────
const KNOWLEDGE_BASE: Record<string, string> = {
  // Product-specific
  "track": "For track lighting, I recommend the **Axis Track 48V** — our flagship magnetic track system. Key specs:\n\n• **Power:** 48V DC (low voltage, safe for exposed installations)\n• **Wattage:** 15–60W per head (adjustable)\n• **CCT:** 2700K, 3000K, 4000K\n• **Beam angles:** 15°, 24°, 36°, 60°\n• **CRI:** ≥95 for true colour rendering\n• **Mounting:** Recessed, surface, or suspended\n\nThe magnetic rail allows toolless snap-in/snap-out of spotlight heads, making retail reconfigurations effortless. Pricing starts at ₹4,200 (retail) / ₹2,940 (architect tier).",
  
  "pendant": "Our **Corona Pendant** is a statement architectural pendant with premium specifications:\n\n• **Wattage:** 24W\n• **CCT:** 2700K (warm) or 3000K (neutral warm)\n• **Beam:** 60° or 120°\n• **Body:** Die-cast aluminium, powder coated\n• **Finishes:** Matt Black, Bronze, or Custom RAL/NCS\n• **CRI:** ≥95\n\nIdeal for hotel lobbies, fine dining restaurants, atriums, and reception areas. The Corona delivers **1,200 lux** at task level with its precision optic. Pricing: ₹8,900 (retail) / ₹6,230 (architect tier).",
  
  "linear": "The **Stratum Linear** system offers seamless recessed illumination:\n\n• **Power:** 20W per metre\n• **CCT:** 3000K, 4000K, or Tunable White (2700K–6500K)\n• **Beam:** 90° or 120° diffused\n• **IP Rating:** IP44 (suitable for bathrooms with proper distance)\n• **Max run:** 30m continuous with no visible joints\n• **UGR:** <19 for visual comfort\n\nPerfect for offices (EN 12464 compliant at 500 lux), corridors, and retail ceilings. The Tunable White variant supports **circadian rhythm lighting** for wellness applications. Pricing: ₹3,100/m (retail).",
  
  "downlight": "The **Vela Recessed** is our premium anti-glare downlight:\n\n• **Wattage:** 12W\n• **CCT:** 2700K, 3000K, 4000K\n• **Beam angles:** 20° (spot), 36° (medium), 50° (wide flood)\n• **IP Rating:** IP65 (fully waterproof — perfect for wet areas)\n• **UGR:** <19\n• **CRI:** ≥95\n• **Cut-out:** 68mm\n\nThe deep anti-glare cone ensures zero glare at normal viewing angles. BIS certified and DALI-2 dimmable. 5-year warranty. Pricing: ₹1,800 (retail) / ₹1,260 (architect).",

  // Segment knowledge
  "retail": "For **retail applications**, lighting is critical for merchandise presentation and customer experience. Key guidelines:\n\n**Illuminance Levels:**\n• General retail: 500 lux\n• Fashion/luxury: 750–1000 lux\n• Jewellery: 1000–1500 lux\n• Window displays: 1500–2000 lux\n\n**CRI Requirement:** ≥95 — essential for accurate colour rendering of fabrics, cosmetics, and food\n\n**Recommended Products:**\n• **Axis Track 48V** with 15° spots for accent\n• **Aura Magnetic Spot** for flexible display lighting\n• **Helix Wallwash** for vertical illumination\n\n**Control:** Scheduled scene changes (morning mode, afternoon mode, evening ambiance). Consider DALI-2 for individual fixture dimming.",

  "hotel": "**Hospitality lighting** requires layered design for mood and function:\n\n**Lobby & Reception (300–500 lux):**\n• Statement pendants (Corona) for ceiling drama\n• Wall washers (Helix) for spatial perception\n• Recessed downlights (Vela) for ambient fill\n\n**Guest Rooms (50–300 lux):**\n• Bedside reading: 300 lux at reading plane\n• Ambient: 100–150 lux with warm 2700K\n• Bathroom: 200 lux, IP65 rated, CRI ≥90\n\n**Restaurant/Bar (50–200 lux):**\n• Decorative pendants over tables\n• Warm 2200K–2700K for intimate atmosphere\n• Tuneable White for lunch-to-dinner transition\n\n**Key Standards:** WELL Building Standard for wellness, IDA Dark Sky for outdoor areas.",

  "hospital": "**Healthcare lighting** has strict regulatory and wellness requirements:\n\n**Standards:** EN 12464-1, IS 3646, NABH guidelines\n\n**Illuminance by Area:**\n• Patient wards: 100–300 lux (ambient), 300 lux (reading)\n• Examination rooms: 500–1000 lux\n• Operating theatres: 1000 lux (general), 10,000–100,000 lux (surgical field)\n• Corridors: 100 lux (day), 50 lux (night)\n• Nurses' stations: 500 lux\n\n**Key Requirements:**\n• **Flicker-free** drivers (≤1% flicker at 100Hz) for seizure-sensitive environments\n• **Tunable White** (2700K–6500K) for circadian support in ICU and recovery\n• **Easy-clean** IP65 fixtures with antimicrobial finishes\n• Emergency lighting with 3-hour battery backup\n\n**Recommended:** Stratum Linear (Tunable White) + Vela Recessed (IP65).",

  "office": "**Office lighting** must comply with EN 12464-1 and prioritise visual comfort:\n\n**Illuminance Standards:**\n• Workstations: ≥ 500 lux at desk level\n• Meeting rooms: 500 lux\n• Corridors: 100 lux\n• Canteen/break areas: 200 lux\n\n**Glare Control:** UGR < 19 (mandatory for VDU work)\n\n**Energy Efficiency:**\n• Target: ≤ 8 W/m² (LENI) for Green Building compliance\n• Daylight harvesting saves 20–40% energy\n• Occupancy sensing reduces waste by 30%\n\n**Recommended Products:**\n• **Stratum Linear** 4000K for open plan (UGR<19)\n• **Vela Recessed** for perimeter and circulation\n• **DALI-2** control with daylight sensors\n\n**Smart Integration:** KNX for BMS connectivity, Casambi for smaller offices.",

  "outdoor": "**Outdoor & Landscape lighting** requires weather-resistant specifications:\n\n**IP Ratings:**\n• IP44: Covered outdoor (canopy)\n• IP65: Direct rain exposure\n• IP66: High-pressure wash areas\n• IP67: Submersible (up to 1m)\n\n**Key Products:**\n• **Terra Bollard** — IP66, IK10 impact, marine-grade aluminium\n• **Helix Wallwash** — Facade uplighting, asymmetric optic\n\n**Design Principles:**\n• Facade lighting: 2700K for warm stone/brick, 4000K for modern glass\n• Pathway: 50–100 lux at ground level, 4–6m spacing for bollards\n• Garden accent: 15° narrow beam for tree uplighting\n• Dark Sky compliance: No upward light spill, warm CCT (≤3000K)\n\n**Standards:** IS 1944, IDA Dark Sky, BS 5489 for roads.",

  "residential": "**Premium residential lighting** creates atmosphere and functionality:\n\n**Room-by-Room Guide:**\n• **Living room:** Layered — ambient (150 lux), accent (track/spots), decorative (pendants). Dimming essential. 2700K–3000K.\n• **Kitchen:** Task lighting 500 lux on countertops. Under-cabinet linear strips. Pendant over island.\n• **Bedroom:** Warm 2700K. Bedside reading 300 lux. Circadian support with Tunable White.\n• **Bathroom:** IP65 rated (zone 1 & 2). CRI ≥ 90 for grooming accuracy. Mirror lighting critical.\n• **Exterior:** Porch, pathway bollards, garden accent. IP65 minimum.\n\n**Smart Home:** Casambi wireless control — no additional wiring. Scene programming via smartphone. Compatible with Apple HomeKit, Google Home.\n\n**Finishes:** Custom RAL/NCS matching available on all luminaires. 200+ standard finishes in our Colour World.",

  // Technical topics
  "cri": "**Colour Rendering Index (CRI)** measures how accurately a light source reveals the true colours of objects compared to natural sunlight (CRI 100).\n\n**CRI Ratings:**\n• CRI ≥ 95: Premium architectural lighting (Lumific standard)\n• CRI ≥ 90: High quality, suitable for most applications\n• CRI 80–89: Standard, acceptable for corridors and utility\n• CRI < 80: Not recommended for occupied spaces\n\n**Why CRI Matters:**\n• **Retail:** CRI ≥ 95 for accurate fabric and food colours\n• **Healthcare:** CRI ≥ 90 for clinical accuracy\n• **Hospitality:** CRI ≥ 90 for skin tone flattery\n• **Art galleries:** CRI ≥ 95 + R9 ≥ 50 for red rendering\n\n**All Lumific architectural luminaires deliver CRI ≥ 95** with R9 > 50, ensuring exceptional colour fidelity across all applications.",

  "cct": "**Correlated Colour Temperature (CCT)** — measured in Kelvin (K) — defines the warmth or coolness of white light:\n\n• **2200K** — Ultra warm (candle-like). Intimate restaurants, lounges.\n• **2700K** — Warm white. Residential, hospitality, relaxation.\n• **3000K** — Neutral warm. Versatile — retail, offices, healthcare.\n• **3500K** — Cool warm. Transitional spaces.\n• **4000K** — Neutral white. Offices, classrooms, commercial.\n• **5000K** — Daylight. Industrial, task-critical.\n• **6500K** — Cool daylight. Rarely used in architecture.\n\n**Tunable White:** Available on Stratum Linear — adjusts from 2700K to 6500K for circadian rhythm support. Promotes melatonin production (warm) in evening and alertness (cool) during day.\n\n**Our Range:** Most Lumific products available in 2700K, 3000K, and 4000K. Tunable White on Linear range.",

  "dali": "**DALI-2 (Digital Addressable Lighting Interface)** is the gold standard for intelligent lighting control:\n\n**Key Features:**\n• Individual addressability — control each luminaire independently\n• 64 devices per DALI line (extendable with gateways)\n• 16 groups, 16 scenes per line\n• Bi-directional communication — feedback on lamp status, energy use, faults\n• Emergency lighting integration (DALI-2 Part 252)\n\n**Lumific DALI Integration:**\n• All architectural luminaires available with DALI-2 drivers\n• Compatible with Helvar, Tridonic, Osram, and Eaglerise drivers\n• Tested with Philips Dynalite, ABB i-bus, Schneider KNX\n\n**When to use DALI:**\n• Commercial offices (energy compliance)\n• Healthcare (circadian + emergency)\n• Retail (scene management)\n• Hotels (guest room control systems)\n\n**Cost:** DALI driver adds ~₹800–1,200 per luminaire versus on/off.",

  "lux": "**Lux (lx)** is the unit of illuminance — the amount of light arriving on a surface.\n\n**Recommended Levels (EN 12464-1 / IS 3646):**\n• Corridors: 100 lux\n• Lobbies: 200 lux\n• Conference rooms: 500 lux\n• Office desks: 500 lux\n• Retail general: 500 lux\n• Retail jewellery: 1000–1500 lux\n• Hospital examination: 500–1000 lux\n• Operating theatre: 1000 lux (general)\n\n**Quick Calculation:**\nLux = Lumens ÷ Area (m²)\nRequired fixtures = (Target lux × Area) ÷ (Lumens per fixture × Maintenance factor × Utilisation factor)\n\n**Maintenance Factors:**\n• Clean environment: 0.8\n• Normal: 0.7\n• Dusty/industrial: 0.6\n\n**Our Layout Engine** can auto-calculate lux levels from uploaded floor plans →",

  "ip": "**IP (Ingress Protection) Rating** defines protection against solids and water:\n\n**Common IP Ratings in Lighting:**\n• **IP20** — Indoor only. No water protection. Standard for offices, living rooms.\n• **IP40** — Dust-protected. Indoor use, light covers.\n• **IP44** — Splash-proof. Covered outdoor, bathroom Zone 2.\n• **IP54** — Dust-protected + splash-proof.\n• **IP65** — Dust-tight + water jet protection. Bathroom Zone 1, covered outdoor.\n• **IP66** — Dust-tight + powerful water jets. Exposed outdoor, car parks.\n• **IP67** — Temporary submersion (up to 1m). Ground-recessed outdoor.\n• **IP68** — Continuous submersion. Underwater pool lights.\n\n**Lumific IP Range:**\n• Axis Track, Corona Pendant, Nova Surface: IP20\n• Stratum Linear: IP44\n• Vela Recessed: IP65\n• Terra Bollard: IP66\n\n**IK Impact Rating:** Terra Bollard is IK10 (20 joules — highest impact resistance).",

  "ugr": "**UGR (Unified Glare Rating)** measures the degree of discomfort glare from luminaires:\n\n**UGR Scale:**\n• UGR < 16: Extremely low glare (museums, art galleries)\n• **UGR < 19**: Required for VDU/screen work (offices, schools)\n• UGR < 22: Acceptable for industrial/general\n• UGR < 25: Basic corridors and circulation\n\n**EN 12464-1 Requirements:**\n• Offices: UGR ≤ 19\n• Schools: UGR ≤ 19\n• Hospital wards: UGR ≤ 19\n• Industrial: UGR ≤ 25\n\n**How Lumific Achieves Low UGR:**\n• Deep recessed anti-glare optics (Vela Recessed: UGR < 19)\n• Micro-prismatic diffusers (Stratum Linear: UGR < 19)\n• Proper luminaire spacing and mounting height\n\n**Tip:** UGR depends on room dimensions, reflectances, and luminaire placement — not just the fixture. Use our Layout Engine for accurate UGR calculations.",

  "beam": "**Beam Angle** defines the cone of light emitted by a luminaire:\n\n**Classification:**\n• **8°–15°** — Very narrow spot. Accent on artworks, jewellery, architectural details.\n• **24°** — Medium narrow. Product highlighting in retail, table accent in restaurants.\n• **36°** — Medium flood. General accent, museum displays.\n• **50°–60°** — Wide flood. General ambient illumination, office supplementary.\n• **90°–120°** — Very wide / wall wash. Uniform ceiling/wall coverage, corridors.\n\n**Application Guide:**\n• Art gallery: 15° on paintings, 36° on sculptures\n• Retail: 24° on mannequins, 60° general\n• Office: 90° or 120° for uniform distribution\n• Hotel lobby: Mix of 15° accent + 60° ambient\n\n**Lumific Range:** Most products available in multiple beam angles. The Axis Track supports interchangeable optics — snap-in lens change from 15° to 60°.",

  // General help
  "help": "I'm **Lumi**, your AI lighting intelligence advisor. I can help with:\n\n✦ **Product Recommendations** — Tell me your application and I'll suggest the best fixtures\n✦ **Lux Calculations** — Target illuminance for any room type\n✦ **CCT & CRI Guidance** — Colour temperature and rendering recommendations\n✦ **Control Systems** — DALI-2, KNX, Casambi, DMX512 advice\n✦ **IP & UGR Ratings** — Weather protection and glare control\n✦ **Beam Angle Selection** — Matching optics to your application\n✦ **Standard Compliance** — EN 12464, IS 3646, WELL, NABH\n✦ **Energy Calculations** — W/m², LENI, payback analysis\n✦ **Specification Writing** — NBS/CSI spec clauses\n\nJust ask me anything about architectural lighting!",

  "price": "**Lumific Pricing Structure** — 4-tier role-based pricing:\n\n| Product | Retail | Dealer (20% off) | Project (28% off) | Architect (30% off) |\n|---|---|---|---|---|\n| Axis Track 48V | ₹4,200 | ₹3,360 | ₹3,024 | ₹2,940 |\n| Corona Pendant | ₹8,900 | ₹7,120 | ₹6,408 | ₹6,230 |\n| Stratum Linear | ₹3,100/m | ₹2,480/m | ₹2,232/m | ₹2,170/m |\n| Vela Recessed | ₹1,800 | ₹1,440 | ₹1,296 | ₹1,260 |\n\n**Driver surcharges:**\n• DALI-2: +₹800–1,200\n• 0-10V: +₹400\n• Casambi: +₹1,500\n\nUse our **Smart Quotation Maker** for instant pricing →",

  "default": "Thank you for your question! As a premium architectural lighting specialist, I can provide expert guidance on:\n\n• **Product selection** — matching fixtures to your specific application\n• **Lighting design** — lux calculations, CCT recommendations, layer planning\n• **Control systems** — DALI-2, KNX, Casambi integration advice\n• **Standards compliance** — EN 12464, IS 3646, WELL Building certification\n• **Specification support** — technical specs, IES files, BIM objects\n\nCould you tell me more about your project? For example:\n• What type of space? (office, hotel, retail, residential, healthcare)\n• Room dimensions and ceiling height?\n• Any specific requirements? (IP rating, dimming, colour control)\n\nThe more detail you provide, the more precise my recommendation will be!",

  "warranty": "**Lumific Warranty Programme:**\n\n✦ **Standard Warranty:** 5 years on all architectural luminaires\n✦ **Driver Warranty:** 3–5 years depending on manufacturer\n✦ **LED Module:** L80B10 @ 50,000 hours (80% lumen output at 50K hours with 90% reliability)\n\n**Coverage includes:**\n• Manufacturing defects\n• LED failure below L80 threshold\n• Driver malfunction\n• Powder coat/finish defects\n\n**Not covered:**\n• Incorrect installation\n• Voltage surge damage (use SPDs)\n• Physical damage\n\n**Warranty claim process:** AI-automated registration → 24hr certificate → Claim routing to nearest service partner → Average resolution in 3.2 days.\n\nRegister at our platform or file through the **Complaints page** →",

  "energy": "**Energy Efficiency in Architectural Lighting:**\n\n**Target LENI Values (kWh/m²/year):**\n• Office: 25–35 kWh/m²/year\n• Retail: 35–55 kWh/m²/year\n• Hospital: 30–50 kWh/m²/year\n\n**Lumific Efficiency:**\n• Axis Track: 120 lm/W\n• Stratum Linear: 130 lm/W\n• Vela Recessed: 100 lm/W\n\n**Energy Saving Strategies:**\n1. **Daylight harvesting** — 20–40% reduction\n2. **Occupancy sensing** — 20–30% reduction\n3. **Task-ambient design** — 15–25% reduction\n4. **High efficacy LEDs** — 50–60% vs conventional\n5. **Scheduled dimming** — 10–20% reduction\n\n**Combined savings:** Up to 70% compared to traditional installations.\n\n**Green Building compliance:** IGBC, LEED, GRIHA — all require LENI calculations. Our Layout Engine provides automatic energy analysis.",
};

// Fuzzy keyword matching
function getAIResponse(msg: string): string {
  const m = msg.toLowerCase();
  const keywords: [string[], string][] = [
    [["track", "magnetic", "axis", "48v", "rail"], "track"],
    [["pendant", "corona", "chandelier", "hanging"], "pendant"],
    [["linear", "stratum", "strip", "profile", "recessed linear"], "linear"],
    [["downlight", "vela", "recessed", "ceiling light"], "downlight"],
    [["retail", "shop", "store", "boutique", "showroom", "merchandise", "fashion"], "retail"],
    [["hotel", "hospitality", "restaurant", "resort", "lobby", "guest room"], "hotel"],
    [["hospital", "healthcare", "medical", "clinic", "patient", "icu", "ward"], "hospital"],
    [["office", "workspace", "commercial", "desk", "corporate", "meeting"], "office"],
    [["outdoor", "garden", "landscape", "facade", "pathway", "bollard", "terra"], "outdoor"],
    [["residential", "home", "villa", "apartment", "bedroom", "living room", "house"], "residential"],
    [["cri", "colour rendering", "color rendering", "ra"], "cri"],
    [["cct", "colour temperature", "color temperature", "kelvin", "warm", "cool"], "cct"],
    [["dali", "dimming", "control", "protocol", "smart"], "dali"],
    [["lux", "illuminance", "brightness", "foot-candle", "light level"], "lux"],
    [["ip", "ip20", "ip44", "ip65", "ip66", "ip67", "waterproof", "weather"], "ip"],
    [["ugr", "glare", "anti-glare", "visual comfort"], "ugr"],
    [["beam", "angle", "spot", "flood", "narrow", "wide", "optic"], "beam"],
    [["help", "what can you", "how can you", "capability", "assist"], "help"],
    [["price", "pricing", "cost", "how much", "rate", "discount", "quote"], "price"],
    [["warranty", "guarantee", "claim", "defect", "service"], "warranty"],
    [["energy", "efficiency", "watt", "power", "saving", "leni", "green building"], "energy"],
  ];

  for (const [keys, topic] of keywords) {
    if (keys.some((k) => m.includes(k))) return KNOWLEDGE_BASE[topic];
  }
  return KNOWLEDGE_BASE["default"];
}

export default function ChatAIPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm **Lumi**, your premium architectural lighting advisor. I specialise in photometric analysis, product matching, specification assistance, and lighting design guidance.\n\nI have deep knowledge of:\n• **Products** — Track, Pendant, Linear, Downlight, Outdoor\n• **Segments** — Retail, Hospitality, Healthcare, Office, Residential, Outdoor\n• **Technical** — CRI, CCT, DALI-2, Lux calculations, IP/UGR ratings\n• **Standards** — EN 12464, IS 3646, WELL Building, NABH\n\nHow can I help your lighting project today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const msgEndRef = useRef<HTMLDivElement>(null);

  const scrollBottom = () => msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollBottom, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "ai", text: getAIResponse(userMsg) }]);
    }, 1200 + Math.random() * 800);
  };

  const renderText = (t: string) =>
    t
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#c9a96e">$1</strong>')
      .replace(/\n/g, "<br/>")
      .replace(/• /g, "• ");

  const quickQuestions = [
    "Best fixture for a retail showroom?",
    "Lux recommendation for an office?",
    "What is DALI-2 dimming?",
    "Hotel lobby lighting design",
    "CRI and colour rendering explained",
    "IP ratings for outdoor lighting",
    "Tunable White for healthcare",
    "Beam angle selection guide",
    "Energy efficiency calculations",
    "UGR and glare control",
    "Product pricing and tiers",
    "Residential lighting design",
  ];

  return (
    <main className="lumi-page">
      <div className="lumi-page-hero" style={{ paddingBottom: "2rem" }}>
        <span className="lumi-eyebrow">AI Advisor</span>
        <h1 className="lumi-page-h1">Chat with <em>Lumi AI</em></h1>
        <p className="lumi-page-sub">Your 24/7 expert on premium architectural lighting. Ask about products, specifications, lux calculations, or design guidance.</p>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div className="ai-grid">
          {/* Chat Window */}
          <div className="ai-chat-container">
            <div className="ai-chat-header">
              <div className="ai-avatar">✦</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>Lumi — Lighting Intelligence</div>
                <div style={{ fontSize: "0.72rem", color: "#22c55e" }}>● Online · Avg response 1.2s</div>
              </div>
            </div>
            <div className="ai-chat-msgs">
              {messages.map((m, i) => (
                <div key={i} className={`ai-msg ai-msg-${m.role}`}>
                  {m.role === "ai" && <div className="ai-msg-name">LUMI AI</div>}
                  <span dangerouslySetInnerHTML={{ __html: renderText(m.text) }} />
                </div>
              ))}
              {typing && (
                <div className="ai-msg ai-msg-ai">
                  <div className="ai-msg-name">LUMI AI</div>
                  <div className="ai-typing">
                    <span className="ai-dot" /><span className="ai-dot" /><span className="ai-dot" />
                  </div>
                </div>
              )}
              <div ref={msgEndRef} />
            </div>
            <div className="ai-chat-input">
              <input
                className="ai-input"
                placeholder="Ask about products, lux levels, specifications, CCT, CRI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="ai-send-btn" onClick={sendMessage}>Send →</button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="ai-sidebar">
            <div className="ai-sidebar-card ai-sidebar-gold">
              <span className="ai-sidebar-eyebrow">Quick Questions</span>
              <div className="ai-quick-grid">
                {quickQuestions.map((q) => (
                  <button key={q} className="ai-quick-btn" onClick={() => { setInput(q); }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="ai-sidebar-card">
              <span className="ai-sidebar-eyebrow">Lumi Capabilities</span>
              {[
                "Product matching by application",
                "Lux & photometric calculations",
                "CCT & CRI recommendations",
                "DALI/DMX/KNX control advice",
                "Energy compliance checks",
                "Specification writing support",
                "IP & UGR rating guidance",
                "Beam angle selection",
                "Standards compliance (EN 12464)",
                "Smart automation planning",
              ].map((c) => (
                <div key={c} className="ai-capability">
                  <span style={{ color: "#c9a96e" }}>✦</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>

            <div className="ai-sidebar-card">
              <span className="ai-sidebar-eyebrow">Need More Help?</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                <Link href="/smart-quotation" className="ai-link-btn">📊 Smart Quotation Maker</Link>
                <Link href="/products" className="ai-link-btn">💡 Browse Products</Link>
                <Link href="/contact" className="ai-link-btn">📧 Contact Support</Link>
                <Link href="/catalogue" className="ai-link-btn">📖 Download Catalogue</Link>
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

        .ai-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 2rem; align-items: start; }

        .ai-chat-container { background: #0e0e0e; border: 1px solid #2a2a2a; border-radius: 16px; display: flex; flex-direction: column; height: 680px; }
        .ai-chat-header { padding: 1rem 1.25rem; border-bottom: 1px solid #2a2a2a; display: flex; align-items: center; gap: 0.75rem; }
        .ai-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #c9a96e, #e8c98a); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: #080808; flex-shrink: 0; }
        .ai-chat-msgs { flex: 1; overflow-y: auto; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .ai-chat-msgs::-webkit-scrollbar { width: 4px; }
        .ai-chat-msgs::-webkit-scrollbar-track { background: #0e0e0e; }
        .ai-chat-msgs::-webkit-scrollbar-thumb { background: #c9a96e; border-radius: 2px; }
        .ai-msg { max-width: 85%; padding: 0.85rem 1.1rem; border-radius: 12px; font-size: 0.85rem; line-height: 1.7; }
        .ai-msg-ai { background: #1c1c1c; border: 1px solid #2a2a2a; color: #c4c4c4; align-self: flex-start; border-bottom-left-radius: 4px; }
        .ai-msg-user { background: rgba(201,169,110,0.15); border: 1px solid rgba(201,169,110,0.25); color: #f0f0f0; align-self: flex-end; border-bottom-right-radius: 4px; }
        .ai-msg-name { font-size: 0.65rem; font-weight: 600; color: #c9a96e; margin-bottom: 0.3rem; letter-spacing: 0.06em; }

        .ai-typing { display: flex; gap: 4px; align-items: center; padding: 0.5rem 0; }
        .ai-dot { width: 6px; height: 6px; border-radius: 50%; background: #c9a96e; animation: ai-pulse 1.2s infinite; }
        .ai-dot:nth-child(2) { animation-delay: 0.2s; }
        .ai-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes ai-pulse { 0%, 80%, 100% { opacity: 0.2; } 40% { opacity: 1; } }

        .ai-chat-input { padding: 1rem; border-top: 1px solid #2a2a2a; display: flex; gap: 0.75rem; }
        .ai-input { flex: 1; padding: 0.7rem 1rem; background: #141414; border: 1.5px solid #2a2a2a; border-radius: 10px; color: #f0f0f0; font-size: 0.88rem; outline: none; font-family: 'Outfit', sans-serif; transition: border 0.15s; }
        .ai-input:focus { border-color: #c9a96e; }
        .ai-send-btn { padding: 0.7rem 1.5rem; border-radius: 10px; background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808; font-size: 0.82rem; font-weight: 700; border: none; cursor: pointer; transition: all 0.18s; font-family: 'Outfit', sans-serif; white-space: nowrap; }
        .ai-send-btn:hover { transform: translateY(-1px); }

        .ai-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }
        .ai-sidebar-card { background: #141414; border: 1px solid #2a2a2a; border-radius: 16px; padding: 1.5rem; }
        .ai-sidebar-gold { background: linear-gradient(135deg, rgba(201,169,110,0.08), rgba(201,169,110,0.02)); border-color: rgba(201,169,110,0.2); }
        .ai-sidebar-eyebrow { display: block; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.75rem; }
        .ai-quick-grid { display: flex; flex-direction: column; gap: 0.4rem; }
        .ai-quick-btn { padding: 0.55rem 0.85rem; background: #0e0e0e; border: 1px solid #2a2a2a; border-radius: 8px; text-align: left; font-size: 0.78rem; color: #c4c4c4; cursor: pointer; transition: all 0.15s; font-family: 'Outfit', sans-serif; }
        .ai-quick-btn:hover { border-color: rgba(201,169,110,0.3); color: #c9a96e; }
        .ai-capability { display: flex; gap: 0.5rem; align-items: center; font-size: 0.78rem; color: #8a8a8a; padding: 0.3rem 0; }
        .ai-link-btn { padding: 0.6rem 1rem; background: #0e0e0e; border: 1px solid #2a2a2a; border-radius: 8px; font-size: 0.78rem; color: #c4c4c4; text-decoration: none; transition: all 0.15s; display: block; }
        .ai-link-btn:hover { border-color: rgba(201,169,110,0.3); color: #c9a96e; }

        @media (max-width: 900px) {
          .ai-grid { grid-template-columns: 1fr; }
          .ai-chat-container { height: 500px; }
        }
      `}</style>
    </main>
  );
}
