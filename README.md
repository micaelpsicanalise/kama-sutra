# Kama Sutra — projeto Substrato

Site editorial sobre o Kama Sutra: origem, filosofia e prática, com CTA de
e-book. Rodando no mesmo padrão dos outros projetos — HTML/CSS/JS vanilla,
Supabase como backend, deploy via Cloudflare/GitHub Pages, conteúdo editável
pelo painel do Substrato.

## Estrutura

```
index.html          → home (feito)
origem.html          → pilar 01 — feito, com texto completo
filosofia.html        → pilar 02 — a fazer (mesma estrutura de origem.html)
ritual.html          → pilar 04 — a fazer
sobre.html           → autoria/E-E-A-T — a fazer
ebook.html           → landing de captura — a fazer
pratica/index.html    → grid de posições (consumindo tabela `posicoes`) — a fazer
pratica/[slug].html   → template de posição individual — a fazer

css/tokens.css        → paleta, tipografia, escala (feito)
css/site.css          → header, hero, seções, cards, footer (feito)
js/site.js            → age gate + formulário de e-book (feito, precisa das chaves Supabase)

supabase/schema.sql    → posicoes, artigos, leads_ebook, RLS (feito)
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
   `SUPABASE_URL` / `SUPABASE_ANON_KEY`** em `js/site.js`.
3. **Popular `artigos`** com o texto de Origem (já redigido em `origem.html` —
   pode ser migrado pra lá se quiser editar via painel em vez de HTML estático)
   e escrever Filosofia/Ritual/Sobre.
4. **Popular `posicoes`** — mesmo com `imagem_webp_url` vazio, já dá pra
   cadastrar nome, nome sânscrito, nível e texto. O grid já tem o placeholder
   "em breve" pronto pra receber os WebP quando estiverem prontos.
5. **`pratica/index.html` e `pratica/[slug].html`** ainda não foram feitos —
   são os únicos templates que faltam pra fechar o ciclo completo do content
   model.

## Notas de design

Paleta rosa/lilás/verde sobre creme, Fraunces + DM Sans (mesma dupla do
MeuPsi). Elemento-assinatura: dois círculos suaves em união no hero (vesica),
atmosférico, sem literalidade. Age gate simples via localStorage, sem
bloquear indexação do conteúdo em si.
