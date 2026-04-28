const scrollTitle = document.getElementById('scrollTitle');
const mainNav     = document.getElementById('mainNav');
const heroEl      = document.querySelector('.hero');
const heroSticky  = document.querySelector('.hero-sticky');
const heroGrid    = document.querySelector('.hero-grid');
const heroVig     = document.querySelector('.hero-vignette');
const heroNum     = document.querySelector('.hero-number');
const revealEls   = document.querySelectorAll('.hero-tag, .hero-title, .hero-desc, .hero-meta');

let revealed = false;

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function invlerp(a, b, v) { return clamp((v - a) / (b - a), 0, 1); }

window.addEventListener('scroll', () => {
  const y       = window.scrollY;
  const vh      = window.innerHeight;
  const heroEnd = heroEl.offsetHeight;

  /* ── Past hero: hide all fixed elements so they don't float over content ── */
  const pastHero = y >= heroEnd - vh;
  [scrollTitle, heroSticky, heroGrid, heroVig, heroNum].forEach(el => {
    if (!el) return;
    el.style.visibility = pastHero ? 'hidden' : 'visible';
  });

  if (pastHero) {
    mainNav.classList.add('scrolled');
    return;
  }

  /* ── Phase 1: watermark fades out and drifts up ── */
  const watermarkOut = invlerp(0, vh * 0.55, y);
  scrollTitle.style.opacity   = 1 - watermarkOut;
  scrollTitle.style.transform = `translateY(${-watermarkOut * 32}px)`;

  /* ── Nav ── */
  if (y > 60) mainNav.classList.add('scrolled');
  else        mainNav.classList.remove('scrolled');

  /* ── Phase 2: foreground fades in as watermark clears, fades out near hero end ── */
  const fadeIn  = invlerp(vh * 0.48, vh * 0.72, y);
  const fadeOut = invlerp(heroEnd - vh * 1.1, heroEnd - vh * 0.85, y);
  const foreOpacity = clamp(fadeIn - fadeOut, 0, 1);
  const foreY       = (1 - fadeIn) * 28;
  heroSticky.style.opacity   = foreOpacity;
  heroSticky.style.transform = `translateY(${foreY}px)`;

  /* ── Trigger revealed classes for child transitions ── */
  if (!revealed && fadeIn > 0.05) {
    revealed = true;
    revealEls.forEach((el, i) => {
      setTimeout(() => el.classList.add('revealed'), i * 130);
    });
  }
  if (revealed && y < vh * 0.3) {
    revealed = false;
    revealEls.forEach(el => el.classList.remove('revealed'));
  }
}, { passive: true });
