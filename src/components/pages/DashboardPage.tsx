"use client";

import {
  ArrowUpRight, ArrowDownRight, CreditCard, Wallet, TrendingUp,
  TrendingDown, Receipt,
} from "lucide-react";
import {
  AreaChart, Area, PieChart as RechartsPie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { COLORS } from "@/lib/theme";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";
import { mockIncome, mockExpenses, mockCards, mockSavings, monthlyHistory, categoryExpenses } from "@/data/mock";
import { AnimatedNumber, ProgressBar, Badge, Card, IconBox, SectionTitle } from "@/components/ui";
import { HealthIndicator, SmartTips, MonthTimeline } from "@/components/charts/DashboardWidgets";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 14px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
      <p style={{ fontSize: 11, color: COLORS.textMuted, margin: "0 0 6px" }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ fontSize: 12, color: p.color, margin: "2px 0", fontWeight: 600 }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const totalIncome = mockIncome.reduce((s, i) => s + i.value, 0);
  const totalExpenses = mockExpenses.reduce((s, e) => s + e.value, 0);
  const totalCards = mockCards.reduce((s, c) => s + c.used, 0);
  const totalCommitted = totalExpenses + totalCards;
  const remaining = totalIncome - totalCommitted;
  const pendingExpenses = mockExpenses.filter(e => !e.paid).reduce((s, e) => s + e.value, 0);
  const savingsAmount = remaining * 0.15;
  const healthScore = 72;

  const summaryCards = [
    { label: "Entradas", value: totalIncome, icon: ArrowUpRight, color: COLORS.green, trend: "+3.2%" },
    { label: "Saídas", value: totalExpenses, icon: ArrowDownRight, color: COLORS.red, trend: "-8.1%" },
    { label: "Cartões", value: totalCards, icon: CreditCard, color: COLORS.purple, trend: "+12%" },
    { label: "Disponível", value: remaining, icon: Wallet, color: COLORS.blue, trend: null },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {summaryCards.map((c, i) => (
          <Card key={i}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 12.5, color: COLORS.textMuted, fontWeight: 500 }}>{c.label}</span>
              <IconBox icon={c.icon} color={c.color} size={36} />
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.text, letterSpacing: -1, fontVariantNumeric: "tabular-nums" }}>
              <AnimatedNumber value={c.value} />
            </div>
            {c.trend && (
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
                <Badge color={c.trend.startsWith("+") ? COLORS.green : COLORS.red}>
                  {c.trend.startsWith("+") ? <TrendingUp size={10} style={{ marginRight: 3 }} /> : <TrendingDown size={10} style={{ marginRight: 3 }} />}
                  {c.trend} vs mês anterior
                </Badge>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <SectionTitle>Receitas vs Despesas</SectionTitle>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyHistory}>
                <defs>
                  <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS.green} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={COLORS.green} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS.red} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={COLORS.red} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="month" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="income" stroke={COLORS.green} strokeWidth={2.5} fill="url(#greenGrad)" name="Receitas" dot={false} />
                <Area type="monotone" dataKey="expenses" stroke={COLORS.red} strokeWidth={2.5} fill="url(#redGrad)" name="Despesas" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <SectionTitle>Gastos por Categoria</SectionTitle>
          <div style={{ height: 240, display: "flex", alignItems: "center" }}>
            <ResponsiveContainer width="50%" height="100%">
              <RechartsPie>
                <Pie data={categoryExpenses} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} strokeWidth={0}>
                  {categoryExpenses.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </RechartsPie>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, paddingLeft: 8 }}>
              {categoryExpenses.slice(0, 5).map((cat, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 3, background: cat.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11.5, color: COLORS.textMuted, flex: 1 }}>{cat.name}</span>
                  <span style={{ fontSize: 11.5, color: COLORS.text, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{formatCurrency(cat.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Health + Timeline Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <HealthIndicator score={healthScore} />
          <Card>
            <SectionTitle>Progresso do Mês</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: COLORS.textMuted }}>Renda comprometida</span>
                  <span style={{ fontSize: 12, color: COLORS.amber, fontWeight: 600 }}>{formatPercent((totalCommitted / totalIncome) * 100)}</span>
                </div>
                <ProgressBar value={totalCommitted} max={totalIncome} color={COLORS.amber} />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: COLORS.textMuted }}>Meta de economia (15%)</span>
                  <span style={{ fontSize: 12, color: COLORS.green, fontWeight: 600 }}>{formatCurrency(savingsAmount)} / {formatCurrency(totalIncome * 0.15)}</span>
                </div>
                <ProgressBar value={savingsAmount} max={totalIncome * 0.15} color={COLORS.green} />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: COLORS.textMuted }}>Contas pendentes</span>
                  <span style={{ fontSize: 12, color: COLORS.red, fontWeight: 600 }}>{formatCurrency(pendingExpenses)} restante</span>
                </div>
                <ProgressBar value={totalExpenses - pendingExpenses} max={totalExpenses} color={COLORS.blue} />
              </div>
            </div>
          </Card>
          <Card>
            <SectionTitle>Reservas &amp; Metas</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {Object.entries(mockSavings).map(([key, s]) => (
                <div key={key}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: COLORS.text }}>{s.label}</span>
                    <span style={{ fontSize: 11, color: COLORS.textMuted }}>{formatCurrency(s.current)} / {formatCurrency(s.goal)}</span>
                  </div>
                  <ProgressBar value={s.current} max={s.goal} color={COLORS.purple} height={5} />
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <MonthTimeline />
          <SmartTips />
        </div>
      </div>

      {/* Upcoming Bills */}
      <Card>
        <SectionTitle>Próximos Vencimentos</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
          {mockExpenses.filter(e => !e.paid).map((expense) => {
            const cat = CATEGORIES.find(c => c.id === expense.category);
            return (
              <div key={expense.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: COLORS.bgInput, border: `1px solid ${COLORS.border}` }}>
                <IconBox icon={cat?.icon || Receipt} color={cat?.color || COLORS.textMuted} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{expense.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>Vence dia {expense.dueDate}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.red, fontVariantNumeric: "tabular-nums" }}>{formatCurrency(expense.value)}</div>
                  <Badge color={COLORS.amber}>Pendente</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Cards Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        {mockCards.map(card => {
          const pct = (card.used / card.limit) * 100;
          const barColor = pct > 80 ? COLORS.red : pct > 50 ? COLORS.amber : COLORS.green;
          return (
            <Card key={card.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: card.brand === "Mastercard" ? "linear-gradient(135deg, #eb001b, #f79e1b)" : "linear-gradient(135deg, #1a1f71, #0066b2)" }}>
                  <CreditCard size={14} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{card.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>{card.brand} • Fecha dia {card.closingDate}</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: COLORS.textMuted }}>Usado</span>
                <span style={{ fontSize: 12, color: COLORS.text, fontWeight: 600 }}>{formatCurrency(card.used)} / {formatCurrency(card.limit)}</span>
              </div>
              <ProgressBar value={card.used} max={card.limit} color={barColor} />
              <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: COLORS.textMuted }}>Disponível</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.green }}>{formatCurrency(card.limit - card.used)}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
