/**
 * services.js — Tabbed services panel (desktop) / Accordion (mobile)
 */
import { siteData } from './data.js';
import { initSpotlight } from './animations.js';

let currentTab = 0;

const SVG_ICONS = {
  '📊': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  '📋': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  '🎙️': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`,
  '🧭': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  '🚀': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5M14 2s2.5 0 5 2.5c0 0 0 0-2.5 5.5l-4-4L14 2Z"/><path d="m9 15-3-3 8-8 3 3-8 8Z"/><path d="M5 21s.5-2 1.5-3.5l2 2C7 20.5 5 21 5 21Z"/></svg>`,
  '⚖️': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/><path d="M19 12a4 4 0 0 1-4 4h-2M5 12a4 4 0 0 0 4 4h2M12 5c0-1.66 1.34-3 3-3s3 1.34 3 3H12ZM12 5c0-1.66-1.34-3-3-3S6 3.34 6 5h6Z"/></svg>`,
  '🏆': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a6 6 0 0 1 6 6v3.5c0 2.5-2 4.5-4.5 4.5h-3C7.99 16 6 14 6 11.5V8a6 6 0 0 1 6-6Z"/></svg>`
};

function getIconSVG(emoji) {
  return SVG_ICONS[emoji] || emoji;
}

export function init() {
  renderDesktopTabs();
  renderMobileAccordion();
  handleResize();
}

function updateIndicator(index, tabsContainer) {
  const indicator = document.getElementById('tabs-indicator');
  if (!indicator) return;

  const activeTab = tabsContainer.querySelector(`[data-tab-index="${index}"]`);
  if (!activeTab) return;

  indicator.style.height = `${activeTab.offsetHeight}px`;
  indicator.style.transform = `translateY(${activeTab.offsetTop}px)`;
}

function renderDesktopTabs() {
  const container = document.getElementById('services-container');
  if (!container) return;

  const { services } = siteData;

  // Build tabs sidebar with sliding indicator background
  const tabsHTML = `
    <div class="services__tabs tabs" id="services-tabs-list">
      <div class="tabs__indicator" id="tabs-indicator"></div>
      ${services.map((s, i) => `
        <button class="tab ${i === 0 ? 'tab--active' : ''}" data-tab-index="${i}" aria-selected="${i === 0}">
          <span class="tab__icon">${getIconSVG(s.icon)}</span>
          <span class="tab__title">${s.title}</span>
          <span class="tab__subtitle">${s.subtitle}</span>
        </button>
      `).join('')}
    </div>
  `;

  // Build content panel (spotlight-card)
  const panelHTML = `
    <div class="services__panel spotlight-card" id="services-panel">
      ${buildPanelContent(services[0])}
    </div>
  `;

  container.innerHTML = tabsHTML + panelHTML;

  const tabsList = document.getElementById('services-tabs-list');

  // Align indicator initial position
  setTimeout(() => {
    updateIndicator(0, tabsList);
  }, 100);

  // Tab click handlers
  container.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const index = parseInt(tab.dataset.tabIndex, 10);
      if (index === currentTab) return;
      switchTab(index, container);
    });
  });

  // Init spotlight on the services panel card
  initSpotlight(container);
}

function buildPanelContent(service) {
  return `
    <span class="services__panel-icon gradient-text">${getIconSVG(service.icon)}</span>
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
  const tabsList = document.getElementById('services-tabs-list');
  if (!panel || !tabsList) return;

  // Update tab states
  tabs.forEach((t, i) => {
    t.classList.toggle('tab--active', i === index);
    t.setAttribute('aria-selected', i === index);
  });

  // Slide Active Indicator
  updateIndicator(index, tabsList);

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
          <span style="display: flex; align-items: center; gap: 8px;">${getIconSVG(s.icon)} ${s.title}</span>
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
  window.addEventListener('resize', () => {
    const tabsList = document.getElementById('services-tabs-list');
    if (tabsList) {
      updateIndicator(currentTab, tabsList);
    }
  }, { passive: true });
}
