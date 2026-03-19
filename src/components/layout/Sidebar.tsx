"use client";

import {
  LayoutDashboard, Wallet, CreditCard, Receipt, PiggyBank,
  TrendingUp, BarChart3, Settings, ChevronRight, ChevronLeft, Zap,
} from "lucide-react";
import { COLORS } from "@/lib/theme";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "income", label: "Receitas", icon: Wallet },
  { id: "expenses", label: "Contas", icon: Receipt },
  { id: "cards", label: "Cartões", icon: CreditCard },
  { id: "savings", label: "Reservas", icon: PiggyBank },
  { id: "projections", label: "Projeções", icon: TrendingUp },
  { id: "reports", label: "Relatórios", icon: BarChart3 },
  { id: "settings", label: "Configurações", icon: Settings },
] as const;

export type PageId = (typeof NAV_ITEMS)[number]["id"];

interface SidebarProps {
  active: string;
  onNav: (id: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ active, onNav, collapsed, onToggle }: SidebarProps) {
  return (
    <div
      style={{
        width: collapsed ? 72 : 240, height: "100vh", background: COLORS.bgSidebar,
        borderRight: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column",
        transition: "width 0.3s cubic-bezier(0.22,1,0.36,1)", overflow: "hidden",
        position: "fixed", left: 0, top: 0, zIndex: 100, flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? "20px 16px" : "20px 24px", display: "flex",
          alignItems: "center", gap: 12, borderBottom: `1px solid ${COLORS.border}`, minHeight: 72,
        }}
      >
        <div
          style={{
            width: 36, height: 36, borderRadius: 10, display: "flex",
            alignItems: "center", justifyContent: "center", flexShrink: 0,
            background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.blue})`,
          }}
        >
          <Zap size={18} color="#fff" />
        </div>
        {!collapsed && (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.text, letterSpacing: -0.5 }}>
              Velloso
            </div>
            <div style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: 1.5, textTransform: "uppercase" }}>
              Finance
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onNav(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: collapsed ? "12px" : "12px 16px", borderRadius: 12,
                cursor: "pointer", transition: "all 0.2s",
                background: isActive ? `${COLORS.accent}15` : "transparent",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <item.icon
                size={20}
                color={isActive ? COLORS.accent : COLORS.textMuted}
                style={{ flexShrink: 0, transition: "color 0.2s" }}
              />
              {!collapsed && (
                <span
                  style={{
                    fontSize: 13.5, fontWeight: isActive ? 600 : 400, letterSpacing: -0.1,
                    color: isActive ? COLORS.text : COLORS.textMuted, transition: "color 0.2s",
                    overflow: "hidden", whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              )}
              {isActive && !collapsed && (
                <div
                  style={{
                    marginLeft: "auto", width: 5, height: 5, borderRadius: "50%",
                    background: COLORS.accent,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Toggle */}
      <div style={{ padding: 12, borderTop: `1px solid ${COLORS.border}` }}>
        <div
          onClick={onToggle}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 8, borderRadius: 10, cursor: "pointer", transition: "background 0.2s",
          }}
        >
          {collapsed ? (
            <ChevronRight size={18} color={COLORS.textMuted} />
          ) : (
            <ChevronLeft size={18} color={COLORS.textMuted} />
          )}
        </div>
      </div>
    </div>
  );
}
