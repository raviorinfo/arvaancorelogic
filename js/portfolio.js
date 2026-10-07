'use strict';
// portfolio.js — Category filter & interactive Case Study modal

const CASE_STUDIES = {
  finserve: {
    title: 'FinServe Technologies — Core Banking Platform Rewrite',
    tag: 'Enterprise Development',
    year: '2024',
    client: 'FinServe Technologies (London / Singapore)',
    challenge: 'A legacy 12-year-old monolithic Java banking system was processing over 4.5 million daily transactions. As customer volume scaled, database locking and high latency (averaging 820ms per transaction) triggered frequent payment timeouts and high infrastructure hosting overhead.',
    solution: 'Arvaan Core Logic architected a zero-downtime Strangler Fig migration to an event-driven microservices architecture using Node.js, TypeScript, PostgreSQL, and Apache Kafka. All payment authorizations were decoupled into independent, horizontally scalable worker nodes with strict idempotency guards.',
    metrics: [
      { val: '5x', label: 'Throughput Increase' },
      { val: '70%', label: 'Latency Reduction (to 85ms)' },
      { val: '0 hrs', label: 'Migration Downtime' },
      { val: '99.999%', label: 'Availability SLA' }
    ],
    tech: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Apache Kafka', 'AWS EKS', 'Docker'],
    testimonial: '"Arvaan Core Logic executed what our internal team thought was impossible: migrating our core banking pipeline without a single minute of service disruption." — Suresh Kumar, CTO'
  },
  retailscale: {
    title: 'RetailScale — End-to-End E-Commerce QA Automation',
    tag: 'QA & Software Testing',
    year: '2024',
    client: 'RetailScale Global (New York)',
    challenge: 'With 500,000+ SKU inventory and rapid bi-weekly feature deployments, manual QA testing required a team of 14 testers taking 3 full weeks per regression cycle. Critical visual and checkout bugs were regularly escaping into production.',
    solution: 'We engineered a centralized Playwright + Pytest automation framework featuring custom TypeScript fixtures, Page Object Models, and 4-way parallel matrix sharding across GitHub Actions runners. Synthetic regression tests now run automatically on every pull request.',
    metrics: [
      { val: '4 Days', label: 'Release Cycle (down from 3 wks)' },
      { val: '99%', label: 'Bug Detection Rate' },
      { val: '2,000+', label: 'Automated Test Cases' },
      { val: '80%', label: 'QA Cost Efficiency' }
    ],
    tech: ['Playwright', 'TypeScript', 'Pytest', 'GitHub Actions', 'Allure Reports', 'Docker'],
    testimonial: '"Our engineering release velocity tripled within two months of adopting Arvaan’s Playwright framework." — Maria Rodriguez, VP of Engineering'
  },
  medtech: {
    title: 'MedTech Corp — Cloud Migration & HIPAA Compliance',
    tag: 'Cloud & DevOps',
    year: '2023',
    client: 'MedTech Corp (Boston)',
    challenge: 'Eight legacy on-premise electronic health records (EHR) applications were running on aging bare-metal servers with no disaster recovery, unpredictable outages, and impending HIPAA compliance audits.',
    solution: 'Engineered a phased cloud migration to AWS utilizing multi-region Terraform IaC modules. Containerized workloads on Amazon EKS with strict KMS envelope encryption at rest and in transit, AWS Secrets Manager, and SOC2/HIPAA guardrails.',
    metrics: [
      { val: '40%', label: 'Application Performance Gain' },
      { val: '33%', label: 'Infrastructure Cost Reduction' },
      { val: '100%', label: 'HIPAA & SOC2 Audit Pass' },
      { val: '15 min', label: 'RPO / RTO Disaster Recovery' }
    ],
    tech: ['AWS', 'Terraform', 'Kubernetes (EKS)', 'Docker', 'PostgreSQL Aurora', 'CloudWatch'],
    testimonial: '"Their cloud migration was flawless — zero downtime, remarkable speed improvements, and total compliance peace of mind." — James Liu, Head of Infrastructure'
  },
  logiflow: {
    title: 'LogiFlow — Global Logistics SaaS Platform',
    tag: 'Enterprise Development',
    year: '2023',
    client: 'LogiFlow Solutions (Dubai / Frankfurt)',
    challenge: 'A global logistics consortium required a ground-up multi-tenant SaaS application to track air and ocean freight fleets in real time across 200+ enterprise supply chain clients.',
    solution: 'Built a real-time reactive SaaS platform utilizing Next.js, Python FastAPI, Redis Pub/Sub, and AWS EventBridge. Implemented geospatial route optimization algorithms and multi-tenant row-level database security.',
    metrics: [
      { val: '200+', label: 'Enterprise Tenants' },
      { val: '99.95%', label: 'SLA Uptime' },
      { val: '12 Mo', label: 'Full Time-to-Market' },
      { val: '1.2M', label: 'Daily Telemetry Events' }
    ],
    tech: ['Next.js', 'Python', 'FastAPI', 'Redis', 'PostgreSQL', 'AWS EventBridge'],
    testimonial: '"Arvaan Core Logic acted as an extension of our core executive team, turning our vision into a premier SaaS product." — David Schneider, Founder'
  },
  legacy: {
    title: 'EduSync — 30-Year Legacy Transformation Roadmap',
    tag: 'Business Logic Consulting',
    year: '2023',
    client: 'EduSync International',
    challenge: 'A nationwide university management system built on proprietary 1990s database tech was unable to integrate with modern LMS platforms, driving up maintenance costs by $1.8M annually.',
    solution: 'Delivered an architectural audit, API-first abstraction layer, and modular data migration strategy that allowed legacy mainframes to interface with modern cloud portals without risky complete shutdowns.',
    metrics: [
      { val: '50%', label: 'Operating Cost Reduction' },
      { val: '24 Mo', label: 'Transformation Roadmap Delivered' },
      { val: '6', label: 'Core Systems Integrated' },
      { val: '100%', label: 'Data Preservation' }
    ],
    tech: ['System Architecture', 'API Gateway', 'REST APIs', 'PostgreSQL', 'OAuth 2.0'],
    testimonial: '"The architectural clarity Arvaan provided saved us millions in failed vendor attempts." — Dr. Anita Vance, CIO'
  },
  bankqa: {
    title: 'BankFirst — Automated Regulatory Test Compliance',
    tag: 'QA & Software Testing',
    year: '2022',
    client: 'BankFirst Financial Group',
    challenge: 'Strict central banking audit standards required quarterly verification of 800+ financial transaction rules, consuming thousands of manual hours and holding back sprint releases.',
    solution: 'Designed an automated compliance testing harness using Selenium, Pytest, and Jenkins that runs daily synthetic transaction checks across staging and sandbox financial networks.',
    metrics: [
      { val: '97%', label: 'Audit Test Coverage' },
      { val: '3 FTE', label: 'Engineering Cost Reallocated' },
      { val: '100%', label: 'Audit Pass Rate' },
      { val: '45min', label: 'Full Compliance Verification' }
    ],
    tech: ['Selenium', 'Python', 'Pytest', 'Jenkins', 'Oracle DB', 'Splunk'],
    testimonial: '"Passed our central banking audit with zero non-conformances thanks to Arvaan’s automated harness." — Marcus Sterling, Risk & Compliance Officer'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Category filter
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

  // Create Modal Backdrop in DOM
  const modalWrap = document.createElement('div');
  modalWrap.className = 'cs-modal-backdrop';
  modalWrap.id = 'cs-modal-backdrop';
  modalWrap.innerHTML = `
    <div class="cs-modal" role="dialog" aria-modal="true">
      <div class="cs-modal-header">
        <div>
          <span class="tag tag-blue" id="csm-tag">Case Study</span>
          <h3 id="csm-title">Case Study Details</h3>
        </div>
        <button class="cs-modal-close" id="csm-close" aria-label="Close modal">&times;</button>
      </div>
      <div class="cs-modal-body">
        <h4>Client &amp; Context</h4>
        <p id="csm-client"></p>
        
        <h4>The Engineering Challenge</h4>
        <p id="csm-challenge"></p>

        <h4>Our Solution &amp; Architecture</h4>
        <p id="csm-solution"></p>

        <h4>Key Results &amp; Impact</h4>
        <div class="cs-metrics-grid" id="csm-metrics"></div>

        <h4>Technologies Leveraged</h4>
        <div class="proj-tags" id="csm-tags"></div>

        <h4>Client Testimonial</h4>
        <blockquote style="margin:1rem 0 0;padding:1rem 1.25rem;background:var(--surface);border-left:4px solid var(--blue-500);border-radius:0 var(--radius-sm) var(--radius-sm) 0;font-style:italic;" id="csm-quote"></blockquote>
      </div>
      <div class="cs-modal-footer">
        <span style="font-size:0.85rem;color:var(--text-3);">Need a similar solution for your enterprise?</span>
        <a href="contact.html" class="btn-primary" style="padding:0.6rem 1.25rem;font-size:0.875rem;">Discuss Your Project &rarr;</a>
      </div>
    </div>
  `;
  document.body.appendChild(modalWrap);

  const backdrop = document.getElementById('cs-modal-backdrop');
  const closeBtn = document.getElementById('csm-close');

  function openCaseStudy(caseKey) {
    const data = CASE_STUDIES[caseKey];
    if (!data) return;

    document.getElementById('csm-title').textContent = data.title;
    document.getElementById('csm-tag').textContent = data.tag;
    document.getElementById('csm-client').textContent = data.client;
    document.getElementById('csm-challenge').textContent = data.challenge;
    document.getElementById('csm-solution').textContent = data.solution;
    document.getElementById('csm-quote').textContent = data.testimonial;

    // Render metrics
    const metricsContainer = document.getElementById('csm-metrics');
    metricsContainer.innerHTML = data.metrics.map(m => `
      <div class="cs-metric-box">
        <span class="cs-metric-val">${m.val}</span>
        <span class="cs-metric-label">${m.label}</span>
      </div>
    `).join('');

    // Render tags
    const tagsContainer = document.getElementById('csm-tags');
    tagsContainer.innerHTML = data.tech.map(t => `<span class="tag tag-blue">${t}</span>`).join('');

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', e => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) closeModal();
  });

  // Attach click listeners to cards and view buttons
  cards.forEach(card => {
    const key = card.id.replace('proj-', '');
    card.addEventListener('click', e => {
      openCaseStudy(key);
    });
  });
});
