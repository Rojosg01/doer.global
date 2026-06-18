/**
 * animations.js — Global Animation Utilities for Doer Global
 * ===========================================================
 * Provides three core animation capabilities:
 *   1. Scroll-triggered reveal animations (IntersectionObserver)
 *   2. Numeric counter animation with easeOutExpo easing
 *   3. Typewriter text cycling effect
 *
 * CSS classes used:
 *   .animate-on-scroll          — marks an element for observation
 *   data-animate="fade-up|…"    — selects the animation variant
 *   data-stagger="<ms>"         — optional per-element delay offset
 *   .animated                   — applied on intersection to trigger CSS transition
 */

// ─── Scroll-Triggered Animations ──────────────────────────────

/** @type {IntersectionObserver|null} */
let scrollObserver = null;

/**
 * Initialise the scroll-animation observer.
 * Call once from main.js after DOM is ready.
 */
export function init() {
  // Guard against double-init or missing API
  if (scrollObserver) return;
  if (!('IntersectionObserver' in window)) {
    // Fallback: just reveal everything immediately
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      el.classList.add('animated');
    });
    return;
  }

  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const stagger = parseInt(el.dataset.stagger, 10) || 0;

        if (stagger > 0) {
          // Staggered reveal — delay by the specified ms
          setTimeout(() => el.classList.add('animated'), stagger);
        } else {
          el.classList.add('animated');
        }

        // One-shot: stop watching after the element has animated
        scrollObserver.unobserve(el);
      });
    },
    {
      threshold: 0.15,
      rootMargin: '-50px',
    }
  );

  // Observe every eligible element currently in the DOM
  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    scrollObserver.observe(el);
  });
}

/**
 * Observe a single element that was added to the DOM after init().
 * Useful for dynamically rendered content.
 *
 * @param {HTMLElement} el — element with .animate-on-scroll
 */
export function observe(el) {
  if (scrollObserver && el instanceof HTMLElement) {
    scrollObserver.observe(el);
  }
}

// ─── Animated Counter ─────────────────────────────────────────

/**
 * Animate a numeric value from `start` to `end` inside `element`.
 * Uses requestAnimationFrame with an easeOutExpo curve for a
 * snappy-then-smooth feel.
 *
 * @param {HTMLElement} element       — target element whose textContent is updated
 * @param {number}      start        — starting value (usually 0)
 * @param {number}      end          — target value
 * @param {number}      duration     — animation duration in ms (e.g. 2000)
 * @param {string}      [suffix='']  — appended after the number (e.g. 'Cr+', '+')
 */
export function animateValue(element, start, end, duration, suffix = '') {
  if (!element) return;

  const range = end - start;
  let startTime = null;

  /**
   * easeOutExpo — fast start, gentle deceleration
   * @param {number} t — normalised time [0, 1]
   * @returns {number}
   */
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;

    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutExpo(progress);

    const current = Math.round(start + range * easedProgress);
    element.textContent = `${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// ─── Typewriter Effect ────────────────────────────────────────

/**
 * Cycle through an array of words with a typing / deleting animation.
 * The effect runs indefinitely, looping back to the first word.
 *
 * @param {HTMLElement} element        — target element to render text into
 * @param {string[]}   words          — words to cycle through
 * @param {number}     [speed=100]    — ms per character typed / deleted
 * @param {number}     [pauseDuration=1500] — ms to hold the completed word
 */
export function typewriter(element, words, speed = 100, pauseDuration = 1500) {
  if (!element || !words.length) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  // Ensure the cursor element exists (CSS should style the ::after or a span)
  element.setAttribute('aria-live', 'polite');
  element.setAttribute('aria-label', `Rotating words: ${words.join(', ')}`);

  function tick() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      // Remove one character
      charIndex--;
      element.textContent = currentWord.substring(0, charIndex);
    } else {
      // Add one character
      charIndex++;
      element.textContent = currentWord.substring(0, charIndex);
    }

    // Determine next delay
    let nextDelay = speed;

    if (!isDeleting && charIndex === currentWord.length) {
      // Word fully typed — pause before deleting
      nextDelay = pauseDuration;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Word fully deleted — move to next word
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      nextDelay = speed / 2; // brief gap before next word
    } else if (isDeleting) {
      // Delete faster than typing
      nextDelay = speed / 2;
    }

    setTimeout(tick, nextDelay);
  }

  // Kick off the loop
  tick();
}
