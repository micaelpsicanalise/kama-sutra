-- ===================================================================
-- KAMA SUTRA — Seed dos artigos Origem, Ritual e Sobre
-- Roda uma vez. Se o slug já existir, faz update em vez de duplicar
-- (mesmo padrão do seed-artigo-filosofia.sql).
-- ===================================================================

set search_path to kamasutra;

-- ---------- Origem ----------
insert into artigos (slug, pilar, titulo, subtitulo, corpo_md, meta_description, publicado)
values (
  'origem',
  'origem',
  'O texto que o Ocidente leu errado',
  'Antes de ser meme, capa de livro de prateleira de aeroporto ou sinônimo de "posição sexual", o Kama Sutra foi — e continua sendo — um tratado sério sobre como viver bem.',
$md$## Quem foi Vatsyayana

O Kama Sutra foi compilado por Vatsyayana Mallanaga, um estudioso indiano, provavelmente entre os séculos III e IV d.C., no norte da Índia. Pouco se sabe sobre sua vida pessoal — o que se sabe é o que ele deixou claro no próprio texto: não estava escrevendo um manual erótico, mas uma síntese de tratados mais antigos sobre kama, o prazer, organizados dentro de um sistema filosófico muito mais amplo.

Vatsyayana escreveu como um compilador e comentarista, no estilo de outros textos técnicos sânscritos da época — tratados de economia, política e retórica seguiam a mesma estrutura de sutras (aforismos curtos) com comentário. O Kama Sutra pertence a essa mesma tradição de literatura de conhecimento prático, ao lado da Arthashastra (tratado sobre governo e economia).

## O que o livro realmente contém

Das sete partes do texto original, apenas uma trata de posições sexuais. As outras seis discutem como conduzir a vida cotidiana: etiqueta social, como escolher parceiros, como manter um casamento, como conduzir casos extraconjugais com dignidade (e por que evitá-los), como se comportar em sociedade, e o papel das cortesãs na vida cultural da Índia antiga. É, essencialmente, um manual de vida civilizada — kama é apenas um dos fios da trama.

## Como o Ocidente distorceu o texto

A primeira tradução amplamente distribuída no Ocidente foi feita em 1883 por Richard Burton, um explorador e orientalista britânico. Burton — e a era vitoriana em que ele publicou — tinha um interesse muito específico: o exotismo do "Oriente sensual" vendia. As edições posteriores, cada vez mais comerciais, foram progressivamente esvaziando o conteúdo filosófico e ampliando as ilustrações, até o Kama Sutra virar, no imaginário popular, sinônimo apenas de posições.

Esse processo é um exemplo clássico do que acontece quando um texto atravessa uma fronteira cultural sem o arcabouço que lhe dá sentido: ele é lido através do arquivo simbólico de quem recebe, não de quem produziu. O Ocidente vitoriano tinha um arquivo simbólico que via a Índia como "exótica" e "sensual" — e o texto foi filtrado, editado e vendido de acordo com essa lente, não com a intenção original de Vatsyayana.

## Por que isso importa hoje

Entender a origem do Kama Sutra não é um exercício de erudição vazia. É a diferença entre tratar intimidade como técnica isolada — algo que se "aprende" numa lista de posições — e tratá-la como parte de uma vida inteira, conectada a ética, tempo, presença e relação. É essa segunda leitura que este site segue, nas seções de [Filosofia](filosofia.html) e [Prática](pratica/index.html).$md$,
  'A verdadeira origem do Kama Sutra: quem foi Vatsyayana, o contexto da Índia antiga e como o Ocidente reduziu um tratado filosófico a um catálogo de posições.',
  true
)
on conflict (slug) do update set
  titulo = excluded.titulo, subtitulo = excluded.subtitulo, corpo_md = excluded.corpo_md,
  meta_description = excluded.meta_description, publicado = excluded.publicado, atualizado_em = now();

