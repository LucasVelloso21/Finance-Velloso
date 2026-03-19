"use client";

import {
  AlertTriangle, Award, CheckCircle, Clock, CreditCard, Flame,
  Shield, TrendingUp, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { COLORS } from "@/lib/theme";
import { formatCurrency } from "@/lib/utils";
import { Card, Badge, SectionTitle } from "@/components/ui";

/* ── Health Indicator ── */
export function HealthIndicator({ score }: { score: number }) {
  const getStatus = (s: number) => {
    if (s >= 80) return { label: "Excelente", color: COLORS.green, icon: Shield };
    if (s >= 60) return { label: "Boa", color: COLORS.blue, icon: CheckCircle };
    if (s >= 40) return { label: "Atenção", color: COLORS.amber, icon: AlertTriangle };
    return { label: "Risco", color: COLORS.red, icon: Flame };
  };
  const status = getStatus(score);
  const StatusIcon = status.icon;

  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: COLORS.textMuted, fontWeight: 500 }}>Saúde Financeira</span>
        <Badge color={status.color}>
          <StatusIcon size={12} style={{ marginRight: 4 }} />
          {status.label}
        </Badge>
      </div>
      <div style={{ position: "relative", width: "100%", height: 8, background: COLORS.bgInput, borderRadius: 8, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute", left: 0, top: 0, height: "100%", borderRadius: 8,
            width: `${score}%`, transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)",
            background: `linear-gradient(90deg, ${COLORS.red}, ${COLORS.amber}, ${COLORS.green})`,
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <span style={{ fontSize: 11, color: COLORS.textMuted }}>Risco</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: status.color }}>{score}</span>
        <span style={{ fontSize: 11, color: COLORS.textMuted }}>Excelente</span>
      </div>
    </Card>
  );
}

/* ── Smart Tips ── */
export function SmartTips() {
  const tips = [
    { text: "Sua fatura do Nubank representa 39% da sua renda. Considere reduzir parcelamentos.", type: "warning" as const, icon: AlertTriangle },
    { text: "Parabéns! Você economizou 12% a mais que no mês passado.", type: "success" as const, icon: Award },
    { text: "Atenção: 3 contas vencem antes do próximo salário (dia 20).", type: "alert" as const, icon: Clock },
    { text: "Sua reserva de emergência atingiu 42% da meta. Continue assim!", type: "info" as const, icon: TrendingUp },
  ];
  const typeColors = { warning: COLORS.amber, success: COLORS.green, alert: COLORS.red, info: COLORS.blue };

  return (
    <Card>
      <SectionTitle>Insights Inteligentes</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {tips.map((tip, i) => (
          <div
            key={i}
            style={{
              display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 12px",
              borderRadius: 10, background: `${typeColors[tip.type]}08`,
              borderLeft: `3px solid ${typeColors[tip.type]}`,
            }}
          >
            <tip.icon size={16} color={typeColors[tip.type]} style={{ flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 12.5, color: COLORS.text, lineHeight: 1.5 }}>{tip.text}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ── Month Timeline ── */
export function MonthTimeline() {
  const today = 19;
  const events = [
    { day: 1, label: "VA", type: "income" as const, value: 850 },
    { day: 5, label: "VT", type: "income" as const, value: 320 },
    { day: 5, label: "Academia", type: "expense" as const, value: 150 },
    { day: 8, label: "Curso", type: "expense" as const, value: 97 },
    { day: 10, label: "Aluguel + Cond.", type: "expense" as const, value: 2650 },
    { day: 10, label: "Fatura Nubank", type: "card" as const, value: 3450 },
    { day: 12, label: "Streaming", type: "expense" as const, value: 77 },
    { day: 15, label: "Freelance", type: "income" as const, value: 1200 },
    { day: 15, label: "Energia", type: "expense" as const, value: 180 },
    { day: 20, label: "Salário", type: "income" as const, value: 6500 },
    { day: 20, label: "Internet", type: "expense" as const, value: 120 },
    { day: 22, label: "Fatura C6", type: "card" as const, value: 1280 },
    { day: 25, label: "Seguro", type: "expense" as const, value: 280 },
  ];
  const typeColors = { income: COLORS.green, expense: COLORS.red, card: COLORS.purple };
  const typeIcons = { income: ArrowUpRight, expense: ArrowDownRight, card: CreditCard };

  return (
    <Card>
      <SectionTitle>Linha do Tempo Financeira - Março</SectionTitle>
      <div style={{ position: "relative", paddingLeft: 24 }}>
        <div
          style={{
            position: "absolute", left: 11, top: 0, bottom: 0, width: 2,
            background: `linear-gradient(to bottom, ${COLORS.border}, ${COLORS.accent}, ${COLORS.border})`,
          }}
        />
        <div
          style={{
            position: "absolute", left: 4, top: `${(today / 30) * 100}%`,
            width: 16, height: 16, borderRadius: "50%",
            background: COLORS.accent, border: `3px solid ${COLORS.bg}`,
            zIndex: 2, boxShadow: `0 0 12px ${COLORS.accent}60`,
          }}
        />
        {events.map((ev, i) => {
          const Icon = typeIcons[ev.type];
          const isPast = ev.day <= today;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", opacity: isPast ? 1 : 0.5 }}>
              <div
                style={{
                  width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                  background: typeColors[ev.type], marginLeft: -20,
                  border: `2px solid ${COLORS.bg}`, zIndex: 1,
                }}
              />
              <div style={{ fontSize: 11, color: COLORS.textDim, width: 32, flexShrink: 0, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                dia {ev.day}
              </div>
              <div
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "6px 10px", borderRadius: 8, background: `${typeColors[ev.type]}08`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon size={12} color={typeColors[ev.type]} />
                  <span style={{ fontSize: 12, color: COLORS.text }}>{ev.label}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: typeColors[ev.type], fontVariantNumeric: "tabular-nums" }}>
                  {ev.type === "income" ? "+" : "-"}
                  {formatCurrency(ev.value)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 16, padding: 12, borderRadius: 10, background: `${COLORS.amber}08`,
          border: `1px solid ${COLORS.amber}20`, display: "flex", alignItems: "center", gap: 8,
        }}
      >
        <AlertTriangle size={14} color={COLORS.amber} />
        <span style={{ fontSize: 12, color: COLORS.amber }}>
          Entre dia 10 e dia 15 pode haver aperto. O salário só entra dia 20.
        </span>
      </div>
    </Card>
  );
}
