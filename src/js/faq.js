/**
 * faq.js — Single-open accordion with smooth height transitions
 */
import { siteData } from './data.js';

export function init() {
  const container = document.getElementById('faq-container');
  if (!container) return;

  // Render FAQ items
  container.innerHTML = siteData.faq
    .map((item, i) => `
      <div class="accordion__item animate-on-scroll stagger-${Math.min(i + 1, 6)}" data-animate="fade-up">
        <button 
          class="accordion__header" 
          aria-expanded="false" 
          aria-controls="faq-content-${i}" 
          id="faq-header-${i}"
        >
          <span>${item.question}</span>
          <svg class="accordion__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        <div 
          class="accordion__content" 
          id="faq-content-${i}" 
          role="region" 
          aria-labelledby="faq-header-${i}"
        >
          <div class="accordion__content-inner">
            ${item.answer}
          </div>
        </div>
      </div>
    `)
    .join('');

  // Accordion logic — single-open
  container.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.accordion__icon');
      const isOpen = header.getAttribute('aria-expanded') === 'true';

      // Close all other items
      container.querySelectorAll('.accordion__header').forEach(h => {
        if (h !== header) {
          h.setAttribute('aria-expanded', 'false');
          h.nextElementSibling.style.maxHeight = null;
          h.querySelector('.accordion__icon').classList.remove('accordion__icon--active');
        }
      });

      // Toggle current item
      header.setAttribute('aria-expanded', String(!isOpen));
      icon.classList.toggle('accordion__icon--active', !isOpen);

      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = null;
      }
    });
  });
}
