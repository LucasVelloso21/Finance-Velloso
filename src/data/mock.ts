export const mockUser = {
  name: "Lucas Mendes",
  email: "lucas@email.com",
  avatar: null,
  profile: "CLT",
  savingsGoal: 15,
};

export const mockIncome = [
  { id: 1, name: "Salário", value: 6500, date: 20, type: "salario" as const, recurring: true },
  { id: 2, name: "Vale Alimentação", value: 850, date: 1, type: "va" as const, recurring: true },
  { id: 3, name: "Vale Transporte", value: 320, date: 5, type: "vt" as const, recurring: true },
  { id: 4, name: "Freelance", value: 1200, date: 15, type: "extra" as const, recurring: false },
];

export const mockExpenses = [
  { id: 1, name: "Aluguel", category: "moradia", value: 2200, dueDate: 10, paid: true, recurring: true, essential: true },
  { id: 2, name: "Condomínio", category: "moradia", value: 450, dueDate: 10, paid: true, recurring: true, essential: true },
  { id: 3, name: "Energia", category: "moradia", value: 180, dueDate: 15, paid: true, recurring: true, essential: true },
  { id: 4, name: "Internet", category: "assinaturas", value: 120, dueDate: 20, paid: false, recurring: true, essential: true },
  { id: 5, name: "Academia", category: "saude", value: 150, dueDate: 5, paid: true, recurring: true, essential: false },
  { id: 6, name: "Streaming", category: "assinaturas", value: 55, dueDate: 12, paid: true, recurring: true, essential: false },
  { id: 7, name: "Spotify", category: "assinaturas", value: 22, dueDate: 12, paid: true, recurring: true, essential: false },
  { id: 8, name: "Seguro Carro", category: "transporte", value: 280, dueDate: 25, paid: false, recurring: true, essential: true },
  { id: 9, name: "Supermercado", category: "alimentacao", value: 900, dueDate: null, paid: true, recurring: false, essential: true },
  { id: 10, name: "Farmácia", category: "saude", value: 85, dueDate: null, paid: true, recurring: false, essential: false },
  { id: 11, name: "Curso Online", category: "educacao", value: 97, dueDate: 8, paid: true, recurring: true, essential: false },
  { id: 12, name: "Uber/99", category: "transporte", value: 220, dueDate: null, paid: true, recurring: false, essential: false },
];

export const mockCards = [
  {
    id: 1, name: "Nubank", brand: "Mastercard", limit: 8000, used: 3450,
    closingDate: 3, dueDate: 10,
    purchases: [
      { id: 1, name: "iFood", value: 156, category: "alimentacao", date: "05/03", installments: 1, current: 1 },
      { id: 2, name: "Amazon", value: 450, category: "compras", date: "08/03", installments: 3, current: 1 },
      { id: 3, name: "Posto Shell", value: 280, category: "transporte", date: "10/03", installments: 1, current: 1 },
      { id: 4, name: "Renner", value: 320, category: "compras", date: "12/03", installments: 2, current: 1 },
      { id: 5, name: "Farmácia", value: 95, category: "saude", date: "14/03", installments: 1, current: 1 },
      { id: 6, name: "Notebook", value: 1200, category: "compras", date: "18/03", installments: 10, current: 3 },
    ],
  },
  {
    id: 2, name: "C6 Bank", brand: "Visa", limit: 5000, used: 1280,
    closingDate: 15, dueDate: 22,
    purchases: [
      { id: 7, name: "Mercado Livre", value: 380, category: "compras", date: "02/03", installments: 2, current: 1 },
      { id: 8, name: "Restaurante", value: 210, category: "alimentacao", date: "07/03", installments: 1, current: 1 },
      { id: 9, name: "Uber", value: 90, category: "transporte", date: "11/03", installments: 1, current: 1 },
    ],
  },
];

export const mockSavings = {
  emergency: { current: 8500, goal: 20000, label: "Reserva de Emergência" },
  vacation: { current: 3200, goal: 8000, label: "Viagem" },
  car: { current: 12000, goal: 45000, label: "Carro Novo" },
  investment: { current: 5600, goal: 15000, label: "Investimentos" },
};

export const monthlyHistory = [
  { month: "Out", income: 7800, expenses: 5900, saved: 1900 },
  { month: "Nov", income: 8200, expenses: 6100, saved: 2100 },
  { month: "Dez", income: 9500, expenses: 7800, saved: 1700 },
  { month: "Jan", income: 8870, expenses: 6200, saved: 2670 },
  { month: "Fev", income: 8400, expenses: 5800, saved: 2600 },
  { month: "Mar", income: 8870, expenses: 4759, saved: 1500 },
];

export const categoryExpenses = [
  { name: "Moradia", value: 2830, color: "#6366f1" },
  { name: "Alimentação", value: 1056, color: "#f59e0b" },
  { name: "Transporte", value: 780, color: "#22d3ee" },
  { name: "Saúde", value: 330, color: "#ff4d6a" },
  { name: "Assinaturas", value: 197, color: "#00d68f" },
  { name: "Educação", value: 97, color: "#3b82f6" },
  { name: "Compras", value: 1150, color: "#ec4899" },
];
