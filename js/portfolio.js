'use strict';
// portfolio.js — Category filter

document.addEventListener('DOMContentLoaded', () => {
  const btns = document.querySelectorAll('.pf-btn');
  const cards = document.querySelectorAll('.proj-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cat = card.dataset.category;
        const show = filter === 'all' || cat === filter;
        if (show) {
          card.classList.remove('filtered-out');
          card.style.animation = 'pageFadeIn 0.4s ease both';
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });
});
