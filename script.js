// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
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

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-toggle').checked = false;
  });
});

// Card spotlight effect
document.querySelectorAll('.card').forEach(card => {
  const glow = document.createElement('div');
  glow.className = 'card-spotlight';
  card.appendChild(glow);

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    glow.style.opacity = '1';
    glow.style.background = `radial-gradient(600px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(0,255,255,0.06), transparent 40%)`;
  });

  card.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
});
