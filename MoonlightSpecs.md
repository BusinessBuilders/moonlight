# Claude Code Prompt — Moonlight Farm LLC Website

> **Instructions for Claude Code:** Before writing any code, scan all files in the current project folder for any HTML, CSS, image, or brand files the user has dropped in. Extract color palette, fonts, and any logo/image assets. Use those as the visual foundation for the entire site.

---

## Project Overview

Build a **production-grade React website** for **Moonlight Farm LLC** — a Highland Cattle and Llama specialty farm owned by Jesse. The site must protect the owner's personal phone number by routing all customer inquiries through a smart guided intake flow, while showcasing their services, events, gallery, and enabling digital document signing.

---

## Tech Stack — Research & Implement

Claude Code should run web searches to confirm the latest stable versions before installing, but the recommended stack is:

| Layer | Technology | Reason |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SSR, SEO, image optimization, API routes |
| Styling | **Tailwind CSS v4** | Utility-first, fast, responsive |
| CMS / Content | **Payload CMS v3 (self-hosted)** | TypeScript-native, React admin panel, portable — owner can edit gallery, events, services without touching code |
| Database | **PostgreSQL** (via Payload) | Production-grade, portable |
| Auth (admin) | **Payload built-in auth** | Secure, no extra setup |
| Forms / Intake | **React Hook Form + Zod** | Validation, multi-step |
| Facebook Integration | **Meta Graph API (server-side)** + `react-facebook` npm package | Pull page events into site calendar |
| Document Signing | **DocuSign Embedded Signing API** or **HelloSign/Dropbox Sign API** | Discreet embedded iframe widget |
| Image Storage | **Cloudinary** (or local Payload upload if self-hosted) | Optimized gallery delivery |
| Deployment | **Docker-ready** (no vendor lock-in) | Friction-free hosting migration |
| Email | **Resend** or **Nodemailer** | Route inquiry submissions to Jesse's email, not phone |

---

## Pages & Features

### 1. Homepage
- Hero section with farm name, tagline, and full-bleed farm imagery
- Brief intro — Highland Cattle & Llama specialty
- Quick-access buttons: "Book a Service", "Upcoming Events", "Contact Us"
- Facebook Like button (via `react-facebook` FacebookProvider)
- Instagram/Facebook feed embed (latest posts)

---

### 2. Services Page
Build individual service cards with descriptions, pricing placeholder, and booking CTA for each:

- **Vaccinations** — livestock health services
- **Ear Tagging** — identification & compliance
- **Castrations** — professional livestock procedure
- **Livestock Transport / Hauling** — local & regional transport
- **Birthday Parties** — farm party experiences
- **Special Events** — custom farm event hosting
- **Animal Sales** — Highland Cattle & Llamas available

Each service card links into the **Smart Inquiry Flow** (see below) pre-seeded with the service type.

---

### 3. Smart Guided Inquiry Flow (CRITICAL FEATURE)
**Goal:** Route customers to the right outcome WITHOUT them calling Jesse's cell phone.

Build a **multi-step conversational intake wizard** (React, client-side, no page reload) that:

**Step 1 — Inquiry Type Selection:**
Present four large visual cards:
- 🐄 Animal Sales (Highland Cattle / Llamas)
- 📅 Events (Birthday Party / Special Events)
- 🚛 Hauling / Transport
- ❓ General Inquiry

**Step 2 — Branch Logic per Type:**

*Animal Sales:*
- What animal? (Highland Cattle / Llama / Both)
- Are you buying or selling?
- Approximate quantity
- Timeline
- Your name, email, phone (optional — clearly labeled optional)
- Message / details

*Events (Birthday / Special):*
- Event type (Birthday Party / Corporate / Other Special Event)
- Estimated guest count
- Preferred date range (date picker)
- Do you need catering/food? (y/n)
- Name, email, phone (optional)
- Additional details

*Hauling / Transport:*
- Pickup location
- Destination
- Animal type & count
- Preferred date
- Name, email, phone (optional)
- Additional notes

*General Inquiry:*
- Topic / subject
- Name, email, phone (optional)
- Message

**Step 3 — Review & Submit:**
- Summary of answers before submitting
- Clear submit button
- On submit: send structured email to Jesse via server action (Resend/Nodemailer)
- Show confirmation screen with expected response time ("Jesse will get back to you within 24–48 hours")

**Admin Editable:** All question text, branch labels, and response message must be editable in the Payload CMS admin panel (no redeployment needed to change wording).

---

### 4. Events Page
- **Primary:** Pull events from Moonlight Farm's **Facebook Page via Meta Graph API**
  - Server-side API route: `GET /api/facebook-events` — fetches events from the Facebook page using a Page Access Token (stored in `.env`)
  - Display as a styled calendar grid + list view toggle
  - Each event shows: title, date/time, description, Facebook event link ("RSVP on Facebook" button)
  - Auto-refresh via `revalidatePath` / ISR (Next.js)
- **Fallback / Manual:** If Facebook API is unavailable, fall back to events stored in Payload CMS
- Facebook Like + Share buttons on each event card

**Setup notes for Facebook integration:**
```
Requires:
- Facebook Developer App (Meta for Developers dashboard)
- Page Access Token with pages_read_engagement permission
- Store token in: FACEBOOK_PAGE_ACCESS_TOKEN in .env
- Page ID in: FACEBOOK_PAGE_ID in .env
```

