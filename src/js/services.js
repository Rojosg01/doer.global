/**
 * services.js — Tabbed services panel (desktop) / Accordion (mobile)
 */
import { siteData } from './data.js';

let currentTab = 0;

export function init() {
  renderDesktopTabs();
  renderMobileAccordion();
  handleResize();
}

function renderDesktopTabs() {
  const container = document.getElementById('services-container');
  if (!container) return;

  const { services } = siteData;

  // Build tabs sidebar
  const tabsHTML = `
    <div class="services__tabs tabs">
      ${services.map((s, i) => `
        <button class="tab ${i === 0 ? 'tab--active' : ''}" data-tab-index="${i}" aria-selected="${i === 0}">
          <span class="tab__icon">${s.icon}</span>
          <span class="tab__title">${s.title}</span>
          <span class="tab__subtitle">${s.subtitle}</span>
        </button>
      `).join('')}
    </div>
  `;

  // Build content panel
  const panelHTML = `
    <div class="services__panel" id="services-panel">
      ${buildPanelContent(services[0])}
    </div>
  `;

  container.innerHTML = tabsHTML + panelHTML;

  // Tab click handlers
  container.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const index = parseInt(tab.dataset.tabIndex, 10);
      if (index === currentTab) return;
      switchTab(index, container);
    });
  });
}

function buildPanelContent(service) {
  return `
    <span class="services__panel-icon">${service.icon}</span>
    <h3 class="services__panel-title">${service.title}</h3>
    <p class="services__panel-subtitle">${service.subtitle}</p>
    <p class="services__panel-description">${service.description}</p>
    <ul class="services__features">
      ${service.features.map(f => `<li>${f}</li>`).join('')}
    </ul>
    <a href="#contact" class="btn btn-primary">${service.cta}</a>
  `;
}

function switchTab(index, container) {
  const tabs = container.querySelectorAll('.tab');
  const panel = document.getElementById('services-panel');
  if (!panel) return;

  // Update tab states
  tabs.forEach((t, i) => {
    t.classList.toggle('tab--active', i === index);
    t.setAttribute('aria-selected', i === index);
  });

  // Crossfade panel
  panel.style.opacity = '0';
  setTimeout(() => {
    panel.innerHTML = buildPanelContent(siteData.services[index]);
    panel.style.opacity = '1';
  }, 200);

  currentTab = index;
}

function renderMobileAccordion() {
  const accordion = document.getElementById('services-accordion');
  if (!accordion) return;

  const { services } = siteData;

  accordion.innerHTML = services
    .map((s, i) => `
      <div class="accordion__item">
        <button class="accordion__header" aria-expanded="false" aria-controls="svc-content-${i}" id="svc-header-${i}">
          <span>${s.icon} ${s.title}</span>
          <svg class="accordion__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        <div class="accordion__content" id="svc-content-${i}" role="region" aria-labelledby="svc-header-${i}">
          <div class="accordion__content-inner">
            <p class="services__panel-subtitle">${s.subtitle}</p>
            <p style="margin-bottom: 16px;">${s.description}</p>
            <ul class="services__features">
              ${s.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <a href="#contact" class="btn btn-primary" style="margin-top: 16px;">${s.cta}</a>
          </div>
        </div>
      </div>
    `)
    .join('');

  // Accordion click handlers
  accordion.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.accordion__icon');
      const isOpen = header.getAttribute('aria-expanded') === 'true';

      // Close all others
      accordion.querySelectorAll('.accordion__header').forEach(h => {
        if (h !== header) {
          h.setAttribute('aria-expanded', 'false');
          h.nextElementSibling.style.maxHeight = null;
          h.querySelector('.accordion__icon').classList.remove('accordion__icon--active');
        }
      });

      // Toggle current
      header.setAttribute('aria-expanded', !isOpen);
      icon.classList.toggle('accordion__icon--active', !isOpen);
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = null;
      }
    });
  });
}

function handleResize() {
  // Visibility is handled by CSS media queries
  // No additional JS needed since both are rendered
}
