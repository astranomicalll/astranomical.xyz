---
name: Genius Society Archive
description: A violet-black observatory ledger where monospace instrumentation frames an ornate serif register of catalogued minds.
colors:
  void-black: "#0a090f"
  panel-black: "#100e18"
  raised-panel: "#16131f"
  instrument-white: "#e8e4f0"
  dim-lavender: "#9a8fb0"
  ledger-grey: "#6b6478"
  rule-hairline: "rgba(255,255,255,0.07)"
  rule-emphasis: "rgba(255,255,255,0.12)"
  deep-amethyst: "#7b4fa6"
  puppet-violet: "#c49eff"
  amethyst-wash: "rgba(123,79,166,0.08)"
  deep-cobalt: "#3a5fa8"
  glacial-periwinkle: "#9bbcf5"
  cobalt-wash: "rgba(58,95,168,0.1)"
  deep-verdigris: "#2a7a6a"
  clockwork-jade: "#6fd4b8"
  verdigris-wash: "rgba(42,122,106,0.1)"
  deep-ochre: "#b87a1a"
  trailblaze-gold: "#f5c96a"
  ochre-wash: "rgba(184,122,26,0.1)"
typography:
  watermark:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "min(23.2vw, 50vh)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.01em"
  display:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "clamp(3.5rem, 9vw, 7rem)"
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "2.8rem"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "clamp(1.5rem, 3vw, 2.4rem)"
    fontWeight: 300
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: "DM Mono, monospace"
    fontSize: "0.68rem"
    fontWeight: 300
    lineHeight: 1.9
    letterSpacing: "normal"
  label:
    fontFamily: "DM Mono, monospace"
    fontSize: "0.6rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.2em"
  index:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.2em"
rounded:
  none: "0"
spacing:
  hairline: "1px"
  xs: "0.3rem"
  sm: "0.6rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "3rem"
  section: "6rem"
components:
  member-card:
    backgroundColor: "{colors.panel-black}"
    textColor: "{colors.instrument-white}"
    rounded: "{rounded.none}"
    padding: "2.5rem"
  member-card-hover:
    backgroundColor: "{colors.amethyst-wash}"
    textColor: "{colors.puppet-violet}"
  path-chip:
    textColor: "{colors.deep-amethyst}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.22rem 0.6rem"
  status-badge:
    textColor: "{colors.puppet-violet}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.2rem 0.6rem"
  status-badge-inactive:
    textColor: "{colors.ledger-grey}"
  nav-link:
    textColor: "{colors.ledger-grey}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.puppet-violet}"
  register-cell:
    textColor: "{colors.dim-lavender}"
    typography: "{typography.body}"
    padding: "1.4rem 0"
  stat-value:
    textColor: "{colors.puppet-violet}"
    typography: "{typography.title}"
---

# Design System: Genius Society Archive

## Overview

**Creative North Star: "The Observatory Ledger"**

This is an astronomer's record book rendered as a website. Not a wiki, not a fan page — a catalogue kept by someone whose job is to observe and record, and who does not expect the record to be read casually. The violet grid ruling the background is star-chart paper. The enormous stroked outline numeral standing behind the hero is an instrument marking, etched rather than printed. Members are not profiles; they are catalogued bodies with fixed designations, and their numbers (83, 81, 76, 36) are given the same typographic dignity as their names.

The atmosphere is cold, exact, and reverent, with something faintly wrong underneath it. Two typefaces argue: DM Mono in tiny wide-tracked uppercase carries the bureaucratic layer — field labels, statuses, classifications, the machinery of the archive — while Cormorant Garamond's light italic serif carries the subjects themselves, and carries them beautifully. The friction between the two is the personality of the system. A clinical form containing something ornate and slightly uncanny. The archive respects what it catalogues without warming to the reader.

Restraint does the work of authority. Body text sits at 0.68rem inside vast fields of near-black; the accent colors appear on perhaps five percent of any screen and mostly only on hover. Nothing is emphasized by making it louder — emphasis comes from a hairline moving, a single word shifting from grey to violet, a divider growing from 2.5rem to 4rem. The system is confident enough to whisper.

