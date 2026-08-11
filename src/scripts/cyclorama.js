/* ═══════════════════════════════════════════════════════════════════
   THE CYCLORAMA ENGINE

   One seamless backdrop lit by a cue stack. Scroll is the cue timeline:
   the page interpolates between named lighting states, and every element
   inherits the result through CSS custom properties, so nothing is
   restyled per section — the light does it.

   Cue states are named, deep-linkable and text-equivalent. Colour is
   never the only signal: every cue carries its name in the rail.
   ═══════════════════════════════════════════════════════════════════ */

/** Named cue states. `bloom` is the light gathering at the horizon. */
const CUES = [
  {
    no: '00',
    name: 'Blackout',
    skyTop: '#030304', skyMid: '#050506', bloom: '#0a0a12', ground: '#020203',
    ink: '#e6e6f0', inkDim: '#4a4a5a', readout: '#3346c4',
  },
  {
    no: '36',
    name: 'Held',
    skyTop: '#030308', skyMid: '#06060e', bloom: '#101028', ground: '#020204',
    ink: '#d8d8e8', inkDim: '#45455a', readout: '#3a4ac0',
  },
  {
    no: '76',
    name: 'First Light',
    skyTop: '#02030d', skyMid: '#061040', bloom: '#0a2bff', ground: '#03040e',
    ink: '#dfe4ff', inkDim: '#5a68b0', readout: '#7f92ff',
  },
  {
    no: '81',
    name: 'Rose Gather',
    skyTop: '#0a0622', skyMid: '#3a1070', bloom: '#d24bff', ground: '#080618',
    ink: '#f4e6ff', inkDim: '#8a6ab8', readout: '#e79cff',
  },
  {
    no: '83',
    name: 'Dawn Wash',
    skyTop: '#2a1038', skyMid: '#a03a78', bloom: '#ff7bae', ground: '#1a0c20',
    ink: '#fff0f6', inkDim: '#c193a8', readout: '#ffd7e6',
  },
  {
    no: '—',
    name: 'Day',
    skyTop: '#ffffff', skyMid: '#ffffff', bloom: '#ffffff', ground: '#f1f1f4',
    ink: '#050506', inkDim: '#6a6a76', readout: '#0a2bff',
  },
];

const HORIZON = 0.74;

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
/** Cubic smoothstep — cue fades ease, they never snap. */
const ease = (t) => t * t * (3 - 2 * t);

/* ── state ───────────────────────────────────────────────────────── */

const canvas = document.getElementById('cyc');
const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas) {
  const ctx = canvas.getContext('2d', { alpha: false });
  const anchors = [...document.querySelectorAll('[data-cue]')];
  const railLinks = [...document.querySelectorAll('.rail__cue')];

  let w = 0;
  let h = 0;
  let dpr = 1;
  let grain = null;
  let pointerX = 0.5;
  let targetX = 0.5;
  let dirty = true;
  let activeIndex = -1;

  /* Fine grain: the cyclorama's own material. Built once, tiled forever. */
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
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!grain) buildGrain();
    dirty = true;
  }

  /**
   * Where are we in the cue stack? Returns a float index into CUES,
   * derived from the anchored sections rather than raw scroll, so the
   * light stays locked to content at any viewport height.
   */
  function cuePosition() {
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

  function currentCue() {
    const p = clamp(cuePosition(), 0, CUES.length - 1);
    const i = Math.floor(p);
    const j = Math.min(i + 1, CUES.length - 1);
    const t = ease(p - i);
    const a = CUES[i];
    const b = CUES[j];
    return {
      index: Math.round(p),
      skyTop: mix(hex(a.skyTop), hex(b.skyTop), t),
      skyMid: mix(hex(a.skyMid), hex(b.skyMid), t),
      bloom: mix(hex(a.bloom), hex(b.bloom), t),
      ground: mix(hex(a.ground), hex(b.ground), t),
      ink: mix(hex(a.ink), hex(b.ink), t),
      inkDim: mix(hex(a.inkDim), hex(b.inkDim), t),
      readout: mix(hex(a.readout), hex(b.readout), t),
    };
  }

  function paint() {
    const c = currentCue();
    const hy = h * HORIZON;

    /* The backdrop: zenith down to the horizon, then the reflecting floor. */
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, rgb(c.skyTop));
    sky.addColorStop(0.42, rgb(c.skyMid));
    sky.addColorStop(0.66, rgb(mix(c.skyMid, c.bloom, 0.55)));
    sky.addColorStop(HORIZON - 0.006, rgb(c.bloom));
    sky.addColorStop(HORIZON, rgb(mix(c.bloom, [255, 255, 255], 0.28)));
    sky.addColorStop(HORIZON + 0.004, rgb(shade(c.bloom, 0.42)));
    sky.addColorStop(0.86, rgb(mix(c.ground, c.bloom, 0.12)));
    sky.addColorStop(1, rgb(c.ground));
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    /* The lamp. Follows the pointer along the horizon — the only place
       the visitor's hand touches the light. */
    const r = Math.max(w, h) * 0.75;
    const glow = ctx.createRadialGradient(pointerX * w, hy, 0, pointerX * w, hy, r);
    glow.addColorStop(0, rgba(c.bloom, 0.3));
    glow.addColorStop(0.45, rgba(c.bloom, 0.08));
    glow.addColorStop(1, rgba(c.bloom, 0));
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over';

    /* Grain keeps a wide gradient from banding and gives the cyc its
       absorbent, matte surface. */
    if (grain) {
      ctx.globalAlpha = 0.045;
      ctx.fillStyle = grain;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
    }

    /* Publish the cue to CSS. Everything text-side inverts from here. */
    root.style.setProperty('--ink', rgb(c.ink));
    root.style.setProperty('--ink-dim', rgb(c.inkDim));
    root.style.setProperty('--readout', rgb(c.readout));
    root.style.setProperty('--rule', rgba(c.ink, 0.16));
    root.style.setProperty('--rule-faint', rgba(c.ink, 0.08));

    if (c.index !== activeIndex) {
      activeIndex = c.index;
      railLinks.forEach((el, i) =>
        el.setAttribute('aria-current', String(i === activeIndex))
      );
    }
  }

  function frame() {
    if (!reduced) {
      const d = targetX - pointerX;
      if (Math.abs(d) > 0.0004) {
        pointerX += d * 0.06;
        dirty = true;
      }
    }
    if (dirty) {
      dirty = false;
      paint();
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener('scroll', () => { dirty = true; }, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener(
    'pointermove',
    (e) => { targetX = e.clientX / window.innerWidth; },
    { passive: true }
  );

  resize();
  requestAnimationFrame(frame);
}

/* ── Cues light their content as they are called ─────────────────── */

const revealables = document.querySelectorAll('.reveal');

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
