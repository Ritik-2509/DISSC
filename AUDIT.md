# DISCC Comprehensive Architecture & Codebase Audit (Phase 0)

## 1. Executive Summary
- **Organization**: DEVA International Society for Child Care (DISCC), Varanasi, Uttar Pradesh.
- **Founder**: Dr. C. Tulsi Das (Honoured with the Best Professional Psychologist Award by the UP Chief Minister Yogi Adityanath).
- **Core Goal**: Complete redesign into a warm, light, hopeful, child-friendly, and trustworthy platform with rich Framer Motion micro-interactions, cinematic hero slideshow, authentic real photo integration, and a production-grade Admin Panel.

---

## 2. Technical Stack & Dependencies
- **Framework**: Next.js 16.3.4 (App Router), React 19.2.8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`), CSS Variables with theme tokens
- **Animation**: Motion / Framer Motion 13.2.0 (`motion/react` / `framer-motion`)
- **Icons**: `@phosphor-icons/react`, `lucide-react`
- **Database & Storage**: Firebase Firestore 12.18.0 & Firebase Admin 14.3.0, Firebase Storage / Local Assets / Cloudinary
- **State & Data Layer**: Next.js Route Handlers (`/api/[collection]`), client-side data layer (`lib/admin-client.ts`), Firestore real-time & REST fallback.

---

## 3. Directory & Routing Architecture
- `src/app/`
  - `/` - Master Home Page (Hero slideshow, trust strip, Why/Who/How, Programme tiles, Impact counters, Transformation stories, Gallery preview, Testimonials, Partners, Blog feed, Donation banner, Callback form)
  - `/about` - Founder profile (Dr. Tulsi), 1991 timeline, certifications (FCRA, National Trust), mission & leadership team
  - `/our-work` / `/projects` & `/projects/[slug]` - Comprehensive project catalog (Deva Center, Deva Gram Bachhaon, Annapurna Center, Help Line, Child Education Program, Gangotri, Ambedkar, Navjeevan)
  - `/events` & `/gallery` - Filterable photo & action-area galleries by year and category with interactive lightbox
  - `/contact` - Interactive contact and appointment request form with validation, FAQ accordion, location map
  - `/donate` - Transparent donation platform with bank details, UPI QR, FCRA compliance, tax exemption (80G)
  - `/stories` / `/blogs` & `/[slug]` - Blog and transformation stories
  - `/admin/*` - Complete Admin CMS (Dashboard, Hero Slides, Pages, Projects, Blogs, Galleries, Media, Testimonials, Team, FAQs, Contact Enquiries, Site Settings)
- `src/components/`
  - `layout/` - Navbar (sticky glassmorphism, responsive drawer), Footer, SectionHeading
  - `ui/` - Button, Card, StatCounter, Marquee, Modal, Lightbox, Accordion, Tabs, Badge, Skeleton, AnimatedCounter
  - `forms/` - AppointmentBookingForm, ContactForm, NewsletterForm
  - `accessibility/` - WCAG 2.2 Accessibility toolbox

---

## 4. Firestore Collections & Data Schema
1. **`hero_slides`**: `{ id, title, subtitle, eyebrow, cta_primary, cta_primary_link, cta_secondary, cta_secondary_link, video_url, image_url, order, status, created_at }`
2. **`pages`**: `{ id, name, slug, content, template, description, image, status, updated_at }`
3. **`projects`**: `{ id, title, slug, subtitle, category, target_group, sdg_color, sdg_name, cover_image, gallery_images, summary, full_details: { overview, impact_numbers, highlights, future_goals }, order, status }`
4. **`blogs`**: `{ id, name, slug, description, content, image, category, tags, is_featured, status, created_at }`
5. **`galleries`**: `{ id, name, year, category, description, images: [{ url, caption, order }], order, status }`
6. **`testimonials`**: `{ id, name, role, company, content, image, rating, status }`
7. **`teams`**: `{ id, name, designation, bio, photo, order, status }`
8. **`faqs`**: `{ id, question, answer, category, order, status }`
9. **`contacts`**: `{ id, name, email, phone, subject, content, status, created_at }`
10. **`settings`**: `{ key, value, updated_at }` (site logo, phone numbers, email, address, bank info, UPI QR, nav links)
11. **`media`**: `{ id, name, url, mime_type, size, folder_id, created_at }`

---

## 5. Security & Permission Audit
- **CRITICAL BUG FIXED IN PHASE 4**: `firestore.rules` currently allows arbitrary read/write (`allow read, write: if true;`). This must be secured with role-based checks (public read only for `status == "published"`, public create-only for `contacts` and `newsletter` with payload validation, admin-only writes).
- **Form Protection**: Add server-side input sanitization, length validation, and honeypot field on public submission routes.

---

## 6. Admin Panel Audit & Gap Analysis
| Admin Module | Current State | Deficiencies / Required Fixes |
|---|---|---|
| Dashboard | Basic cards | Needs real live metric aggregation, quick action shortcuts, recent inquiry previews |
| Hero Slides | Missing | Needs full CRUD: slide image upload, headline, subtext, CTAs, video URL, drag-to-reorder |
| Pages | Semi-working | Needs rich formatting, clean draft/publish toggle, SEO metadata fields |
| Projects | Static mock | Full CRUD for 8 programmes with SDG badge customization and rich details |
| Blogs | Form exists | Needs featured flag, category filtering, tag selection, publish dates |
| Galleries | Single image list | Needs bulk multi-image drag-and-drop upload, album management (Events / Action Areas), thumbnail reorder, set cover |
| Media Library | Basic grid | Needs search, folder navigation, copy URL, image preview modal, delete safety |
| Enquiries | View only | Needs status filtering (New/Read/Replied/Archived), detail view, CSV export |
| Settings | Static key-values | Dynamic contact phone/email editor, UPI/bank account configuration, dynamic navigation menu manager |

---

## 7. Implementation Roadmap
- **Phase 1**: Design System & Token Replacement (Ivory `#FFFAF2`, Teal `#0F8B8D`, Marigold `#F5A524`, Playfair Display / Plus Jakarta Sans).
- **Phase 2**: Full-screen Cinematic Hero Slideshow with Dr. Tulsi CM Yogi Adityanath award slide, Ken Burns effect, video modal, and trust strip.
- **Phase 3**: Complete Public Pages with Framer Motion (Home, About, Projects/Programmes, Gallery/Events, Contact, Donate, Stories).
- **Phase 4**: Typed Data Access Layer, Security Rules (`firestore.rules`, `storage.rules`), Rate Limiting, Asset Integration.
- **Phase 5**: Full Admin CMS with responsive light theme and complete CRUD for all 11 modules.
- **Phase 6 & 7**: Drive Asset Integration, Quality Assurance, WCAG AA testing, and Deployment Documentation.