**Key Characteristics:**
- Violet-tinted near-black ground (`#0a090f`), never pure black — the whole surface has a hue
- Hairline rules at 7% white doing all structural separation; no boxes, no fills, no cards that float
- Two-voice typography: ornate serif for subjects, wide-tracked mono for the apparatus around them
- Per-member accent color that stays dormant until the row or card is engaged
- Square corners and flat surfaces throughout; depth is tonal, never cast
- Very small type inside very large emptiness

## Colors

A violet-black ground with four cool jewel accents, each one held in reserve until an interaction calls it forward.

### Primary
- **Puppet Violet** (`#c49eff`): The house accent and the site's brand color. It is the nav wordmark, the second word of the hero watermark, the italicized word in the hero title, the emphasized clause in the manifesto, and every stat value on Herta's card. When the site needs to signal "this is astranomical.xyz", this is the color that does it.
- **Deep Amethyst** (`#7b4fa6`): The structural half of the violet pair — too dark for body text, correct for the things violet must be without shouting. The hero eyebrow tag and its 2rem leader rule, the left border on the hero description, the footer motto, the star-chart grid lines (at 7% alpha), and the radial vignette bloom at 80% viewport width.

### Secondary
The member accents. Each is scoped strictly to its member's card and register row; none has site-wide standing. All three follow the same two-step structure as violet — a deep variant for borders and structure, a bright variant for text that must be legible on near-black.

- **Glacial Periwinkle** (`#9bbcf5`) / **Deep Cobalt** (`#3a5fa8`): Ruan Mei. Ice element, life sciences, cold precision.
- **Clockwork Jade** (`#6fd4b8`) / **Deep Verdigris** (`#2a7a6a`): Screwllum. Quantum, mechanical, oxidized metal.
- **Trailblaze Gold** (`#f5c96a`) / **Deep Ochre** (`#b87a1a`): Akivili. The only warm color in the system, reserved for the only Aeon and the only deceased entry. Its warmth against three cool accents is what makes the featured card read as different in kind, not merely in size.

### Neutral
- **Void Black** (`#0a090f`): The page ground. Violet-tinted, not neutral, not `#000`.
- **Panel Black** (`#100e18`): One tonal step up. Every raised surface — member cards, the manifesto band, the footer. This one-step lift is the entire elevation system.
- **Raised Panel** (`#16131f`): A third step, declared but not currently used. Available if a surface ever needs to sit above Panel Black.
- **Instrument White** (`#e8e4f0`): Cool lilac-white. Display type, member names, the manifesto statement, the featured quote. Reserved for what the archive is actually about.
- **Dim Lavender** (`#9a8fb0`): Secondary reading text — member role lines, register table cells.
- **Ledger Grey** (`#6b6478`): The apparatus voice. Every label, every field name, nav links at rest, all body copy. Deliberately quiet; it is the archive's handwriting, not its content.
- **Rule Hairline** (`rgba(255,255,255,0.07)`): Every structural division — section tops, card grid gaps, table row rules, the footer border.
- **Rule Emphasis** (`rgba(255,255,255,0.12)`): The stronger rule, used only for the register table's header underline and the resting member divider.

### Named Rules

**The Dormant Accent Rule.** A member's color does not appear until their card or row is engaged. At rest, an entry is grey text on Panel Black with only its path chip and stat values tinted. Hover brings the index, the name, the divider, and an 8–10% wash forward together, in one 0.3–0.4s move. The color is a response, not a decoration.

**The One Warm Entry Rule.** Trailblaze Gold is the only warm hue in the system and it belongs to Akivili alone. Do not introduce a second warm accent; the singularity is what marks the Aeon as categorically apart.

**The Tinted Ground Rule.** No surface in this system is neutral grey or pure black. Every ground carries violet. `#0a090f`, `#100e18`, `#16131f` — the hue is what keeps the darkness from reading as a default.

## Typography

**Display Font:** Cormorant Garamond (with Georgia, serif fallback) — weights 300 and 400, roman and italic
**Body / Label Font:** DM Mono (with monospace fallback) — weights 300 and 400
**Watermark / Index Font:** Bebas Neue (with sans-serif fallback)

