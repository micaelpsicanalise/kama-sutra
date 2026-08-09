// ===================================================================
// KAMA SUTRA — admin.js
// Login (Supabase Auth) + CRUD de posicoes/artigos + leitura de leads.
// Schema Postgres: kamasutra (não public).
//
// IMPORTANTE: preencher as mesmas credenciais usadas em ../js/site.js.
// Este arquivo é independente (o admin não carrega site.js), então
// as constantes abaixo precisam ser mantidas em sincronia manualmente.
// ===================================================================

const SUPABASE_URL = 'https://aewcxqzpbipwcdpsjfht.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_mINpOQLVbi0pilHc9bEtBA_l1a0o6c6';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  db: { schema: 'kamasutra' }
});

// ---------- Elementos ----------
const loginScreen = document.getElementById('loginScreen');
const adminShell = document.getElementById('adminShell');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');

// ---------- Sessão ----------
async function checkSession() {
  const { data: { session } } = await sb.auth.getSession();
  if (session) {
    showShell();
  } else {
    showLogin();
  }
}

function showLogin() {
  loginScreen.hidden = false;
  adminShell.hidden = true;
}

function showShell() {
  loginScreen.hidden = true;
  adminShell.hidden = false;
  loadPosicoes();
  loadArtigos();
  loadLeads();
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.classList.remove('show');
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) {
    loginError.classList.add('show');
    return;
  }
  showShell();
});

logoutBtn.addEventListener('click', async () => {
  await sb.auth.signOut();
  showLogin();
});

// ---------- Navegação entre views ----------
const navButtons = document.querySelectorAll('.admin-nav button');
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    ['posicoes', 'artigos', 'leads'].forEach(v => {
      document.getElementById(`view-${v}`).hidden = (v !== btn.dataset.view);
    });
  });
});

// ===================================================================
// POSIÇÕES
// ===================================================================

const posicaoModal = document.getElementById('posicaoModal');
const posicaoForm = document.getElementById('posicaoForm');
const posicaoError = document.getElementById('posicaoError');

async function loadPosicoes() {
  const tbody = document.getElementById('posicoesTbody');
  const { data, error } = await sb.from('posicoes').select('*').order('ordem', { ascending: true });

  if (error) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-state">Erro ao carregar: ${error.message}</td></tr>`;
    return;
  }
  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-state">Nenhuma posição cadastrada ainda.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(p => `
    <tr>
      <td><strong>${escapeHtml(p.nome_popular)}</strong></td>
      <td>${escapeHtml(p.nivel || '—')}</td>
      <td><span class="badge ${p.publicado ? 'badge-on' : 'badge-off'}">${p.publicado ? 'Publicado' : 'Rascunho'}</span></td>
      <td>${p.ordem ?? 0}</td>
      <td>
        <div class="row-actions">
          <button data-id="${p.id}" class="editPosicao">Editar</button>
          <button data-id="${p.id}" class="danger deletePosicao">Excluir</button>
        </div>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.editPosicao').forEach(b => b.addEventListener('click', () => editPosicao(b.dataset.id, data)));
  tbody.querySelectorAll('.deletePosicao').forEach(b => b.addEventListener('click', () => deletePosicao(b.dataset.id)));
}

function openPosicaoModal(title) {
  document.getElementById('posicaoModalTitle').textContent = title;
  posicaoError.classList.remove('show');
  posicaoModal.hidden = false;
}

document.getElementById('newPosicaoBtn').addEventListener('click', () => {
  posicaoForm.reset();
  document.getElementById('posicaoId').value = '';
  document.getElementById('posicaoImagem').value = '';
  document.getElementById('posicaoImagemPreviewWrap').innerHTML = '';
  document.getElementById('posicaoImagemStatus').textContent = '';
  openPosicaoModal('Nova posição');
});

document.getElementById('posicaoCancelBtn').addEventListener('click', () => posicaoModal.hidden = true);

