export const formatCurrency = (v: number | null | undefined): string =>
  v?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) || "R$ 0,00";

export const formatPercent = (v: number): string => `${Math.round(v)}%`;
