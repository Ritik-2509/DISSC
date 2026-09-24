# DISCC Website Redesign + Admin Panel Fix — Master Prompt for Antigravity

You are a senior full-stack engineer and creative front-end designer. You will redesign an existing NGO website end to end: a **new light, warm, emotionally-driven theme**, **rich Framer Motion animation everywhere**, a **cinematic full-screen hero**, and a **fully working admin panel**. Work in the phases below. **Do not skip Phase 0.**

---

## 0. Context

**Organisation:** DEVA International Society for Child Care (DISCC), Varanasi, Uttar Pradesh. Founded 1991 by **Dr. Tulsi**, the first professional clinical psychologist in Mental Health & Intellectual Disability (ID) management in UP, and a recipient of the **Best Professional Psychologist Award from the Chief Minister of Uttar Pradesh (Yogi Adityanath)**. Holds FCRA and National Trust certifications.

**Purpose of the site:** Empower children with disabilities through education, rehabilitation and inclusion. Primary goals: (1) build trust and credibility, (2) drive **donations**, (3) get parents to **enquire/book a call**, (4) showcase programmes and events.

**Old site (for content/structure reference only):** https://disccindia.org/ (Laravel/Botble CMS). Menu there: Home, Dr. Tulsi (Other Psychological Ventures, Changemakers Inc), About DISCC, DISCC Projects (Deva Center, Deva Gram Bachhaon, Annapurna Center, Help Line, Child Education Program, Gangotri, Ambedkar, Navjeevan), Gallery (2025, 2026), Contact, Donate. Also Blog, FAQs, Testimonials, How it works, Privacy Policy.
Contact: B.21/100, Bind Bhavan, Kamachha Chungi, Varanasi 221010 · disccindia@gmail.com · 7007453168, 9415303557, 9129853531 · Mon–Sat 8am–5pm, Sunday closed. Facebook and YouTube (@disccvaranasi3882) links exist.

**Current codebase (new site):** I am providing the project folder. From its config files it appears to be a Next.js app (`.next` is git-ignored) using **Firebase project `dissc-60e94` with Firestore**. Firestore collections referenced in `firestore.indexes.json`: `pages`, `blogs` (category, status, created_at), `galleries` (status, year, order), `contacts` (status, created_at), `media` (folder_id, created_at). Data was migrated from the old Botble MySQL dump (`wpadmin.sql`: pages, posts, galleries, gallery_meta, teams, testimonials, faqs, announcements, menus, menu_nodes, media_files, settings, contacts, etc.).

---

## Phase 0 — Audit first (no code changes yet)

