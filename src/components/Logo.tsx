"use client";

/**
 * Logo "LV" — monograma em estilo emblema (tipo escudo de copa do mundo),
 * com um "$" sobreposto no canto, remetendo a finanças.
 */
export function Logo({ size = 44, accent = "#5f9483" }: { size?: number; accent?: string }) {
  const s = size;
  return (
    <div style={{ position: "relative", width: s, height: s, flexShrink: 0 }}>
      <svg viewBox="0 0 100 100" width={s} height={s}>
        <defs>
          <clipPath id="lv-shield">
            <path d="M50 3 L92 16 V50 C92 74 74 90 50 97 C26 90 8 74 8 50 V16 Z" />
          </clipPath>
        </defs>
        <path
          d="M50 3 L92 16 V50 C92 74 74 90 50 97 C26 90 8 74 8 50 V16 Z"
          fill="#141414"
          stroke={accent}
          strokeWidth="2.5"
        />
        <g clipPath="url(#lv-shield)">
          <text
            x="50"
            y="66"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight={800}
            fontSize="42"
            fill="#eaeaea"
            letterSpacing="-2"
          >
            LV
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: -4,
          right: -4,
          width: s * 0.4,
          height: s * 0.4,
          borderRadius: "50%",
          background: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: s * 0.22,
          fontWeight: 800,
          color: "#0a0a0a",
          border: "2px solid #0c0c0c",
        }}
      >
        $
      </div>
    </div>
  );
}