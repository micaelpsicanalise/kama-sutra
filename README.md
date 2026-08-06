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
```

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
3. **Revisar `sobre.html`** — tem rascunho com placeholders `[seu nome]`,
   ajustar antes de publicar.
4. **Cadastrar posições** na tabela `posicoes` (mesmo sem imagem, já
   funciona — o grid mostra "em breve" até `imagem_webp_url` ser preenchido).
5. Quando as ilustrações WebP estiverem prontas, só preencher a coluna
   `imagem_webp_url` de cada posição — nenhuma mudança de código necessária.

## Notas de design

Paleta rosa/lilás/verde sobre creme, Fraunces + DM Sans (mesma dupla do
MeuPsi). Elemento-assinatura: dois círculos suaves em união no hero (vesica),
atmosférico, sem literalidade. Age gate simples via localStorage, sem
bloquear indexação do conteúdo em si.
