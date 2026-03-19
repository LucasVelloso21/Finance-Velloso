"use client";

import { useState } from "react";
import { CreditCard, ShoppingBag } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { COLORS } from "@/lib/theme";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";
import { mockCards } from "@/data/mock";
import { Card, ProgressBar, IconBox, SectionTitle } from "@/components/ui";

export default function CardsPage() {
  const [activeCard, setActiveCard] = useState(0);
  const card = mockCards[activeCard];
  const pct = (card.used / card.limit) * 100;
  const barColor = pct > 80 ? COLORS.red : pct > 50 ? COLORS.amber : COLORS.green;

  const futureInvoices = [
    { month: "Abr", value: card.used * 0.85 },
    { month: "Mai", value: card.used * 0.7 },
    { month: "Jun", value: card.used * 0.55 },
    { month: "Jul", value: card.used * 0.4 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", gap: 12 }}>
        {mockCards.map((c, i) => (
          <div key={c.id} onClick={() => setActiveCard(i)} style={{
            padding: "16px 20px", borderRadius: 16, cursor: "pointer", flex: 1,
            background: i === activeCard ? `linear-gradient(135deg, ${c.brand === "Mastercard" ? "#eb001b20" : "#1a1f7120"}, ${COLORS.bgCard})` : COLORS.bgCard,
            border: `1px solid ${i === activeCard ? (c.brand === "Mastercard" ? "#eb001b40" : "#1a1f7140") : COLORS.border}`,
            transition: "all 0.3s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <CreditCard size={18} color={c.brand === "Mastercard" ? "#f79e1b" : "#0066b2"} />
              <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{c.name}</span>
              <span style={{ fontSize: 11, color: COLORS.textMuted, marginLeft: "auto" }}>{c.brand}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.text }}>{formatCurrency(c.used)}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>de {formatCurrency(c.limit)}</div>
            <div style={{ marginTop: 10 }}><ProgressBar value={c.used} max={c.limit} color={barColor} height={5} /></div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <SectionTitle>Fatura Atual - {card.name}</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {card.purchases.map(p => {
              const cat = CATEGORIES.find(c => c.id === p.category);
              return (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: COLORS.bgInput }}>
                  <IconBox icon={cat?.icon || ShoppingBag} color={cat?.color || COLORS.textMuted} size={32} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>{p.date}{p.installments > 1 && ` • ${p.current}/${p.installments}x`}</div>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, fontVariantNumeric: "tabular-nums" }}>{formatCurrency(p.value)}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: 10, background: `${barColor}10`, border: `1px solid ${barColor}30`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>Total da Fatura</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: barColor }}>{formatCurrency(card.used)}</span>
          </div>
        </Card>

        <Card>
          <SectionTitle>Projeção de Faturas</SectionTitle>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={futureInvoices}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="month" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
                <Bar dataKey="value" fill={COLORS.purple} radius={[6, 6, 0, 0]} name="Fatura" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: 12, padding: 10, borderRadius: 8, background: `${COLORS.blue}08`, border: `1px solid ${COLORS.blue}20` }}>
            <span style={{ fontSize: 12, color: COLORS.blue }}>Com os parcelamentos atuais, suas faturas reduzem gradualmente até Jul/26.</span>
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle>Uso do Limite Consolidado</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { label: "Limite Total", value: mockCards.reduce((s, c) => s + c.limit, 0), color: COLORS.text, display: null },
            { label: "Utilizado", value: mockCards.reduce((s, c) => s + c.used, 0), color: COLORS.red, display: null },
            { label: "Disponível", value: mockCards.reduce((s, c) => s + c.limit - c.used, 0), color: COLORS.green, display: null },
            { label: "% Utilizado", value: null, color: COLORS.amber, display: formatPercent((mockCards.reduce((s, c) => s + c.used, 0) / mockCards.reduce((s, c) => s + c.limit, 0)) * 100) },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: item.color }}>{item.display || formatCurrency(item.value)}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
