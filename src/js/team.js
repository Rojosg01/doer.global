/**
 * team.js — Team cards with hover/tap overlay showing quote & social links
 */
import { siteData } from './data.js';
import { initSpotlight } from './animations.js';

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
  'linear-gradient(135deg, #14b8a6, #06b6d4)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
  'linear-gradient(135deg, #3b82f6, #06b6d4)',
  'linear-gradient(135deg, #8b5cf6, #ec4899)',
];

const LINKEDIN_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;

const TWITTER_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase();
}

export function init() {
  const grid = document.getElementById('team-grid');
  if (!grid) return;

  grid.innerHTML = siteData.team
    .map((member, i) => {
      const photoUrl = member.photo ? `${import.meta.env.BASE_URL}${member.photo.replace(/^\.\//, '')}` : null;
      const initials = getInitials(member.name);
      const gradient = AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length];
      
      // Fallback display code on image error
      const imageTag = photoUrl
        ? `<img class="team-card__photo" src="${photoUrl}" alt="${member.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
           <div class="team-card__avatar" style="display:none; background: ${gradient}">${initials}</div>`
        : `<div class="team-card__avatar" style="background: ${gradient}">${initials}</div>`;

      return `
      <div class="team-card spotlight-card animate-on-scroll stagger-${Math.min(i + 1, 6)}" data-animate="fade-up">
        <div class="team-card__image">
          ${imageTag}
        </div>
        <div class="team-card__info">
          <h4 class="team-card__name">${member.name}</h4>
          <p class="team-card__title">${member.title}</p>
        </div>
        <div class="team-card__overlay">
          <p class="team-card__quote">${member.quote}</p>
          <h4 class="team-card__name">${member.name}</h4>
          <p class="team-card__title" style="margin-bottom: 16px;">${member.title}</p>
          <div class="team-card__social">
            <a href="${member.social.linkedin}" aria-label="${member.name} LinkedIn" target="_blank" rel="noopener noreferrer">
              ${LINKEDIN_ICON}
            </a>
            <a href="${member.social.twitter}" aria-label="${member.name} Twitter" target="_blank" rel="noopener noreferrer">
              ${TWITTER_ICON}
            </a>
          </div>
        </div>
      </div>
      `;
    })
    .join('');

  // Initialize card spotlight effect on the team grid cards
  initSpotlight(grid);

  // Mobile: tap to toggle overlay (since hover doesn't work on touch)
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    grid.querySelectorAll('.team-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't prevent clicks on social links
        if (e.target.closest('a')) return;

        // Close all others
        grid.querySelectorAll('.team-card').forEach(c => {
          if (c !== card) c.classList.remove('team-card--active');
        });

        card.classList.toggle('team-card--active');
      });
    });
  }
}
