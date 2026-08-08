// ===================================================================
// KAMA SUTRA — site.js
// Age gate + captura de e-mail (e-book). Substituir SUPABASE_URL/KEY
// pelos valores do projeto Substrato deste tenant.
// ===================================================================

const SUPABASE_URL = 'https://aewcxqzpbipwcdpsjfht.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_mINpOQLVbi0pilHc9bEtBA_l1a0o6c6';

const EBOOK_URL = 'https://aewcxqzpbipwcdpsjfht.supabase.co/storage/v1/object/public/ebooks/kama-sutra-guia-completo.pdf';

// Este projeto usa o schema dedicado "kamasutra" (não "public"),
// já que o Supabase é compartilhado com mantra/umbanda. É por isso
// que toda chamada REST abaixo envia o header Content-Profile.

// ---------- Age gate ----------
(function ageGate() {
  const gate = document.getElementById('ageGate');
  const confirmBtn = document.getElementById('ageConfirm');
  if (!gate) return;

  const KEY = 'ks_age_confirmed';
  if (localStorage.getItem(KEY) === '1') {
    gate.hidden = true;
    return;
  }

  confirmBtn?.addEventListener('click', () => {
    localStorage.setItem(KEY, '1');
    gate.hidden = true;
  });
})();

// ---------- Captura de e-mail (e-book) ----------
(function ebookForm() {
  const form = document.getElementById('ebookForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const email = input.value.trim();
    const btn = form.querySelector('button');
    const originalLabel = btn.textContent;
    const origem = form.dataset.origem || 'home_cta';

    btn.disabled = true;
    btn.textContent = 'Enviando...';

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leads_ebook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Profile': 'kamasutra',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ email, origem, criado_em: new Date().toISOString() })
      });

      if (!res.ok) throw new Error('Falha no envio');

      // Sucesso: troca o formulário por um botão de download direto do PDF.
      form.innerHTML = `
        <a href="${EBOOK_URL}" target="_blank" rel="noopener" class="btn btn-primary" download>
          Baixar o e-book (PDF) →
        </a>
      `;
    } catch (err) {
      console.error(err);
      btn.textContent = 'Erro — tente novamente';
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = originalLabel;
      }, 3000);
    }
  });
})();
