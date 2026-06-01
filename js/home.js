'use strict';
// home.js — Home page specific interactions

document.addEventListener('DOMContentLoaded', () => {
  // Counter animation tied to stats section
  const statsEl = document.getElementById('hero-stats');
  if (statsEl && window.ACL) {
    window.ACL.animateCounters('[data-count]', statsEl);
  }

  // Typing effect in terminal
  const typingTarget = document.getElementById('typing-target');
  if (typingTarget) {
    const cmds = [
      'npm run build:production',
      'pytest tests/ --cov=100%',
      'docker push acl/app:v2.1.0',
      'playwright test --all-browsers',
      'terraform apply --auto-approve',
      'git push origin main',
      'kubectl rollout status deploy/api',
    ];
    let li = 0, ci = 0, del = false, paused = false;
    function type() {
      if (paused) { paused = false; setTimeout(type, 2200); return; }
      const cur = cmds[li];
      if (!del) {
        typingTarget.textContent = cur.slice(0, ++ci);
        if (ci === cur.length) { paused = true; del = true; setTimeout(type, 1800); return; }
      } else {
        typingTarget.textContent = cur.slice(0, --ci);
        if (ci === 0) { del = false; li = (li + 1) % cmds.length; }
      }
      setTimeout(type, del ? 30 : 60);
    }
    setTimeout(type, 900);
  }

  // Hero card entrance animation
  document.querySelectorAll('.hv-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 500 + i * 130);
  });

  // Testimonial auto-highlight
  const tc = document.querySelectorAll('.testi-card');
  if (tc.length) {
    let cur = 0;
    setInterval(() => {
      const anyHov = [...tc].some(c => c.matches(':hover'));
      if (!anyHov) {
        tc.forEach(c => { c.style.borderColor = ''; c.style.transform = ''; });
        tc[cur].style.borderColor = 'rgba(59,130,246,0.4)';
        tc[cur].style.transform = 'translateY(-6px)';
        cur = (cur + 1) % tc.length;
      }
    }, 3200);
    tc.forEach(c => c.addEventListener('mouseenter', () => tc.forEach(cc => { cc.style.borderColor = ''; cc.style.transform = ''; })));
  }
});
