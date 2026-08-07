# Kama Sutra — projeto Substrato

Site editorial sobre o Kama Sutra: origem, filosofia e prática, com CTA de
e-book. Rodando no mesmo padrão dos outros projetos — HTML/CSS/JS vanilla,
Supabase como backend, deploy via Cloudflare/GitHub Pages, conteúdo editável
pelo painel do Substrato.

## Estrutura

```
index.html          → home (feito)
origem.html          → pilar 01 — feito, com texto completo
filosofia.html        → pilar 02 — feito, com texto completo
ritual.html          → pilar 04 — feito, com texto completo
sobre.html           → autoria/E-E-A-T — feito (rascunho, revisar antes de publicar)
ebook.html           → landing de captura — feito
pratica/index.html    → grid de posições, consome `posicoes` via Supabase — feito
pratica/posicao.html  → detalhe de posição por ?slug=, consome Supabase — feito

css/tokens.css        → paleta, tipografia, escala (feito)
css/site.css          → header, hero, seções, cards, footer (feito)
js/site.js            → age gate + formulário de e-book (feito, precisa das chaves Supabase)
js/pratica.js         → grid de posições (feito, precisa das chaves Supabase)
js/posicao.js         → detalhe de posição (feito, precisa das chaves Supabase)

supabase/schema.sql    → posicoes, artigos, leads_ebook, RLS, schema kamasutra (feito)

admin/index.html       → painel de administração — login + CRUD (feito)
admin/css/admin.css    → estilos do painel (feito)
admin/js/admin.js      → auth + CRUD de posicoes/artigos, leitura/export de leads (feito)
```

## Painel admin

Em `admin/index.html`. Login via Supabase Auth (e-mail/senha) — **precisa
criar o usuário manualmente** no painel Supabase: **Authentication → Users
→ Add user**, com o e-mail e senha que você vai usar pra entrar. Não existe
cadastro público, só esse usuário criado à mão.

Depois de logado, dá pra criar/editar/excluir posições e artigos (inclusive
rascunhos não publicados — o painel usa uma policy separada de leitura/escrita
para usuários autenticados), e ver/exportar os leads capturados pelo CTA
do e-book em CSV.

Preencher `SUPABASE_URL`/`SUPABASE_ANON_KEY` em `admin/js/admin.js`
também — é um arquivo à parte de `js/site.js`, então as duas constantes
precisam ficar em sincronia manualmente se você trocar de projeto Supabase.

## Supabase

Usa o **mesmo projeto** Supabase do mantra/umbanda, isolado em schema
Postgres próprio (`kamasutra`) — sem misturar tabelas com os outros
projetos. Depois de rodar o `schema.sql`, é obrigatório ir em
**Settings → API → Exposed schemas** no painel e adicionar `kamasutra`
à lista (por padrão só `public` é exposto via REST; sem isso a API
retorna 404).

## Próximos passos

1. **Rodar o `schema.sql`** no projeto Supabase compartilhado (cria o
   schema `kamasutra` e as tabelas dentro dele).
2. **Expor o schema** no painel (ver seção acima) e **preencher
   `SUPABASE_URL` / `SUPABASE_ANON_KEY`** em `js/site.js` — os outros dois
   arquivos JS leem as mesmas constantes globais, então só precisa editar
   em um lugar.
3. **Criar o usuário admin** em Authentication → Users, e preencher as
   mesmas credenciais Supabase em `admin/js/admin.js`.
4. **Revisar `sobre.html`** — tem rascunho com placeholders `[seu nome]`,
   ajustar antes de publicar.
5. **Cadastrar posições** pelo próprio painel admin (`admin/index.html`),
   sem precisar mexer em SQL direto — mesmo sem imagem, já funciona.
6. Quando as ilustrações WebP estiverem prontas, cole a URL no campo
   correspondente do painel — nenhuma mudança de código necessária.

## Notas de design

Paleta rosa/lilás/verde sobre creme, Fraunces + DM Sans (mesma dupla do
MeuPsi). Elemento-assinatura: dois círculos suaves em união no hero (vesica),
atmosférico, sem literalidade. Age gate simples via localStorage, sem
bloquear indexação do conteúdo em si.
