/**
 * navbar.js — Sticky navigation with scroll effects and mobile menu
 */
import { siteData } from './data.js';

export function init() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('nav-links');
  const mobileNavLinks = document.getElementById('mobile-nav-links');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (!navbar) return;

  // Populate nav links
  const { links } = siteData.nav;
  if (navLinks) {
    navLinks.innerHTML = links
      .map(link => `<li><a href="${link.href}" data-nav-link>${link.label}</a></li>`)
      .join('');
  }

  if (mobileNavLinks) {
    mobileNavLinks.innerHTML = links
      .map(link => `<li><a href="${link.href}" data-nav-link>${link.label}</a></li>`)
      .join('');
  }

  // Sticky header on scroll
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          navbar.classList.add('navbar--scrolled');
        } else {
          navbar.classList.remove('navbar--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('hamburger--active');
      mobileNav.classList.toggle('mobile-nav--active');
      hamburger.setAttribute('aria-expanded', isActive);
      mobileNav.setAttribute('aria-hidden', !isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });
  }

  // Smooth scroll + close mobile menu on link click
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = navbar.offsetHeight + 16;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }

      // Close mobile menu
      if (hamburger && mobileNav) {
        hamburger.classList.remove('hamburger--active');
        mobileNav.classList.remove('mobile-nav--active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  });

  // Active link highlight via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('[data-nav-link]');

  const observerOptions = {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        allNavLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}
