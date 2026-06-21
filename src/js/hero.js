/**
 * hero.js — Particle canvas animation + typewriter effect + email form
 */
import { siteData } from './data.js';
import { typewriter } from './animations.js';

export function init() {
  initParticles();
  initTypewriter();
  initHeroForm();
}

/** High-end theme-adaptive Plexus/Constellation canvas animation */
function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let mouse = { x: null, y: null, radius: 150 };
  let animationId;
  let particles = [];
  
  // High-density settings based on viewport
  function getParticleCount() {
    return Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000));
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2.5 + 1.5;
      this.baseRadius = this.radius;
    }

    update(isLight) {
      // Bounce check
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Mouse attraction / gravity
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.vx += (dx / distance) * force * 0.05;
          this.vy += (dy / distance) * force * 0.05;
          this.radius = this.baseRadius + force * 2.5; // swell up slightly
        } else {
          this.radius = this.baseRadius;
        }
      } else {
        this.radius = this.baseRadius;
      }

      // Limit speed
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      const maxSpeed = 1.5;
      if (speed > maxSpeed) {
        this.vx = (this.vx / speed) * maxSpeed;
        this.vy = (this.vy / speed) * maxSpeed;
      }

      this.x += this.vx;
      this.y += this.vy;
    }

    draw(isLight) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? 'rgba(79, 70, 229, 0.8)' : 'rgba(99, 102, 241, 0.9)';
      
      // Node glowing effect
      if (!isLight) {
        ctx.shadowColor = 'rgba(99, 102, 241, 0.4)';
        ctx.shadowBlur = this.radius * 2;
      } else {
        ctx.shadowBlur = 0;
      }
      
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  function resize() {
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = getParticleCount();
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function draw() {
    const isLight = document.body.classList.contains('theme-light');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw nodes
    particles.forEach(p => {
      p.update(isLight);
      p.draw(isLight);
    });

    // Draw connection lines
    drawConnections(isLight);

    animationId = requestAnimationFrame(draw);
  }

  function drawConnections(isLight) {
    const maxDistance = 120;
    const r = isLight ? 79 : 99;
    const g = isLight ? 70 : 102;
    const b = isLight ? 229 : 241;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const alpha = (maxDistance - distance) / maxDistance * (isLight ? 0.15 : 0.25);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = (maxDistance - distance) / maxDistance * 1.2;
          ctx.stroke();
        }
      }

      // Connect mouse to particles
      if (mouse.x !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const alpha = (mouse.radius - distance) / mouse.radius * (isLight ? 0.2 : 0.35);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          // Highlight mouse connection with cyan/purple gradient depending on theme
          const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, mouse.x, mouse.y);
          if (isLight) {
            gradient.addColorStop(0, `rgba(79, 70, 229, ${alpha})`);
            gradient.addColorStop(1, `rgba(124, 58, 237, ${alpha * 0.5})`);
          } else {
            gradient.addColorStop(0, `rgba(99, 102, 241, ${alpha})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, ${alpha * 0.5})`);
          }
          ctx.strokeStyle = gradient;
          ctx.lineWidth = (mouse.radius - distance) / mouse.radius * 1.5;
          ctx.stroke();
        }
      }
    }
  }

  // Mouse events
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  }, { passive: true });

  // Handle window resizing
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 150);
  }, { passive: true });

  resize();
  draw();
}

/** Typewriter cycling effect */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;
  typewriter(el, siteData.hero.typewriterWords, 80, 2000);
}

/** Hero email form */
function initHeroForm() {
  const form = document.getElementById('hero-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('hero-email');
    const { showToast } = await import('./contact.js');
    if (!email || !email.value || !email.value.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Thanks! We\'ll be in touch soon.', 'success');
    email.value = '';
  });
}
