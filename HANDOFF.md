# HANDOFF — Green Channels "Square-style" website

**Purpose.** The client (Alain Vallois, MD, Green Channels Ltd) disliked the first prototype
(`../green-channels-website/`, dark serif "dossier") and asked for a site **fully inspired by
https://www.squareapparels.com/**. This project is that site, built by Taqwa Tech (Abu Bakar) to win the job.

**Rule.** Take Square's *structure, rhythm and feel* only. Never copy Square's text, photos, logo or code
(copyright; the client's own RFP says "we are not requesting a copy"). Square's claims (vertical integration,
backward linkage) are false for a buying house and must not appear.

**Content rules (Alain's 30 Aug answers).** No sector specialisation (healthcare/hospitality/hi-vis), no PPE or
conformity claims, no factory-count or capacity numbers (the only number is "35+ years"), certifications belong to
the partner factories not Green Channels, coordinate testing never certify.

## Status (2026-09-21)
DONE and verified (tsc, eslint, `next build`, headless-Edge screenshots desktop + mobile):
- Home: full-screen 4-slide hero carousel, About, Our Products 3x2 photo grid, parallax panels (Product
  Development, Quality Control, Sustainability), Our Services tiles, Partner Factories banner, Certifications,
  Our Buyers, CTA.
- Inner pages: /company /products /services /quality /sustainability /contact (RFQ form + file upload) /privacy /terms.
- /contact: redesigned 2026-09-21 as a friendly 3-step guided form (photo option cards -> describe + drag-and-drop files -> name/email), DM Sans font, big green buttons, plain-English errors, WhatsApp chat link, pre-selects from ?garment= links. Only name, email, a category and (description OR a file) are required.
- /api/rfq validates fields+files, honeypot + timing spam check (returns a reference; nothing stored/emailed). Company is optional.
- sitemap.xml, robots.txt (AI crawlers allowed), JSON-LD, per-page metadata.

NOT done / caveats:
- Photography is 20 Unsplash placeholders (see IMAGE-CREDITS.md). Replace with Green Channels' own photos.
- No CMS; all copy is in `src/lib/content.ts`. RFQ does not send email or store anything.
- Copy marked "indicative" needs Green Channels' confirmation. Privacy/Terms are drafts.
- Not measured: Lighthouse, real-device performance, Safari. Hover/animation behaviour checked only via screenshots.
- No mobile sticky CTA bar (only the header "Start a project" / menu).

## Run
```
cd green-channels-square
npm install
npm run dev -- -p 3001      # http://localhost:3001
npm run build && npm start
```
Preview via the app: launch config "green-channels-square" in `../.claude/launch.json`.

## Screenshot testing without the in-app preview
The in-app browser stalls when the Claude window is minimised. Headless Edge works:
puppeteer-core (installed in the session scratchpad, `shot/shoot.mjs`) with
`C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`. Reinstall with `npm i puppeteer-core` anywhere.

## Structure
- `src/lib/content.ts` — all copy/data (site info, nav, hero slides, product groups, services, QC stages, certs).
- `src/components/` — HeroCarousel, ParallaxPanel, ProductGrid, ServiceTiles, PageBanner, CtaBand, RfqForm, Header, Footer, Btn, Reveal, SmoothScroll (Lenis).
- Fonts: Montserrat (wide-spaced uppercase headings/nav) + Nunito Sans (italic body) via next/font.
- Next.js 16 note: read `node_modules/next/dist/docs/` before using framework APIs (see AGENTS.md).

## Next steps (suggested)
1. Ask Abu Bakar whether Alain gave feedback on this version; adjust to it.
2. Swap placeholder photos for Green Channels' own; add real team/logo (vector) if provided.
3. Deploy a live URL (Vercel) if the user wants to send a link. This needs the user's account.
4. Add a mobile sticky "Send Us Your Tech Pack" bar; consider a hero video.
5. Move content into a headless CMS; wire /api/rfq to email + database; run Lighthouse.
