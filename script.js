// script.js - loads businesses.json, renders cards, search, filter, contact modal
// Improved: wrapped in DOMContentLoaded, robust null checks, better modal event handling.

document.addEventListener('DOMContentLoaded', () => {
  const bizUrl = 'businesses.json';

  const state = {
    businesses: [],
    categories: new Set()
  };

  const els = {
    list: document.querySelector('.business-list'),
    search: document.getElementById('search'),
    category: document.getElementById('categoryFilter'),
    clearBtn: document.getElementById('clearBtn'),
    year: document.getElementById('year'),
    modal: document.getElementById('contactModal'),
    modalBody: document.getElementById('modalBody'),
    closeBtn: document.getElementById('closeModal')
  };

  // Safe helper: verify required elements
  function elExists(...elements) {
    return elements.every(e => e !== null && e !== undefined);
  }

  function sanitizeNumber(n) {
    return (n || '').replace(/[^\d+]/g, '');
  }

  function openModal(html) {
    if (!els.modal || !els.modalBody) return;
    els.modalBody.innerHTML = html;
    els.modal.hidden = false;
    els.modal.setAttribute('aria-hidden', 'false');
    // Prevent page scroll while modal is open
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!els.modal || !els.modalBody) return;
    els.modal.hidden = true;
    els.modal.setAttribute('aria-hidden', 'true');
    els.modalBody.innerHTML = '';
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // Attach modal event handlers safely
  if (els.closeBtn) {
    els.closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  if (els.modal) {
    // Click outside modal content to close
    els.modal.addEventListener('click', (e) => {
      if (e.target === els.modal) closeModal();
    });
  }

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && els.modal && !els.modal.hidden) closeModal();
  });

  // Load businesses JSON
  async function loadBusinesses() {
    try {
      const res = await fetch(bizUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      state.businesses = Array.isArray(data) ? data : [];
      state.businesses.forEach(b => b.category && state.categories.add(b.category));
      populateCategoryOptions();
      renderList();
    } catch (err) {
      console.error('Could not load businesses.json', err);
      if (els.list) {
        els.list.innerHTML = '<p style="grid-column:1/-1;color:#c00">Failed to load business data.</p>';
      }
    }
  }

  function populateCategoryOptions() {
    if (!els.category) return;
    // Clear previous options except first
    while (els.category.options.length > 1) els.category.remove(1);
    const cats = [...state.categories].sort();
    cats.forEach(c => {
      const o = document.createElement('option');
      o.value = c; o.textContent = c;
      els.category.appendChild(o);
    });
  }

  // Render the list and attach handlers for card buttons. Use delegation for modal copy button.
  function renderList() {
    if (!els.list) return;
    const q = (els.search && els.search.value || '').toLowerCase().trim();
    const cat = (els.category && els.category.value) || '';
    const items = state.businesses.filter(b => {
      if (cat && b.category !== cat) return false;
      if (!q) return true;
      return (b.name + ' ' + (b.description || '') + ' ' + (b.category || '')).toLowerCase().includes(q);
    });

    if (items.length === 0) {
      els.list.innerHTML = '<p style="grid-column:1/-1;color:var(--muted)">No businesses found. Try clearing filters.</p>';
      return;
    }

    els.list.innerHTML = '';
    items.forEach(b => {
      const card = document.createElement('article');
      card.className = 'card';
      const thumbUrl = b.image || `https://source.unsplash.com/collection/190727/800x600?sig=${encodeURIComponent(b.name)}`;
      card.innerHTML = `
        <div class="thumb" style="background-image:url('${thumbUrl}')" role="img" aria-label="${escapeHtml(b.name)} image"></div>
        <h4>${escapeHtml(b.name)}</h4>
        <p class="desc">${escapeHtml(b.description || '')}</p>
        <div class="meta">
          <div class="tags"><span class="tag">${escapeHtml(b.category || 'Other')}</span></div>
          <div class="tags"><small style="color:var(--muted)">${escapeHtml(b.address || '')}</small></div>
        </div>
        <div class="actions">
          ${b.phone ? `<a class="btn call" href="tel:${sanitizeNumber(b.phone)}">Call</a>` : ''}
          ${b.whatsapp ? `<a class="btn whatsapp" target="_blank" rel="noopener" href="https://wa.me/${sanitizeNumber(b.whatsapp)}">WhatsApp</a>` : ''}
          ${b.email ? `<a class="btn email" href="mailto:${escapeHtml(b.email)}">Email</a>` : ''}
          <button class="btn copy" data-phone="${escapeHtml(b.phone || '')}">Copy phone</button>
          <button class="btn details" data-name="${escapeHtml(b.name)}">Details</button>
        </div>
      `;
      // details button handler (per-card)
      const detailsBtn = card.querySelector('.details');
      if (detailsBtn) {
        detailsBtn.addEventListener('click', () => {
          const html = `
            <div style="display:flex;flex-direction:column;gap:.5rem">
              <strong>${escapeHtml(b.name)}</strong>
              <div>${escapeHtml(b.description || '')}</div>
              <div><strong>Category:</strong> ${escapeHtml(b.category || '—')}</div>
              <div><strong>Address:</strong> ${escapeHtml(b.address || '—')}</div>
              <div><strong>Hours:</strong> ${escapeHtml(b.hours || '—')}</div>
              <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.5rem">
                ${b.phone ? `<a class="btn call" href="tel:${sanitizeNumber(b.phone)}">Call</a>` : ''}
                ${b.whatsapp ? `<a class="btn whatsapp" target="_blank" rel="noopener" href="https://wa.me/${sanitizeNumber(b.whatsapp)}">WhatsApp</a>` : ''}
                ${b.email ? `<a class="btn email" href="mailto:${escapeHtml(b.email)}">Email</a>` : ''}
                ${b.website ? `<a class="btn" target="_blank" rel="noopener" href="${escapeHtml(b.website)}">Visit website</a>` : ''}
                <button class="btn copy" data-phone="${escapeHtml(b.phone || '')}">Copy phone</button>
              </div>
            </div>
          `;
          openModal(html);
        });
      }

      // per-card copy handler (works even if modal not open)
      const copyBtn = card.querySelector('.btn.copy');
      if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
          const ph = copyBtn.dataset.phone || '';
          try {
            await navigator.clipboard.writeText(ph);
            flashTemporary(copyBtn, 'Copied', 1200);
          } catch (err) {
            console.warn('Clipboard write failed', err);
          }
        });
      }

      els.list.appendChild(card);
    });
  }

  // Delegated handler for modal actions (copy inside modal, any future buttons)
  if (els.modal) {
    els.modal.addEventListener('click', async (e) => {
      const copyBtn = e.target.closest('.btn.copy');
      if (copyBtn && els.modal.contains(copyBtn)) {
        const ph = copyBtn.dataset.phone || '';
        try {
          await navigator.clipboard.writeText(ph);
          flashTemporary(copyBtn, 'Copied', 1200);
        } catch (err) {
          console.warn('Clipboard write failed', err);
        }
        return;
      }
      // clicks on modal overlay are handled earlier (target === modal)
    });
  }

  // Utility: temporary text feedback on a button-like element
  function flashTemporary(el, text, ms = 1200) {
    if (!el) return;
    const orig = el.textContent;
    el.textContent = text;
    setTimeout(() => {
      el.textContent = orig;
    }, ms);
  }

  // Basic HTML escaping to avoid accidental injection from JSON
  function escapeHtml(str) {
    if (str === undefined || str === null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Wire up search / filter / clear if elements exist
  if (els.search) els.search.addEventListener('input', renderList);
  if (els.category) els.category.addEventListener('change', renderList);
  if (els.clearBtn) {
    els.clearBtn.addEventListener('click', () => {
      if (els.search) els.search.value = '';
      if (els.category) els.category.value = '';
      renderList();
    });
  }

  if (els.year) els.year.textContent = new Date().getFullYear();

  // Start
  loadBusinesses();
});
