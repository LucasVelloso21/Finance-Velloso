"use client";

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { COLORS } from "@/lib/theme";
import { formatCurrency } from "@/lib/utils";
import { monthlyHistory, categoryExpenses } from "@/data/mock";
import { Card, Badge, SectionTitle } from "@/components/ui";

const balanceEvolution = [
  { month: "Out", balance: 3200 }, { month: "Nov", balance: 4800 },
  { month: "Dez", balance: 3500 }, { month: "Jan", balance: 5100 },
  { month: "Fev", balance: 6800 }, { month: "Mar", balance: 7200 },
];

export default function ReportsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <SectionTitle>Evolução do Saldo</SectionTitle>
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={balanceEvolution}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="month" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
                <Line type="monotone" dataKey="balance" stroke={COLORS.cyan} strokeWidth={2.5} name="Saldo" dot={{ r: 5, fill: COLORS.cyan, stroke: COLORS.bg, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionTitle>Comparativo Mensal</SectionTitle>
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyHistory.slice(-3)}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="month" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                <Bar dataKey="income" fill={COLORS.green} radius={[4, 4, 0, 0]} name="Receitas" />
                <Bar dataKey="expenses" fill={COLORS.red} radius={[4, 4, 0, 0]} name="Despesas" />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle>Evolução por Categoria</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {categoryExpenses.map((cat, i) => {
            const prevValue = cat.value * (0.8 + Math.random() * 0.4);
            const diff = ((cat.value - prevValue) / prevValue) * 100;
            return (
              <div key={i} style={{ padding: 14, borderRadius: 12, background: COLORS.bgInput, border: `1px solid ${COLORS.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 4, background: cat.color }} />
                  <span style={{ fontSize: 13, color: COLORS.text, fontWeight: 600 }}>{cat.name}</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.text }}>{formatCurrency(cat.value)}</div>
                <Badge color={diff > 0 ? COLORS.red : COLORS.green}>{diff > 0 ? "+" : ""}{diff.toFixed(0)}% vs anterior</Badge>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <SectionTitle>Resumo Março/2026</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { label: "Receita Total", value: 8870, color: COLORS.green, display: null },
            { label: "Despesas Totais", value: 4759, color: COLORS.red, display: null },
            { label: "Faturas Cartão", value: 4730, color: COLORS.purple, display: null },
            { label: "Guardado", value: 1330, color: COLORS.blue, display: null },
            { label: "Saldo Final", value: 2051, color: COLORS.cyan, display: null },
            { label: "Score Financeiro", value: null, color: COLORS.amber, display: "72/100" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", padding: 16 }}>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{item.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: item.color }}>{item.display || formatCurrency(item.value)}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
