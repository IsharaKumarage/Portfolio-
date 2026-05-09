// ── CURSOR ──
const cur = document.getElementById('cur');
document.addEventListener('mousemove', e => {
  if (cur) {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
  }
});

// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── REVEAL ON SCROLL ──
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

// ── SCROLL PROGRESS ──
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const sp = document.getElementById('scroll-progress');
  if (sp) sp.style.width = scrolled + "%";
});

// ── PARALLAX EFFECT ──
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  const img = document.querySelector('.hero-img-box img');
  if (img) img.style.transform = `translateY(${sy * 0.1}px)`;
});
