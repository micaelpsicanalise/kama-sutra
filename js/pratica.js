// ===================================================================
// KAMA SUTRA — pratica.js
// Busca posições publicadas na tabela `posicoes` (schema kamasutra)
// e renderiza o grid. Se a tabela estiver vazia ou o fetch falhar,
// mostra 4 placeholders "em breve" pra não deixar a página quebrada.
// ===================================================================

(async function loadPosicoes() {
  const grid = document.getElementById('posicoesGrid');
  if (!grid) return;

  const placeholders = () => {
    grid.innerHTML = '';
    const niveis = ['Iniciante', 'Intermediário', 'Conexão', 'Avançado'];
    niveis.forEach((nivel, i) => {
      grid.innerHTML += `
        <div class="posicao-card">
          <div class="posicao-thumb">em breve</div>
          <div class="posicao-info">
            <h4>Posição ${i + 1}</h4>
            <span class="sanskrit">nome sânscrito</span>
            <span class="tag">${nivel}</span>
          </div>
        </div>`;
    });
  };

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/posicoes?select=slug,nome_popular,nome_sanscrito,nivel,imagem_webp_url&publicado=eq.true&order=ordem.asc`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Accept-Profile': 'kamasutra'
        }
      }
    );

    if (!res.ok) throw new Error('Falha ao buscar posições');
    const posicoes = await res.json();

    if (!posicoes || posicoes.length === 0) {
      placeholders();
      return;
    }

    grid.innerHTML = posicoes.map(p => `
      <a href="posicao.html?slug=${encodeURIComponent(p.slug)}" class="posicao-card" style="text-decoration:none; color:inherit; display:block;">
        <div class="posicao-thumb">
          ${p.imagem_webp_url
            ? `<img src="${p.imagem_webp_url}" alt="${p.nome_popular}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`
            : 'em breve'}
        </div>
        <div class="posicao-info">
          <h4>${p.nome_popular}</h4>
          ${p.nome_sanscrito ? `<span class="sanskrit">${p.nome_sanscrito}</span>` : ''}
          <span class="tag">${p.nivel || 'iniciante'}</span>
        </div>
      </a>
    `).join('');

  } catch (err) {
    console.error(err);
    placeholders();
  }
})();
