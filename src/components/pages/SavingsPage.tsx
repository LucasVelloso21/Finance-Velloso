"use client";

import { Shield, Star, Car, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { COLORS } from "@/lib/theme";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { mockSavings } from "@/data/mock";
import { Card, Badge, ProgressBar, IconBox, SectionTitle } from "@/components/ui";
import type { LucideIcon } from "lucide-react";

const savingsIcons: Record<string, LucideIcon> = { emergency: Shield, vacation: Star, car: Car, investment: TrendingUp };
const savingsColors: Record<string, string> = { emergency: COLORS.green, vacation: COLORS.amber, car: COLORS.blue, investment: COLORS.purple };

const savingsHistory = [
  { month: "Out", value: 22000 }, { month: "Nov", value: 24100 },
  { month: "Dez", value: 25800 }, { month: "Jan", value: 27200 },
  { month: "Fev", value: 28300 }, { month: "Mar", value: 29300 },
];

export default function SavingsPage() {
  const totalSaved = Object.values(mockSavings).reduce((s, v) => s + v.current, 0);
  const totalGoal = Object.values(mockSavings).reduce((s, v) => s + v.goal, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <Card>
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>Total Guardado</span>
          <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.purple, marginTop: 8 }}>{formatCurrency(totalSaved)}</div>
          <Badge color={COLORS.green}>+R$ 1.000 este mês</Badge>
        </Card>
        <Card>
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>Meta Total</span>
          <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.text, marginTop: 8 }}>{formatCurrency(totalGoal)}</div>
          <span style={{ fontSize: 11, color: COLORS.textMuted }}>{formatPercent((totalSaved / totalGoal) * 100)} concluído</span>
        </Card>
        <Card>
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>Sugestão Mensal</span>
          <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.green, marginTop: 8 }}>{formatCurrency(1330)}</div>
          <span style={{ fontSize: 11, color: COLORS.textMuted }}>15% da renda</span>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <SectionTitle>Metas de Reserva</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {Object.entries(mockSavings).map(([key, s]) => {
              const pct = (s.current / s.goal) * 100;
              const Icon = savingsIcons[key];
              return (
                <div key={key} style={{ padding: 16, borderRadius: 12, background: COLORS.bgInput, border: `1px solid ${COLORS.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <IconBox icon={Icon} color={savingsColors[key]} size={36} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{s.label}</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted }}>{formatCurrency(s.current)} de {formatCurrency(s.goal)}</div>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 800, color: savingsColors[key] }}>{formatPercent(pct)}</span>
                  </div>
                  <ProgressBar value={s.current} max={s.goal} color={savingsColors[key]} height={6} />
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <SectionTitle>Evolução das Reservas</SectionTitle>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={savingsHistory}>
                <defs>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS.purple} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={COLORS.purple} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="month" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                <Area type="monotone" dataKey="value" stroke={COLORS.purple} strokeWidth={2.5} fill="url(#purpleGrad)" name="Reservas" dot={{ r: 4, fill: COLORS.purple, stroke: COLORS.bg, strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle>Guardar Automaticamente</SectionTitle>
        <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 16 }}>Escolha um percentual da sua renda para guardar automaticamente todo mês.</p>
        <div style={{ display: "flex", gap: 12 }}>
          {[5, 10, 15, 20].map(pct => (
            <div key={pct} style={{
              flex: 1, padding: 16, borderRadius: 12, textAlign: "center", cursor: "pointer",
              background: pct === 15 ? `${COLORS.accent}15` : COLORS.bgInput,
              border: `1px solid ${pct === 15 ? COLORS.accent : COLORS.border}`, transition: "all 0.2s",
            }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: pct === 15 ? COLORS.accent : COLORS.text }}>{pct}%</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>{formatCurrency(8870 * pct / 100)}/mês</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