function editPosicao(id, data) {
  const p = data.find(x => x.id === id);
  if (!p) return;
  document.getElementById('posicaoId').value = p.id;
  document.getElementById('posicaoNome').value = p.nome_popular || '';
  document.getElementById('posicaoSlug').value = p.slug || '';
  document.getElementById('posicaoSanscrito').value = p.nome_sanscrito || '';
  document.getElementById('posicaoNivel').value = p.nivel || 'iniciante';
  document.getElementById('posicaoTag').value = p.tag_beneficio || '';
  document.getElementById('posicaoTextoCurto').value = p.texto_curto || '';
  document.getElementById('posicaoTextoLongo').value = p.texto_longo || '';
  document.getElementById('posicaoImagem').value = p.imagem_webp_url || '';
  document.getElementById('posicaoOrdem').value = p.ordem ?? 0;
  document.getElementById('posicaoPublicado').checked = !!p.publicado;

  const previewWrap = document.getElementById('posicaoImagemPreviewWrap');
  const status = document.getElementById('posicaoImagemStatus');
  document.getElementById('posicaoImagemArquivo').value = '';
  if (p.imagem_webp_url) {
    previewWrap.innerHTML = `<img src="${p.imagem_webp_url}" alt="" style="width:100%; max-width:220px; border-radius:12px; display:block;">`;
    status.textContent = 'Imagem atual — escolha outro arquivo pra substituir.';
  } else {
    previewWrap.innerHTML = '';
    status.textContent = 'Nenhuma imagem ainda.';
  }

  openPosicaoModal('Editar posição');
}

async function deletePosicao(id) {
  if (!confirm('Excluir esta posição? Essa ação não pode ser desfeita.')) return;
  const { error } = await sb.from('posicoes').delete().eq('id', id);
  if (error) { alert('Erro ao excluir: ' + error.message); return; }
  loadPosicoes();
}

// ---------- Upload de imagem (Supabase Storage, bucket "posicoes-imagens") ----------
document.getElementById('posicaoImagemArquivo').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const status = document.getElementById('posicaoImagemStatus');
  const previewWrap = document.getElementById('posicaoImagemPreviewWrap');
  if (!file) return;

  status.textContent = 'Enviando...';
  const ext = file.name.split('.').pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error: uploadError } = await sb.storage.from('posicoes-imagens').upload(path, file, {
    cacheControl: '3600',
    upsert: false
  });

  if (uploadError) {
    status.textContent = 'Erro ao enviar imagem: ' + uploadError.message;
    return;
  }

  const { data } = sb.storage.from('posicoes-imagens').getPublicUrl(path);
  document.getElementById('posicaoImagem').value = data.publicUrl;
  previewWrap.innerHTML = `<img src="${data.publicUrl}" alt="" style="width:100%; max-width:220px; border-radius:12px; display:block;">`;
  status.textContent = 'Imagem enviada ✓';
});

posicaoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  posicaoError.classList.remove('show');

  const id = document.getElementById('posicaoId').value;
  const payload = {
    nome_popular: document.getElementById('posicaoNome').value.trim(),
    slug: document.getElementById('posicaoSlug').value.trim(),
    nome_sanscrito: document.getElementById('posicaoSanscrito').value.trim() || null,
    nivel: document.getElementById('posicaoNivel').value,
    tag_beneficio: document.getElementById('posicaoTag').value.trim() || null,
    texto_curto: document.getElementById('posicaoTextoCurto').value.trim() || null,
    texto_longo: document.getElementById('posicaoTextoLongo').value.trim() || null,
    imagem_webp_url: document.getElementById('posicaoImagem').value.trim() || null,
    ordem: parseInt(document.getElementById('posicaoOrdem').value, 10) || 0,
    publicado: document.getElementById('posicaoPublicado').checked,
    atualizado_em: new Date().toISOString()
  };

  const query = id
    ? sb.from('posicoes').update(payload).eq('id', id)
    : sb.from('posicoes').insert(payload);

  const { error } = await query;
  if (error) {
    posicaoError.textContent = 'Erro ao salvar: ' + error.message;
    posicaoError.classList.add('show');
    return;
  }
  posicaoModal.hidden = true;
  loadPosicoes();
});

// ===================================================================
// ARTIGOS
// ===================================================================

const artigoModal = document.getElementById('artigoModal');
const artigoForm = document.getElementById('artigoForm');
const artigoError = document.getElementById('artigoError');

async function loadArtigos() {
  const tbody = document.getElementById('artigosTbody');
  const { data, error } = await sb.from('artigos').select('*').order('pilar', { ascending: true });

  if (error) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-state">Erro ao carregar: ${error.message}</td></tr>`;
    return;
  }
  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-state">Nenhum artigo cadastrado ainda.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(a => `
    <tr>
      <td><strong>${escapeHtml(a.titulo)}</strong></td>
      <td>${escapeHtml(a.pilar)}</td>
      <td><span class="badge ${a.publicado ? 'badge-on' : 'badge-off'}">${a.publicado ? 'Publicado' : 'Rascunho'}</span></td>
      <td>
        <div class="row-actions">
          <button data-id="${a.id}" class="editArtigo">Editar</button>
          <button data-id="${a.id}" class="danger deleteArtigo">Excluir</button>
        </div>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.editArtigo').forEach(b => b.addEventListener('click', () => editArtigo(b.dataset.id, data)));
  tbody.querySelectorAll('.deleteArtigo').forEach(b => b.addEventListener('click', () => deleteArtigo(b.dataset.id)));
}

