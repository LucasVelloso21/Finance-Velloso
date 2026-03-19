"use client";

import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Zap } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [mode, setMode] = useState<"login" | "register" | "recover">("login");
  const [showPass, setShowPass] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hoverGoogle, setHoverGoogle] = useState(false);
  const [hoverSubmit, setHoverSubmit] = useState(false);

  const inputWrap = (field: string) => ({
    display: "flex" as const, alignItems: "center" as const, gap: 10,
    padding: "13px 16px", borderRadius: 12,
    background: focusedField === field ? "#16161f" : "#111118",
    border: `1px solid ${focusedField === field ? "#3b3b50" : "#1c1c28"}`,
    transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
    boxShadow: focusedField === field ? "0 0 0 3px rgba(99,102,241,0.08)" : "none",
  });

  const inputStyle: React.CSSProperties = {
    background: "transparent", border: "none", color: "#f0f0f5",
    fontSize: 14, fontWeight: 400, outline: "none", width: "100%",
    letterSpacing: 0.1, lineHeight: 1.5,
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#08080d",
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)", top: "-15%", right: "-10%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,214,143,0.03) 0%, transparent 70%)", bottom: "-10%", left: "-8%", pointerEvents: "none" }} />

      <div style={{
        width: "100%", maxWidth: 420, padding: "44px 40px 40px",
        background: "#0d0d14", border: "1px solid #1a1a26", borderRadius: 20,
        boxShadow: "0 1px 2px rgba(0,0,0,0.3), 0 8px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.02) inset",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 13, marginBottom: 16,
            background: "linear-gradient(145deg, #6366f1, #818cf8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(99,102,241,0.25)",
          }}>
            <Zap size={22} color="#fff" strokeWidth={2.5} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#f0f0f5", letterSpacing: -0.5, lineHeight: 1 }}>Velloso</div>
          <div style={{ fontSize: 10.5, fontWeight: 500, color: "#52526b", letterSpacing: 3, textTransform: "uppercase", marginTop: 5 }}>Finance</div>
        </div>

        {mode !== "recover" && (
          <button onClick={onLogin} onMouseEnter={() => setHoverGoogle(true)} onMouseLeave={() => setHoverGoogle(false)} style={{
            width: "100%", padding: "12px 16px", borderRadius: 12,
            border: `1px solid ${hoverGoogle ? "#2a2a3a" : "#1c1c28"}`,
            background: hoverGoogle ? "#141420" : "#111118",
            color: "#d0d0da", fontSize: 13.5, fontWeight: 500, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)", letterSpacing: 0.1,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continuar com Google
          </button>
        )}

        {mode !== "recover" && (
          <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "22px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#1a1a26" }} />
            <span style={{ fontSize: 11, color: "#42424f", fontWeight: 500, letterSpacing: 0.5 }}>ou</span>
            <div style={{ flex: 1, height: 1, background: "#1a1a26" }} />
          </div>
        )}

        {mode === "recover" && (
          <p style={{ fontSize: 13, color: "#6b6b7b", textAlign: "center", marginBottom: 24, lineHeight: 1.6 }}>
            Informe seu email e enviaremos um link para redefinir sua senha.
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {mode === "register" && (
            <div>
              <label style={{ fontSize: 12, color: "#6b6b7b", marginBottom: 7, display: "block", fontWeight: 500 }}>Nome</label>
              <div style={inputWrap("name")}>
                <User size={15} color="#4a4a58" />
                <input placeholder="Seu nome completo" onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} style={inputStyle} />
              </div>
            </div>
          )}
          <div>
            <label style={{ fontSize: 12, color: "#6b6b7b", marginBottom: 7, display: "block", fontWeight: 500 }}>Email</label>
            <div style={inputWrap("email")}>
              <Mail size={15} color="#4a4a58" />
              <input placeholder="seu@email.com" onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} style={inputStyle} />
            </div>
          </div>
          {mode !== "recover" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                <label style={{ fontSize: 12, color: "#6b6b7b", fontWeight: 500 }}>Senha</label>
                {mode === "login" && (
                  <span onClick={() => setMode("recover")} style={{ fontSize: 11.5, color: "#6366f1", cursor: "pointer", fontWeight: 500 }}>Esqueceu?</span>
                )}
              </div>
              <div style={inputWrap("password")}>
                <Lock size={15} color="#4a4a58" />
                <input type={showPass ? "text" : "password"} placeholder="••••••••" onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)} style={inputStyle} />
                <div onClick={() => setShowPass(!showPass)} style={{ cursor: "pointer", display: "flex", padding: 2, borderRadius: 6 }}>
                  {showPass ? <EyeOff size={15} color="#4a4a58" /> : <Eye size={15} color="#4a4a58" />}
                </div>
              </div>
            </div>
          )}
        </div>

        <button onClick={onLogin} onMouseEnter={() => setHoverSubmit(true)} onMouseLeave={() => setHoverSubmit(false)} style={{
          width: "100%", padding: "13px 16px", borderRadius: 12, border: "none",
          background: hoverSubmit ? "linear-gradient(135deg, #7577f5, #9b6ff7)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 22,
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)", letterSpacing: 0.2,
          boxShadow: hoverSubmit ? "0 6px 28px rgba(99,102,241,0.35)" : "0 2px 12px rgba(99,102,241,0.2)",
          transform: hoverSubmit ? "translateY(-1px)" : "translateY(0)",
        }}>
          {mode === "login" ? "Entrar" : mode === "register" ? "Criar conta" : "Enviar link"}
        </button>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          {mode === "login" ? (
            <span style={{ fontSize: 13, color: "#52526b" }}>
              Não tem conta?{" "}
              <span onClick={() => setMode("register")} style={{ color: "#8b8baa", cursor: "pointer", fontWeight: 600 }}>Criar agora</span>
            </span>
          ) : (
            <span style={{ fontSize: 13, color: "#52526b" }}>
              Já tem conta?{" "}
              <span onClick={() => setMode("login")} style={{ color: "#8b8baa", cursor: "pointer", fontWeight: 600 }}>Entrar</span>
            </span>
          )}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "#2a2a36", letterSpacing: 0.5 }}>
        Velloso Finance
      </div>
    </div>
  );
}
