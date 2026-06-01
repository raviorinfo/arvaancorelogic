'use strict';
// blog.js — Category filter, search, newsletter

document.addEventListener('DOMContentLoaded', () => {

  const tabs  = document.querySelectorAll('.btab');
  const cards = document.querySelectorAll('.blog-card');

  // Category filter
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.cat;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      cards.forEach(card => {
        const match = cat === 'all' || card.dataset.cat === cat;
        card.classList.toggle('filtered-out', !match);
        if (match) card.style.animation = 'pageFadeIn 0.4s ease both';
      });
    });
  });

  // Live search
  const searchInput = document.getElementById('blog-search');
  searchInput?.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    cards.forEach(card => {
      const txt = card.textContent.toLowerCase();
      card.classList.toggle('filtered-out', q.length > 0 && !txt.includes(q));
    });
    // Reset category tabs when searching
    if (q.length > 0) {
      tabs.forEach(t => t.classList.remove('active'));
    }
  });

  // Load More (simulated)
  const loadMore = document.getElementById('load-more-btn');
  if (loadMore) {
    loadMore.addEventListener('click', () => {
      loadMore.textContent = 'All articles loaded';
      loadMore.disabled = true;
      loadMore.style.opacity = '0.5';
    });
  }

  // Newsletter
  const nlForm = document.getElementById('nl-form');
  if (nlForm) {
    nlForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = document.getElementById('nl-email');
      if (!email?.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = 'var(--red-500)';
        return;
      }
      const btn = nlForm.querySelector('button');
      btn.textContent = 'Subscribing…'; btn.disabled = true;
      await new Promise(r => setTimeout(r, 1200));
      btn.textContent = '✓ Subscribed!';
      btn.style.background = 'linear-gradient(135deg,#059669,#10B981)';
      email.value = '';
    });
  }
});
