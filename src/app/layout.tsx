import type { Metadata } from "next";
import "./globals.css";
<<<<<<< HEAD
export const metadata: Metadata = { title: "Velloso Finance", description: "Controle financeiro pessoal inteligente" };
=======
export const metadata: Metadata = { title: "Velloso Finance", description: "Controle financeiro pessoal" };
>>>>>>> 37df68b24dab39bd39e9ad8c593d6e37ce55c391
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
