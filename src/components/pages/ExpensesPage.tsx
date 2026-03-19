"use client";

import { useState } from "react";
import { Receipt } from "lucide-react";
import { COLORS } from "@/lib/theme";
import { formatCurrency } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";
import { mockExpenses } from "@/data/mock";
import { Card, Badge, IconBox } from "@/components/ui";

export default function ExpensesPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? mockExpenses
    : filter === "paid" ? mockExpenses.filter(e => e.paid)
    : filter === "pending" ? mockExpenses.filter(e => !e.paid)
    : mockExpenses.filter(e => e.essential);

  const totalExpenses = mockExpenses.reduce((s, e) => s + e.value, 0);
  const paidTotal = mockExpenses.filter(e => e.paid).reduce((s, e) => s + e.value, 0);
  const pendingTotal = mockExpenses.filter(e => !e.paid).reduce((s, e) => s + e.value, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
        <Card><span style={{ fontSize: 12, color: COLORS.textMuted }}>Total</span><div style={{ fontSize: 24, fontWeight: 800, color: COLORS.red, marginTop: 8 }}>{formatCurrency(totalExpenses)}</div></Card>
        <Card><span style={{ fontSize: 12, color: COLORS.textMuted }}>Pagas</span><div style={{ fontSize: 24, fontWeight: 800, color: COLORS.green, marginTop: 8 }}>{formatCurrency(paidTotal)}</div></Card>
        <Card><span style={{ fontSize: 12, color: COLORS.textMuted }}>Pendentes</span><div style={{ fontSize: 24, fontWeight: 800, color: COLORS.amber, marginTop: 8 }}>{formatCurrency(pendingTotal)}</div></Card>
        <Card><span style={{ fontSize: 12, color: COLORS.textMuted }}>Contas</span><div style={{ fontSize: 24, fontWeight: 800, color: COLORS.text, marginTop: 8 }}>{mockExpenses.length}</div></Card>
      </div>

      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, margin: 0 }}>Contas do Mês</h3>
          <div style={{ display: "flex", gap: 6 }}>
            {[{ id: "all", label: "Todas" }, { id: "pending", label: "Pendentes" }, { id: "paid", label: "Pagas" }, { id: "essential", label: "Essenciais" }].map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                padding: "6px 12px", borderRadius: 8, border: `1px solid ${filter === f.id ? COLORS.accent : COLORS.border}`,
                background: filter === f.id ? `${COLORS.accent}20` : "transparent",
                color: filter === f.id ? COLORS.accent : COLORS.textMuted, fontSize: 12, fontWeight: 500, cursor: "pointer",
              }}>{f.label}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(expense => {
            const cat = CATEGORIES.find(c => c.id === expense.category);
            return (
              <div key={expense.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderRadius: 12, background: COLORS.bgInput, border: `1px solid ${COLORS.border}` }}>
                <IconBox icon={cat?.icon || Receipt} color={cat?.color || COLORS.textMuted} size={38} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{expense.name}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 3 }}>
                    <Badge color={cat?.color || COLORS.textMuted}>{cat?.name || expense.category}</Badge>
                    {expense.recurring && <Badge color={COLORS.textDim}>Recorrente</Badge>}
                    {expense.essential && <Badge color={COLORS.blue}>Essencial</Badge>}
                  </div>
                </div>
                {expense.dueDate && (
                  <div style={{ textAlign: "center", marginRight: 12 }}>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>Venc.</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>dia {expense.dueDate}</div>
                  </div>
                )}
                <div style={{ textAlign: "right", minWidth: 100 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, fontVariantNumeric: "tabular-nums" }}>{formatCurrency(expense.value)}</div>
                  <Badge color={expense.paid ? COLORS.green : COLORS.amber}>{expense.paid ? "Pago" : "Pendente"}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
