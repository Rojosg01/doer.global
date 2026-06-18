/**
 * stories.js — Horizontal carousel with modal, dots, and auto-play
 */
import { siteData } from './data.js';

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
  'linear-gradient(135deg, #14b8a6, #06b6d4)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
];

let autoPlayTimer = null;
let currentSlide = 0;

export function init() {
  renderStoryCards();
  initCarousel();
  initModal();
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase();
}

function renderStoryCards() {
  const track = document.getElementById('stories-track');
  if (!track) return;

  track.innerHTML = siteData.stories
    .map((story, i) => `
      <div class="story-card card" data-story-index="${i}">
        <div class="story-card__avatar" style="background: ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]}">
          ${getInitials(story.name)}
        </div>
        <h4 class="story-card__name">${story.name}</h4>
        <p class="story-card__startup">${story.startup}</p>
        <p class="story-card__excerpt">"${story.excerpt}"</p>
        <button class="btn btn-ghost" data-read-story="${i}">Read Full Story →</button>
      </div>
    `)
    .join('');
}

function initCarousel() {
  const track = document.getElementById('stories-track');
  const prevBtn = document.getElementById('stories-prev');
  const nextBtn = document.getElementById('stories-next');
  const dotsContainer = document.getElementById('stories-dots');
  if (!track) return;

  const cards = track.querySelectorAll('.story-card');
  const totalSlides = cards.length;

  // Render dots
  if (dotsContainer) {
    dotsContainer.innerHTML = Array.from({ length: totalSlides })
      .map((_, i) => `<button class="stories__dot ${i === 0 ? 'stories__dot--active' : ''}" data-dot="${i}" aria-label="Go to story ${i + 1}"></button>`)
      .join('');

    dotsContainer.querySelectorAll('.stories__dot').forEach(dot => {
      dot.addEventListener('click', () => {
        scrollToSlide(parseInt(dot.dataset.dot, 10));
      });
    });
  }

  // Arrow buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      scrollToSlide(Math.max(0, currentSlide - 1));
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      scrollToSlide(Math.min(totalSlides - 1, currentSlide + 1));
    });
  }

  // Track scroll position for dot updates
  track.addEventListener('scroll', () => {
    const scrollLeft = track.scrollLeft;
    const cardWidth = cards[0]?.offsetWidth + 24; // gap
    const newSlide = Math.round(scrollLeft / cardWidth);
    if (newSlide !== currentSlide) {
      currentSlide = newSlide;
      updateDots();
    }
  }, { passive: true });

  // Auto-play
  startAutoPlay();

  track.addEventListener('mouseenter', stopAutoPlay, { passive: true });
  track.addEventListener('mouseleave', startAutoPlay, { passive: true });
  track.addEventListener('touchstart', stopAutoPlay, { passive: true });
  track.addEventListener('touchend', () => {
    setTimeout(startAutoPlay, 3000);
  }, { passive: true });
}

function scrollToSlide(index) {
  const track = document.getElementById('stories-track');
  if (!track) return;

  const cards = track.querySelectorAll('.story-card');
  if (!cards[index]) return;

  const cardWidth = cards[0].offsetWidth + 24;
  track.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  currentSlide = index;
  updateDots();
  restartAutoPlay();
}

function updateDots() {
  const dots = document.querySelectorAll('.stories__dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('stories__dot--active', i === currentSlide);
  });
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayTimer = setInterval(() => {
    const total = siteData.stories.length;
    const next = (currentSlide + 1) % total;
    scrollToSlide(next);
  }, 6000);
}

function stopAutoPlay() {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
}

function restartAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

function initModal() {
  const modal = document.getElementById('story-modal');
  const overlay = document.getElementById('story-modal-overlay');
  const closeBtn = document.getElementById('story-modal-close');
  if (!modal) return;

  // Event delegation for "Read Full Story" buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-read-story]');
    if (btn) {
      const index = parseInt(btn.dataset.readStory, 10);
      openModal(index);
    }
  });

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
      closeModal();
    }
  });
}

function openModal(index) {
  const story = siteData.stories[index];
  if (!story) return;

  const modal = document.getElementById('story-modal');
  const avatar = document.getElementById('story-modal-avatar');
  const title = document.getElementById('story-modal-title');
  const startup = document.getElementById('story-modal-startup');
  const body = document.getElementById('story-modal-body');

  if (avatar) {
    avatar.textContent = getInitials(story.name);
    avatar.style.background = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
  }
  if (title) title.textContent = story.name;
  if (startup) startup.textContent = story.startup;
  if (body) body.textContent = story.fullStory;

  if (modal) {
    modal.classList.add('modal--active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('story-modal');
  if (modal) {
    modal.classList.remove('modal--active');
    document.body.style.overflow = '';
  }
}
