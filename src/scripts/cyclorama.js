/* ═══════════════════════════════════════════════════════════════════
   THE CYCLORAMA ENGINE

   One seamless backdrop lit by a cue stack. Two ways to drive it:

     · The stack (index): scroll is the cue timeline. Sections carry
       [data-cue] and the light interpolates between them.
     · A held cue (member page): the page carries [data-cue-hold] and
       the backdrop fades to that state and stays there.

   The canvas persists across navigation (transition:persist), so moving
   from the register into a member's dossier fades the sky from full day
   down to that member's own cue instead of cutting. Light has fade time;
   that is the form's own grammar.

   Cue states are named, deep-linkable and text-equivalent. Colour is
   never the only signal: every cue carries its name in the rail.
   ═══════════════════════════════════════════════════════════════════ */

const CUES = [
  {
    id: '00', name: 'Blackout',
    skyTop: '#030304', skyMid: '#050506', bloom: '#0a0a12', ground: '#020203',
    ink: '#e6e6f0', inkDim: '#4a4a5a', readout: '#3346c4',
  },
  {
    id: '36', name: 'Held',
    skyTop: '#030308', skyMid: '#06060e', bloom: '#101028', ground: '#020204',
    ink: '#d8d8e8', inkDim: '#45455a', readout: '#3a4ac0',
  },
  {
    id: '76', name: 'First Light',
    skyTop: '#02030d', skyMid: '#061040', bloom: '#0a2bff', ground: '#03040e',
    ink: '#dfe4ff', inkDim: '#5a68b0', readout: '#7f92ff',
  },
  {
    id: '81', name: 'Rose Gather',
    skyTop: '#0a0622', skyMid: '#3a1070', bloom: '#d24bff', ground: '#080618',
    ink: '#f4e6ff', inkDim: '#8a6ab8', readout: '#e79cff',
  },
  {
    id: '83', name: 'Dawn Wash',
    skyTop: '#2a1038', skyMid: '#a03a78', bloom: '#ff7bae', ground: '#1a0c20',
    ink: '#fff0f6', inkDim: '#c193a8', readout: '#ffd7e6',
  },
  {
    id: 'day', name: 'Day',
    skyTop: '#ffffff', skyMid: '#ffffff', bloom: '#ffffff', ground: '#f1f1f4',
    ink: '#050506', inkDim: '#6a6a76', readout: '#0a2bff',
  },
];

const HORIZON = 0.74;
/** Dimmer fade. A cue never snaps — it blends. */
const FADE = 0.085;

/* ── colour helpers ──────────────────────────────────────────────── */

const hex = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];
const mix = (a, b, t) => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];
const rgb = (c) => `rgb(${c[0]},${c[1]},${c[2]})`;
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const shade = (c, k) => [c[0] * k, c[1] * k, c[2] * k].map(Math.round);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const ease = (t) => t * t * (3 - 2 * t);

/* Pre-parse once; this runs every frame otherwise. */
const PLOT = CUES.map((c) => ({
  id: c.id,
  skyTop: hex(c.skyTop), skyMid: hex(c.skyMid), bloom: hex(c.bloom),
  ground: hex(c.ground), ink: hex(c.ink), inkDim: hex(c.inkDim),
  readout: hex(c.readout),
}));

const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── engine state (survives navigation with the canvas) ──────────── */

let ctx = null;
let w = 0, h = 0, dpr = 1;
let grain = null;
let pointerX = 0.5, targetX = 0.5;
let cuePos = 0;          // eased, what is on screen
let activeRail = -1;
let running = false;

/* re-scanned on every page load */
let anchors = [];
let railLinks = [];
let heldIndex = null;

function buildGrain() {
  const size = 128;
  const g = document.createElement('canvas');
  g.width = g.height = size;
  const gx = g.getContext('2d');
  const img = gx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 128 + (Math.random() - 0.5) * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  gx.putImageData(img, 0, 0);
  grain = ctx.createPattern(g, 'repeat');
}

function resize() {
  const canvas = ctx && ctx.canvas;
  if (!canvas) return;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (!grain) buildGrain();
}

/** Where the light wants to be, before the dimmer fade. */
function desiredCue() {
  if (heldIndex !== null) return heldIndex;
  if (!anchors.length) return 0;

  const y = window.scrollY + window.innerHeight * 0.5;
  const tops = anchors.map((el) => el.offsetTop);
  if (y <= tops[0]) return 0;
  for (let i = 0; i < tops.length - 1; i++) {
    if (y < tops[i + 1]) {
      const span = tops[i + 1] - tops[i] || 1;
      return i + clamp((y - tops[i]) / span, 0, 1);
    }
  }
  return tops.length - 1;
}

