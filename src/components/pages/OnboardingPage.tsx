"use client";

import { useState } from "react";
import { Landmark, Zap, Smartphone, GraduationCap, Heart, Home, Banknote, UtensilsCrossed, Car } from "lucide-react";
import { COLORS } from "@/lib/theme";
import { formatCurrency } from "@/lib/utils";

interface OnboardingPageProps {
  onComplete: () => void;
}

const profiles = [
  { id: "clt", label: "CLT", desc: "Carteira assinada", icon: Landmark },
  { id: "autonomo", label: "Autônomo", desc: "Renda variável", icon: Zap },
  { id: "freelancer", label: "Freelancer", desc: "Projetos por demanda", icon: Smartphone },
  { id: "estudante", label: "Estudante", desc: "Bolsa ou mesada", icon: GraduationCap },
  { id: "casal", label: "Casal", desc: "Renda compartilhada", icon: Heart },
  { id: "familia", label: "Família", desc: "Múltiplas fontes", icon: Home },
];

export default function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<string | null>(null);
  const [savePct, setSavePct] = useState(15);

  const steps = [
    {
      title: "Qual é o seu perfil financeiro?",
      subtitle: "Isso nos ajuda a personalizar sua experiência",
      content: (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {profiles.map(p => (
            <div key={p.id} onClick={() => setProfile(p.id)} style={{
              padding: 20, borderRadius: 14, cursor: "pointer", textAlign: "center",
              background: profile === p.id ? `${COLORS.accent}15` : COLORS.bgInput,
              border: `2px solid ${profile === p.id ? COLORS.accent : COLORS.border}`,
              transition: "all 0.2s",
            }}>
              <p.icon size={28} color={profile === p.id ? COLORS.accent : COLORS.textMuted} style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{p.label}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Quanto você recebe por mês?",
      subtitle: "Inclua todas as suas fontes de renda",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { label: "Salário", placeholder: "R$ 6.500,00", icon: Banknote },
            { label: "Vale Alimentação", placeholder: "R$ 850,00", icon: UtensilsCrossed },
            { label: "Vale Transporte", placeholder: "R$ 320,00", icon: Car },
            { label: "Renda Extra", placeholder: "R$ 0,00", icon: Zap },
          ].map((field, i) => (
            <div key={i}>
              <label style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                <field.icon size={14} /> {field.label}
              </label>
              <input placeholder={field.placeholder} style={{
                width: "100%", padding: "12px 14px", borderRadius: 10,
                background: COLORS.bgInput, border: `1px solid ${COLORS.border}`,
                color: COLORS.text, fontSize: 16, fontWeight: 600, outline: "none", boxSizing: "border-box",
              }} />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Quanto deseja guardar?",
      subtitle: "Defina sua meta mensal de economia",
      content: (
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            {[5, 10, 15, 20].map(pct => (
              <div key={pct} onClick={() => setSavePct(pct)} style={{
                flex: 1, padding: 20, borderRadius: 14, textAlign: "center", cursor: "pointer",
                background: savePct === pct ? `${COLORS.accent}15` : COLORS.bgInput,
                border: `2px solid ${savePct === pct ? COLORS.accent : COLORS.border}`,
              }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: savePct === pct ? COLORS.accent : COLORS.text }}>{pct}%</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>da renda</div>
              </div>
            ))}
          </div>
          <div style={{ padding: 16, borderRadius: 12, background: `${COLORS.green}08`, border: `1px solid ${COLORS.green}20`, textAlign: "center" }}>
            <span style={{ fontSize: 13, color: COLORS.green }}>
              Com {savePct}% da sua renda, você guardará aproximadamente <strong>{formatCurrency(8870 * savePct / 100)}</strong> por mês
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: COLORS.bg, fontFamily: "'DM Sans', -apple-system, sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: 600, padding: 40 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? COLORS.accent : COLORS.border, transition: "background 0.3s" }} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: COLORS.text, marginBottom: 8, letterSpacing: -0.5 }}>{steps[step].title}</h2>
          <p style={{ fontSize: 14, color: COLORS.textMuted }}>{steps[step].subtitle}</p>
        </div>

        {steps[step].content}

        <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} style={{
              padding: "12px 24px", borderRadius: 12, border: `1px solid ${COLORS.border}`,
              background: "transparent", color: COLORS.textMuted, fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}>Voltar</button>
          )}
          <button onClick={() => step < steps.length - 1 ? setStep(step + 1) : onComplete()} style={{
            flex: 1, padding: "13px 24px", borderRadius: 12, border: "none",
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.purple})`,
            color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}>
            {step < steps.length - 1 ? "Continuar" : "Começar a usar"}
          </button>
        </div>
      </div>
    </div>
  );
}
