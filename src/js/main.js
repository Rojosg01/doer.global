/**
 * main.js — Module orchestrator for Doer Global
 * Imports and initializes all section modules and renders the footer.
 */

import { siteData } from './data.js';
import * as animations from './animations.js';
import * as navbar from './navbar.js';
import * as hero from './hero.js';
import * as counters from './counters.js';
import * as services from './services.js';
import * as stories from './stories.js';
import * as team from './team.js';
import * as faq from './faq.js';
import * as contact from './contact.js';
import * as chatbot from './chatbot.js';

/**
 * Render the footer section
 */
function renderFooter() {
  const footerGrid = document.getElementById('footer-content');
  const footerYear = document.getElementById('footer-year');
  
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  if (!footerGrid) return;

  const { description, quickLinks, services: footerServices, social } = siteData.footer;

  // Social icon SVGs
  const socialIcons = {
    linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    twitter: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
    email: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg>`,
  };

  footerGrid.innerHTML = `
    <div class="footer__brand">
      <div class="footer__logo">
        <img src="${import.meta.env.BASE_URL}logo.png" alt="Doer Global" width="32" height="32" />
        <span style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">Doer Global</span>
      </div>
      <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">${description}</p>
    </div>

    <div>
      <h4 class="footer__heading">Quick Links</h4>
      <ul class="footer__links">
        ${quickLinks.map(link => `<li><a href="${link.href}">${link.label}</a></li>`).join('')}
      </ul>
    </div>

    <div>
      <h4 class="footer__heading">Services</h4>
      <ul class="footer__links">
        ${footerServices.map(link => `<li><a href="${link.href}">${link.label}</a></li>`).join('')}
      </ul>
    </div>

    <div>
      <h4 class="footer__heading">Connect</h4>
      <div class="footer__social">
        ${social.map(s => `
          <a href="${s.href}" class="footer__social-link" aria-label="${s.platform}" target="_blank" rel="noopener noreferrer">
            ${socialIcons[s.icon] || ''}
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Initialize all modules when DOM is ready
 */
function init() {
  // 1. Render footer (static content)
  renderFooter();

  // 2. Initialize all section modules FIRST (they populate the DOM)
  navbar.init();
  hero.init();
  counters.init();
  services.init();
  stories.init();
  team.init();
  faq.init();
  contact.init();
  chatbot.init();

  // 3. Initialize scroll animations LAST so observer sees all dynamic content
  animations.init();

  // 4. Re-observe any elements added dynamically by section modules
  document.querySelectorAll('.animate-on-scroll:not(.animated)').forEach((el) => {
    animations.observe(el);
  });
}

// Boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
