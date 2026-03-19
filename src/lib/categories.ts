import {
  Home, UtensilsCrossed, Car, Heart, Star, Wifi,
  GraduationCap, ShoppingBag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: "moradia", name: "Moradia", icon: Home, color: "#6366f1" },
  { id: "alimentacao", name: "Alimentação", icon: UtensilsCrossed, color: "#f59e0b" },
  { id: "transporte", name: "Transporte", icon: Car, color: "#22d3ee" },
  { id: "saude", name: "Saúde", icon: Heart, color: "#ff4d6a" },
  { id: "lazer", name: "Lazer", icon: Star, color: "#a855f7" },
  { id: "assinaturas", name: "Assinaturas", icon: Wifi, color: "#00d68f" },
  { id: "educacao", name: "Educação", icon: GraduationCap, color: "#3b82f6" },
  { id: "compras", name: "Compras", icon: ShoppingBag, color: "#ec4899" },
];
