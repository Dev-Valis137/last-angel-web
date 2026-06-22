// Scroll reveal (stagger-capable)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      requestAnimationFrame(() => {
        entry.target.classList.add('visible');
      });
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Observe all cards, steps, sections, etc.
document.querySelectorAll('.card, .step, .scale-item, .coming-soon, section h2, .formula-box, .stat-item, section > p').forEach(el => {
  if (!el.classList.contains('reveal')) {
    el.classList.add('reveal');
    observer.observe(el);
  }
});

// Stat bars: save target width and reset to 0 for animation on reveal
document.querySelectorAll('.stat-bar-fill').forEach(bar => {
  const w = bar.style.width;
  if (w) {
    bar.dataset.targetWidth = w;
    bar.style.width = '0';
  }
});

// Set stat bar width when its parent stat-item becomes visible
const statObserver = new MutationObserver(() => {
  document.querySelectorAll('.stat-item.reveal.visible .stat-bar-fill').forEach(bar => {
    if (bar.dataset.targetWidth && bar.style.width === '0') {
      bar.style.width = bar.dataset.targetWidth;
    }
  });
});
document.querySelectorAll('.stat-item').forEach(el => {
  statObserver.observe(el, { attributes: true, attributeFilter: ['class'] });
});
// Also check on page load for already visible items
document.querySelectorAll('.stat-item.reveal.visible .stat-bar-fill').forEach(bar => {
  if (bar.dataset.targetWidth) bar.style.width = bar.dataset.targetWidth;
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-toggle').checked = false;
  });
});

// Close mobile nav on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const toggle = document.getElementById('nav-toggle');
    if (toggle.checked) toggle.checked = false;
  }
});

// Nav scroll effect
const nav = document.querySelector('nav');
let lastScrollY = 0;
let ticking = false;
const onScroll = () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    requestAnimationFrame(() => {
      nav.classList.toggle('scrolled', lastScrollY > 100);
      ticking = false;
    });
    ticking = true;
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
// Check initial state
if (window.scrollY > 100) nav.classList.add('scrolled');

// Card spotlight effect (throttled)
document.querySelectorAll('.card').forEach(card => {
  const glow = document.createElement('div');
  glow.className = 'card-spotlight';
  card.appendChild(glow);

  let rafId = null;
  card.addEventListener('mousemove', (e) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      glow.style.opacity = '1';
      glow.style.background = `radial-gradient(600px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(0,255,255,0.06), transparent 40%)`;
      rafId = null;
    });
  });

  card.addEventListener('mouseleave', () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    glow.style.opacity = '0';
  });
});
