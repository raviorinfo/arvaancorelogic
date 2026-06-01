'use strict';
// contact.js — Form validation + FAQ accordion

document.addEventListener('DOMContentLoaded', () => {

  // ── Pre-fill service from URL ──
  const params = new URLSearchParams(window.location.search);
  const svc = params.get('service');
  if (svc) {
    const sel = document.getElementById('service');
    if (sel) sel.value = svc;
  }

  // ── Contact Form ──
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const btn = document.getElementById('form-submit-btn');
  const btnText = document.getElementById('btn-text');

  if (form) {
    function markErr(el, bad) {
      el.style.borderColor = bad ? 'var(--red-500)' : '';
      el.style.boxShadow  = bad ? '0 0 0 3px rgba(239,68,68,0.15)' : '';
    }
    form.querySelectorAll('input, select, textarea').forEach(f => {
      f.addEventListener('input', () => markErr(f, false));
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fname = form.fname, email = form.email, service = form.service, details = form.details;
      let ok = true;
      [fname, email, service, details].forEach(f => markErr(f, false));
      if (!fname.value.trim()) { markErr(fname, true); ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { markErr(email, true); ok = false; }
      if (!service.value) { markErr(service, true); ok = false; }
      if (details.value.trim().length < 10) { markErr(details, true); ok = false; }
      if (!ok) return;

      btn.disabled = true; btn.style.opacity = '0.7'; btnText.textContent = 'Sending…';
      await new Promise(r => setTimeout(r, 1600));
      form.reset();
      btn.disabled = false; btn.style.opacity = ''; btnText.textContent = 'Send Message';
      if (success) { success.classList.add('visible'); setTimeout(() => success.classList.remove('visible'), 7000); }
    });
  }

  // ── FAQ Accordion ──
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false'); });
      if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
});
