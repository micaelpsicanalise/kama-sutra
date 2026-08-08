// ===================================================================
// KAMA SUTRA — artigo.js
// Busca o corpo de um artigo (tabela `artigos`, schema kamasutra) por
// slug e injeta no container #artigoBody, com um conversor markdown
// bem simples (títulos ##, negrito **, links [texto](url), parágrafos).
//
// Cada página que usa isso define, ANTES de incluir este script:
//   <script>const ARTIGO_SLUG = 'filosofia';</script>
// ===================================================================

function markdownLiteParaHtml(md) {
  if (!md) return '';

  const blocos = md.trim().split(/\n\s*\n/);

  return blocos.map(bloco => {
    const linha = bloco.trim();

    // Título ## Texto
    if (linha.startsWith('## ')) {
      return `<h2 style="font-size: var(--step-2); margin: 40px 0 18px;">${inline(linha.slice(3))}</h2>`;
    }

    // Lista simples, linhas começando com "- "
    if (linha.split('\n').every(l => l.trim().startsWith('- '))) {
      const itens = linha.split('\n').map(l =>
        `<li style="color: var(--tinta-suave); margin-bottom: 8px;">${inline(l.trim().slice(2))}</li>`
      ).join('');
      return `<ul style="padding-left: 20px; margin-bottom: 20px;">${itens}</ul>`;
    }

    // Parágrafo normal
    return `<p style="color: var(--tinta-suave); margin-bottom: 20px;">${inline(linha.replace(/\n/g, ' '))}</p>`;
  }).join('\n');
}

function inline(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

(async function loadArtigo() {
  const container = document.getElementById('artigoBody');
  if (!container || typeof ARTIGO_SLUG === 'undefined') return;

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/artigos?select=titulo,subtitulo,corpo_md,meta_description&slug=eq.${encodeURIComponent(ARTIGO_SLUG)}&publicado=eq.true`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Accept-Profile': 'kamasutra'
        }
      }
    );

    if (!res.ok) throw new Error('Falha ao buscar artigo');
    const rows = await res.json();
    const artigo = rows && rows[0];

    if (!artigo || !artigo.corpo_md) {
      // Sem conteúdo cadastrado ainda — mantém o que já estiver no HTML estático como fallback.
      return;
    }

    container.innerHTML = markdownLiteParaHtml(artigo.corpo_md);

    if (artigo.meta_description) {
      const metaTag = document.querySelector('meta[name="description"]');
      if (metaTag) metaTag.setAttribute('content', artigo.meta_description);
    }

  } catch (err) {
    console.error(err);
    // Em caso de erro, mantém o conteúdo estático já presente no HTML.
  }
})();
