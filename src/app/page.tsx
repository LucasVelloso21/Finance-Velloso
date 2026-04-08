"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard, Wallet, CreditCard, Receipt, PiggyBank, TrendingUp,
  Settings, ChevronRight, ChevronLeft, ArrowUpRight, ArrowDownRight,
  Bell, User, Eye, EyeOff, Mail, Lock, Shield, X, Star, Zap,
  Home as HomeIcon, Car, UtensilsCrossed, GraduationCap, Wifi, Smartphone,
  ShoppingBag, Landmark, Banknote, Plus, Trash2, Edit3, ChevronDown,
  AlertTriangle, TrendingDown, Calendar, Target, Clock,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart as RPie, Pie, Cell,
} from "recharts";
import { C, BRANDS, CATS, TYPES as TYPE_LABELS, fmt, pct, uid, cm as currentMonth, cd as currentDay, dleft as daysLeft, dim as daysInMonth, fmtD as fmtDate } from "@/lib/constants";
import { Card, Progress, Tag, Empty, Btn, CurrencyInput, DateInput, Select, TextInput, Label, Modal, Checkbox } from "@/components/ui";

// ══════════════════════════════════════════
// SIDEBAR
// ══════════════════════════════════════════
const NAV = [
  { id: "dashboard", label: "Início", icon: LayoutDashboard },
  { id: "income", label: "Receitas", icon: Wallet },
  { id: "expenses", label: "Despesas", icon: Receipt },
  { id: "cards", label: "Cartões", icon: CreditCard },
  { id: "savings", label: "Metas", icon: PiggyBank },
  { id: "projections", label: "Projeções", icon: TrendingUp },
  { id: "settings", label: "Ajustes", icon: Settings },
];

function Sidebar({ active, onNav, collapsed, onToggle }: any) {
  return (
    <div style={{ width: collapsed ? 64 : 230, height: "100vh", background: C.bg, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", transition: "width 0.3s cubic-bezier(.4,0,.2,1)", overflow: "hidden", position: "fixed", left: 0, top: 0, zIndex: 100 }}>
      <div style={{ padding: collapsed ? "20px 16px" : "20px 22px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${C.border}`, minHeight: 64 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Zap size={15} color="#000" />
        </div>
        {!collapsed && <div><div style={{ fontSize: 16, fontWeight: 700, color: C.text, lineHeight: 1 }}>Velloso</div><div style={{ fontSize: 8, color: C.dim, letterSpacing: 2, textTransform: "uppercase" }}>finance</div></div>}
      </div>
      <div style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV.map(it => {
          const ac = active === it.id;
          return <div key={it.id} onClick={() => onNav(it.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px" : "10px 14px", borderRadius: 10, cursor: "pointer", background: ac ? C.card2 : "transparent", justifyContent: collapsed ? "center" : "flex-start", transition: "background 0.15s" }}>
            <it.icon size={18} color={ac ? C.accent : C.dim} style={{ transition: "color 0.15s" }} />
            {!collapsed && <span style={{ fontSize: 13, fontWeight: ac ? 600 : 400, color: ac ? C.text : C.sub, transition: "color 0.15s" }}>{it.label}</span>}
          </div>;
        })}
      </div>
      <div style={{ padding: 10, borderTop: `1px solid ${C.border}` }}>
        <div onClick={onToggle} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 6, borderRadius: 6, cursor: "pointer" }}>{collapsed ? <ChevronRight size={15} color={C.dim} /> : <ChevronLeft size={15} color={C.dim} />}</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// HEADER
// ══════════════════════════════════════════
function Header({ page, onNotif, notifOpen, pendingCount }: any) {
  const titles: any = { dashboard: "Início", income: "Receitas", expenses: "Despesas", cards: "Cartões", savings: "Metas", projections: "Projeções", settings: "Ajustes" };
  return (
    <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", borderBottom: `1px solid ${C.border}`, background: C.bg, position: "sticky", top: 0, zIndex: 50 }}>
      <h1 style={{ fontSize: 17, fontWeight: 600, color: C.text, margin: 0 }}>{titles[page]}</h1>
      <div onClick={onNotif} style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: notifOpen ? C.card2 : "transparent", border: `1px solid ${C.border}`, cursor: "pointer", position: "relative", transition: "background 0.15s" }}>
        <Bell size={17} color={C.sub} />
        {pendingCount > 0 && <div style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: "50%", background: C.red, border: `2px solid ${C.bg}` }} />}
      </div>
    </div>
  );
}

function NotifPanel({ open, onClose, expenses }: any) {
  if (!open) return null;
  const pending = expenses.filter((e: any) => !e.paid);
  return <>
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200 }} />
    <div className="fade-in" style={{ position: "fixed", top: 60, right: 24, width: 320, zIndex: 201, background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, boxShadow: "0 16px 48px rgba(0,0,0,0.6)" }}>
      <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Pendências</span>
        <X size={14} color={C.sub} style={{ cursor: "pointer" }} onClick={onClose} />
      </div>
      <div style={{ maxHeight: 300, overflowY: "auto" }}>
        {pending.length === 0 && <div style={{ padding: 24, textAlign: "center" }}><p style={{ fontSize: 12, color: C.dim }}>Tudo em dia!</p></div>}
        {pending.map((e: any, i: number) => (
          <div key={i} style={{ padding: "12px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.yellow, flexShrink: 0 }} />
            <div style={{ flex: 1 }}><p style={{ fontSize: 12, color: C.text, margin: 0 }}>{e.name}</p><p style={{ fontSize: 10, color: C.dim, margin: 0 }}>{fmtDate(e.dueDay, e.dueMonth)}</p></div>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.red }}>{fmt(e.value)}</span>
          </div>
        ))}
      </div>
    </div>
  </>;
}

const TT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
    <p style={{ fontSize: 9, color: C.dim, margin: "0 0 4px" }}>{label}</p>
    {payload.map((x: any, i: number) => <p key={i} style={{ fontSize: 10, color: x.color, margin: "1px 0", fontWeight: 500 }}>{x.name}: {fmt(x.value)}</p>)}
  </div>;
};