1. Read the whole repo. Produce `AUDIT.md` covering: framework + versions, folder structure, routing, data-fetching pattern, Firestore collections and field schemas actually used, auth method, admin routes, image upload flow, env vars, known bugs.
2. List **every admin feature that is broken or half-built** (forms that don't save, delete not working, uploads failing, missing validation, stale lists after mutation, etc.) with file + reason.
3. Flag **security problems**. Known one already: `firestore.rules` currently is `allow read, write: if true;` for every document, meaning anyone on the internet can read, edit or delete the entire database. This must be fixed in Phase 4.
4. Propose the final architecture. Keep the existing stack unless there is a strong reason. Wait for no approval; proceed after writing the audit, but keep the audit as documentation.

---

## Phase 1 — Design system (new light theme)

Replace the existing theme completely. Mood: **hopeful, warm, child-friendly, trustworthy, dignified**. Not corporate-blue, not dark.

- **Palette (define as CSS variables / Tailwind tokens):**
  - Background ivory `#FFFAF2`, surface white `#FFFFFF`, soft peach `#FFEFE0`, soft sky `#E8F4FB`, soft mint `#E6F6EE`
  - Primary teal `#0F8B8D`, deep ink text `#1E2A3A`, muted text `#5B6B7C`
  - Accent marigold `#F5A524` (donate CTA), coral `#EE6C4D`, lavender `#8E7CC3` (used sparingly)
  - Use soft gradients, blurred colour blobs, and organic wave/curve section dividers.
- **Typography:** a warm serif for headings (Fraunces or Playfair Display) + a clean humanist sans for body (Plus Jakarta Sans or Poppins). Include Noto Sans Devanagari as fallback so Hindi text renders well.
- **Shape language:** rounded 20–32px cards, soft long shadows, hand-drawn style underline/squiggle accents, subtle paper-grain texture.
- Build a small reusable component library: Button (primary/donate/ghost), SectionHeading, Card, StatCounter, Marquee, Modal, Lightbox, Accordion, Tabs, Badge, Skeleton.
- Fully responsive, mobile-first, WCAG AA contrast, visible focus states.

---

## Phase 2 — The Hero (most important part)

The client wants a visitor to understand the organisation's credibility **within the first second** — a full-screen hero built around the founder receiving the award from the UP Chief Minister.

**Spec:**
- Full viewport (`100svh`), edge-to-edge, no boxed container.
- A **cinematic slideshow of full-screen photographs** from `/public/hero/`: Dr. Tulsi receiving the award from CM Yogi Adityanath (this is slide 1), plus other award/recognition photos. Transition: crossfade + slow Ken-Burns zoom/pan (Framer Motion `animate` with scale 1 → 1.08 over ~8s), auto-advance every ~6s, pause on hover, swipe on mobile, keyboard arrows, progress bars at the bottom.
- Readable overlay: a soft light-to-transparent gradient (keep the theme light — do **not** use a heavy black overlay), with staggered text reveal (word-by-word `variants` with `staggerChildren`).
- **Headline copy (editable from admin):**
  - Eyebrow: "Since 1991 · Varanasi"
  - H1: "First Professional Clinical Psychologist in Mental Health & Intellectual Disability care in Uttar Pradesh"
  - Sub: "Honoured with the Best Professional Psychologist Award by the Chief Minister of Uttar Pradesh."
  - CTAs: **Donate** (marigold, gentle pulsing glow) and **Request a call back** (ghost).
- A **"Watch our story"** circular play button that opens a full-screen modal with the organisation's video (self-hosted MP4 in `/public/video/` with a poster image, or YouTube embed if that's what is provided). Modal opens with a scale + blur transition, closes on Esc/backdrop, pauses on close.
- Trust strip under the hero, animated in on load: "32+ years · FCRA registered · National Trust registered · State & Central certified".
- Scroll cue (animated chevron). Navbar is transparent over the hero and becomes a frosted-glass sticky bar after scrolling (`useScroll` + `useTransform`).
- Hero slides, headline, subtext, CTA labels and video URL are **all manageable from the admin panel** (see Phase 5, "Hero Slides").
- Performance: `next/image` with `priority` for slide 1 only, preload the poster, lazy-load the rest, use AVIF/WebP, never autoplay video with sound, respect `prefers-reduced-motion` (fall back to a static image and simple fades).

