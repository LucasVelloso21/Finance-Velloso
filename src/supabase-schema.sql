-- ============================================================
-- finance.velloso — schema (rodar no SQL Editor do Supabase)
-- Uma linha por usuário, guardando cada coleção como JSON.
-- Isso casa 1:1 com o formato que o app já usa em memória
-- (arrays de income/expenses/cards/savings), então não precisa
-- reescrever a lógica de CRUD que você já tem.
-- ============================================================

create table if not exists public.finance_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  income jsonb not null default '[]',
  expenses jsonb not null default '[]',
  cards jsonb not null default '[]',
  savings jsonb not null default '[]',
  reserve jsonb not null default '{"targetMonths": 6, "currentAmount": 0}',
  updated_at timestamptz not null default now()
);

alter table public.finance_data enable row level security;

create policy "finance_data_select_own" on public.finance_data
  for select using (auth.uid() = user_id);
create policy "finance_data_insert_own" on public.finance_data
  for insert with check (auth.uid() = user_id);
create policy "finance_data_update_own" on public.finance_data
  for update using (auth.uid() = user_id);
