"use client";
import { ReactNode } from "react";
import { Receipt, X, Check } from "lucide-react";
import { C, CATS } from "@/lib/constants";

export const Card = ({ children, style }: { children: ReactNode; style?: any }) => (
  <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, padding: 20, ...style }}>{children}</div>
);

export const Progress = ({ value, max, color = C.green, h = 5 }: { value: number; max: number; color?: string; h?: number }) => (
  <div style={{ width: "100%", height: h, background: "#222", borderRadius: h, overflow: "hidden" }}>
    <div style={{ width: `${max > 0 ? Math.min((value / max) * 100, 100) : 0}%`, height: "100%", background: color, borderRadius: h, transition: "width 0.6s ease" }} />
  </div>
);

export const Tag = ({ children, color = C.sub }: { children: ReactNode; color?: string }) => (
  <span style={{ fontSize: 9, fontWeight: 600, color, background: `${color}15`, padding: "2px 6px", borderRadius: 4 }}>{children}</span>
);

export const Empty = ({ text, action }: { text: string; action?: ReactNode }) => (
  <div style={{ textAlign: "center", padding: "48px 20px" }}>
    <div style={{ width: 48, height: 48, borderRadius: 12, background: "#1e1e1e", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
      <Receipt size={20} color={C.dim} />
    </div>
    <p style={{ fontSize: 13, color: C.dim, margin: "0 0 12px" }}>{text}</p>
    {action}
  </div>
);

export const Btn = ({ children, onClick, primary, style: s }: { children: ReactNode; onClick?: () => void; primary?: boolean; style?: any }) => (
  <button onClick={onClick} style={{
    padding: "10px 16px", borderRadius: 10, border: primary ? "none" : `1px solid ${C.border}`,
    background: primary ? C.accent : "transparent", color: primary ? "#000" : C.sub,
    fontSize: 12, fontWeight: primary ? 600 : 500, cursor: "pointer",
    display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s", ...s
  }}>{children}</button>
);

export const CurrencyInput = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const h = (e: any) => { let r = e.target.value.replace(/\D/g, ""); if (!r) { onChange(0); return; } onChange(parseInt(r, 10) / 100); };
  const d = value ? `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "";
  return <input value={d} onChange={h} placeholder="R$ 0,00" style={{ width: "100%", padding: "10px 12px", borderRadius: 9, background: C.input, border: `1px solid ${C.border}`, color: C.text, fontSize: 14, fontWeight: 600, outline: "none", fontVariantNumeric: "tabular-nums" }} />;
};

export const DateInput = ({ day, month, onDayChange, onMonthChange }: { day: string; month: string; onDayChange: (v: string) => void; onMonthChange: (v: string) => void }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
    <input value={day} onChange={e => onDayChange(e.target.value.replace(/\D/g, "").slice(0, 2))} placeholder="DD" maxLength={2}
      style={{ width: 48, padding: "10px 8px", borderRadius: 9, background: C.input, border: `1px solid ${C.border}`, color: C.text, fontSize: 14, fontWeight: 600, outline: "none", textAlign: "center" }} />
    <span style={{ color: C.dim, fontSize: 18, fontWeight: 700 }}>/</span>
    <input value={month} onChange={e => onMonthChange(e.target.value.replace(/\D/g, "").slice(0, 2))} placeholder="MM" maxLength={2}
      style={{ width: 48, padding: "10px 8px", borderRadius: 9, background: C.input, border: `1px solid ${C.border}`, color: C.text, fontSize: 14, fontWeight: 600, outline: "none", textAlign: "center" }} />
  </div>
);

export const Select = ({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) => (
  <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 9, background: C.input, border: `1px solid ${C.border}`, color: C.text, fontSize: 12, outline: "none", appearance: "none" as any }}>
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

export const TextInput = ({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) => (
  <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    style={{ width: "100%", padding: "10px 12px", borderRadius: 9, background: C.input, border: `1px solid ${C.border}`, color: C.text, fontSize: 12, outline: "none" }} />
);

export const Label = ({ children }: { children: ReactNode }) => (
  <label style={{ fontSize: 10, color: C.dim, marginBottom: 4, display: "block", fontWeight: 500 }}>{children}</label>
);

export const Modal = ({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) => {
  if (!open) return null;
  return <>
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 300, backdropFilter: "blur(4px)" }} />
    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "100%", maxWidth: 420, maxHeight: "85vh", overflowY: "auto", background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 24, zIndex: 301 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{title}</span>
        <div onClick={onClose} style={{ width: 28, height: 28, borderRadius: 8, background: "#1e1e1e", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <X size={14} color={C.sub} />
        </div>
      </div>
      {children}
    </div>
  </>;
};

export const Checkbox = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label?: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div onClick={onChange} style={{
      width: 20, height: 20, borderRadius: 5, border: `1.5px solid ${checked ? C.green : C.border}`,
      background: checked ? `${C.green}15` : "transparent", display: "flex", alignItems: "center",
      justifyContent: "center", cursor: "pointer", transition: "all 0.15s"
    }}>{checked && <Check size={12} color={C.green} />}</div>
    {label && <span style={{ fontSize: 11, color: C.sub }}>{label}</span>}
  </div>
);
