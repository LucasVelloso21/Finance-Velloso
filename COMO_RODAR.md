# finance.velloso — com Supabase (login real + nuvem) + Reserva de emergência

Este é o seu projeto original, com as seguintes adições:

## O que mudou

1. **Login real** (Google + e-mail/senha) via Supabase Auth — a tela de
   login é a mesma que você já tinha, só que agora conectada de verdade.
2. **Dados na nuvem**: receitas, despesas, cartões e metas agora são
   salvos no Supabase (não somem mais ao atualizar a página). Tudo
   funciona exatamente como antes — só que persistido.
3. **Nova aba "Reserva"**: reserva de emergência com cofrinho animado.
   A meta é calculada como `despesas essenciais × nº de meses` (padrão
   6 meses, ajustável na própria tela). O cofrinho enche e ganha moedas
   conforme a % sobe.
4. **Despesas**: agora além de "Essencial" também dá pra marcar "Fixa"
   (recorrente).
5. **Cor de destaque**: trocada de dourado para um laranja discreto
   (`#e2621a`), mantendo o resto do visual minimalista que você já tinha.

## Como rodar

### 1. Instalar dependências
```bash
npm install
```
(isso já inclui o `@supabase/supabase-js` novo)

### 2. Rodar o SQL no Supabase
No painel do seu projeto (`shgunxvgoeybfvxtgmac`) → **SQL Editor** → cole
o conteúdo de `supabase-schema.sql` deste pacote → **Run**.

Isso cria uma tabela `finance_data` com **uma linha por usuário**,
guardando receitas/despesas/cartões/metas/reserva como JSON — o mesmo
formato que o app já usa em memória, então nenhuma lógica de tela
precisou ser reescrita.

### 3. Variáveis de ambiente
Copie `.env.local.example` para `.env.local` e confira a **anon key**
(Supabase → Project Settings → API → anon public). A URL já está
preenchida com o seu projeto.

### 4. Rodar
```bash
npm run dev
```

## Sobre o login com Google

Você já configurou isso antes (Google Cloud Console + Supabase Auth
Providers) — não precisa mexer em nada ali, só usar.

## Observação sobre segurança

A tabela `finance_data` tem Row Level Security ativado: cada usuário só
enxerga e edita a própria linha (`auth.uid() = user_id`). O salvamento é
automático (com um pequeno atraso de 600ms) sempre que você mexe em
qualquer dado — não precisa clicar em "salvar" em nenhuma tela, exceto
na Reserva (onde o botão existe só para confirmar o valor digitado).
