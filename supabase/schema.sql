-- ===================================================================
-- KAMA SUTRA — Schema Supabase
-- Roda no MESMO projeto Supabase usado por mantra/umbanda, mas isolado
-- em schema Postgres próprio (não em "public"), pra evitar colisão de
-- nomes e manter cada projeto independente/portável.
-- ===================================================================

create schema if not exists kamasutra;

-- Extensão para slugs/uuid (fica no schema padrão, compartilhada)
create extension if not exists "pgcrypto";

-- A partir daqui, tudo dentro do schema kamasutra
set search_path to kamasutra;

-- ---------- Tabela: posicoes (o "pratica" content type) ----------
create table if not exists posicoes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nome_popular text not null,
  nome_sanscrito text,
  nivel text check (nivel in ('iniciante', 'intermediario', 'avancado')) default 'iniciante',
  tag_beneficio text,               -- ex: 'conexao', 'energia', 'dinamica'
  texto_curto text,                 -- resumo pro card
  texto_longo text,                 -- descrição completa pra página individual
  imagem_webp_url text,             -- preenchido depois, quando as ilustrações estiverem prontas
  ordem int default 0,
  publicado boolean default false,  -- fica draft até você revisar
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now()
);

comment on table posicoes is 'Ásanas do guia prático — content type "pratica" do Substrato.';

-- ---------- Tabela: artigos (Origem / Filosofia / Ritual / Sobre) ----------
create table if not exists artigos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  pilar text check (pilar in ('origem', 'filosofia', 'ritual', 'sobre')) not null,
  titulo text not null,
  subtitulo text,
  corpo_md text,                    -- markdown, renderizado no client ou no build
  meta_description text,
  publicado boolean default true,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now()
);

comment on table artigos is 'Conteúdo editorial de longa forma — os quatro pilares do site.';

-- ---------- Tabela: leads_ebook (captura do CTA) ----------
create table if not exists leads_ebook (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  origem text,                      -- de qual CTA veio: 'home_cta', 'origem_footer', etc.
  criado_em timestamptz default now()
);

comment on table leads_ebook is 'Captura de e-mail para o funil de e-book/curso.';

-- ---------- RLS ----------
alter table posicoes enable row level security;
alter table artigos enable row level security;
alter table leads_ebook enable row level security;

-- Leitura pública apenas do que está publicado
create policy "posicoes_select_publicado" on posicoes
  for select using (publicado = true);

create policy "artigos_select_publicado" on artigos
  for select using (publicado = true);

-- Inserção pública só na tabela de leads (formulário do site)
create policy "leads_insert_publico" on leads_ebook
  for insert with check (true);

-- ---------- Policies de administração (painel logado) ----------
-- Qualquer usuário autenticado no projeto (login do admin) pode
-- ler/criar/editar/apagar posicoes e artigos, inclusive rascunhos
-- não publicados, e ler os leads capturados.

create policy "posicoes_admin_all" on posicoes
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "artigos_admin_all" on artigos
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "leads_admin_select" on leads_ebook
  for select using (auth.role() = 'authenticated');

create policy "leads_admin_delete" on leads_ebook
  for delete using (auth.role() = 'authenticated');

-- Edição (insert/update/delete em posicoes e artigos) fica restrita
-- ao painel admin do Substrato, autenticado — sem policy pública de escrita aqui.

-- ---------- Índices ----------
create index if not exists idx_posicoes_publicado on posicoes(publicado, ordem);
create index if not exists idx_artigos_pilar on artigos(pilar, publicado);

-- ===================================================================
-- IMPORTANTE — passo manual no painel Supabase:
-- Settings → API → "Exposed schemas" → adicionar "kamasutra" à lista
-- (por padrão só "public" fica exposto via REST). Sem isso, a API
-- retorna 404 para qualquer chamada a este schema.
-- ===================================================================