// ══════════════════════════════════════════
// DASHBOARD — Decision-oriented (redesigned)
// ══════════════════════════════════════════
function DashboardPage({ income, expenses, cards, onAddExpense, onAddIncome, onNav }: any) {
  const tI = income.reduce((s: number, i: any) => s + i.value, 0);
  const tE = expenses.reduce((s: number, e: any) => s + e.value, 0);
  const tC = cards.reduce((s: number, c: any) => s + c.used, 0);
  const totalOut = tE + tC;
  const saldo = tI - totalOut;
  const compromisso = tI > 0 ? (totalOut / tI) * 100 : 0;
  const dailyBudget = daysLeft > 0 ? Math.max(0, saldo) / daysLeft : 0;

  // Status
  const getStatus = () => {
    if (compromisso > 85) return { label: "Risco", color: C.red, icon: AlertTriangle };
    if (compromisso > 65) return { label: "Atenção", color: C.yellow, icon: AlertTriangle };
    return { label: "Controlado", color: C.green, icon: Shield };
  };
  const status = getStatus();

  // Category data
  const catData = expenses.reduce((a: any[], e: any) => {
    const cat = CATS.find(x => x.id === e.category);
    if (cat) { const ex = a.find(x => x.name === cat.name); if (ex) ex.value += e.value; else a.push({ name: cat.name, value: e.value, color: cat.color }); }
    return a;
  }, []).sort((a: any, b: any) => b.value - a.value);

  // Smart alerts
  const alerts: { text: string; color: string }[] = [];
  if (compromisso > 80) alerts.push({ text: `${pct(compromisso)} da renda já comprometida`, color: C.red });
  if (saldo < 0) alerts.push({ text: "Saldo negativo — gastos excedem receitas", color: C.red });
  const pendingCount = expenses.filter((e: any) => !e.paid).length;
  if (pendingCount > 0) alerts.push({ text: `${pendingCount} conta${pendingCount > 1 ? "s" : ""} pendente${pendingCount > 1 ? "s" : ""}`, color: C.yellow });
  cards.forEach((c: any) => {
    const usage = c.limit > 0 ? (c.used / c.limit) * 100 : 0;
    if (usage > 70) alerts.push({ text: `${BRANDS[c.brand]?.name || "Cartão"}: ${pct(usage)} do limite usado`, color: C.yellow });
  });

  // Timeline events
  const timeline = [
    ...income.map((i: any) => ({ day: i.day || 1, name: i.name, value: i.value, type: "in" as const })),
    ...expenses.map((e: any) => ({ day: e.dueDay || 1, name: e.name, value: e.value, type: "out" as const, paid: e.paid })),
  ].sort((a, b) => a.day - b.day);

  if (tI === 0 && tE === 0 && cards.length === 0) {
    return <Empty text="Seu painel financeiro está vazio" action={
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <Btn primary onClick={onAddIncome}><Plus size={13} /> Receita</Btn>
        <Btn onClick={onAddExpense}><Plus size={13} /> Despesa</Btn>
      </div>
    } />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* ── HERO: Saldo + Status + Daily Budget ── */}
      <div className="fade-in" style={{ background: "#161616", borderRadius: 20, border: `1px solid ${C.border}`, padding: "28px 28px 24px", position: "relative", overflow: "hidden" }}>
        {/* Subtle gradient accent */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${C.accent}08, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
          <div>
            <p style={{ fontSize: 12, color: C.sub, margin: "0 0 4px", fontWeight: 500 }}>Saldo disponível</p>
            <p style={{ fontSize: 34, fontWeight: 700, color: saldo >= 0 ? C.text : C.red, margin: "0 0 12px", letterSpacing: -1.5, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{fmt(saldo)}</p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 10, color: C.dim, margin: "0 0 2px" }}>Por dia até fim do mês</p>
                <p style={{ fontSize: 16, fontWeight: 600, color: dailyBudget > 50 ? C.text : C.red, margin: 0, fontVariantNumeric: "tabular-nums" }}>{fmt(dailyBudget)}</p>
              </div>
              <div>
                <p style={{ fontSize: 10, color: C.dim, margin: "0 0 2px" }}>Renda comprometida</p>
                <p style={{ fontSize: 16, fontWeight: 600, color: compromisso > 80 ? C.red : compromisso > 60 ? C.yellow : C.text, margin: 0 }}>{pct(compromisso)}</p>
              </div>
              <div>
                <p style={{ fontSize: 10, color: C.dim, margin: "0 0 2px" }}>Dias restantes</p>
                <p style={{ fontSize: 16, fontWeight: 600, color: C.text, margin: 0 }}>{daysLeft}</p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, background: `${status.color}12` }}>
              <status.icon size={13} color={status.color} />
              <span style={{ fontSize: 11, fontWeight: 600, color: status.color }}>{status.label}</span>
            </div>
            <Btn primary small onClick={onAddExpense}><Plus size={12} /> Novo Gasto</Btn>
          </div>
        </div>

        {/* Commitment bar */}
        <div style={{ marginTop: 16 }}>
          <Progress value={totalOut} max={tI || 1} color={compromisso > 80 ? C.red : compromisso > 60 ? C.yellow : C.green} h={4} />
        </div>
      </div>

      {/* ── SUMMARY ROW ── */}
      <div className="fade-in fade-d1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {[
          { l: "Entradas", v: tI, c: C.green, icon: ArrowUpRight },
          { l: "Saídas", v: tE, c: C.red, icon: ArrowDownRight },
          { l: "Cartões", v: tC, c: C.yellow, icon: CreditCard },
        ].map((x, i) => (
          <Card key={i} style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: C.sub }}>{x.l}</span>
              <x.icon size={14} color={x.c} />
            </div>
            <p style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: 0, fontVariantNumeric: "tabular-nums" }}>{fmt(x.v)}</p>
          </Card>
        ))}
      </div>

      {/* ── INSIGHTS ROW: Alerts + Categories ── */}
      <div className="fade-in fade-d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {/* Alerts */}
        <Card>
          <p style={{ fontSize: 13, fontWeight: 500, color: C.text, margin: "0 0 12px" }}>Alertas</p>
          {alerts.length === 0 && <p style={{ fontSize: 12, color: C.dim }}>Nenhum alerta no momento</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {alerts.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, background: `${a.color}06`, borderLeft: `3px solid ${a.color}` }}>
                <span style={{ fontSize: 11, color: a.color, lineHeight: 1.4 }}>{a.text}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top categories */}
        <Card>
          <p style={{ fontSize: 13, fontWeight: 500, color: C.text, margin: "0 0 12px" }}>Maiores gastos</p>
          {catData.length === 0 && <p style={{ fontSize: 12, color: C.dim }}>Sem dados</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {catData.slice(0, 4).map((c: any, i: number) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 11, color: C.sub }}>{c.name}</span>
                  <span style={{ fontSize: 11, color: C.text, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{fmt(c.value)}</span>
                </div>
                <Progress value={c.value} max={catData[0]?.value || 1} color={c.color} h={3} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── TIMELINE ── */}
      {timeline.length > 0 && (
        <Card className="fade-in fade-d3">
          <p style={{ fontSize: 13, fontWeight: 500, color: C.text, margin: "0 0 12px" }}>Linha do tempo — {daysInMonth > 0 ? `dia ${currentDay}/${daysInMonth}` : ""}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {timeline.slice(0, 8).map((ev, i) => {
              const isPast = ev.day <= currentDay;
              const isToday = ev.day === currentDay;
              const evColor = ev.type === "in" ? C.green : C.red;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 8, background: isToday ? `${C.accent}08` : "transparent", opacity: isPast && !isToday ? 0.45 : 1 }}>
                  <span style={{ fontSize: 10, color: C.dim, fontWeight: 600, width: 36, flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>dia {ev.day}</span>
                  {isToday && <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, flexShrink: 0 }} />}
                  <span style={{ fontSize: 12, color: C.text, flex: 1 }}>{ev.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: evColor, fontVariantNumeric: "tabular-nums" }}>
                    {ev.type === "in" ? "+" : "-"}{fmt(ev.value)}
                  </span>
                  {ev.type === "out" && "paid" in ev && (
                    <Tag color={ev.paid ? C.green : C.yellow}>{ev.paid ? "Pago" : "Pendente"}</Tag>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* ── CARDS PREVIEW ── */}
      {cards.length > 0 && (
        <div className="fade-in fade-d4">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: C.text, margin: 0 }}>Cartões</p>
            <span onClick={() => onNav("cards")} style={{ fontSize: 11, color: C.accent, cursor: "pointer", fontWeight: 500 }}>Ver todos →</span>
          </div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
            {cards.map((c: any) => {
              const b = BRANDS[c.brand] || BRANDS.outro;
              const u = c.limit > 0 ? (c.used / c.limit) * 100 : 0;
              return (
                <div key={c.id} onClick={() => onNav("cards")} style={{ minWidth: 180, padding: 16, borderRadius: 14, background: b.bg, color: (b as any).textColor || "#fff", flexShrink: 0, cursor: "pointer", transition: "transform 0.15s" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 4px" }}>{b.name}</p>
                  <p style={{ fontSize: 20, fontWeight: 700, margin: "4px 0 8px", fontVariantNumeric: "tabular-nums" }}>{fmt(c.used)}</p>
                  <Progress value={c.used} max={c.limit} color={u > 70 ? "#ff6b6b" : u > 40 ? "#ffc078" : "#69db7c"} h={3} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 9, opacity: 0.6 }}>Disponível</span>
                    <span style={{ fontSize: 9, opacity: 0.8, fontWeight: 600 }}>{fmt(c.limit - c.used)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════
// INCOME
// ══════════════════════════════════════════
function IncomePage({ income, setIncome }: any) {
  const [modal, setModal] = useState(false); const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState(""); const [value, setValue] = useState(0);
  const [day, setDay] = useState(""); const [month, setMonth] = useState(String(currentMonth));
  const [type, setType] = useState("salario");
  const total = income.reduce((s: number, i: any) => s + i.value, 0);

  const openNew = () => { setEditId(null); setName(""); setValue(0); setDay(""); setMonth(String(currentMonth)); setType("salario"); setModal(true); };
  const openEdit = (i: any) => { setEditId(i.id); setName(i.name); setValue(i.value); setDay(String(i.day || "")); setMonth(String(i.month || currentMonth)); setType(i.type); setModal(true); };
  const save = () => {
    if (!name || !value) return;
    const obj = { name, value, day: parseInt(day) || 1, month: parseInt(month) || currentMonth, type, recurring: true };
    if (editId) setIncome(income.map((i: any) => i.id === editId ? { ...i, ...obj } : i));
    else setIncome([...income, { id: uid(), ...obj }]);
    setModal(false);
  };

  return <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div><p style={{ fontSize: 11, color: C.sub }}>Total do mês</p><p style={{ fontSize: 26, fontWeight: 700, color: C.green, fontVariantNumeric: "tabular-nums" }}>{fmt(total)}</p></div>
      <Btn primary onClick={openNew}><Plus size={13} /> Nova Receita</Btn>
    </div>
    {income.length === 0 && <Empty text="Nenhuma receita cadastrada" action={<Btn primary onClick={openNew} style={{ margin: "0 auto" }}><Plus size={12} /> Adicionar</Btn>} />}
    {income.map((i: any) => <Card key={i.id} className="fade-in" style={{ padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${C.green}10` }}><Banknote size={17} color={C.green} /></div>
        <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 500, color: C.text, margin: 0 }}>{i.name}</p><p style={{ fontSize: 11, color: C.dim, margin: 0 }}>{fmtDate(i.day, i.month)} · {TYPE_LABELS[i.type] || i.type}</p></div>
        <span style={{ fontSize: 17, fontWeight: 600, color: C.green, fontVariantNumeric: "tabular-nums", marginRight: 8 }}>+{fmt(i.value)}</span>
        <Edit3 size={14} color={C.dim} style={{ cursor: "pointer", marginRight: 4 }} onClick={() => openEdit(i)} />
        <Trash2 size={14} color={C.dim} style={{ cursor: "pointer" }} onClick={() => setIncome(income.filter((x: any) => x.id !== i.id))} />
      </div>
    </Card>)}
    <Modal open={modal} onClose={() => setModal(false)} title={editId ? "Editar Receita" : "Nova Receita"}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div><Label>Nome</Label><TextInput value={name} onChange={setName} placeholder="Ex: Salário" /></div>
        <div><Label>Valor</Label><CurrencyInput value={value} onChange={setValue} large /></div>
        <div><Label>Data (dia/mês)</Label><DateInput day={day} month={month} onDayChange={setDay} onMonthChange={setMonth} /></div>
        <div><Label>Tipo</Label><Select value={type} onChange={setType} options={Object.entries(TYPE_LABELS).map(([v, l]) => ({ value: v, label: l }))} /></div>
        <Btn primary onClick={save} style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>{editId ? "Salvar" : "Adicionar"}</Btn>
      </div>
    </Modal>
  </div>;
}

// ══════════════════════════════════════════
// EXPENSES
// ══════════════════════════════════════════
function ExpensesPage({ expenses, setExpenses, triggerOpen }: any) {
  const [modal, setModal] = useState(false); const [editId, setEditId] = useState<number | null>(null); const [filter, setFilter] = useState("all");
  const [name, setName] = useState(""); const [value, setValue] = useState(0);
  const [day, setDay] = useState(""); const [month, setMonth] = useState(String(currentMonth));
  const [category, setCategory] = useState("moradia"); const [essential, setEssential] = useState(false);

  useEffect(() => { if (triggerOpen > 0) openNew(); }, [triggerOpen]);

  const openNew = () => { setEditId(null); setName(""); setValue(0); setDay(""); setMonth(String(currentMonth)); setCategory("moradia"); setEssential(false); setModal(true); };
  const openEdit = (e: any) => { setEditId(e.id); setName(e.name); setValue(e.value); setDay(String(e.dueDay || "")); setMonth(String(e.dueMonth || currentMonth)); setCategory(e.category); setEssential(e.essential); setModal(true); };
  const save = () => {
    if (!name || !value) return;
    const obj = { name, value, dueDay: parseInt(day) || null, dueMonth: parseInt(month) || currentMonth, category, essential };
    if (editId) setExpenses(expenses.map((e: any) => e.id === editId ? { ...e, ...obj } : e));
    else setExpenses([...expenses, { id: uid(), ...obj, paid: false, recurring: false }]);
    setModal(false);
  };
  const fl = filter === "all" ? expenses : filter === "paid" ? expenses.filter((e: any) => e.paid) : filter === "pending" ? expenses.filter((e: any) => !e.paid) : expenses.filter((e: any) => e.essential);
  const total = expenses.reduce((s: number, e: any) => s + e.value, 0);
  const pending = expenses.filter((e: any) => !e.paid).reduce((s: number, e: any) => s + e.value, 0);

  return <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 20 }}>
        <div><p style={{ fontSize: 10, color: C.sub }}>Total</p><p style={{ fontSize: 20, fontWeight: 700, color: C.red, fontVariantNumeric: "tabular-nums" }}>{fmt(total)}</p></div>
        <div><p style={{ fontSize: 10, color: C.sub }}>Pendente</p><p style={{ fontSize: 20, fontWeight: 700, color: C.yellow, fontVariantNumeric: "tabular-nums" }}>{fmt(pending)}</p></div>
      </div>
      <Btn primary onClick={openNew}><Plus size={13} /> Nova Despesa</Btn>
    </div>
    <div style={{ display: "flex", gap: 6 }}>
      {[{ id: "all", l: "Todas" }, { id: "pending", l: "Pendentes" }, { id: "paid", l: "Pagas" }, { id: "essential", l: "Essenciais" }].map(f =>
        <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: "7px 13px", borderRadius: 8, border: `1px solid ${filter === f.id ? C.accent + "50" : C.border}`, background: filter === f.id ? `${C.accent}0c` : "transparent", color: filter === f.id ? C.accent : C.dim, fontSize: 11, fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}>{f.l}</button>
      )}
    </div>
    {fl.length === 0 && <Empty text="Nenhuma despesa encontrada" action={<Btn primary onClick={openNew} style={{ margin: "0 auto" }}><Plus size={12} /> Adicionar</Btn>} />}
    {fl.map((e: any) => {
      const cat = CATS.find(c => c.id === e.category);
      return <Card key={e.id} className="fade-in" style={{ padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${cat?.color || C.dim}10` }}>
            <Receipt size={15} color={cat?.color || C.dim} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: C.text, margin: 0 }}>{e.name}</p>
            <div style={{ display: "flex", gap: 4, marginTop: 3 }}>
              <Tag color={cat?.color}>{cat?.name || "Outros"}</Tag>
              <Tag>{fmtDate(e.dueDay, e.dueMonth)}</Tag>
              {e.essential && <Tag color={C.blue}>Essencial</Tag>}
            </div>
          </div>
          <div style={{ textAlign: "right", marginRight: 6 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "0 0 2px", fontVariantNumeric: "tabular-nums" }}>{fmt(e.value)}</p>
            <Tag color={e.paid ? C.green : C.yellow}>{e.paid ? "Pago" : "Pendente"}</Tag>
          </div>
          <Checkbox checked={e.paid} onChange={() => setExpenses(expenses.map((x: any) => x.id === e.id ? { ...x, paid: !x.paid } : x))} />
          <Edit3 size={13} color={C.dim} style={{ cursor: "pointer" }} onClick={() => openEdit(e)} />
          <Trash2 size={13} color={C.dim} style={{ cursor: "pointer" }} onClick={() => setExpenses(expenses.filter((x: any) => x.id !== e.id))} />
        </div>
      </Card>;
    })}
    <Modal open={modal} onClose={() => setModal(false)} title={editId ? "Editar Despesa" : "Nova Despesa"}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div><Label>Nome</Label><TextInput value={name} onChange={setName} placeholder="Ex: Aluguel" /></div>
        <div><Label>Valor</Label><CurrencyInput value={value} onChange={setValue} large /></div>
        <div><Label>Data (dia/mês)</Label><DateInput day={day} month={month} onDayChange={setDay} onMonthChange={setMonth} /></div>
        <div><Label>Categoria</Label><Select value={category} onChange={setCategory} options={CATS.map(c => ({ value: c.id, label: c.name }))} /></div>
        <Checkbox checked={essential} onChange={() => setEssential(!essential)} label="Essencial" color={C.blue} />
        <Btn primary onClick={save} style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>{editId ? "Salvar" : "Adicionar"}</Btn>
      </div>
    </Modal>
  </div>;
}

// ══════════════════════════════════════════
// CARDS — with expandable purchases
// ══════════════════════════════════════════
function CardsPage({ cards, setCards }: any) {
  const [modal, setModal] = useState(false); const [purchaseModal, setPurchaseModal] = useState<number | null>(null);
  const [brand, setBrand] = useState("nubank"); const [limit, setLimit] = useState(0);
  const [pName, setPName] = useState(""); const [pValue, setPValue] = useState(0);
  const [pDay, setPDay] = useState(""); const [pMonth, setPMonth] = useState(String(currentMonth));
  const [openCard, setOpenCard] = useState<number | null>(null);

  const addCard = () => { if (!limit) return; setCards([...cards, { id: uid(), brand, limit, used: 0, purchases: [] }]); setLimit(0); setModal(false); };
  const addPurchase = (cardId: number) => {
    if (!pName || !pValue) return;
    setCards(cards.map((c: any) => {
      if (c.id === cardId) { const np = [...c.purchases, { id: uid(), name: pName, value: pValue, day: pDay, month: pMonth }]; return { ...c, purchases: np, used: np.reduce((s: number, p: any) => s + p.value, 0) }; }
      return c;
    }));
    setPName(""); setPValue(0); setPDay(""); setPurchaseModal(null);
  };

  return <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", justifyContent: "flex-end" }}><Btn primary onClick={() => setModal(true)}><Plus size={13} /> Novo Cartão</Btn></div>
    {cards.length === 0 && <Empty text="Nenhum cartão cadastrado" action={<Btn primary onClick={() => setModal(true)} style={{ margin: "0 auto" }}><Plus size={12} /> Adicionar</Btn>} />}
    {cards.map((c: any) => {
      const b = BRANDS[c.brand] || BRANDS.outro; const u = c.limit > 0 ? (c.used / c.limit) * 100 : 0;
      const bc = u > 70 ? C.red : u > 40 ? C.yellow : C.green; const isOpen = openCard === c.id;
      return <div key={c.id} className="fade-in">
        <div onClick={() => setOpenCard(isOpen ? null : c.id)} style={{ padding: 20, borderRadius: isOpen ? "16px 16px 0 0" : 16, background: b.bg, color: (b as any).textColor || "#fff", cursor: "pointer" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div><p style={{ fontSize: 16, fontWeight: 700, margin: "0 0 4px" }}>{b.name}</p><p style={{ fontSize: 24, fontWeight: 700, margin: "4px 0 10px", fontVariantNumeric: "tabular-nums" }}>{fmt(c.used)}</p></div>
            <div style={{ display: "flex", gap: 6 }}>
              <div onClick={e => { e.stopPropagation(); setPurchaseModal(c.id); }} style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Plus size={14} /></div>
              <div onClick={e => { e.stopPropagation(); setCards(cards.filter((x: any) => x.id !== c.id)); }} style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Trash2 size={14} /></div>
            </div>
          </div>
          <Progress value={c.used} max={c.limit} color={bc} h={4} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 10, opacity: 0.6 }}>Limite: {fmt(c.limit)}</span>
            <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 600 }}>Disponível: {fmt(c.limit - c.used)}</span>
          </div>
          <div style={{ textAlign: "center", marginTop: 4 }}><ChevronDown size={14} style={{ opacity: 0.4, transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} /></div>
        </div>
        {isOpen && <div style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 16px 16px", padding: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: C.text, margin: "0 0 10px" }}>Compras na fatura</p>
          {c.purchases.length === 0 && <p style={{ fontSize: 11, color: C.dim }}>Nenhuma compra lançada</p>}
          {c.purchases.map((p: any) => <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, background: C.card2, marginBottom: 4 }}>
            <div style={{ flex: 1 }}><p style={{ fontSize: 12, fontWeight: 500, color: C.text, margin: 0 }}>{p.name}</p><p style={{ fontSize: 10, color: C.dim, margin: 0 }}>{fmtDate(p.day, p.month)}</p></div>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text, fontVariantNumeric: "tabular-nums" }}>{fmt(p.value)}</span>
            <Trash2 size={12} color={C.dim} style={{ cursor: "pointer" }} onClick={() => setCards(cards.map((card: any) => { if (card.id === c.id) { const np = card.purchases.filter((x: any) => x.id !== p.id); return { ...card, purchases: np, used: np.reduce((s: number, x: any) => s + x.value, 0) }; } return card; }))} />
          </div>)}
          <div style={{ marginTop: 8, padding: "10px 12px", borderRadius: 10, background: `${bc}0c`, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: C.sub }}>Total fatura</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: bc }}>{fmt(c.used)}</span>
          </div>
        </div>}
      </div>;
    })}
    <Modal open={modal} onClose={() => setModal(false)} title="Novo Cartão">
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div><Label>Banco</Label><Select value={brand} onChange={setBrand} options={Object.entries(BRANDS).map(([v, b]) => ({ value: v, label: b.name }))} /></div>
        <div><Label>Limite</Label><CurrencyInput value={limit} onChange={setLimit} large /></div>
        <Btn primary onClick={addCard} style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>Adicionar</Btn>
      </div>
    </Modal>
    <Modal open={!!purchaseModal} onClose={() => setPurchaseModal(null)} title="Nova Compra">
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div><Label>Descrição</Label><TextInput value={pName} onChange={setPName} placeholder="Ex: iFood" /></div>
        <div><Label>Valor</Label><CurrencyInput value={pValue} onChange={setPValue} large /></div>
        <div><Label>Data</Label><DateInput day={pDay} month={pMonth} onDayChange={setPDay} onMonthChange={setPMonth} /></div>
        <Btn primary onClick={() => purchaseModal && addPurchase(purchaseModal)} style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>Adicionar</Btn>
      </div>
    </Modal>
  </div>;
}

