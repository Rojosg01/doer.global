/**
 * counters.js — Animated count-up metrics triggered on scroll
 */
import { siteData } from './data.js';
import { animateValue } from './animations.js';

export function init() {
  const grid = document.getElementById('metrics-grid');
  if (!grid) return;

  // Render metric cards
  grid.innerHTML = siteData.metrics
    .map((metric, i) => `
      <div class="metric-card glass-card animate-on-scroll stagger-${i + 1}" data-animate="fade-up">
        <span class="metric__icon">${metric.icon}</span>
        <div class="metric__value" data-target="${metric.value}" data-suffix="${metric.suffix}">
          0<span class="metric__suffix">${metric.suffix}</span>
        </div>
        <div class="metric__label">${metric.label}</div>
        <div class="metric__description">${metric.description}</div>
      </div>
    `)
    .join('');

  // Observe for count-up animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const valueEls = grid.querySelectorAll('.metric__value');
          valueEls.forEach(el => {
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix;
            animateValue(el, 0, target, 2000, suffix);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(grid);
}
