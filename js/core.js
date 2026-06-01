/* ═══════════════════════════════════════════
   CORE.JS — Shared JavaScript for ALL pages
   Fixes: proper DOM injection, relative paths
   Works with file:// protocol (no server needed)
═══════════════════════════════════════════ */
'use strict';

/* ── Path resolver: detect if page is inside /pages/ subfolder ── */
function getPaths() {
  const pathname = (window.location.pathname + window.location.href).replace(/\\/g, '/').toLowerCase();
  const inPages  = pathname.includes('/pages/');
  return {
    home:      inPages ? '../index.html'          : 'index.html',
    services:  inPages ? 'services.html'          : 'pages/services.html',
    about:     inPages ? 'about.html'             : 'pages/about.html',
    portfolio: inPages ? 'portfolio.html'         : 'pages/portfolio.html',
    blog:      inPages ? 'blog.html'              : 'pages/blog.html',
    contact:   inPages ? 'contact.html'           : 'pages/contact.html',
    // service hash anchors
    srvEnt:    inPages ? 'services.html#enterprise'  : 'pages/services.html#enterprise',
    srvAuto:   inPages ? 'services.html#automation'  : 'pages/services.html#automation',
    srvCloud:  inPages ? 'services.html#cloud'       : 'pages/services.html#cloud',
    srvCons:   inPages ? 'services.html#consulting'  : 'pages/services.html#consulting',
    abtMission:inPages ? 'about.html#mission'        : 'pages/about.html#mission',
    abtTeam:   inPages ? 'about.html#team'           : 'pages/about.html#team',
  };
}

/* ── Shared SVG strings ── */
const LOGO_SVG = `
<div class="logo-icon">
  <svg width="32" height="32" viewBox="0 0 34 34" fill="none">
    <rect x="2" y="2" width="13" height="13" rx="3" fill="url(#lg1)"/>
    <rect x="19" y="2" width="13" height="13" rx="3" fill="url(#lg2)" opacity=".75"/>
    <rect x="2" y="19" width="13" height="13" rx="3" fill="url(#lg2)" opacity=".75"/>
    <rect x="19" y="19" width="13" height="13" rx="3" fill="url(#lg1)"/>
    <defs>
      <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#3B82F6"/><stop offset="1" stop-color="#06B6D4"/></linearGradient>
      <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#06B6D4"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient>
    </defs>
  </svg>
</div>
<span class="logo-wordmark">Arvaan <span class="logo-accent">Core Logic</span></span>`;

/* ── Inject navigation bar & footer into DOM ── */
function injectShell() {
  const p = getPaths();

  /* 1. Scroll-progress bar */
  const progressEl = document.createElement('div');
  progressEl.id = 'scroll-progress';
  document.body.insertBefore(progressEl, document.body.firstChild);

  /* 2. Navbar — injected as a real <header> element */
  const navbar = document.createElement('header');
  navbar.className = 'navbar';
  navbar.id = 'navbar';
  navbar.innerHTML = `
    <div class="nav-inner">
      <a href="${p.home}" class="logo" id="logo-link">${LOGO_SVG}</a>
      <nav class="nav-links" aria-label="Main navigation">
        <a href="${p.home}"      class="nav-link" data-page="home"      id="nav-home">Home</a>
        <a href="${p.services}"  class="nav-link" data-page="services"  id="nav-services">Services</a>
        <a href="${p.about}"     class="nav-link" data-page="about"     id="nav-about">About Us</a>
        <a href="${p.portfolio}" class="nav-link" data-page="portfolio" id="nav-portfolio">Portfolio</a>
        <a href="${p.blog}"      class="nav-link" data-page="blog"      id="nav-blog">Insights</a>
        <a href="${p.contact}"   class="nav-link" data-page="contact"   id="nav-contact">Contact</a>
      </nav>
      <div class="nav-right">
        <button class="theme-btn" id="theme-btn" aria-label="Toggle theme">
          <span class="icon-sun">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </span>
          <span class="icon-moon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </span>
        </button>
        <a href="${p.contact}" class="nav-cta" id="nav-cta-btn">Get in Touch</a>
        <button class="hamburger-btn" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
      <a href="${p.home}"      class="mobile-nav-link" data-page="home"      data-close>Home</a>
      <a href="${p.services}"  class="mobile-nav-link" data-page="services"  data-close>Services</a>
      <a href="${p.about}"     class="mobile-nav-link" data-page="about"     data-close>About Us</a>
      <a href="${p.portfolio}" class="mobile-nav-link" data-page="portfolio" data-close>Portfolio</a>
      <a href="${p.blog}"      class="mobile-nav-link" data-page="blog"      data-close>Insights</a>
      <a href="${p.contact}"   class="mobile-nav-link" data-page="contact"   data-close>Contact</a>
      <a href="${p.contact}"   class="nav-cta mobile-cta" data-close>Get in Touch</a>
    </div>`;
  /* Insert after progress bar */
  progressEl.insertAdjacentElement('afterend', navbar);

  /* 3. Footer */
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-body">
        <div class="footer-brand">
          <a href="${p.home}" class="logo">
            <div class="logo-icon">
              <svg width="28" height="28" viewBox="0 0 34 34" fill="none">
                <rect x="2" y="2" width="13" height="13" rx="3" fill="url(#fg1)"/>
                <rect x="19" y="2" width="13" height="13" rx="3" fill="url(#fg2)" opacity=".75"/>
                <rect x="2" y="19" width="13" height="13" rx="3" fill="url(#fg2)" opacity=".75"/>
                <rect x="19" y="19" width="13" height="13" rx="3" fill="url(#fg1)"/>
                <defs>
                  <linearGradient id="fg1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#3B82F6"/><stop offset="1" stop-color="#06B6D4"/></linearGradient>
                  <linearGradient id="fg2" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#06B6D4"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient>
                </defs>
              </svg>
            </div>
            <span class="logo-wordmark">Arvaan <span class="logo-accent">Core Logic</span></span>
          </a>
          <p class="footer-tagline">Engineering Core Logic.<br>Powering Digital Transformation.<br>Your trusted technology partner.</p>
          <div class="footer-socials">
            <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-btn" aria-label="LinkedIn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener" class="social-btn" aria-label="GitHub">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener" class="social-btn" aria-label="Twitter">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Pages</h5>
          <ul>
            <li><a href="${p.home}">Home</a></li>
            <li><a href="${p.services}">Services</a></li>
            <li><a href="${p.about}">About Us</a></li>
            <li><a href="${p.portfolio}">Portfolio</a></li>
            <li><a href="${p.blog}">Insights</a></li>
            <li><a href="${p.contact}">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Services</h5>
          <ul>
            <li><a href="${p.srvEnt}">Enterprise Dev</a></li>
            <li><a href="${p.srvAuto}">QA &amp; Software Testing</a></li>
            <li><a href="${p.srvCloud}">Cloud &amp; DevOps</a></li>
            <li><a href="${p.srvCons}">Consulting</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="${p.abtMission}">Our Mission</a></li>
            <li><a href="${p.abtTeam}">Our Team</a></li>
            <li><a href="${p.portfolio}">Case Studies</a></li>
            <li><a href="${p.blog}">Blog</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Arvaan Core Logic. All rights reserved. Engineered with precision.</p>
        <div class="footer-bottom-right">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </div>`;
  document.body.appendChild(footer);

  /* 4. Scroll-to-top button */
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.id = 'scroll-top';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  scrollTopBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>`;
  document.body.appendChild(scrollTopBtn);
}

