"use client";

import { Banknote, UtensilsCrossed, Car, Zap } from "lucide-react";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from "recharts";
import { COLORS } from "@/lib/theme";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { mockIncome } from "@/data/mock";
import { Card, Badge, IconBox, SectionTitle } from "@/components/ui";

const typeColors: Record<string, string> = { salario: COLORS.green, va: COLORS.amber, vt: COLORS.blue, extra: COLORS.purple };
const typeLabels: Record<string, string> = { salario: "Salário", va: "Vale Alimentação", vt: "Vale Transporte", extra: "Renda Extra" };
const typeIcons: Record<string, any> = { salario: Banknote, va: UtensilsCrossed, vt: Car, extra: Zap };

export default function IncomePage() {
  const totalIncome = mockIncome.reduce((s, i) => s + i.value, 0);
  const incomeByType: Record<string, number> = mockIncome.reduce((acc, i) => {
    acc[i.type] = (acc[i.type] || 0) + i.value;
    return acc;
  }, {} as Record<string, number>);
  const pieData = Object.entries(incomeByType).map(([type, value]) => ({
    name: typeLabels[type], value, color: typeColors[type],
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <Card>
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>Total de Receitas</span>
          <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.green, marginTop: 8, letterSpacing: -1 }}>{formatCurrency(totalIncome)}</div>
          <Badge color={COLORS.green}>+3.2% vs mês anterior</Badge>
        </Card>
        <Card>
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>Recebimentos</span>
          <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.text, marginTop: 8 }}>{mockIncome.length}</div>
          <span style={{ fontSize: 11, color: COLORS.textMuted }}>{mockIncome.filter(i => i.recurring).length} recorrentes</span>
        </Card>
        <Card>
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>Próximo Recebimento</span>
          <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.blue, marginTop: 8 }}>Dia 20</div>
          <span style={{ fontSize: 11, color: COLORS.textMuted }}>Salário • {formatCurrency(6500)}</span>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <Card>
          <SectionTitle>Receitas Cadastradas</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {mockIncome.map(inc => (
              <div key={inc.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, background: COLORS.bgInput, border: `1px solid ${COLORS.border}` }}>
                <IconBox icon={typeIcons[inc.type]} color={typeColors[inc.type]} size={40} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{inc.name}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                    <Badge color={typeColors[inc.type]}>{typeLabels[inc.type]}</Badge>
                    {inc.recurring && <Badge color={COLORS.textMuted}>Recorrente</Badge>}
                    <span style={{ fontSize: 11, color: COLORS.textMuted }}>Dia {inc.date}</span>
                  </div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.green, fontVariantNumeric: "tabular-nums" }}>+{formatCurrency(inc.value)}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle>Composição da Renda</SectionTitle>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} strokeWidth={0}>
                  {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </RechartsPie>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
            {pieData.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 3, background: item.color }} />
                <span style={{ fontSize: 12, color: COLORS.textMuted, flex: 1 }}>{item.name}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{formatPercent((item.value / totalIncome) * 100)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