-- ---------- Ritual ----------
insert into artigos (slug, pilar, titulo, subtitulo, corpo_md, meta_description, publicado)
values (
  'ritual',
  'ritual',
  'O que a posição sozinha não ensina',
  'Nenhuma ásana, por si só, produz conexão. O que transforma técnica em experiência compartilhada é o que acontece antes, ao redor e depois dela — presença, ritmo e atenção.',
$md$## Presença antes de técnica

Um erro comum ao consumir conteúdo sobre intimidade é tratar cada elemento como um passo isolado — uma posição, uma técnica, um "truque". Mas a experiência real de conexão depende muito mais de quanto cada pessoa está presente no momento do que de qual posição está sendo praticada. Presença aqui significa simplesmente atenção: notar a respiração do outro, o ritmo, o que está sendo comunicado sem palavras.

Isso não é uma ideia nova nem exclusivamente oriental — é o consenso de praticamente toda literatura séria sobre intimidade, de terapeutas sexuais contemporâneos a tradições contemplativas milenares. O que muda de tradição para tradição é o vocabulário usado para descrever essa mesma coisa.

## Respiração como regulador

A respiração é, em praticamente toda tradição contemplativa — do pranayama indiano às práticas chinesas de cultivo energético — o instrumento mais direto para regular o estado do corpo. Uma respiração acelerada e curta tende a manter o sistema nervoso em estado de alerta; uma respiração mais longa e consciente convida à desaceleração. Aplicado à intimidade, isso é simples na prática: sincronizar a respiração com o parceiro, ou apenas devagar a própria, muda a qualidade do encontro sem exigir nenhuma técnica adicional.

## A leitura chinesa: energia em vez de consagração

A tradição indiana, como a página de [Filosofia](filosofia.html) descreve, trata o corpo como matéria consagrada — um veículo pelo qual o espiritual se manifesta. A tradição taoista chinesa, sistematizada em textos antigos e difundida no Ocidente principalmente através do trabalho de Mantak Chia (Healing Tao), chega a uma conclusão parecida por um caminho diferente: menos devocional, mais fisiológico.

Nessa visão, a energia sexual é chamada de jing — a forma mais densa da energia vital, base a partir da qual se cultivam qi (energia em circulação) e shen (energia mais sutil, associada à mente e ao espírito). O corpo é tratado quase como um sistema de circuitos: existem trajetos energéticos específicos — o mais citado é a "órbita microcósmica", um circuito que conecta a base da coluna ao topo da cabeça e desce pela frente do corpo — pelos quais essa energia pode ser conservada e redistribuída em vez de simplesmente dissipada.

A diferença de tom em relação à tradição indiana é real: onde o tantra fala em consagração e manifestação do sagrado, a tradição taoista fala em economia energética e longevidade — um vocabulário que soa mais próximo de fisiologia do que de teologia, mesmo tratando do mesmo território. As duas leituras não competem entre si; são dois vocabulários diferentes apontando pra a mesma intuição central, presente também no Kama Sutra: a experiência sensorial, conduzida com atenção, é uma tecnologia de transformação — não apenas descarga.

## Tempo como escolha, não como falta

A cultura contemporânea tende a tratar a intimidade como mais uma tarefa a ser encaixada entre outras — rápida, eficiente, orientada a resultado. A tradição que o Kama Sutra representa parte do pressuposto oposto: tempo dedicado é parte do conteúdo, não um obstáculo a ser otimizado. Isso não significa que todo encontro precise ser longo — significa que a duração deveria ser uma escolha consciente do casal, não uma consequência do que sobrou depois de tudo o mais.

## Quando buscar apoio profissional

Dificuldades persistentes de conexão, desejo ou comunicação num relacionamento costumam ter raízes que um site não resolve — e não deveriam. Terapia sexual e de casal, conduzida por profissional habilitado, é o caminho apropriado quando o que está em jogo vai além de curiosidade ou aprofundamento cultural.$md$,
  'O que transforma técnica em conexão real: presença, respiração e tempo, na ponte entre o Kama Sutra e práticas contemplativas contemporâneas.',
  true
)
on conflict (slug) do update set
  titulo = excluded.titulo, subtitulo = excluded.subtitulo, corpo_md = excluded.corpo_md,
  meta_description = excluded.meta_description, publicado = excluded.publicado, atualizado_em = now();

-- ---------- Sobre ----------
insert into artigos (slug, pilar, titulo, subtitulo, corpo_md, meta_description, publicado)
values (
  'sobre',
  'sobre',
  'Por que este site existe',
  'Este é um projeto de curadoria e pesquisa. Não vende curso, não substitui terapia, não presta atendimento. O único objetivo é reunir, num só lugar, uma leitura séria de um texto que quase sempre é tratado com sensacionalismo ou constrangimento.',
$md$## O que este site é

Um esforço de tradução e contextualização — pegar um texto de mil e setecentos anos, cercado de mito no Ocidente, e devolver a ele o rigor histórico e filosófico que a maioria das fontes disponíveis na internet não oferece. As referências usadas incluem estudos de história das religiões, filosofia indiana clássica e literatura comparada sobre tradições contemplativas orientais.

## O que este site não é

Não é aconselhamento clínico, terapêutico ou médico. Não é um produto disfarçado de conteúdo educativo — o e-book existe como aprofundamento opcional do mesmo material, não como isca para venda de outra coisa. Se você está enfrentando dificuldades reais de relacionamento, desejo ou intimidade, a fonte certa de ajuda é um profissional qualificado, não um site.

## Por que isso importa

Textos antigos que atravessam fronteiras culturais quase sempre perdem o arcabouço que lhes dava sentido — como a página de [Origem](origem.html) detalha. Reconstruir esse arcabouço, mesmo que parcialmente, é o que separa curiosidade informada de curiosidade rasa. É esse o único compromisso deste projeto.$md$,
  'Um projeto de curadoria e pesquisa sobre o Kama Sutra, sem venda de curso, atendimento ou produto — só o conhecimento em si.',
  true
)
on conflict (slug) do update set
  titulo = excluded.titulo, subtitulo = excluded.subtitulo, corpo_md = excluded.corpo_md,
  meta_description = excluded.meta_description, publicado = excluded.publicado, atualizado_em = now();