function paint() {
  const p = clamp(cuePos, 0, PLOT.length - 1);
  const i = Math.floor(p);
  const j = Math.min(i + 1, PLOT.length - 1);
  const t = ease(p - i);
  const a = PLOT[i];
  const b = PLOT[j];

  const skyTop = mix(a.skyTop, b.skyTop, t);
  const skyMid = mix(a.skyMid, b.skyMid, t);
  const bloom = mix(a.bloom, b.bloom, t);
  const ground = mix(a.ground, b.ground, t);
  const ink = mix(a.ink, b.ink, t);
  const inkDim = mix(a.inkDim, b.inkDim, t);
  const readout = mix(a.readout, b.readout, t);

  const hy = h * HORIZON;

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, rgb(skyTop));
  sky.addColorStop(0.42, rgb(skyMid));
  sky.addColorStop(0.66, rgb(mix(skyMid, bloom, 0.55)));
  sky.addColorStop(HORIZON - 0.006, rgb(bloom));
  sky.addColorStop(HORIZON, rgb(mix(bloom, [255, 255, 255], 0.28)));
  sky.addColorStop(HORIZON + 0.004, rgb(shade(bloom, 0.42)));
  sky.addColorStop(0.86, rgb(mix(ground, bloom, 0.12)));
  sky.addColorStop(1, rgb(ground));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  /* The lamp. Follows the pointer along the horizon — the only place the
     visitor's hand touches the light. */
  const r = Math.max(w, h) * 0.75;
  const glow = ctx.createRadialGradient(pointerX * w, hy, 0, pointerX * w, hy, r);
  glow.addColorStop(0, rgba(bloom, 0.3));
  glow.addColorStop(0.45, rgba(bloom, 0.08));
  glow.addColorStop(1, rgba(bloom, 0));
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'source-over';

  /* Grain: the cyclorama's matte, absorbent surface, and what keeps a
     gradient this wide from banding. */
  if (grain) {
    ctx.globalAlpha = 0.045;
    ctx.fillStyle = grain;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
  }

  root.style.setProperty('--ink', rgb(ink));
  root.style.setProperty('--ink-dim', rgb(inkDim));
  root.style.setProperty('--readout', rgb(readout));
  root.style.setProperty('--rule', rgba(ink, 0.16));
  root.style.setProperty('--rule-faint', rgba(ink, 0.08));

  const near = Math.round(p);
  if (near !== activeRail) {
    activeRail = near;
    railLinks.forEach((el, k) =>
      el.setAttribute('aria-current', String(k === activeRail))
    );
  }
}

function frame() {
  const want = desiredCue();
  const dc = want - cuePos;
  let dirty = false;

  if (Math.abs(dc) > 0.0008) {
    cuePos += dc * (reduced ? 1 : FADE);
    dirty = true;
  } else if (cuePos !== want) {
    cuePos = want;
    dirty = true;
  }

  if (!reduced) {
    const dx = targetX - pointerX;
    if (Math.abs(dx) > 0.0004) {
      pointerX += dx * 0.06;
      dirty = true;
    }
  }

  if (dirty) paint();
  requestAnimationFrame(frame);
}

/** Re-read the DOM. Called on first load and after every page swap. */
function scan() {
  const canvas = document.getElementById('cyc');
  if (!canvas) return;

  if (!ctx || ctx.canvas !== canvas) {
    ctx = canvas.getContext('2d', { alpha: false });
    grain = null;
    resize();
  }

  anchors = [...document.querySelectorAll('[data-cue]')];
  railLinks = [...document.querySelectorAll('.rail__cue')];
  activeRail = -1;

  const hold = document.querySelector('[data-cue-hold]');
  heldIndex = hold
    ? PLOT.findIndex((c) => c.id === hold.getAttribute('data-cue-hold'))
    : null;
  if (heldIndex === -1) heldIndex = null;

  /* Reveal: content is visible by default, so a dead observer is safe. */
  const revealables = document.querySelectorAll('.reveal:not(.is-lit)');
  if (!reduced && 'IntersectionObserver' in window && revealables.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = Number(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add('is-lit'), delay);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    );
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-lit'));
  }

  paint();

  if (!running) {
    running = true;
    window.addEventListener('scroll', () => {}, { passive: true });
    window.addEventListener('resize', () => { resize(); paint(); }, { passive: true });
    window.addEventListener(
      'pointermove',
      (e) => { targetX = e.clientX / window.innerWidth; },
      { passive: true }
    );
    requestAnimationFrame(frame);
  }
}

scan();
document.addEventListener('astro:page-load', scan);