**Character:** Three faces doing three unrelated jobs, and the distance between them is the point. Cormorant Garamond is the archive's subject matter — light, high-contrast, unmistakably literary, and italicized when the copy turns emotional. DM Mono is the archive's apparatus — set tiny, tracked wide, uppercased, and never asked to be beautiful. Bebas Neue is the archive's numbering — condensed, structural, used for the scale of the watermark and the terseness of a catalogue index and nothing in between.

### Hierarchy
- **Watermark** (Bebas Neue 400, `min(23.2vw, 50vh)`, line-height 0.88, tracking -0.01em, uppercase): The two-line "GENIUS / SOCIETY" fixed behind the hero. Sized to viewport, not to a type scale — it is a surface treatment, not a heading.
- **Display** (Cormorant Garamond 300, `clamp(3.5rem, 9vw, 7rem)`, line-height 0.95, tracking -0.02em): The hero title, capped at 700px measure. Its `<em>` renders italic in Puppet Violet.
- **Headline** (Cormorant Garamond 300, 2.8rem, line-height 1, tracking -0.01em): Member names. The single largest element inside any card, and the only thing in a card allowed to be large.
- **Title** (Cormorant Garamond 300, `clamp(1.5rem, 3vw, 2.4rem)`, line-height 1.35): The manifesto statement. Also the register's name column at 1.3rem and the featured quote at 1.75rem italic.
- **Body** (DM Mono 300, 0.68–0.7rem, line-height 1.9): Member biographies and the hero description. The 1.9 line-height is doing heavy lifting — at this size, generous leading is what makes the block readable rather than dense.
- **Label** (DM Mono 400, 0.55–0.62rem, tracking 0.13–0.3em, uppercase): Every field name, section label, path chip, status badge, nav link, and footer line. Tracking scales inversely with importance — the hero eyebrow tag runs 0.3em, a stat label runs 0.18em.
- **Index** (Bebas Neue 400, 0.85rem, tracking 0.2em): Member catalogue numbers and register rank cells.

### Named Rules

**The Two Voices Rule.** Serif speaks for the subject; mono speaks for the archive. A member's name, their quote, the manifesto, and any stat *value* are serif. A field label, a status, a classification, and any body prose are mono. Never mix the assignment — a serif label or a mono member name breaks the fiction immediately.

**The Tracking-Is-Scale Rule.** Mono type never grows to signal importance; it tracks wider instead. 0.12em is a table badge, 0.2em is a field label, 0.3em is a section eyebrow. Size stays under 0.62rem regardless.

**The Italic Reserve Rule.** Italic Cormorant marks the two moments the archive stops being neutral: the emphasized word in a display line and the voice of a member quoted directly. Do not italicize for ordinary emphasis.

## Layout

Full-bleed, no centered container. Content runs to a `3rem` side gutter on desktop and `1.2rem` below 700px; there is no `max-width` wrapper, and the register table spans the full viewport at any width. Measure is controlled locally where it matters — the hero title caps at 700px, the hero description at 400px — rather than globally.

The members grid is the structural signature: `repeat(2, 1fr)` with `gap: 1px` over a `rule-hairline` background, so the gap itself renders as a hairline rule and the four cards read as divisions of one continuous plane rather than as separate objects. Akivili's card spans `1 / -1` and subdivides internally into `1fr 1fr` with a `3rem` gap, which is how the featured entry gains prominence without gaining ornament. Stat rows inside a card are `repeat(3, 1fr)` above a hairline. The manifesto band runs `1fr 2fr` — label left, statement right.

Vertical rhythm: `6rem` above and below the members section, `4rem` for the ranks and manifesto bands, `2.5rem` of card padding, `1.5rem` between a card's internal blocks. Every major section opens with a `section-header` — a hairline top border, `1.5rem` of clearance, a mono label at left and an italic serif count at right, then `3rem` before content.

The hero is `400vh` tall and contains almost nothing in flow; its children are `position: fixed` and driven by scroll offset, with visibility force-toggled once the hero's end passes so the fixed layer cannot bleed over the sections below.

One breakpoint, at 700px: the members grid, the featured card's internal split, and the manifesto all collapse to a single column; the footer becomes a centered stack; the hero numeral drops to a fixed `8rem`.