function openArtigoModal(title) {
  document.getElementById('artigoModalTitle').textContent = title;
  artigoError.classList.remove('show');
  artigoModal.hidden = false;
}

document.getElementById('newArtigoBtn').addEventListener('click', () => {
  artigoForm.reset();
  document.getElementById('artigoId').value = '';
  document.getElementById('artigoPublicado').checked = true;
  openArtigoModal('Novo artigo');
});

document.getElementById('artigoCancelBtn').addEventListener('click', () => artigoModal.hidden = true);

function editArtigo(id, data) {
  const a = data.find(x => x.id === id);
  if (!a) return;
  document.getElementById('artigoId').value = a.id;
  document.getElementById('artigoTitulo').value = a.titulo || '';
  document.getElementById('artigoSlug').value = a.slug || '';
  document.getElementById('artigoPilar').value = a.pilar || 'origem';
  document.getElementById('artigoSubtitulo').value = a.subtitulo || '';
  document.getElementById('artigoCorpo').value = a.corpo_md || '';
  document.getElementById('artigoMeta').value = a.meta_description || '';
  document.getElementById('artigoPublicado').checked = !!a.publicado;
  openArtigoModal('Editar artigo');
}

async function deleteArtigo(id) {
  if (!confirm('Excluir este artigo? Essa ação não pode ser desfeita.')) return;
  const { error } = await sb.from('artigos').delete().eq('id', id);
  if (error) { alert('Erro ao excluir: ' + error.message); return; }
  loadArtigos();
}

artigoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  artigoError.classList.remove('show');

  const id = document.getElementById('artigoId').value;
  const payload = {
    titulo: document.getElementById('artigoTitulo').value.trim(),
    slug: document.getElementById('artigoSlug').value.trim(),
    pilar: document.getElementById('artigoPilar').value,
    subtitulo: document.getElementById('artigoSubtitulo').value.trim() || null,
    corpo_md: document.getElementById('artigoCorpo').value.trim() || null,
    meta_description: document.getElementById('artigoMeta').value.trim() || null,
    publicado: document.getElementById('artigoPublicado').checked,
    atualizado_em: new Date().toISOString()
  };

  const query = id
    ? sb.from('artigos').update(payload).eq('id', id)
    : sb.from('artigos').insert(payload);

  const { error } = await query;
  if (error) {
    artigoError.textContent = 'Erro ao salvar: ' + error.message;
    artigoError.classList.add('show');
    return;
  }
  artigoModal.hidden = true;
  loadArtigos();
});

// ===================================================================
// LEADS
// ===================================================================

let leadsCache = [];

async function loadLeads() {
  const tbody = document.getElementById('leadsTbody');
  const { data, error } = await sb.from('leads_ebook').select('*').order('criado_em', { ascending: false });

  if (error) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-state">Erro ao carregar: ${error.message}</td></tr>`;
    return;
  }
  leadsCache = data || [];
  if (leadsCache.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-state">Nenhum lead capturado ainda.</td></tr>`;
    return;
  }

  tbody.innerHTML = leadsCache.map(l => `
    <tr>
      <td>${escapeHtml(l.email)}</td>
      <td>${escapeHtml(l.origem || '—')}</td>
      <td>${new Date(l.criado_em).toLocaleDateString('pt-BR')}</td>
      <td>
        <div class="row-actions">
          <button data-id="${l.id}" class="danger deleteLead">Excluir</button>
        </div>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.deleteLead').forEach(b => b.addEventListener('click', () => deleteLead(b.dataset.id)));
}

async function deleteLead(id) {
  if (!confirm('Excluir este lead?')) return;
  const { error } = await sb.from('leads_ebook').delete().eq('id', id);
  if (error) { alert('Erro ao excluir: ' + error.message); return; }
  loadLeads();
}

document.getElementById('exportLeadsBtn').addEventListener('click', () => {
  if (leadsCache.length === 0) { alert('Nenhum lead pra exportar.'); return; }
  const header = 'email,origem,criado_em\n';
  const rows = leadsCache.map(l => `${l.email},${l.origem || ''},${l.criado_em}`).join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads-ebook-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
});

// ---------- Util ----------
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ---------- Boot ----------
checkSession();
