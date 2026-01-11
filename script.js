// script.js - loads businesses.json, renders cards, search, filter, contact modal
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
  closeModal: document.getElementById('closeModal')
};

function sanitizeNumber(n){
  return (n || '').replace(/[^\d+]/g,'');
}

function openModal(html){
  els.modalBody.innerHTML = html;
  els.modal.hidden = false;
  els.modal.setAttribute('aria-hidden','false');
}
function closeModal(){
  els.modal.hidden = true;
  els.modal.setAttribute('aria-hidden','true');
  els.modalBody.innerHTML = '';
}

els.closeModal.addEventListener('click', closeModal);
els.modal.addEventListener('click', (e)=>{ if(e.target === els.modal) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

async function loadBusinesses(){
  try{
    const res = await fetch(bizUrl);
    const data = await res.json();
    state.businesses = data;
    data.forEach(b=> b.category && state.categories.add(b.category));
    populateCategoryOptions();
    renderList();
  }catch(err){
    console.error('Could not load businesses.json', err);
    els.list.innerHTML = '<p style="grid-column:1/-1;color:#c00">Failed to load business data.</p>';
  }
}

function populateCategoryOptions(){
  const cats = [...state.categories].sort();
  cats.forEach(c=>{
    const o = document.createElement('option');
    o.value = c; o.textContent = c;
    els.category.appendChild(o);
  });
}

function renderList(){
  const q = (els.search.value || '').toLowerCase().trim();
  const cat = els.category.value;
  const items = state.businesses.filter(b=>{
    if(cat && b.category !== cat) return false;
    if(!q) return true;
    return (b.name + ' ' + (b.description||'') + ' ' + (b.category||'')).toLowerCase().includes(q);
  });

  if(items.length === 0){
    els.list.innerHTML = '<p style="grid-column:1/-1;color:var(--muted)">No businesses found. Try clearing filters.</p>';
    return;
  }

  els.list.innerHTML = '';
  items.forEach(b => {
    const card = document.createElement('article');
    card.className = 'card';
    const thumbUrl = b.image || `https://source.unsplash.com/collection/190727/800x600?sig=${encodeURIComponent(b.name)}`;
    card.innerHTML = `
      <div class="thumb" style="background-image:url('${thumbUrl}')" role="img" aria-label="${b.name} image"></div>
      <h4>${b.name}</h4>
      <p class="desc">${b.description || ''}</p>
      <div class="meta">
        <div class="tags"><span class="tag">${b.category||'Other'}</span></div>
        <div class="tags"><small style="color:var(--muted)">${b.address || ''}</small></div>
      </div>
      <div class="actions">
        ${b.phone ? `<a class="btn call" href="tel:${sanitizeNumber(b.phone)}">Call</a>` : ''}
        ${b.whatsapp ? `<a class="btn whatsapp" target="_blank" rel="noopener" href="https://wa.me/${sanitizeNumber(b.whatsapp)}">WhatsApp</a>` : ''}
        ${b.email ? `<a class="btn email" href="mailto:${b.email}">Email</a>` : ''}
        <button class="btn copy" data-phone="${b.phone||''}">Copy phone</button>
        <button class="btn" data-details>Details</button>
      </div>
    `;
    // details button handler
    const detailsBtn = card.querySelector('[data-details]');
    detailsBtn.addEventListener('click', ()=>{
      const html = `
        <strong>${b.name}</strong>
        <p>${b.description||''}</p>
        <p><strong>Category:</strong> ${b.category||'—'}</p>
        <p><strong>Address:</strong> ${b.address||'—'}</p>
        <p><strong>Hours:</strong> ${b.hours||'—'}</p>
        <p>
          ${b.phone ? `<a class="btn call" href="tel:${sanitizeNumber(b.phone)}">Call</a>` : ''}
          ${b.whatsapp ? `<a class="btn whatsapp" target="_blank" rel="noopener" href="https://wa.me/${sanitizeNumber(b.whatsapp)}">WhatsApp</a>` : ''}
          ${b.email ? `<a class="btn email" href="mailto:${b.email}">Email</a>` : ''}
          ${b.website ? `<a class="btn" target="_blank" rel="noopener" href="${b.website}">Visit website</a>` : ''}
          <button id="copyModalPhone" class="btn copy" data-phone="${b.phone||''}">Copy phone</button>
        </p>
      `;
      openModal(html);
      const copyBtn = document.getElementById('copyModalPhone');
      if(copyBtn){
        copyBtn.addEventListener('click', ()=>{ navigator.clipboard.writeText(copyBtn.dataset.phone || '').then(()=>{ copyBtn.textContent = 'Copied'; setTimeout(()=>copyBtn.textContent='Copy phone',1200); }); });
      }
    });

    // copy phone handler
    const copyBtn = card.querySelector('.btn.copy');
    if(copyBtn){
      copyBtn.addEventListener('click', ()=>{
        const ph = copyBtn.dataset.phone || '';
        navigator.clipboard.writeText(ph).then(()=>{ copyBtn.textContent = 'Copied'; setTimeout(()=>copyBtn.textContent='Copy phone',1200); });
      });
    }

    els.list.appendChild(card);
  });
}

els.search.addEventListener('input', renderList);
els.category.addEventListener('change', renderList);
els.clearBtn.addEventListener('click', ()=>{
  els.search.value = '';
  els.category.value = '';
  renderList();
});

document.getElementById('year').textContent = new Date().getFullYear();

loadBusinesses();
