# Business Builders Platform

A self-hosted, multi-tenant CMS platform built with Payload CMS v3 and Next.js 15. Lets paying clients securely edit their own React websites via API.

## Architecture

```
business-builders-platform/
├── apps/
│   ├── platform/                  # Payload CMS + Admin + API (port 3002)
│   └── client-sites/
│       └── moonlight-farm/        # First client site (port 3001)
├── packages/
│   └── cms-client/                # @business-builders/cms-client NPM package
└── docker/
    └── docker-compose.yml         # PostgreSQL + Redis
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CMS:** Payload CMS v3 (3.77.0)
- **Database:** PostgreSQL 16
- **Multi-tenant:** `@payloadcms/plugin-multi-tenant`
- **Styling:** Tailwind CSS v4
- **Monorepo:** Turborepo + pnpm workspaces
- **Email:** Resend
- **E-Signature:** Dropbox Sign (HelloSign)

## Prerequisites

- Node.js >= 20
- pnpm >= 10
- Docker & Docker Compose

## Quick Start

### 1. Clone and install

```bash
git clone <repo-url>
cd business-builders-platform
pnpm install
```

### 2. Environment variables

```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Start infrastructure

```bash
# Start PostgreSQL and Redis
cd docker && sudo docker compose up -d && cd ..
```

### 4. Build the CMS client package

```bash
pnpm build:cms-client
```

### 5. Run database migrations

```bash
pnpm db:migrate
```

### 6. Seed initial data

```bash
pnpm db:seed
```

This creates:
- Super admin account
- Moonlight Farm tenant with all collections populated
- Client admin account for Jesse
- API key for the client site

### 7. Start development servers

```bash
# Both apps simultaneously
pnpm dev

# Or individually
pnpm dev:platform    # http://localhost:3002
pnpm dev:moonlight   # http://localhost:3001
```

## Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@business-builder.online | admin123! |
| Client Admin | moonlightrunfarmllc@gmail.com | moonlight2024! |

**Change these immediately in production.**

## Admin Panel

Access the Payload CMS admin at: `http://localhost:3002/admin`

## Adding a New Client

1. Log into the super admin panel at `/dashboard`
2. Navigate to `/clients/new`
3. Fill in business name, owner email, and site type
4. The system automatically creates:
   - Tenant record
   - Client admin user account
   - API key
   - Default collections based on site type template
   - Welcome email with credentials

## Client Site Integration

Install the CMS client package in any React/Next.js site:

```bash
npm install @business-builders/cms-client
```

Add environment variables:

```env
BB_API_URL=http://localhost:3002
BB_API_KEY=client_xxxxxxxxxxxx
BB_TENANT_ID=moonlight-farm
```

Use in components:

```tsx
import { BBCMSProvider, useServices, useGallery } from '@business-builders/cms-client'

// Wrap app in provider
<BBCMSProvider apiUrl={process.env.BB_API_URL} apiKey={process.env.BB_API_KEY} tenantId={process.env.BB_TENANT_ID}>
  <App />
</BBCMSProvider>

// Use hooks in components
const { data: services, loading } = useServices()
const { data: gallery } = useGallery({ category: 'cattle' })
```

### Server-side (SSR)

```tsx
import { getServices, getGallery } from '@business-builders/cms-client/server'

export default async function Page() {
  const services = await getServices()
  const gallery = await getGallery()
  // ...
}
```

### Clean Removal

```bash
npm uninstall @business-builders/cms-client
# Remove BB_API_URL, BB_API_KEY, BB_TENANT_ID from .env
# Site falls back to static content — no broken imports
```

## Revoking Client Access

1. Go to super admin panel → Clients
2. Click "Suspend" on the client
3. Their API key is immediately revoked
4. Client site gracefully degrades to static/default content

## API Endpoints

All tenant-scoped endpoints require Bearer token authentication:

```
GET  /api/v1/{tenant}/{collection}?limit=50&page=1&sort=-createdAt
POST /api/v1/{tenant}/inquiry-submissions
POST /api/auth (login)
POST /api/api-keys (create/revoke — super admin only)
POST /api/onboarding (create tenant — super admin only)
```

## Site Type Templates

| Template | Description |
|----------|-------------|
| Farm / Agriculture | Gallery, services, events, products, animal sales, inquiry config |
| Contractor / Trade | Services, gallery, testimonials, quote requests |
| Restaurant / Food | Menu, gallery, events, reservations |
| General Business | Pages, services, gallery, testimonials |

## Production Deployment

### Docker

```bash
# Build all apps
pnpm build

# Or use Docker
docker build -f apps/platform/Dockerfile -t bb-platform .
docker build -f apps/client-sites/moonlight-farm/Dockerfile -t bb-moonlight .
```

### Environment Variables (Production)

```env
DATABASE_URL=postgresql://user:pass@host:5432/business_builders
PAYLOAD_SECRET=<generate-a-strong-secret>
RESEND_API_KEY=re_xxxxxxxxxxxx
REDIS_URL=redis://host:6379
NEXT_PUBLIC_PLATFORM_URL=https://cms.business-builder.online
```

## Project Structure

### Collections (15 total)

All tenant-scoped via multi-tenant plugin:

| Collection | Purpose |
|------------|---------|
| Tenants | Client organizations |
| Users | Auth with roles (super_admin, client_admin, client_editor) |
| ApiKeys | Hashed API key storage |
| Pages | CMS-editable page content |
| Services | Service listings |
| Gallery | Image gallery with categories |
| Events | Manual + Facebook events |
| Products | Product catalog |
| Testimonials | Client reviews |
| Team | Staff profiles |
| Documents | PDFs for e-signature |
| InquiryFlowConfig | CMS-driven inquiry wizard config |
| InquirySubmissions | Stored inquiry form submissions |
| Media | Upload collection |
| SiteSettings | Per-tenant site configuration |

## License

Private — Business Builders Platform
