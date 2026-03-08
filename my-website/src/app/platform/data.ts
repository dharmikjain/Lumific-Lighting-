// ── DATA ──────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  cat: string;
  price: Record<string, number>;
  watt: string;
  cct: string[];
  beam: string[];
  finish: string[];
  ip: string;
  emoji: string;
  lux: number;
  rating: number;
  qty?: number;
  customNote?: string;
  match?: number;
}

export interface Finish {
  name: string;
  hex: string;
}

export const PRODUCTS_DB: Product[] = [
  { id:1, name:"Axis Track 48V", cat:"Track System", price:{retail:4200,dealer:3360,project:3024,architect:2940}, watt:"15–60W", cct:["2700K","3000K","4000K"], beam:["15°","24°","36°","60°"], finish:["Matt Black","Matt White","Brushed Gold","Satin Nickel"], ip:"IP20", emoji:"💡", lux:850, rating:4.9 },
  { id:2, name:"Corona Pendant", cat:"Pendant", price:{retail:8900,dealer:7120,project:6408,architect:6230}, watt:"24W", cct:["2700K","3000K"], beam:["60°","120°"], finish:["Matt Black","Bronze","Custom RAL"], ip:"IP20", emoji:"🔆", lux:1200, rating:4.8 },
  { id:3, name:"Stratum Linear", cat:"Linear", price:{retail:3100,dealer:2480,project:2232,architect:2170}, watt:"20W/m", cct:["3000K","4000K","Tunable"], beam:["90°","120°"], finish:["Anodised Silver","Matt Black"], ip:"IP44", emoji:"📏", lux:620, rating:4.7 },
  { id:4, name:"Vela Recessed", cat:"Downlight", price:{retail:1800,dealer:1440,project:1296,architect:1260}, watt:"12W", cct:["2700K","3000K","4000K"], beam:["20°","36°","50°"], finish:["Matt White","Matt Black","Brushed Aluminium"], ip:"IP65", emoji:"⭕", lux:920, rating:4.9 },
];

export const FINISHES: Finish[] = [
  {name:"Matt Black",hex:"#1a1a1a"},{name:"Matt White",hex:"#f5f5f5"},
  {name:"Brushed Gold",hex:"#c9a96e"},{name:"Satin Nickel",hex:"#8a8a8a"},
  {name:"Bronze",hex:"#6b4226"},{name:"Champagne",hex:"#f7e7ce"},
  {name:"Graphite",hex:"#3d3d3d"},{name:"Ivory",hex:"#fffff0"},
  {name:"Cobalt Blue",hex:"#1a3a8f"},{name:"Forest Green",hex:"#2d5a27"},
  {name:"Terracotta",hex:"#c44d34"},{name:"Blush Pink",hex:"#e8b4b8"},
];

export const CHAT_RESPONSES: Record<string, string> = {
  default: "Based on your project requirements, I recommend exploring our **Axis Track 48V** system — it offers precise beam control and flexible lumen output, ideal for your application. Would you like a detailed photometric analysis?",
  retail: "For retail applications, high CRI (≥95) is critical for accurate colour rendering. I'd suggest our **Corona Pendant** in 3000K with a 60° beam — this creates warm, inviting pools of light over display areas. Typical illuminance: 500–1000 lux on merchandise.",
  hotel: "Hospitality lighting calls for layers: ambient, accent, and task. The **Vela Recessed** in 2700K at 20° creates drama on architectural features, while the **Stratum Linear** in Tunable White handles circadian rhythm support in guest rooms.",
  office: "For office spaces, EN 12464 requires ≥500 lux at desk level with UGR<19 to prevent glare discomfort. I recommend the **Stratum Linear** in 4000K — it provides uniform, glare-free illumination perfect for productivity environments.",
  help: "I can help you with: product selection, lux calculations, CCT recommendations, driver compatibility, project quotations, or photometric reports. What aspect of your lighting project can I assist with?",
};

export const SEGMENTS = [
  { name:"Residential", emoji:"🏡", desc:"Private homes & apartments", color:"#2d4a3e" },
  { name:"Commercial", emoji:"🏢", desc:"Offices & corporate spaces", color:"#1a2d4a" },
  { name:"Retail", emoji:"🏪", desc:"Shops & showrooms", color:"#4a2d1a" },
  { name:"Hospitality", emoji:"🏨", desc:"Hotels & restaurants", color:"#3d2d4a" },
  { name:"Healthcare", emoji:"🏥", desc:"Medical & wellness", color:"#1a4a3a" },
  { name:"Outdoor", emoji:"🌃", desc:"Architectural & landscape", color:"#1a1a3d" },
];

export const UPLOAD_STEPS = [
  "Upload Layout","AI Room Detection","Zone Mapping","Lux Calculation","Fixture Selection","BOQ Generation","Photometric Report","Export Pack"
];

export const CONFIGURATOR_STEPS = [
  "Series","Form Factor","Output","CCT","Beam","Finish","Accessories","Driver","Review","Quote"
];
