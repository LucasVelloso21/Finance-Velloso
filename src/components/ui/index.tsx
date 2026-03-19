"use client";

import { useState, useEffect, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { COLORS } from "@/lib/theme";
import { formatCurrency, formatPercent } from "@/lib/utils";

/* ── AnimatedNumber ── */
export function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const dur = 800;
    const start = performance.now();
    const from = display;
    const animate = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (value - from) * ease);
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <span>
      {prefix}
      {formatCurrency(display)}
    </span>
  );
}

/* ── ProgressBar ── */
export function ProgressBar({
  value, max, color = COLORS.green, height = 6, showLabel = false,
}: {
  value: number; max: number; color?: string; height?: number; showLabel?: boolean;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%", height, background: COLORS.bgInput, borderRadius: height, overflow: "hidden" }}>
        <div
          style={{
            width: `${pct}%`, height: "100%",
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            borderRadius: height, transition: "width 1s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
      {showLabel && (
        <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>{formatPercent(pct)}</div>
      )}
    </div>
  );
}

/* ── Badge ── */
export function Badge({
  children, color = COLORS.green, bg,
}: {
  children: ReactNode; color?: string; bg?: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 6,
        fontSize: 11, fontWeight: 600, color, background: bg || `${color}18`, letterSpacing: 0.3,
      }}
    >
      {children}
    </span>
  );
}

/* ── Card ── */
export function Card({
  children, style, onClick, hover = false,
}: {
  children: ReactNode; style?: React.CSSProperties; onClick?: () => void; hover?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: COLORS.bgCard, borderRadius: 16, border: `1px solid ${COLORS.border}`,
        padding: 20, transition: "all 0.3s ease",
        ...(hover ? { cursor: "pointer" } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── IconBox ── */
export function IconBox({ icon: Icon, color, size = 40 }: { icon: LucideIcon; color: string; size?: number }) {
  return (
    <div
      style={{
        width: size, height: size, borderRadius: 12, display: "flex",
        alignItems: "center", justifyContent: "center",
        background: `${color}15`, flexShrink: 0,
      }}
    >
      <Icon size={size * 0.5} color={color} />
    </div>
  );
}

/* ── SectionTitle ── */
export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, margin: 0, letterSpacing: -0.3 }}>
        {children}
      </h3>
      {action}
    </div>
  );
}
