// ===================================================================
// KAMA SUTRA — site.js
// Age gate + captura de e-mail (e-book). Substituir SUPABASE_URL/KEY
// pelos valores do projeto Substrato deste tenant.
// ===================================================================

const SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
const SUPABASE_ANON_KEY = 'SUA_ANON_KEY';

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
        body: JSON.stringify({ email, origem: 'home_cta', criado_em: new Date().toISOString() })
      });

      if (!res.ok) throw new Error('Falha no envio');

      btn.textContent = 'Enviado! Confira seu e-mail';
      input.value = '';
    } catch (err) {
      console.error(err);
      btn.textContent = 'Erro — tente novamente';
    } finally {
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = originalLabel;
      }, 3000);
    }
  });
})();
