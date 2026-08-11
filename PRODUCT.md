# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Currently plain hand-written HTML, CSS, and JS. Vite (`npm run dev` / `npm run build`) is present as dev server and bundler; `package.json` declares only `vite` and `prettier`. Deployed as static files to GitHub Pages with a custom domain (`CNAME` → `astranomical.xyz`).

**Explicitly open:** the owner wants to experiment with frameworks and other approaches to build a flashier page. Vanilla is the incumbent, not a commitment. Deploy host is likewise undecided — GitHub Pages is current, but moving to a host with SSR/edge capability is on the table. A framework choice and a host change are both fair to propose; neither is settled.

## Users

The site owner first, and people they send the link to. The audience that the content actually lands for is Honkai: Star Rail players — the page assumes fluency with the game's terminology (Aeons, Paths, the Simulated Universe, the Astral Express) and does not explain it. There is no signed-in user, no account, and no return-visit loop.

## Product Purpose

astranomical.xyz hosts a fan-made, in-universe archive of the Genius Society from Honkai: Star Rail. It presents the Society's members as classified dossier entries rather than as a wiki listing. Success is a visitor who knows the game opening the link and feeling they have been granted access to a restricted archive — the framing device landing before any individual fact does.

## Positioning

The differentiator is the fiction of the artifact, not the information. Wikis and databases already hold every fact on this page. What they do not do is stay inside the Society's own voice: "Membership is neither sought nor applied for. It is recognized, immutably, by the Simulated Universe." The page is written as a document from inside the world, and that framing is the reason for it to exist.

## Operating Context

- Reached by a shared link — no search traffic strategy, no navigation from anywhere else. Open Graph and Twitter card metadata are load-bearing, since the link preview is often the first impression.
- Read in one sitting, top to bottom, on desktop and on phones. Scroll is the primary interaction; there is nothing to click except the three in-page nav anchors.
- Current structure: fixed-watermark scroll hero → manifesto → four member dossier cards (Herta, Ruan Mei, Screwllum, Akivili) → membership register table → footer.
- Two easter-egg pages exist and are intentional, not leftovers: `archive/placeholder/` (the under-construction video card, linking to) `archive/ninja/`. Both are unlinked from `index.html` by design and are self-contained, carrying their own CSS and assets. They served as the site's public face before the Genius Society page and are kept deliberately.

## Capabilities and Constraints

- Static output only under the current host: no server rendering, API routes, database, or runtime backend. This constraint is contingent on the undecided host question above, not permanent.
- The live page loads its three faces (Cormorant Garamond, DM Mono, Bebas Neue) from the Google Fonts CDN. The self-hosted `.woff2`/`.ttf` files (JetBrains Sans, ZZZ) belong to the easter-egg page and now live beside it in `archive/placeholder/fonts/`.
- Four members are on record. Adding a fifth is a content decision, not a layout constraint — but see canon accuracy below.
- **Undecided:** whether "Genius Society" is the permanent identity of astranomical.xyz or one theme in a rotation. Do not treat the current subject as either locked or disposable without asking.

## Brand Commitments

- The domain name `astranomical.xyz` is fixed.
- No logo, wordmark, or owner-facing personal branding exists. The `Genius Society` wordmark in the nav is the only mark.
- The Genius Society, its members, the Paths, the Astral Express, and all associated lore belong to HoYoverse's Honkai: Star Rail. This is fan work built on borrowed material.
- **Canon accuracy is binding.** Member names, numbers, Paths, elements, roles, and status must match the game. Do not invent members, invent stats, or embellish biography beyond what the source supports. This survives any redesign, reframe, or change of stack.

## Evidence on Hand

- Written member biographies for all four current members, in the established in-universe voice (`index.html`).
- Media, all belonging to the easter-egg pages rather than the live site: `archive/placeholder/graceconstruction.mp4`, `archive/placeholder/rizz2.jpg`, `archive/ninja/ninja.png`, and the self-hosted font files. The Genius Society page itself ships zero images.
- **No character art or portraits** for any Genius Society member. The dossier cards are text-only today. Any design that assumes member imagery requires assets the owner must supply.
- No testimonials, metrics, view counts, endorsements, or third-party coverage exist, and none should ever be fabricated — this is a personal fan page, and invented social proof would be both false and tonally wrong.

## Product Principles

1. **Canon before craft.** No visual or structural idea justifies altering a fact about the source material.
2. **Stay inside the fiction.** Copy speaks as the archive, not about it. Labels, empty states, and microcopy follow the same rule as the body text.
3. **The link preview is part of the page.** Anything shipped ships with its OG/Twitter metadata correct.
4. **The domain is a laboratory.** Ambitious, technically showy execution is the point, and trying an unfamiliar framework or technique is a legitimate reason to build something here.
5. **Easter eggs stay.** Unlinked, discoverable pages are a feature of this site; relocate them, don't remove them.
