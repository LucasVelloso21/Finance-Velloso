"use client";

import { Bell, ChevronDown } from "lucide-react";
import { COLORS } from "@/lib/theme";

const PAGE_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  income: "Receitas",
  expenses: "Contas a Pagar",
  cards: "Cartões de Crédito",
  savings: "Reservas & Metas",
  projections: "Projeções",
  reports: "Relatórios",
  settings: "Configurações",
};

export default function Header({ page }: { page: string }) {
  return (
    <div
      style={{
        height: 72, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.bg,
        position: "sticky", top: 0, zIndex: 50,
      }}
    >
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, margin: 0, letterSpacing: -0.5 }}>
          {PAGE_TITLES[page] || "Dashboard"}
        </h1>
        <p style={{ fontSize: 12, color: COLORS.textMuted, margin: 0 }}>Março 2026</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center",
            justifyContent: "center", background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
            cursor: "pointer", position: "relative",
          }}
        >
          <Bell size={18} color={COLORS.textMuted} />
          <div
            style={{
              position: "absolute", top: 8, right: 8, width: 7, height: 7,
              borderRadius: "50%", background: COLORS.red, border: `2px solid ${COLORS.bg}`,
            }}
          />
        </div>
        <div
          style={{
            display: "flex", alignItems: "center", gap: 10, padding: "6px 12px 6px 6px",
            borderRadius: 14, background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
            }}
          >
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>LM</span>
          </div>
          <span style={{ fontSize: 13, color: COLORS.text, fontWeight: 500 }}>Lucas</span>
          <ChevronDown size={14} color={COLORS.textMuted} />
        </div>
      </div>
    </div>
  );
}
