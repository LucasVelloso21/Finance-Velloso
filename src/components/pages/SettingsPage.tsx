"use client";

import { COLORS } from "@/lib/theme";
import { CATEGORIES } from "@/lib/categories";
import { mockIncome } from "@/data/mock";
import { Card, Badge, SectionTitle } from "@/components/ui";

export default function SettingsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 700 }}>
      <Card>
        <SectionTitle>Perfil</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
            background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`, fontSize: 24, fontWeight: 800, color: "#fff",
          }}>LM</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text }}>Lucas Mendes</div>
            <div style={{ fontSize: 13, color: COLORS.textMuted }}>lucas@email.com</div>
            <Badge color={COLORS.blue}>CLT</Badge>
          </div>
        </div>
        {[
          { label: "Nome", value: "Lucas Mendes" },
          { label: "Email", value: "lucas@email.com" },
          { label: "Perfil Financeiro", value: "CLT" },
          { label: "Meta de Economia", value: "15% da renda" },
          { label: "Moeda", value: "BRL (R$)" },
        ].map((field, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${COLORS.border}` }}>
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>{field.label}</span>
            <span style={{ fontSize: 13, color: COLORS.text, fontWeight: 500 }}>{field.value}</span>
          </div>
        ))}
      </Card>

      <Card>
        <SectionTitle>Datas de Recebimento</SectionTitle>
        {mockIncome.map(inc => (
          <div key={inc.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
            <span style={{ fontSize: 13, color: COLORS.text }}>{inc.name}</span>
            <Badge color={COLORS.green}>Dia {inc.date}</Badge>
          </div>
        ))}
      </Card>

      <Card>
        <SectionTitle>Categorias</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CATEGORIES.map(cat => (
            <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}>
              <cat.icon size={14} color={cat.color} />
              <span style={{ fontSize: 12, color: cat.color, fontWeight: 500 }}>{cat.name}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle>Preferências</SectionTitle>
        {[
          { label: "Alertas de vencimento", enabled: true },
          { label: "Lembretes por email", enabled: false },
          { label: "Modo simulação", enabled: true },
          { label: "Guardar automaticamente", enabled: true },
        ].map((pref, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${COLORS.border}` }}>
            <span style={{ fontSize: 13, color: COLORS.text }}>{pref.label}</span>
            <div style={{
              width: 40, height: 22, borderRadius: 11, cursor: "pointer",
              background: pref.enabled ? COLORS.accent : COLORS.bgInput,
              border: `1px solid ${pref.enabled ? COLORS.accent : COLORS.border}`,
              position: "relative", transition: "all 0.2s",
            }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: pref.enabled ? 20 : 3, transition: "left 0.2s" }} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
