"use client";

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { COLORS } from "@/lib/theme";
import { formatCurrency } from "@/lib/utils";
import { Card, Badge, SectionTitle } from "@/components/ui";

export default function ProjectionsPage() {
  const projData = useMemo(() => {
    return ["Abr", "Mai", "Jun", "Jul", "Ago", "Set"].map((m, i) => ({
      month: m,
      income: 8870 + (Math.random() - 0.5) * 500,
      expenses: 5500 + (Math.random() - 0.5) * 800,
      saved: 1500 + i * 200,
      balance: 2000 + i * 300,
    }));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <Card>
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>Saldo Previsto (6 meses)</span>
          <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.green, marginTop: 8 }}>{formatCurrency(18500)}</div>
        </Card>
        <Card>
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>Meses Negativos</span>
          <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.green, marginTop: 8 }}>0</div>
          <Badge color={COLORS.green}>Nenhum previsto</Badge>
        </Card>
        <Card>
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>Reserva Prevista</span>
          <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.purple, marginTop: 8 }}>{formatCurrency(37300)}</div>
          <span style={{ fontSize: 11, color: COLORS.textMuted }}>em Set/26</span>
        </Card>
      </div>

      <Card>
        <SectionTitle>Projeção dos Próximos 6 Meses</SectionTitle>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="month" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
              <Bar dataKey="income" fill={COLORS.green} radius={[4, 4, 0, 0]} name="Receitas" />
              <Bar dataKey="expenses" fill={COLORS.red} radius={[4, 4, 0, 0]} name="Despesas" />
              <Bar dataKey="saved" fill={COLORS.purple} radius={[4, 4, 0, 0]} name="Guardado" />
              <Legend wrapperStyle={{ fontSize: 11, color: COLORS.textMuted }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <SectionTitle>Simulações</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { title: "Guardar 10% ao mês", desc: "Em 6 meses você terá mais R$ 5.322 na reserva", impact: "+R$ 5.322", color: COLORS.green },
            { title: "Cortar assinaturas", desc: "Economize R$ 197/mês cortando streaming e spotify", impact: "+R$ 1.182", color: COLORS.green },
            { title: "Parcela nova de R$ 500", desc: "Seu comprometimento sobe para 78% da renda", impact: "+12%", color: COLORS.amber },
            { title: "Mudar aluguel para dia 20", desc: "Alivia o aperto do início do mês significativamente", impact: "Redistribui", color: COLORS.blue },
          ].map((sim, i) => (
            <div key={i} style={{ padding: 16, borderRadius: 12, background: COLORS.bgInput, border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{sim.title}</span>
                <Badge color={sim.color}>{sim.impact}</Badge>
              </div>
              <p style={{ fontSize: 12, color: COLORS.textMuted, margin: 0, lineHeight: 1.5 }}>{sim.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