/* ── Theme ── */
function initTheme() {
  const html = document.documentElement;
  let theme = localStorage.getItem('acl-theme-v2') || 'light';
  html.setAttribute('data-theme', theme);

  document.addEventListener('click', e => {
    if (e.target.closest('#theme-btn')) {
      theme = theme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', theme);
      localStorage.setItem('acl-theme-v2', theme);
    }
  });
}

/* ── Active nav link ── */
function setActiveNav() {
  const page = document.body.dataset.page || 'home';
  document.querySelectorAll('[data-page]').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
}

/* ── Scroll progress ── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max > 0) bar.style.width = (window.scrollY / max * 100) + '%';
  }, { passive: true });
}

/* ── Navbar scroll shrink ── */
function initNavbarScroll() {
  const nb = document.getElementById('navbar');
  if (!nb) return;
  window.addEventListener('scroll', () => {
    nb.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

/* ── Hamburger ── */
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-nav');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
  });

  document.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    });
  });
}

/* ── Scroll-to-top ── */
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Intersection reveal ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ── Smooth anchor scroll (same-page) ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });
}

/* ── Particle Canvas ── */
function initCanvas(canvasId = 'hero-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, raf;
  const COUNT = window.innerWidth < 768 ? 40 : 80;
  const DIST  = 135;
  const SPD   = 0.26;

  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
  const spawn  = () => {
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPD, vy: (Math.random() - 0.5) * SPD,
      r: Math.random() * 1.8 + 0.7,
      a: Math.random() * 0.45 + 0.08,
    }));
  };
  const colors = () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    return { p: dark ? 'rgba(59,130,246,' : 'rgba(37,99,235,', l: dark ? 'rgba(6,182,212,' : 'rgba(59,130,246,' };
  };
  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    const c = colors();
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -8) p.x = W + 8; if (p.x > W + 8) p.x = -8;
      if (p.y < -8) p.y = H + 8; if (p.y > H + 8) p.y = -8;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = c.p + p.a + ')'; ctx.fill();
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < DIST) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = c.l + (1 - d / DIST) * 0.12 + ')';
          ctx.lineWidth = 1; ctx.stroke();
        }
      }
    });
    raf = requestAnimationFrame(draw);
  };
  resize(); spawn(); draw();
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); spawn(); draw(); }, { passive: true });
  document.addEventListener('mousemove', e => {
    const fx = (e.clientX / W - 0.5) * 0.35, fy = (e.clientY / H - 0.5) * 0.35;
    particles.forEach(p => {
      p.vx += fx * 0.002; p.vy += fy * 0.002;
      const s = Math.hypot(p.vx, p.vy);
      if (s > 1.4) { p.vx = p.vx / s * 1.4; p.vy = p.vy / s * 1.4; }
    });
  }, { passive: true });
}

/* ── Counter animation ── */
function animateCounters(selector = '[data-count]', triggerEl = null) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  let fired = false;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !fired) {
        fired = true;
        els.forEach(el => {
          const target = +el.dataset.count;
          const dur = 2200, start = performance.now();
          const tick = now => {
            const t = Math.min((now - start) / dur, 1);
            el.textContent = Math.floor((1 - Math.pow(1 - t, 3)) * target);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      }
    });
  }, { threshold: 0.4 });
  if (triggerEl) obs.observe(triggerEl);
  else els.forEach(el => obs.observe(el));
}

/* ── Boot sequence ── */
document.addEventListener('DOMContentLoaded', () => {
  injectShell();   // must be first — creates nav + footer DOM
  initTheme();
  setActiveNav();
  initScrollProgress();
  initNavbarScroll();
  initHamburger();
  initScrollTop();
  initReveal();
  initSmoothScroll();
  initCanvas();
  document.body.classList.add('page-transition');
});

/* Expose helpers for page-specific scripts */
window.ACL = { animateCounters, initReveal };
