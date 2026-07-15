"use client";

import { useEffect, useState } from "react";
import { C } from "@/lib/constants";

interface PiggyBankGraphicProps {
  percentage: number; // 0 a 100
}

/**
 * Cofrinho minimalista em line-art cujo corpo "enche" de baixo para cima
 * conforme a % da reserva de emergência sobe. A cada 10% uma moeda nasce
 * e sobe, empilhando-se sobre o cofrinho.
 */
export function PiggyBankGraphic({ percentage }: PiggyBankGraphicProps) {
  const clamped = Math.max(0, Math.min(100, percentage));
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setDisplayed(clamped));
    return () => cancelAnimationFrame(id);
  }, [clamped]);

  const coinCount = Math.min(10, Math.round(clamped / 10));
  const fillTop = 118 - (displayed / 100) * 70;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ position: "relative", height: 200, width: 200 }}>
        <div
          style={{
            position: "absolute",
            top: -6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 110,
            display: "flex",
            flexWrap: "wrap-reverse",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {Array.from({ length: coinCount }).map((_, i) => (
            <span
              key={i}
              className="coin"
              style={{
                animationDelay: `${i * 80}ms`,
                height: 22,
                width: 22,
                borderRadius: "50%",
                border: `1px solid ${C.accent}`,
                background: `${C.accent}22`,
                color: C.accent,
                fontSize: 9,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              R$
            </span>
          ))}
        </div>

        <svg viewBox="0 0 200 160" style={{ height: "100%", width: "100%" }}>
          <defs>
            <clipPath id="piggyBody">
              <path d="M40 60 C40 40 60 30 90 30 C100 22 118 22 124 32 C140 34 156 46 158 62 C168 64 176 72 176 82 C176 92 168 98 158 98 C154 112 140 122 122 124 L122 136 L110 136 L110 126 L70 126 L70 136 L58 136 L58 122 C44 116 34 102 34 86 C28 84 24 78 24 72 C24 64 32 58 40 60 Z" />
            </clipPath>
          </defs>

          <path
            d="M40 60 C40 40 60 30 90 30 C100 22 118 22 124 32 C140 34 156 46 158 62 C168 64 176 72 176 82 C176 92 168 98 158 98 C154 112 140 122 122 124 L122 136 L110 136 L110 126 L70 126 L70 136 L58 136 L58 122 C44 116 34 102 34 86 C28 84 24 78 24 72 C24 64 32 58 40 60 Z"
            fill="transparent"
            stroke={C.accent}
            strokeWidth="2.5"
          />

          <g clipPath="url(#piggyBody)">
            <rect x="20" y={fillTop} width="160" height="140" fill={C.accent} fillOpacity="0.18" style={{ transition: "y 0.7s ease-out" }} />
            <rect x="20" y={fillTop - 2} width="160" height="4" fill={C.accent} style={{ transition: "y 0.7s ease-out" }} />
          </g>

          <circle cx="164" cy="70" r="2.5" fill={C.text} />
          <circle cx="150" cy="55" r="2.5" fill={C.text} />
          <rect x="78" y="26" width="24" height="4" rx="2" fill={C.text} />
          <rect x="55" y="128" width="10" height="10" rx="2" fill={C.dim} />
          <rect x="113" y="128" width="10" height="10" rx="2" fill={C.dim} />
        </svg>
      </div>

      <p style={{ marginTop: 4, fontSize: 28, fontWeight: 700, color: C.text }}>{clamped.toFixed(1)}%</p>
      <p style={{ fontSize: 12, color: C.dim }}>da meta da reserva</p>
    </div>
  );
}
