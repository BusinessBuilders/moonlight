# Moonlight Run Farm — Platform Design Spec

**Date:** 2026-03-30
**Status:** Approved

## Overview

Moonlight Run Farm is the first client on the Business Builders multi-tenant CMS platform. The farm owner needs two features: **Photos** (gallery management) and **Events** (event creation + Facebook embed). The public-facing site needs production-grade animations.

## Decisions

### Animation Direction: Organic + Warm
- Slow, earthy reveals (nature-inspired motion)
- Warm, tactile interactions (approachable, inviting)
- Framer Motion for React components (2026 industry standard)
- CSS keyframes kept for ambient effects (grain, orbs, shimmer)
- `prefers-reduced-motion` support required

### Customer Dashboard: Custom (No Raw Payload Admin)
- Clients never see Payload's admin UI
- Simple branded dashboard with two sections: Photos + Events
- Scales to multiple tenants — everyone gets the same clean UX
- Payload stays as backend engine only

### Photo Management: Drag-and-Drop Grid
- Client sees gallery as a visual grid
- Drag photos to reorder
- Click "+" to upload new photos
- Click a photo to edit title, category, description
- Delete with trash icon
- All inline, no page navigation
- *Deferred to next session for full implementation*

### Events: CMS Events + Facebook Embed
- Client creates/edits events in custom dashboard
- Events show as styled cards on public events page (title, date, location, image)
- Facebook timeline embed below for social proof
- Facebook events embed if working (needs debugging)
- *Dashboard event management deferred to next session*

### Frontend Fixes (This Session)
1. **Content visibility** — ScrollReveal gates content behind JS. Content must be visible by default; animations enhance, not gate.
2. **Framer Motion** — Replace ScrollReveal with `motion` + `whileInView`
3. **Animation inventory:**
   - Hero: staggered fade-up with spring physics (on load)
   - Section headings: gentle slide-up (on scroll)
   - Animal pills: staggered scale-in (on scroll)
   - Service/product cards: fade-up with stagger (on scroll)
   - Gallery images: fade-in with scale (on scroll)
   - Event cards: slide-in alternating (on scroll)
   - Card hover: gentle lift + glow
   - Modal: scale-up with AnimatePresence
4. **Keep existing CSS:** grain overlay, ambient orbs, gradient shimmer, glass cards
5. **Accessibility:** `prefers-reduced-motion: reduce` disables all motion

### Platform Admin Fixes (This Session)
1. **Layout** — Remove duplicate `<html>`/`<body>` from platform-admin layout
2. **Dashboard** — Wire to real Payload data (tenant count, user count, API key count, inquiry count)
3. **Clients page** — Fetch real tenants from Payload, display dynamically

## Architecture

```
Public Site (moonlight-farm, port 3002)
├── Framer Motion animations (organic + warm)
├── Gallery → fetches from Platform API
├── Events → CMS events cards + Facebook embed
└── All other pages → static content with animations

Platform (port 3003)
├── Payload CMS (backend engine, multi-tenant)
├── Super Admin Dashboard → wired to real data
├── Client Dashboard → Photos + Events (next session)
└── API → /api/v1/[tenant]/[collection]
```

## Deferred to Next Session
- Custom client dashboard UI (photo drag-drop grid, event forms)
- Facebook embed debugging
- Client login/auth flow for custom dashboard
- Additional tenant onboarding refinements
