// ===================================================================
// KAMA SUTRA — posicao.js
// Lê ?slug= da URL, busca o registro correspondente na tabela
// `posicoes` (schema kamasutra) e renderiza a página de detalhe.
// ===================================================================

(async function loadPosicao() {
  const container = document.getElementById('posicaoConteudo');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  if (!slug) {
    container.innerHTML = '<p style="color: var(--tinta-suave);">Posição não encontrada. <a href="index.html">Voltar</a>.</p>';
    return;
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/posicoes?select=*&slug=eq.${encodeURIComponent(slug)}&publicado=eq.true`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Accept-Profile': 'kamasutra'
        }
      }
    );

    if (!res.ok) throw new Error('Falha ao buscar posição');
    const rows = await res.json();
    const p = rows && rows[0];

    if (!p) {
      container.innerHTML = '<p style="color: var(--tinta-suave);">Posição não encontrada. <a href="index.html">Voltar</a>.</p>';
      return;
    }

    document.getElementById('pageTitle').textContent = `${p.nome_popular} | Kama Sutra`;
    document.getElementById('pageDescription').setAttribute('content', p.texto_curto || p.nome_popular);

    container.innerHTML = `
      <span class="eyebrow">${p.nivel || 'iniciante'}</span>
      <h1 style="font-size: var(--step-3); margin-top: 14px;">${p.nome_popular}</h1>
      ${p.nome_sanscrito ? `<p style="font-family: var(--font-display); font-style: italic; color: var(--lilas); font-size: var(--step-1); margin-top: 6px;">${p.nome_sanscrito}</p>` : ''}
      ${p.imagem_webp_url ? `<img src="${p.imagem_webp_url}" alt="${p.nome_popular}" style="width:100%; border-radius: var(--radius-card); margin: 28px 0;">` : ''}
      <p style="color: var(--tinta-suave); font-size: var(--step-0); margin-top: 24px;">${p.texto_longo || p.texto_curto || ''}</p>
      ${p.tag_beneficio ? `<span class="tag" style="margin-top: 20px; display: inline-block;">${p.tag_beneficio}</span>` : ''}
    `;

  } catch (err) {
    console.error(err);
    container.innerHTML = '<p style="color: var(--tinta-suave);">Erro ao carregar. <a href="index.html">Voltar</a>.</p>';
  }
})();