**Why this works (learned from the client's references):**
- *India Autism Center:* a single video-led hero with one clear promise line, then three "focus area" tiles, then "what sets us apart".
- *Jai Vakeel Foundation:* one mission line, an "impact in numbers" band, real child transformation stories ("Meet Tanisha → Today: walks independently"), donor quotes, and a "what your donation does" block.
- *Rubaroo:* a Why / Who / How narrative and thematic "Our Work" cards with imagery.
Borrow these **patterns**, not their styling. The client did not like every reference, so the visual identity must be original.

---

## Phase 3 — Pages and Framer Motion

**Five main pages** (plus Donate as a persistent CTA and supporting pages):

1. **Home**: Hero → trust strip → "Why / Who / How" story block → Focus/Programme tiles (Deva Center, Deva Gram, Annapurna, Help Line, Education, etc.) → animated Impact counters → "Meet the child" story carousel → Events gallery preview → Testimonials → Partners marquee → Latest blogs → Donation banner → Request-a-call-back form.
2. **About**: Dr. Tulsi's profile + timeline since 1991 (scroll-drawn vertical line), certifications, mission/vision/values, team grid.
3. **Programmes / Projects**: index of all projects (Deva Center, Deva Gram (Bachhaon), Annapurna Center, Help Line, Child Education Program, Gangotri, Ambedkar, Navjeevan) with dynamic detail pages `/projects/[slug]`.
4. **Gallery / Events**: filterable by year and category (Events, Action Areas), masonry layout, lightbox with swipe/keyboard, data from Firestore `galleries`.
5. **Contact**: form (saves to Firestore `contacts`), map embed, address/phone/hours, FAQ accordion.

Supporting: Blog list + detail, Donate, Privacy Policy, 404.

**Framer Motion requirements — use it richly, but purposefully:**
- Page transitions with `AnimatePresence` (fade + slight rise, or a soft coloured curtain wipe).
- Scroll-reveal for every section via `whileInView` (`once: true`, `viewport={{ margin: "-80px" }}`) with staggered children.
- Parallax on images/blobs using `useScroll` + `useTransform`.
- Animated number counters (`animate` + `useMotionValue`) triggered on view.
- Floating decorative shapes (stars, hearts, puzzle pieces, balloons) with looping `animate`, low opacity, disabled on reduced-motion.
- Card hover: lift, tilt (`whileHover`), image zoom, arrow slide-in; magnetic buttons.
- Shared-element transitions with `layoutId` (gallery thumbnail → lightbox, project card → detail header).
- Scroll progress bar at the top; text reveal on headings (split lines/words); SVG path drawing (`pathLength`) for timeline and wave dividers; horizontal drag carousel for stories and testimonials; infinite marquee for partners.
- Accordion (FAQ) with `AnimatePresence` height animation; mobile menu with staggered links; animated hamburger.
- Create shared variants in `lib/motion.ts` (`fadeUp`, `fadeIn`, `scaleIn`, `staggerContainer`, `slideLeft/Right`) and reusable wrappers (`<Reveal>`, `<Stagger>`, `<Parallax>`). Use `LazyMotion` + `domAnimation` to keep bundle small.
- Only animate `transform`/`opacity`. Keep 60fps on a mid-range Android phone. Honour `useReducedMotion()` everywhere.

---

## Phase 4 — Data, security, media

- Keep Firestore as the data layer. Write a typed data-access layer (`lib/db/*`) with Zod schemas for every collection: `hero_slides`, `pages`, `projects`, `blogs`, `galleries` (+ `images` array), `testimonials`, `team`, `faqs`, `contacts`, `newsletter`, `announcements`, `media`, `settings`, `menus`.
- **Rewrite `firestore.rules`.** Public: read only documents with `status == "published"` (or equivalent) in public content collections; create-only (with field validation and size limits) on `contacts` and `newsletter`. Admin-only: all writes and reads of `contacts`. Admin defined by Firebase Auth custom claim `admin == true` (or an `admins` collection). Default deny everything else.
- Add **Firebase Storage** (`storage.rules`, update `firebase.json`): public read for `public/**`, admin-only write, max 10MB, image/video content types only.
- Update `firestore.indexes.json` for every query actually used; deploy notes in README.
- **Migration script** (`scripts/migrate-from-sql.ts`): parse `wpadmin.sql` (pages, posts, galleries, gallery_meta, teams, testimonials, faqs, announcements, menus) into the new Firestore schema. Idempotent, dry-run flag, logs a summary. Old asset paths like `storage/...` map to the new media location; report missing files.
- Server-side validation on all form submissions, basic rate limiting/honeypot on the contact form.
- SEO: metadata per page from Firestore, OpenGraph, sitemap.xml, robots.txt, JSON-LD (`NGO`/`Organization`), alt text required for images.

---

## Phase 5 — Admin panel (must fully work)

Route: `/admin`. Auth: Firebase Auth email/password with admin custom claim; protect routes with middleware + server checks; session persistence; forgot password; logout. Light theme consistent with the site, sidebar layout, responsive, subtle Framer Motion transitions.

**Modules (every one needs full CRUD unless stated):**
1. **Dashboard**: counts (new enquiries, blogs, gallery items), recent enquiries, quick actions.
2. **Hero Slides**: upload image, set headline/sub/CTA, drag-to-reorder, enable/disable, video URL setting.
3. **Pages**: rich-text editor (Tiptap), slug, SEO fields, draft/published.
4. **Projects/Programmes**: title, slug, cover, gallery, description, order, status.
5. **Blogs**: rich text, category, tags, featured image, featured flag, draft/publish, schedule date.
6. **Galleries / Events**: create album (title, year, category = Events/Action Areas, description), **bulk multi-image upload with drag-and-drop, progress bars, client-side compression, reorder, delete individual images, set cover**.
7. **Media Library**: folders, upload, search, preview, copy URL, replace, delete (blocks deletion if in use, or warns).
8. **Testimonials, Team, FAQs (with categories), Partners, Impact Stats** (numbers shown on home counters), **Announcements** (top banner with date range).
9. **Enquiries/Contacts inbox**: list, filter by status (new/read/replied/archived), search, view detail, mark status, delete, **export CSV**, optional email notification.
10. **Site Settings**: logo, favicon, contact details, social links, donation details/UPI/bank info, footer text, navigation menu editor (add/remove/reorder/nest links), SEO defaults.
11. **Users & roles** (admin, editor).

**Admin quality bar:** react-hook-form + Zod validation with inline errors; optimistic UI + toasts; confirm dialogs for delete; skeleton loaders; empty states; pagination/search on every list; drag-and-drop ordering (`Reorder` from Framer Motion or dnd-kit); no stale data after create/update/delete; unsaved-changes warning; audit log (who changed what, when). Each module must be **manually tested**: create → appears on the public site → edit → delete → disappears.

---

## Phase 6 — Assets (I will supply)

- Hero photos (Dr. Tulsi with CM Yogi Adityanath receiving the award, and other award photos) → `/public/hero/`
- Organisation video → `/public/video/` (compress to H.264 MP4, ≤ 8MB, 1080p, plus poster JPG)
- Events and action-area photos (from client's Google Drive; I will download into `/public/gallery/{year}/{events|action-areas}/`) → import them into Firestore `galleries` via a script (`scripts/import-gallery.ts`) that creates albums per folder, generates optimised WebP + thumbnails and uploads to Storage.
- If a file is missing, use a clearly-marked placeholder and list it in `TODO_ASSETS.md`. Never fetch or invent stock photos of children.

---

## Phase 7 — QA and delivery

- Lighthouse targets: Performance ≥ 85 mobile, Accessibility ≥ 95, SEO ≥ 95.
- Test at 360px, 768px, 1280px, 1920px. Test with reduced-motion on.
- Type-check and lint clean. No console errors. No hard-coded secrets; provide `.env.example`.
- Update `README.md`: setup, env vars, `firebase deploy --only firestore:rules,firestore:indexes,storage`, how to create the first admin user (script `scripts/create-admin.ts`), how the client adds a blog/gallery/hero slide.
- Deliver in small, reviewable commits per phase. At the end give a summary of what changed, what remains, and any decisions I need to make.

## Ground rules
- Preserve existing working data and routes unless replaced; don't delete anything without noting it.
- Ask before adding paid third-party services.
- Images of children are sensitive: no auto-publishing, everything defaults to `draft`.
- Keep copy respectful and person-first ("children with disabilities", "individuals with intellectual disability").