---

### 5. Gallery Page
- **Owner-Editable Gallery** managed entirely through Payload CMS admin
- Grid layout with lightbox on click
- Image categories: Cattle, Llamas, Events, Farm Life
- Upload new photos → appear on site immediately (no deployment)
- Alt text field per image for accessibility/SEO
- Drag-to-reorder in Payload admin

---

### 6. DocuSign / E-Signature Section
- Small, discreet embedded section (not prominent — subtle link in footer or on Services page labeled "Documents & Agreements")
- Use **DocuSign Embedded Signing** or **Dropbox Sign API**
- Clicking opens a modal with the embedded signing iframe
- Use cases: service agreements, transport waivers, event contracts
- Claude Code: research current DocuSign Embedded API docs and implement accordingly; if DocuSign is cost-prohibitive for a small farm, implement with Dropbox Sign (formerly HelloSign) free tier

---

### 7. About / Contact Page
- Farm story, Jesse's background, Highland Cattle & Llama specialty info
- Location (general area — no exact address unless owner provides)
- **NO direct phone number displayed** — all contact goes through the inquiry flow
- Email contact (can be masked/form-only)
- Facebook page link
- Google Maps embed (general area or farm pin if owner approves)

---

### 8. Facebook Integration Summary
Implement the following touchpoints using the `react-facebook` npm package and Meta Graph API:

- Facebook Like Page button (homepage + footer)
- Facebook Share button on events
- Events calendar pulled from Facebook page (server-side, see Events page)
- Facebook Pixel tracking (if owner sets up a Facebook Ads account in future — add pixel provider wrapper but leave `pixelId` as an env variable)

---

## Payload CMS — Admin Panel Sections

The farm owner (Jesse) should be able to log into the admin panel at `/admin` and manage:

| Collection | What Jesse Can Edit |
|---|---|
| **Gallery** | Upload/delete/reorder photos, set category & alt text |
| **Events** | Add manual events (fallback when Facebook is down) |
| **Services** | Edit service descriptions, pricing, availability status |
| **Inquiry Flow** | Edit question text, branch labels, confirmation message |
| **Site Settings** | Farm name, tagline, contact email, social links |
| **Documents** | Upload PDF agreements for DocuSign/e-sign |

---

## Design Requirements

- Extract brand colors, fonts, and any logo from the HTML sample file in the project folder
- If no sample file found: use earthy, farm-appropriate palette — deep greens, warm browns, cream/ivory whites, with gold accent
- Fully responsive (mobile-first — many farm customers browse on phones)
- Fast initial load (Next.js image optimization, lazy loading gallery)
- Clean, trustworthy aesthetic — not cheap or cluttered
- Accessibility: proper ARIA labels, keyboard navigation, color contrast compliance

---

## Environment Variables Required

```env
# Database
DATABASE_URI=postgresql://...

# Payload CMS
PAYLOAD_SECRET=your_secret_here

# Facebook
FACEBOOK_PAGE_ACCESS_TOKEN=
FACEBOOK_PAGE_ID=

# Email
RESEND_API_KEY=    # or SMTP credentials for Nodemailer

# DocuSign / Dropbox Sign
DOCUSIGN_INTEGRATION_KEY=   # or DROPBOX_SIGN_API_KEY=
DOCUSIGN_ACCOUNT_ID=

# Cloudinary (optional, for image hosting)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## File Structure Target

```
moonlight-farm/
├── app/                    # Next.js App Router
│   ├── (site)/            # Public-facing pages
│   │   ├── page.tsx       # Homepage
│   │   ├── services/
│   │   ├── events/
│   │   ├── gallery/
│   │   ├── about/
│   │   └── inquiry/       # Guided intake flow
│   ├── (payload)/         # Payload CMS admin
│   │   └── admin/
│   └── api/
│       ├── facebook-events/route.ts
│       ├── inquiry/route.ts
│       └── sign/route.ts
├── components/
│   ├── intake/            # Multi-step inquiry wizard
│   ├── events/            # Event calendar components
│   ├── gallery/           # Gallery + lightbox
│   └── ui/                # Shared UI components
├── payload/
│   ├── collections/       # Gallery, Events, Services, etc.
│   └── globals/           # Site settings
├── public/
├── .env.local
└── docker-compose.yml     # Portable deployment
```

---

## Deployment & Portability Notes

- Include a `docker-compose.yml` with the Next.js app + PostgreSQL
- All secrets in `.env` — never hardcoded
- Database migrations managed by Payload (portable between hosting providers)
- No proprietary hosting dependencies — runs on any VPS, Railway, Render, or self-hosted server
- README.md with step-by-step deployment guide

---

## Deliverables Checklist

- [ ] Full Next.js + Payload CMS project scaffold
- [ ] All 7 pages built and responsive
- [ ] Guided inquiry wizard (4 branches, email routing)
- [ ] Facebook events calendar (API + fallback)
- [ ] Owner-editable gallery in Payload admin
- [ ] DocuSign/e-sign discreet widget
- [ ] Facebook Like/Share/Pixel integration
- [ ] Docker Compose file for portable deployment
- [ ] `.env.example` with all required variables
- [ ] README with deployment instructions
