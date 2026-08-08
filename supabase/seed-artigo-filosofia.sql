-- ===================================================================
-- KAMA SUTRA — Seed do artigo "Filosofia" (editável depois pelo admin)
-- Roda uma vez. Se o slug já existir, faz update em vez de duplicar.
-- ===================================================================

set search_path to kamasutra;

insert into artigos (slug, pilar, titulo, subtitulo, corpo_md, meta_description, publicado)
values (
  'filosofia',
  'filosofia',
  'Onde o prazer se encaixa numa vida inteira',
  'Kama nunca esteve sozinho. Na tradição indiana clássica, ele é um entre quatro objetivos que, juntos, descrevem o que significa viver bem.',
$md$## Por que isolar o kama distorce o conceito

Quando o Ocidente reduziu o Kama Sutra a um catálogo de posições, fez exatamente o que a filosofia indiana original tentava evitar: separar o prazer do resto da vida, como se fosse uma categoria à parte — algo transgressor, secreto ou puramente recreativo. Na formulação original, kama só faz sentido em relação aos outros três pilares. Buscar prazer sem ética (dharma) ou sem responsabilidade material (artha) era considerado, no próprio texto, um desequilíbrio — não liberdade.

Essa é uma diferença de fundo em relação a boa parte do discurso contemporâneo sobre sexualidade, que oscila entre repressão total e hedonismo sem contexto. A proposta clássica é uma terceira via: o prazer como parte legítima e integrada da vida, não como exceção a ser liberada ou pecado a ser reprimido.

## A ponte com o tantra

É comum confundir o Kama Sutra com textos tântricos, mas são tradições distintas com pontos de contato — e reduzir tantra a "sexo espiritualizado" é um erro tão grande quanto reduzir o Kama Sutra a um catálogo de posições.

Na visão indiana, tantra é o uso do material consagrado — aquilo que a vida cotidiana trata como profano, apetite ou tabu — como veículo para manifestar o espiritual. É a mesma lógica que o historiador das religiões Mircea Eliade descreveu como hierofania: o sagrado não aparece separado do mundo material, ele se manifesta através dele, numa pedra, numa árvore, num gesto, sem deixar de ser pedra, árvore ou gesto. O tantra aplica exatamente essa lógica ao corpo e aos apetites — come, bebe e se une não apesar de serem materiais, mas porque são materiais. A matéria consagrada vira porta, não obstáculo.

Isso fica explícito nos panchamakara, os "cinco M" que estruturam certas práticas tântricas: madya (vinho), mamsa (carne), matsya (peixe), mudra (grão/gesto) e maithuna (união sexual). Cada um representa um apetite ou tabu do corpo — beber, comer carne, comer peixe, o gesto ritual, o sexo — tratado como matéria de consagração, não como indulgência nem como pecado. Nas linhagens que seguem o caminho da mão direita (dakshinachara), os cinco M são majoritariamente simbólicos: madya, por exemplo, aponta para o néctar interno liberado em estados meditativos avançados, não para álcool literal. Nas linhagens da mão esquerda (vamachara), alguns praticantes os realizam de forma literal, sempre dentro de um contexto ritual e sob orientação — nunca como sinônimo de libertinagem.

Maithuna, portanto, é um entre cinco elementos — não o resumo do tantra, como o imaginário popular ocidental sugere. Tratá-lo como "a parte boa" e ignorar o resto é o mesmo erro de leitura que reduziu o Kama Sutra a posições: pegar um fragmento sensorial e descartar a estrutura que lhe dava sentido.

A diferença de fundo entre as duas tradições permanece: o Kama Sutra pergunta "como viver bem em sociedade", o tantra pergunta "como usar a experiência sensorial, incluindo a sexual, como caminho de transformação de consciência". Ambos recusam separar corpo e espírito — mas partem de perguntas diferentes, e merecem ser lidos sem fundir um no outro.

Essa distinção importa porque ajuda a entender por que a seção de [Ritual](ritual.html) deste site não é sobre técnica, mas sobre presença — um território mais próximo do tantra do que da etiqueta social que ocupava a maior parte do texto original de Vatsyayana.$md$,
  'Dharma, artha, kama e moksha: onde o prazer se encaixa na filosofia indiana clássica, e por que isolar o kama do resto distorce o conceito.',
  true
)
on conflict (slug) do update set
  titulo = excluded.titulo,
  subtitulo = excluded.subtitulo,
  corpo_md = excluded.corpo_md,
  meta_description = excluded.meta_description,
  publicado = excluded.publicado,
  atualizado_em = now();
