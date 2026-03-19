"use client";

import { useState } from "react";
import { COLORS } from "@/lib/theme";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import LoginPage from "@/components/pages/LoginPage";
import OnboardingPage from "@/components/pages/OnboardingPage";
import DashboardPage from "@/components/pages/DashboardPage";
import IncomePage from "@/components/pages/IncomePage";
import ExpensesPage from "@/components/pages/ExpensesPage";
import CardsPage from "@/components/pages/CardsPage";
import SavingsPage from "@/components/pages/SavingsPage";
import ProjectionsPage from "@/components/pages/ProjectionsPage";
import ReportsPage from "@/components/pages/ReportsPage";
import SettingsPage from "@/components/pages/SettingsPage";

const pages: Record<string, React.ComponentType> = {
  dashboard: DashboardPage,
  income: IncomePage,
  expenses: ExpensesPage,
  cards: CardsPage,
  savings: SavingsPage,
  projections: ProjectionsPage,
  reports: ReportsPage,
  settings: SettingsPage,
};

export default function Home() {
  const [auth, setAuth] = useState<"login" | "onboarding" | "app">("login");
  const [page, setPage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarWidth = sidebarCollapsed ? 72 : 240;

  if (auth === "login") return <LoginPage onLogin={() => setAuth("onboarding")} />;
  if (auth === "onboarding") return <OnboardingPage onComplete={() => setAuth("app")} />;

  const PageComponent = pages[page] || DashboardPage;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text }}>
      <Sidebar
        active={page}
        onNav={setPage}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div style={{ marginLeft: sidebarWidth, transition: "margin-left 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
        <Header page={page} />
        <div style={{ padding: "28px 32px", maxWidth: 1200 }}>
          <PageComponent />
        </div>
      </div>
    </div>
  );
}