// ══════════════════════════════════════════
// SAVINGS
// ══════════════════════════════════════════
function SavingsPage({ savings, setSavings }: any) {
  const [modal, setModal] = useState(false);
  const [label, setLabel] = useState(""); const [goal, setGoal] = useState(0); const [current, setCurrent] = useState(0);
  const total = savings.reduce((s: number, v: any) => s + v.current, 0);
  const icons = [Shield, Star, Car, PiggyBank, HomeIcon, Target];
  const colors = [C.green, C.yellow, C.blue, C.purple, C.accent, "#60a5fa"];
  return <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div><p style={{ fontSize: 11, color: C.sub }}>Total guardado</p><p style={{ fontSize: 24, fontWeight: 700, color: C.green, fontVariantNumeric: "tabular-nums" }}>{fmt(total)}</p></div>
      <Btn primary onClick={() => setModal(true)}><Plus size={13} /> Nova Meta</Btn>
    </div>
    {savings.length === 0 && <Empty text="Defina suas metas financeiras" />}
    {savings.map((s: any, i: number) => {
      const Icon = icons[i % icons.length]; const color = colors[i % colors.length]; const p = s.goal > 0 ? (s.current / s.goal) * 100 : 0;
      return <Card key={s.id} className="fade-in">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${color}10` }}><Icon size={17} color={color} /></div>
          <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 500, color: C.text, margin: 0 }}>{s.label}</p><p style={{ fontSize: 11, color: C.dim, margin: 0 }}>{fmt(s.current)} de {fmt(s.goal)}</p></div>
          <span style={{ fontSize: 18, fontWeight: 700, color }}>{pct(p)}</span>
          <Trash2 size={13} color={C.dim} style={{ cursor: "pointer" }} onClick={() => setSavings(savings.filter((x: any) => x.id !== s.id))} />
        </div>
        <Progress value={s.current} max={s.goal} color={color} h={5} />
      </Card>;
    })}
    <Modal open={modal} onClose={() => setModal(false)} title="Nova Meta">
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div><Label>Nome</Label><TextInput value={label} onChange={setLabel} placeholder="Ex: Reserva de Emergência" /></div>
        <div><Label>Objetivo</Label><CurrencyInput value={goal} onChange={setGoal} large /></div>
        <div><Label>Já guardou</Label><CurrencyInput value={current} onChange={setCurrent} large /></div>
        <Btn primary onClick={() => { if (!label || !goal) return; setSavings([...savings, { id: uid(), label, goal, current }]); setLabel(""); setGoal(0); setCurrent(0); setModal(false); }} style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>Adicionar</Btn>
      </div>
    </Modal>
  </div>;
}

// ══════════════════════════════════════════
// PROJECTIONS
// ══════════════════════════════════════════
function ProjectionsPage({ income, expenses }: any) {
  const months = ["Abr", "Mai", "Jun", "Jul", "Ago", "Set"];
  const bI = income.reduce((s: number, i: any) => s + i.value, 0);
  const [projExp, setProjExp] = useState<any[]>([]);
  const [extraIncome, setExtraIncome] = useState<number[]>([]);
  const [gen, setGen] = useState(false);

  useEffect(() => {
    setProjExp(expenses.map((e: any) => ({ ...e, months: months.map(() => e.value) })));
    setExtraIncome(months.map(() => bI)); setGen(false);
  }, [expenses.length, bI]);

  const chartData = months.map((m, mi) => {
    const tExp = projExp.reduce((s: number, e: any) => s + (e.months?.[mi] || 0), 0);
    return { month: m, income: extraIncome[mi] || 0, expenses: tExp, saved: Math.max(0, (extraIncome[mi] || 0) - tExp) };
  });

  if (expenses.length === 0) return <Empty text="Cadastre despesas primeiro para projetar" />;

  return <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <Card>
      <p style={{ fontSize: 14, fontWeight: 500, color: C.text, margin: "0 0 16px" }}>Personalize cada gasto por mês</p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: 11 }}>
          <thead><tr>
            <th style={{ textAlign: "left", padding: "8px 10px", color: C.dim, fontWeight: 600, position: "sticky", left: 0, background: C.card, minWidth: 110 }}>Gasto</th>
            {months.map(m => <th key={m} style={{ padding: "8px 4px", color: C.dim, fontWeight: 600, textAlign: "center", minWidth: 100 }}>{m}</th>)}
          </tr></thead>
          <tbody>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              <td style={{ padding: "8px 10px", color: C.green, fontWeight: 600, position: "sticky", left: 0, background: C.card }}>Receita</td>
              {months.map((_, mi) => <td key={mi} style={{ padding: 4 }}><CurrencyInput value={extraIncome[mi] || 0} onChange={v => { const ni = [...extraIncome]; ni[mi] = v; setExtraIncome(ni); }} /></td>)}
            </tr>
            {projExp.map((e: any, ei: number) => <tr key={e.id} style={{ borderBottom: `1px solid ${C.border}` }}>
              <td style={{ padding: "8px 10px", color: C.text, fontWeight: 500, position: "sticky", left: 0, background: C.card }}>{e.name}</td>
              {months.map((_, mi) => <td key={mi} style={{ padding: 4 }}><CurrencyInput value={e.months?.[mi] || 0} onChange={v => { const np = [...projExp]; np[ei] = { ...np[ei], months: [...(np[ei].months || [])] }; np[ei].months[mi] = v; setProjExp(np); }} /></td>)}
            </tr>)}
            <tr><td style={{ padding: "8px 10px", color: C.accent, fontWeight: 600, position: "sticky", left: 0, background: C.card }}>Sobra</td>
              {chartData.map((d, i) => <td key={i} style={{ padding: "8px 4px", textAlign: "center", fontWeight: 600, color: d.saved >= 0 ? C.green : C.red, fontSize: 12 }}>{fmt(d.saved)}</td>)}</tr>
          </tbody>
        </table>
      </div>
      <Btn primary onClick={() => setGen(true)} style={{ width: "100%", justifyContent: "center", marginTop: 16 }}>Gerar Projeção</Btn>
    </Card>
    {gen && <Card className="fade-in">
      <p style={{ fontSize: 14, fontWeight: 500, color: C.text, margin: "0 0 16px" }}>Projeção Visual</p>
      <div style={{ height: 240 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}>
        <CartesianGrid stroke="#1e1e1e" strokeDasharray="3 3" /><XAxis dataKey="month" tick={{ fill: C.dim, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: C.dim, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<TT />} /><Bar dataKey="income" fill={C.green} radius={[4, 4, 0, 0]} name="Receitas" />
        <Bar dataKey="expenses" fill={C.red} radius={[4, 4, 0, 0]} name="Despesas" /><Bar dataKey="saved" fill={C.purple} radius={[4, 4, 0, 0]} name="Sobra" />
        <Legend wrapperStyle={{ fontSize: 10, color: C.dim }} />
      </BarChart></ResponsiveContainer></div>
    </Card>}
  </div>;
}

// ══════════════════════════════════════════
// SETTINGS
// ══════════════════════════════════════════
function SettingsPage() {
  return <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 520 }}>
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: C.card2, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 18, fontWeight: 700, color: C.accent }}>LV</span></div>
        <div><p style={{ fontSize: 16, fontWeight: 600, color: C.text, margin: 0 }}>Lucas Velloso</p><p style={{ fontSize: 12, color: C.dim, margin: 0 }}>lucas@email.com</p></div>
      </div>
      {[{ l: "Perfil", v: "CLT" }, { l: "Meta economia", v: "15%" }, { l: "Moeda", v: "BRL (R$)" }].map((f, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 12, color: C.sub }}>{f.l}</span><span style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{f.v}</span>
      </div>)}
    </Card>
    <Card>
      <p style={{ fontSize: 13, fontWeight: 500, color: C.text, margin: "0 0 10px" }}>Categorias</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {CATS.map(cat => <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 6, background: `${cat.color}10` }}>
          <div style={{ width: 6, height: 6, borderRadius: 2, background: cat.color }} />
          <span style={{ fontSize: 11, color: cat.color, fontWeight: 500 }}>{cat.name}</span>
        </div>)}
      </div>
    </Card>
  </div>;
}

// ══════════════════════════════════════════
// LOGIN
// ══════════════════════════════════════════
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<"login" | "register" | "recover">("login");
  const [showPass, setSP] = useState(false); const [focus, setFocus] = useState<string | null>(null);
  const inp = (f: string) => ({ display: "flex" as const, alignItems: "center" as const, gap: 8, padding: "11px 14px", borderRadius: 10, background: focus === f ? "#1a1a1a" : "#141414", border: `1px solid ${focus === f ? "#333" : "#1e1e1e"}`, transition: "all 0.2s" });
  const inpS: React.CSSProperties = { background: "transparent", border: "none", color: C.text, fontSize: 13, outline: "none", width: "100%" };
  return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080808" }}>
    <div className="fade-in" style={{ width: "100%", maxWidth: 380, padding: "40px 36px", background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: 22 }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: C.accent, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}><Zap size={20} color="#000" /></div>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>Velloso</div>
        <div style={{ fontSize: 9, color: C.dim, letterSpacing: 2, textTransform: "uppercase", marginTop: 3 }}>Finance</div>
      </div>
      {mode !== "recover" && <>
        <button style={{ width: "100%", padding: "11px", borderRadius: 10, border: "1px solid #1e1e1e", background: "#141414", color: C.sub, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <svg width="15" height="15" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continuar com Google
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}><div style={{ flex: 1, height: 1, background: "#1e1e1e" }} /><span style={{ fontSize: 10, color: C.dim }}>ou</span><div style={{ flex: 1, height: 1, background: "#1e1e1e" }} /></div>
      </>}
      {mode === "recover" && <p style={{ fontSize: 12, color: C.sub, textAlign: "center", margin: "0 0 18px" }}>Enviaremos um link para redefinir.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {mode === "register" && <div><Label>Nome</Label><div style={inp("name")}><User size={13} color={C.dim} /><input placeholder="Seu nome" onFocus={() => setFocus("name")} onBlur={() => setFocus(null)} style={inpS} /></div></div>}
        <div><Label>Email</Label><div style={inp("email")}><Mail size={13} color={C.dim} /><input placeholder="seu@email.com" onFocus={() => setFocus("email")} onBlur={() => setFocus(null)} style={inpS} /></div></div>
        {mode !== "recover" && <div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><Label>Senha</Label>{mode === "login" && <span onClick={() => setMode("recover")} style={{ fontSize: 10, color: C.accent, cursor: "pointer" }}>Esqueceu?</span>}</div><div style={inp("pass")}><Lock size={13} color={C.dim} /><input type={showPass ? "text" : "password"} placeholder="••••••••" onFocus={() => setFocus("pass")} onBlur={() => setFocus(null)} style={inpS} /><div onClick={() => setSP(!showPass)} style={{ cursor: "pointer" }}>{showPass ? <EyeOff size={13} color={C.dim} /> : <Eye size={13} color={C.dim} />}</div></div></div>}
      </div>
      <button onClick={onLogin} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: C.accent, color: "#000", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 18 }}>{mode === "login" ? "Entrar" : mode === "register" ? "Criar conta" : "Enviar"}</button>
      <div style={{ textAlign: "center", marginTop: 16 }}>{mode === "login" ? <span style={{ fontSize: 12, color: C.dim }}>Sem conta? <span onClick={() => setMode("register")} style={{ color: C.sub, cursor: "pointer", fontWeight: 500 }}>Criar</span></span> : <span style={{ fontSize: 12, color: C.dim }}>Tem conta? <span onClick={() => setMode("login")} style={{ color: C.sub, cursor: "pointer", fontWeight: 500 }}>Entrar</span></span>}</div>
    </div>
  </div>;
}

// ══════════════════════════════════════════
// ONBOARDING
// ══════════════════════════════════════════
function OnboardingPage({ onComplete }: { onComplete: (income: any[]) => void }) {
  const [step, setStep] = useState(0); const [profile, setProfile] = useState<string | null>(null);
  const [savePct, setSP] = useState(15); const [hover, setH] = useState<string | null>(null);
  const [sal, setSal] = useState(0); const [va, setVa] = useState(0); const [vt, setVt] = useState(0); const [ex, setEx] = useState(0);
  const profiles = [{ id: "clt", label: "CLT", icon: Landmark }, { id: "autonomo", label: "Autônomo", icon: Zap }, { id: "freelancer", label: "Freelancer", icon: Smartphone }, { id: "estudante", label: "Estudante", icon: GraduationCap }];
  const finish = () => {
    const ii: any[] = [];
    if (sal > 0) ii.push({ id: uid(), name: "Salário", value: sal, day: 20, month: currentMonth, type: "salario", recurring: true });
    if (va > 0) ii.push({ id: uid(), name: "Vale Adiantamento", value: va, day: 1, month: currentMonth, type: "va", recurring: true });
    if (vt > 0) ii.push({ id: uid(), name: "Vale Transporte", value: vt, day: 5, month: currentMonth, type: "vt", recurring: true });
    if (ex > 0) ii.push({ id: uid(), name: "Renda Extra", value: ex, day: 15, month: currentMonth, type: "extra", recurring: true });
    onComplete(ii);
  };
  const steps = [
    { title: "Seu perfil", content: <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{profiles.map(p => <div key={p.id} onClick={() => setProfile(p.id)} onMouseEnter={() => setH(p.id)} onMouseLeave={() => setH(null)} style={{ padding: 20, borderRadius: 14, cursor: "pointer", textAlign: "center", background: profile === p.id ? "#1e1e1e" : hover === p.id ? "#181818" : C.card, border: `2px solid ${profile === p.id ? C.accent : hover === p.id ? "#333" : C.border}`, transition: "all 0.2s" }}><p.icon size={24} color={profile === p.id ? C.accent : C.dim} style={{ marginBottom: 6 }} /><div style={{ fontSize: 13, fontWeight: 600, color: profile === p.id ? C.text : C.sub }}>{p.label}</div></div>)}</div> },
    { title: "Receitas", content: <div style={{ display: "flex", flexDirection: "column", gap: 12 }}><div><Label>Salário</Label><CurrencyInput value={sal} onChange={setSal} large /></div><div><Label>Vale Adiantamento</Label><CurrencyInput value={va} onChange={setVa} large /></div><div><Label>Vale Transporte</Label><CurrencyInput value={vt} onChange={setVt} large /></div><div><Label>Renda Extra</Label><CurrencyInput value={ex} onChange={setEx} large /></div></div> },
    { title: "Meta de economia", content: <div><div style={{ display: "flex", gap: 10, marginBottom: 16 }}>{[5, 10, 15, 20].map(p => <div key={p} onClick={() => setSP(p)} onMouseEnter={() => setH(`p${p}`)} onMouseLeave={() => setH(null)} style={{ flex: 1, padding: 16, borderRadius: 12, textAlign: "center", cursor: "pointer", background: savePct === p ? "#1e1e1e" : hover === `p${p}` ? "#181818" : C.card, border: `2px solid ${savePct === p ? C.accent : hover === `p${p}` ? "#333" : C.border}`, transition: "all 0.2s" }}><div style={{ fontSize: 22, fontWeight: 700, color: savePct === p ? C.accent : C.text }}>{p}%</div></div>)}</div><div style={{ padding: 14, borderRadius: 10, background: `${C.green}08`, textAlign: "center" }}><span style={{ fontSize: 12, color: C.green }}>≈ {fmt((sal + va + vt + ex) * savePct / 100)}/mês</span></div></div> },
  ];
  return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg }}>
    <div style={{ width: "100%", maxWidth: 460, padding: 36 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 34 }}>{steps.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, background: i <= step ? C.accent : "#1e1e1e", transition: "background 0.3s" }} />)}</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 20px", textAlign: "center" }}>{steps[step].title}</h2>
      {steps[step].content}
      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        {step > 0 && <Btn onClick={() => setStep(step - 1)}>Voltar</Btn>}
        <Btn primary onClick={() => step < steps.length - 1 ? setStep(step + 1) : finish()} style={{ flex: 1, justifyContent: "center" }}>{step < steps.length - 1 ? "Continuar" : "Começar"}</Btn>
      </div>
    </div>
  </div>;
}

// ══════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════
export default function Home() {
  const [auth, setAuth] = useState<"login" | "onboarding" | "app">("login");
  const [page, setPage] = useState("dashboard"); const [col, setCol] = useState(false); const [notif, setNotif] = useState(false);
  const [income, setIncome] = useState<any[]>([]); const [expenses, setExpenses] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]); const [savings, setSavings] = useState<any[]>([]);
  const [expTrigger, setExpTrigger] = useState(0);
  const sw = col ? 64 : 230; const pc = expenses.filter(e => !e.paid).length;

  if (auth === "login") return <LoginPage onLogin={() => setAuth("onboarding")} />;
  if (auth === "onboarding") return <OnboardingPage onComplete={(ii) => { setIncome(ii); setAuth("app"); }} />;

  const openExpenseModal = () => { setPage("expenses"); setExpTrigger(p => p + 1); };
  const goToIncome = () => setPage("income");

  return <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
    <Sidebar active={page} onNav={setPage} collapsed={col} onToggle={() => setCol(!col)} />
    <div style={{ marginLeft: sw, transition: "margin-left 0.3s cubic-bezier(.4,0,.2,1)" }}>
      <Header page={page} onNotif={() => setNotif(!notif)} notifOpen={notif} pendingCount={pc} />
      <NotifPanel open={notif} onClose={() => setNotif(false)} expenses={expenses} />
      <div style={{ padding: "22px 28px", maxWidth: 960 }}>
        {page === "dashboard" && <DashboardPage income={income} expenses={expenses} cards={cards} onAddExpense={openExpenseModal} onAddIncome={goToIncome} onNav={setPage} />}
        {page === "income" && <IncomePage income={income} setIncome={setIncome} />}
        {page === "expenses" && <ExpensesPage expenses={expenses} setExpenses={setExpenses} triggerOpen={expTrigger} />}
        {page === "cards" && <CardsPage cards={cards} setCards={setCards} />}
        {page === "savings" && <SavingsPage savings={savings} setSavings={setSavings} />}
        {page === "projections" && <ProjectionsPage income={income} expenses={expenses} />}
        {page === "settings" && <SettingsPage />}
      </div>
    </div>
  </div>;
}