### Named Rules

**The Hairline Gap Rule.** Grid gaps are `1px` over a rule-colored background, never open space. Adjacent surfaces are separated by a drawn line, not a void. This is what makes the layout read as a ruled ledger.

**The Full-Bleed Rule.** No max-width container. The page runs edge to edge and constrains measure only at the individual text block that needs it.

## Elevation & Depth

This system is flat by conviction. There are no box-shadows anywhere, and no raised or floating surfaces. Depth is entirely tonal and linear: the ground is `#0a090f`, any surface sitting on it is `#100e18`, and the two are separated by a hairline at 7% white. That is the whole vocabulary — one tonal step and a drawn line.

The only atmospheric depth in the system is in the hero, where three fixed layers stack behind the content: a 72px star-chart grid of violet lines at 7% alpha, a radial vignette bloom positioned off-center at 80% width, and an enormous outlined numeral rendered in `-webkit-text-stroke` at 13% violet with a transparent fill. These read as etching on the surface rather than as objects above it.

The single blur in the system is the scrolled navigation bar: `backdrop-filter: blur(16px)` over `rgba(10,9,15,0.92)`. It exists to keep the register legible as it passes underneath, not to imply the nav is floating.

### Named Rules

**The Drawn-Not-Cast Rule.** Separation is drawn with a line or a tonal step, never cast with a shadow. This is the house default and it holds across the current system — a future build may break it, but only deliberately and only with a stated reason, never by reaching for a shadow as the reflexive way to separate two things.

## Shapes

Every corner in this system is square. `border-radius: 0` is not written anywhere because nothing ever sets it — the geometry is inherited from the ledger metaphor, where a field is a rectangle and a rule is a straight line. Chips, badges, cards, table cells, and the video frame all terminate in hard 90° corners.

Borders are the primary form language, and they come in exactly three weights: the `1px` hairline at 7% white for structure, the `1px` emphasis at 12% for a heading underline or a resting divider, and the `2px` accent left-rule that marks a pulled quote. Path chips and status badges are outline-only — `1px solid` in the member's color at 30–50% alpha, with no fill.

Two elements are shapes in their own right. The member divider is a `2.5rem × 1px` rule that extends to `4rem` and takes on the member's deep accent when the card is engaged; it is the smallest and most characteristic gesture in the system. The hero eyebrow tag prefixes itself with a `2rem × 1px` inline leader rule, borrowed directly from the way a catalogue entry opens.

### Named Rules

**The Square Corner Rule.** Nothing in this system is rounded. Square corners are the default and the expectation; introducing radius is a deliberate departure from the house style, not a neutral choice.

**The Outline Chip Rule.** Chips and badges are outlines, never fills. A filled pill would read as a modern web UI component and break the ledger fiction instantly.

## Components

### Navigation
Fixed, full-width, transparent at rest with no border and no blur. Below 60px of scroll it gains `rgba(10,9,15,0.92)`, a 16px backdrop blur, and a hairline bottom border, all over a 0.4s transition. The wordmark is a deliberate reveal: Bebas Neue at 1.1rem with 0.28em tracking in Puppet Violet, `opacity: 0` at the top of the page and fading in only once the nav has scrolled — the hero's own watermark is the identity until then, and a second wordmark on top of it would be redundant. Links are mono labels at 0.62rem / 0.18em uppercase in Ledger Grey, shifting to Puppet Violet on hover over 0.2s.

### Member Cards
Instruments, not cards. A member entry is a panel in a machine, not an object on a surface — it has no radius, no shadow, no lift on hover, and no visible boundary of its own beyond the 1px grid gaps that divide it from its neighbors.

- **Ground:** Panel Black (`#100e18`), `2.5rem` padding, `overflow: hidden`, `cursor: pointer`.
- **Structure:** A top row pairing the mono catalogue index against the outlined path chip, then the serif name, then a mono uppercase role line in Dim Lavender, then the divider, then the mono bio, then a hairline-topped 3-column stat grid.
- **Rest state:** Index and body in Ledger Grey; name in Instrument White; stat values already carrying the member's bright accent. This is the only color present at rest.
- **Hover:** A pseudo-element wash of the member's `*-wash` color fades in over 0.4s while the index and name shift to the bright accent over 0.3s and the divider extends `2.5rem → 4rem` and takes the deep accent over 0.4s. Four properties, one gesture, no transform.
- **Featured variant:** Spans the full grid width and splits `1fr 1fr` with a `3rem` gap. The right column holds a 1.75rem italic serif quote behind a `2px` accent left-rule, bottom-aligned against the left column's stat grid.

