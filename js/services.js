'use strict';
// services.js — Tab switching & panel reveal

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.srv-tab');
  const panels = document.querySelectorAll('.srv-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const panel = document.getElementById(target);
      if (panel) {
        panel.classList.add('active');
        // Re-trigger reveals in newly visible panel
        panel.querySelectorAll('.reveal-left, .reveal-right, .reveal, .reveal-scale').forEach(el => {
          el.classList.remove('revealed');
          // Force reflow
          void el.offsetWidth;
          setTimeout(() => el.classList.add('revealed'), 50);
        });
        // Re-trigger bar animations
        panel.querySelectorAll('.hvc-bar div, .qas-bar div').forEach(bar => {
          bar.style.animation = 'none';
          void bar.offsetWidth;
          bar.style.animation = '';
        });
      }
    });
  });

  // Check URL hash for direct service link
  const hash = window.location.hash?.replace('#', '');
  if (hash) {
    const matchTab = document.querySelector(`[data-tab="${hash}"]`);
    if (matchTab) matchTab.click();
  }
});
