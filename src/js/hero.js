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

/** Business-themed canvas animation */
function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let mouse = { x: null, y: null };
  let animationId;
  let time = 0;

  // Business icons as text symbols
  const ICONS = ['🚀', '💡', '📊', '💼', '🎯', '💰', '📈', '⚡', '🏆', '🔗'];

  // Color palette
  const COLORS = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    warm: '#f59e0b',
    glow: 'rgba(59, 130, 246, 0.15)',
  };

  let nodes = [];
  let bars = [];
  let rings = [];

  function resize() {
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    createElements();
  }

  function createElements() {
    // Floating icon nodes
    const nodeCount = Math.min(12, Math.floor((canvas.width * canvas.height) / 25000));
    nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        icon: ICONS[i % ICONS.length],
        size: Math.random() * 10 + 20,
        opacity: Math.random() * 0.4 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Rising bar chart elements
    const barCount = Math.min(5, Math.floor(canvas.width / 120));
    bars = [];
    for (let i = 0; i < barCount; i++) {
      bars.push({
        x: canvas.width * 0.15 + (i * canvas.width * 0.7) / barCount,
        baseY: canvas.height * 0.85,
        targetHeight: Math.random() * canvas.height * 0.3 + canvas.height * 0.1,
        currentHeight: 0,
        width: Math.min(30, canvas.width * 0.04),
        color: i % 2 === 0 ? COLORS.primary : COLORS.secondary,
        speed: Math.random() * 0.5 + 0.3,
        phase: i * 0.8,
      });
    }

    // Circular progress rings
    rings = [];
    const ringCount = 3;
    for (let i = 0; i < ringCount; i++) {
      rings.push({
        x: canvas.width * (0.2 + i * 0.3),
        y: canvas.height * (0.25 + Math.random() * 0.2),
        radius: Math.random() * 25 + 25,
        progress: 0,
        targetProgress: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.008 + 0.004,
        color: [COLORS.primary, COLORS.accent, COLORS.warm][i],
        opacity: 0.15,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += 0.016;

    // Draw background grid (subtle)
    drawGrid();

    // Draw rising bars
    drawBars();

    // Draw progress rings
    drawRings();

    // Draw connection lines between nodes
    drawConnections();

    // Draw floating icon nodes
    drawNodes();

    animationId = requestAnimationFrame(draw);
  }

  function drawGrid() {
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.04)';
    ctx.lineWidth = 0.5;
    const spacing = 60;

    for (let x = 0; x < canvas.width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  function drawBars() {
    bars.forEach((bar) => {
      // Animate height with a sine wave bounce
      const wave = Math.sin(time * bar.speed + bar.phase);
      bar.currentHeight = bar.targetHeight * (0.6 + 0.4 * Math.abs(wave));

      // Bar gradient
      const gradient = ctx.createLinearGradient(
        bar.x, bar.baseY,
        bar.x, bar.baseY - bar.currentHeight
      );
      gradient.addColorStop(0, `${bar.color}15`);
      gradient.addColorStop(1, `${bar.color}30`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      const r = Math.min(6, bar.width / 3);
      const x = bar.x;
      const y = bar.baseY - bar.currentHeight;
      const w = bar.width;
      const h = bar.currentHeight;

      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.fill();

      // Glowing top edge
      ctx.strokeStyle = `${bar.color}40`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.stroke();
    });
  }

  function drawRings() {
    rings.forEach((ring) => {
      // Animate progress
      const wave = Math.sin(time * ring.speed * 5);
      const currentProgress = ring.targetProgress * (0.5 + 0.5 * Math.abs(wave));

      // Background ring
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, 0.05)`;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Progress arc
      const startAngle = -Math.PI / 2;
      const endAngle = startAngle + currentProgress * Math.PI * 2;

      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.radius, startAngle, endAngle);
      ctx.strokeStyle = `${ring.color}35`;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Percentage text
      ctx.fillStyle = `${ring.color}30`;
      ctx.font = `bold ${ring.radius * 0.45}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.round(currentProgress * 100)}%`, ring.x, ring.y);
    });
  }

  function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const opacity = 0.12 * (1 - dist / 180);

          // Gradient line
          const gradient = ctx.createLinearGradient(
            nodes[i].x, nodes[i].y,
            nodes[j].x, nodes[j].y
          );
          gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`);
          gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity})`);
          gradient.addColorStop(1, `rgba(6, 182, 212, ${opacity})`);

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Animated data dot traveling along the line
          if (dist < 120) {
            const t = (Math.sin(time * 1.5 + i + j) + 1) / 2;
            const dotX = nodes[i].x + (nodes[j].x - nodes[i].x) * t;
            const dotY = nodes[i].y + (nodes[j].y - nodes[i].y) * t;

            ctx.beginPath();
            ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 3})`;
            ctx.fill();
          }
        }
      }
    }
  }

  function drawNodes() {
    nodes.forEach((node) => {
      // Move
      node.x += node.vx;
      node.y += node.vy;
      node.pulse += node.pulseSpeed;

      // Mouse interaction
      if (mouse.x !== null) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          node.vx += dx * 0.0001;
          node.vy += dy * 0.0001;
        }
      }

      // Bounce off edges
      if (node.x < 30 || node.x > canvas.width - 30) node.vx *= -1;
      if (node.y < 30 || node.y > canvas.height - 30) node.vy *= -1;
      node.x = Math.max(30, Math.min(canvas.width - 30, node.x));
      node.y = Math.max(30, Math.min(canvas.height - 30, node.y));

      // Pulsing glow
      const pulseScale = 1 + Math.sin(node.pulse) * 0.15;
      const glowRadius = node.size * 1.5 * pulseScale;

      // Outer glow
      const glow = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, glowRadius
      );
      glow.addColorStop(0, `rgba(59, 130, 246, ${node.opacity * 0.3})`);
      glow.addColorStop(1, 'rgba(59, 130, 246, 0)');

      ctx.beginPath();
      ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Icon
      ctx.font = `${node.size * pulseScale}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha = node.opacity;
      ctx.fillText(node.icon, node.x, node.y);
      ctx.globalAlpha = 1;
    });
  }

  // Mouse tracking
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  }, { passive: true });

  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resize();
    }, 200);
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