### Register Table
A ledger page, set as a real `<table>` with `border-collapse: collapse`. Header cells are 0.58rem / 0.22em mono uppercase in Ledger Grey at weight 400 — never bold — above a rule-emphasis underline. Body rows are `1.4rem` of vertical padding above a hairline, with cells in Dim Lavender. The rank and name columns take the member's bright accent; the name column switches to serif at 1.3rem, so the register reads as mono scaffolding with serif subjects dropped into it. Row hover is a `rgba(255,255,255,0.02)` lift — barely perceptible, and correct at that strength.

### Chips and Badges
Both are outline-only rectangles: `1px solid` in the member's accent at 30–50% alpha, 0.55–0.57rem mono uppercase at 0.12–0.13em tracking, `0.2rem 0.6rem` padding, no fill, no radius. The path chip carries the member's classification; the status badge carries standing. The deceased badge is the exception that proves the color rule — a white 10% border and Ledger Grey text, drained of accent entirely.

### Section Headers
A repeating three-part unit: a hairline top border, `1.5rem` of clearance, then a baseline-aligned row with a mono uppercase label at left and an italic serif count at right. The mono/serif pairing appears here in miniature and is what makes each section announce itself as an archive division.

### Motion
*Recorded as the current implementation, not as a binding invariant — a rebuild is free to invent a different entrance.*

Two systems coexist. Section content uses a CSS `fadeUp` keyframe (28px rise, 0.7s ease) staggered across cards at 0.1s intervals. The hero uses a scroll-driven sequence over its `400vh`: the watermark fades and drifts up 32px across the first 55% of a viewport, the nav solidifies past 60px, and the foreground block fades in between 48% and 72% of a viewport height while its children stagger in at 0.12s intervals — then the whole assembly fades out before the hero ends. Transitions run 0.2s for color, 0.3–0.4s for member state and nav, and 0.7s for reveals, all on the bare `ease` keyword.

## Do's and Don'ts

### Do:
- **Do** keep Puppet Violet (`#c49eff`) as the site's single brand accent and scope the other three colors strictly to their member's card and register row.
- **Do** follow the Two Voices Rule: Cormorant Garamond for subjects and values, DM Mono for labels and apparatus.
- **Do** separate surfaces with a `1px` hairline at 7% white or a single tonal step (`#0a090f → #100e18`).
- **Do** use `gap: 1px` over a rule-colored background so grid gaps render as drawn lines.
- **Do** hold accents dormant at rest and bring them forward as a single coordinated hover gesture across index, name, divider, and wash.
- **Do** track mono type wider to signal importance instead of scaling it up.
- **Do** tint every dark surface with violet rather than reaching for neutral grey or `#000`.
- **Do** keep the deceased entry drained of accent — the absence of color is carrying meaning.

### Don't:
- **Don't** add `border-radius` or `box-shadow` without a deliberate reason; square and flat are the house style, and reaching for either as the reflexive way to separate two things is the failure mode this system exists to avoid.
- **Don't** fill a chip or badge. Outlines only.
- **Don't** set a member name in mono or a field label in serif.
- **Don't** introduce a second warm accent alongside Trailblaze Gold.
- **Don't** bold a table header or a mono label — mono stays at weight 300–400 throughout.
- **Don't** raise a card on hover with `transform: translateY`. Member cards are panels in a plane; lifting one breaks the ledger.
- **Don't** go *smaller* than the current type floor. Body already sits at 0.68rem (≈10.9px) and labels at 0.55rem (≈8.8px), which is well under the 16px reading convention. The smallness is deliberate and the 1.9 line-height is what rescues it, but there is no headroom left — a rebuild should treat these as the minimum, and a bump toward 0.75rem body would cost the system nothing.
