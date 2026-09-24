# DEVA International Society for Child Care (DISCC) — Modern Web Platform & Admin CMS

Founded in 1991 in Varanasi, Uttar Pradesh by **Dr. C. Tulsi Das**, recipient of the **Best Professional Psychologist Award from the Chief Minister of Uttar Pradesh (Yogi Adityanath)**. DISCC empowers neurodivergent children and individuals with intellectual disabilities through scientific clinical rehabilitation, individualized education, and grassroots community inclusion.

---

## 1. Technical Stack & Architecture

- **Frontend**: Next.js 16.3.4 (App Router, Turbopack), React 19.2.8
- **Styling**: Tailwind CSS v4, custom light warm theme tokens (Ivory `#FFFAF2`, Teal `#0F8B8D`, Marigold `#F5A524`, Peach `#FFEFE0`)
- **Typography**: Playfair Display (Headings), Plus Jakarta Sans (Body), Noto Sans Devanagari (Hindi)
- **Animation & Motion**: Motion & Framer Motion 13 (`motion/react`, `framer-motion`) with hardware-accelerated transforms and full `useReducedMotion` support
- **Backend & Database**: Firebase Firestore (`dissc-60e94`), Firebase Admin SDK, REST collection synchronization
- **Storage & Media**: Firebase Storage (`storage.rules`), Cloudinary, local high-resolution assets

---

## 2. Key Pages & Features

1. **Home (`/`)**:
   - Full-screen **Cinematic Hero Slideshow** featuring Dr. Tulsi receiving the State Award from UP Chief Minister Yogi Adityanath.
   - Ken Burns smooth zoom & crossfade transitions with keyboard navigation and progress bar indicators.
   - **"Watch Our Story"** video modal trigger.
   - Animated **Trust Strip** (32+ Years, FCRA, National Trust, State Certified).
   - "Why / Who / How" Story block.
   - Action Area & Focus Programme cards with interactive detail modals.
   - Animated **Impact Counters** (12,000+ children rehabilitated).
   - "Meet the Child" real transformation story carousel.
   - Events gallery preview with interactive lightbox.
   - Infinite partner & certification marquee.
   - Direct call-back & assessment request form.

2. **About (`/about`)**:
   - Dr. Tulsi's clinical psychology legacy and UP Chief Minister award spotlight.
   - Interactive vertical timeline from 1991 foundation to present.
   - Statutory compliance badges (FCRA, National Trust, 80G, 12A).
   - Multidisciplinary clinical leadership & advisory team.

3. **Programmes & Facilities (`/our-work`)**:
   - Filterable catalogue across active campuses (Deva Center, Deva Gram Bachhaon, Annapurna Center, Child Education Program, Help Line, Navjeevan Clinic) and historic milestones (Gangotri School, Ambedkar School).

4. **Events & Gallery (`/events`)**:
   - Upcoming flagships (Purple Fair 2026, Ramayan Theatre, University Study Abroad cohorts).
   - Filterable Photo Gallery (2025-2026, Recognition, Clinical Therapy, Action Areas) with interactive keyboard Lightbox.

5. **Contact (`/contact`)**:
   - Interactive appointment & consultation booking form with honeypot security.
   - Complete contact hotlines, address, and interactive FAQ accordion.

6. **Donate (`/donate`)**:
   - Interactive donation tiers (₹500 / ₹1,500 / ₹5,000 / Custom) with transparent impact descriptions.
   - Direct NEFT/RTGS bank details with one-click copy buttons.
   - Instant UPI payment integration.
   - Section 80G 50% tax deduction information.

7. **FCRA Declarations (`/fcra`)**:
   - State Bank of India New Delhi Main Branch FCRA remittance instructions for international donors.

8. **Admin Panel (`/admin`)**:
   - **Dashboard**: Live metric counts and incoming inquiry inbox.
   - **Hero Slideshow Manager (`/admin/hero`)**: Full CRUD for hero slides, ordering, titles, and video URL.
   - **Projects Manager (`/admin/projects`)**: Full CRUD for all 8 facilities and programmes.
   - **Galleries Manager (`/admin/gallery`)**: Album creation, drag-and-drop bulk image upload, progress bars, cover selection, and deletion.
   - **Contact Inbox (`/admin/contact`)**: Status filtering, inquiry details, and **CSV Export**.
   - **Site Settings (`/admin/settings`)**: Organization identity, phones, email, bank details, UPI ID, and social channels.

---

## 3. Getting Started & Local Development

### Prerequisites
- Node.js 20+ (Node v24 recommended)
- npm 10+

### Setup & Run
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 4. Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCV4CeYxkB0Mj7pv7y4xn2pNL-TgKLCua8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dissc-60e94.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dissc-60e94
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dissc-60e94.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=396786272491
NEXT_PUBLIC_FIREBASE_APP_ID=1:396786272491:web:b81ff74e04f38fe42396ae
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-30SF9XDPRS
```

---

## 5. Security & Deployment

### Deploy Security Rules & Indexes to Firebase
```bash
# Deploy firestore rules, firestore indexes and storage rules
firebase deploy --only firestore:rules,firestore:indexes,storage
```

---

## 6. Managing Content as an Administrator

1. **Adding / Editing Hero Slides**:
   - Go to `/admin/hero`. Click **Add New Slide** or **Edit**.
   - Fill in the headline, subtext, eyebrow, and image path (e.g. `/hero/slide-1-cm-award.png`).
   - Use Up/Down arrows to reorder slide sequence on the homepage.
2. **Uploading Event Photo Albums**:
   - Go to `/admin/gallery`. Click **Create New Album** (enter Year, Title, Category).
   - Click **Manage Photos** on the album card and drag & drop multiple image files.
   - Click **Cover** on any image to set it as the album cover thumbnail.
3. **Exporting Inquiries to CSV**:
   - Go to `/admin/contact`. Click **Export CSV** to download a spreadsheet of all patient assessment bookings and consultation requests.
