import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velloso Finance - Controle Financeiro Pessoal",
  description: "Plataforma de controle financeiro pessoal completa, intuitiva e personalizável.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
