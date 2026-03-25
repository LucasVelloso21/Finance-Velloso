export const C = {
  bg: "#0c0c0c",
  card: "#141414",
  card2: "#1a1a1a",
  input: "#1c1c1c",
  border: "#222",
  text: "#eaeaea",
  sub: "#888",
  dim: "#4a4a4a",
  green: "#34d399",
  red: "#f06272",
  yellow: "#f0b840",
  accent: "#d4a825",
  purple: "#8b5cf6",
  blue: "#3b82f6",
};

export const BRANDS: Record<string, { name: string; color: string; bg: string; textColor?: string }> = {
  nubank: { name: "Nubank", color: "#8b2fd4", bg: "linear-gradient(135deg,#8b2fd4,#6b21a8)" },
  c6: { name: "C6 Bank", color: "#ccc", bg: "linear-gradient(135deg,#2a2a2a,#111)", textColor: "#e5e5e5" },
  santander: { name: "Santander", color: "#ec0000", bg: "linear-gradient(135deg,#ec0000,#b30000)" },
  inter: { name: "Inter", color: "#ff7a00", bg: "linear-gradient(135deg,#ff7a00,#e06500)" },
  itau: { name: "Itaú", color: "#ec7000", bg: "linear-gradient(135deg,#003a70,#002952)", textColor: "#ff8c00" },
  bradesco: { name: "Bradesco", color: "#cc092f", bg: "linear-gradient(135deg,#cc092f,#8b0620)" },
  bb: { name: "Banco do Brasil", color: "#f9e300", bg: "linear-gradient(135deg,#003882,#002860)", textColor: "#f9e300" },
  caixa: { name: "Caixa", color: "#005ca9", bg: "linear-gradient(135deg,#005ca9,#f37021)", textColor: "#fff" },
  pan: { name: "Pan", color: "#00b4e6", bg: "linear-gradient(135deg,#00b4e6,#0090b8)" },
  midway: { name: "Midway", color: "#ffc600", bg: "linear-gradient(135deg,#333,#1a1a1a)", textColor: "#ffc600" },
  outro: { name: "Outro", color: "#888", bg: "linear-gradient(135deg,#333,#222)" },
};

export const CATS = [
  { id: "moradia", name: "Moradia", color: "#8b5cf6" },
  { id: "alimentacao", name: "Alimentação", color: "#f0b840" },
  { id: "transporte", name: "Transporte", color: "#3b82f6" },
  { id: "saude", name: "Saúde", color: "#f06272" },
  { id: "assinaturas", name: "Assinaturas", color: "#34d399" },
  { id: "educacao", name: "Educação", color: "#60a5fa" },
  { id: "compras", name: "Compras", color: "#ec4899" },
  { id: "lazer", name: "Lazer", color: "#a78bfa" },
  { id: "outros", name: "Outros", color: "#888" },
];

export const TYPE_LABELS: Record<string, string> = {
  salario: "Salário", va: "Vale Adiantamento", vt: "Vale Transporte",
  extra: "Renda Extra", comissao: "Comissão", freelance: "Freelance",
};

export const fmt = (v: number) => (v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const pct = (v: number) => `${Math.round(v || 0)}%`;
export const currentMonth = new Date().getMonth() + 1;
export const currentDay = new Date().getDate();
export const daysInMonth = new Date(new Date().getFullYear(), currentMonth, 0).getDate();
export const daysLeft = daysInMonth - currentDay;
export const fmtDate = (d: any, m: any) =>
  `${String(d || 1).padStart(2, "0")}/${String(m || currentMonth).padStart(2, "0")}`;

let _id = 100;
export const uid = () => ++_id;
