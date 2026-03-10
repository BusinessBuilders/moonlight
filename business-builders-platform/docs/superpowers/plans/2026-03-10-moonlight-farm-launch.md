# Moonlight Run Farm — Launch Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy Moonlight Run Farm (moonlightrunfarm.com) onto the Business Builders VPS with real logo, gallery+events wired to Payload CMS, and full SSL — without touching any existing live sites.

**Architecture:** Next.js 15 frontend (port 3002) + Payload CMS admin (port 3003) + PostgreSQL on the same VPS (66.42.116.215). Nginx adds two NEW virtual host configs. PM2 manages both Node processes alongside existing ones.

**Tech Stack:** Next.js 15, Payload CMS v3, PostgreSQL, pnpm workspaces, Turborepo, PM2, Nginx, Certbot (Let's Encrypt)

---

## ⚠️ CRITICAL SAFETY RULES — READ BEFORE TOUCHING ANYTHING ON THE VPS

```
THE VPS IS A LIVE PRODUCTION SERVER.
EXISTING SITES ON THIS SERVER MUST NEVER GO DOWN.

RUNNING PROCESSES — DO NOT TOUCH:
  - PM2 id=0: jsm-backend     (port 3001) — JSM Compliance backend
  - PM2 id=1: business-builder (port 3000) — Business Builder Next.js

NGINX RULES:
  - NEVER edit or delete existing files in /etc/nginx/sites-available/
  - NEVER run: sudo systemctl restart nginx
  - ALWAYS run: sudo nginx -t   BEFORE any nginx change
  - ALWAYS run: sudo systemctl reload nginx   (graceful — zero downtime)
  - ONLY create NEW config files for new domains

CERTBOT RULES:
  - ONLY run certbot for NEW domains: moonlightrunfarm.com, www.moonlightrunfarm.com, admin.moonlightrunfarm.com
  - NEVER run certbot --nginx on existing server blocks

POSTGRESQL RULES:
  - NEVER touch existing databases
  - Create a NEW database: moonlight
  - Create a NEW user: moonlight

PM2 RULES:
  - NEVER run: pm2 delete, pm2 stop, pm2 restart on id=0 or id=1
  - ONLY add NEW processes for moonlight-farm and moonlight-cms
```

---

## Repo & File Reference

```
business-builders-platform/
├── apps/
│   ├── platform/                          # Payload CMS — runs on port 3003
│   │   ├── package.json                   # MODIFY: add -p 3003 to start script
│   │   ├── payload.config.ts              # READ: understand collections/CORS
│   │   └── payload/collections/Gallery.ts # READ: verify public access
│   └── client-sites/moonlight-farm/       # Next.js frontend — runs on port 3002
│       ├── package.json                   # MODIFY: change port 3001 → 3002
│       ├── next.config.mjs                # MODIFY: add admin.moonlightrunfarm.com image domain
│       ├── public/                        # ADD: logo.png (processed, transparent bg)
│       ├── components/layout/Header.tsx   # MODIFY: replace "M" placeholder with real logo
│       └── components/gallery/GalleryGrid.tsx  # READ ONLY: already wired to Payload ✅
└── docs/superpowers/plans/
    └── 2026-03-10-moonlight-farm-launch.md  # this file
```

**Key insight:** `GalleryGrid.tsx` already fetches from `NEXT_PUBLIC_PLATFORM_URL/api/gallery`. No gallery code changes needed — just set the env var and get Payload running. Events page uses Facebook embed widgets (no API key needed). Both are ready.

---

## Chunk 1: Local Code Changes

### Task 1: Process Logo

**Files:**
- Create: `apps/client-sites/moonlight-farm/public/logo.png`

Logo source: `/home/magiccat/Downloads/Moonlight Run Farm, logo final copy/Moonlight Run Farm, logo final copy/Moonlight Run Farm, logo final_OL.png`

- [ ] **Step 1: Remove white background from logo PNG**

```bash
convert \
  "/home/magiccat/Downloads/Moonlight Run Farm, logo final copy/Moonlight Run Farm, logo final copy/Moonlight Run Farm, logo final_OL.png" \
  -fuzz 5% -transparent white \
  /home/magiccat/Nova-Rig/moonlight/business-builders-platform/apps/client-sites/moonlight-farm/public/logo.png
```

- [ ] **Step 2: Verify transparency looks clean**

```bash
# Open the file to visually inspect — check edges of gold crescent and green text
# Look for white fringing. If present, increase fuzz to 8%:
convert \
  "/home/magiccat/Downloads/Moonlight Run Farm, logo final copy/Moonlight Run Farm, logo final copy/Moonlight Run Farm, logo final_OL.png" \
  -fuzz 8% -transparent white \
  /home/magiccat/Nova-Rig/moonlight/business-builders-platform/apps/client-sites/moonlight-farm/public/logo.png
```

Expected: PNG with transparent background, green+gold logo visible.

---

### Task 2: Update Header to Use Real Logo

**Files:**
- Modify: `apps/client-sites/moonlight-farm/components/layout/Header.tsx`

Current header has a placeholder circle with "M" and text. Replace with the actual logo image.

- [ ] **Step 1: Add import at the TOP of Header.tsx (with existing imports)**

Add this line alongside the existing imports at the top of the file:
```tsx
import Image from 'next/image'
```

- [ ] **Step 2: Update the logo section of Header.tsx**

Find this block (lines 43–56):
```tsx
<Link href="/" className="flex items-center gap-3 group">
  <div className="relative w-11 h-11 rounded-full border border-gold-500/30 flex items-center justify-center overflow-hidden group-hover:border-gold-400/60 transition-all duration-500">
    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/15 to-forest-800/30" />
    <span className="relative font-display text-gold-400 text-lg font-bold">M</span>
  </div>
  <div className="hidden sm:block">
    <span className="font-display text-lg text-cream-50 block leading-none tracking-tight font-bold">
      Moonlight Run
    </span>
    <span className="text-[0.65rem] text-gold-400/70 tracking-[0.2em] uppercase font-medium mt-0.5 block">
      Farm LLC
    </span>
  </div>
</Link>
```

Replace with:
```tsx
import Image from 'next/image'

// Replace the Link block with:
<Link href="/" className="flex items-center group">
  <Image
    src="/logo.png"
    alt="Moonlight Run Farm"
    width={180}
    height={68}
    className="h-12 w-auto transition-opacity duration-300 group-hover:opacity-90"
    priority
  />
</Link>
```

- [ ] **Step 3: Remove the unused text-only name block**

The `hidden sm:block` div with "Moonlight Run / Farm LLC" text is replaced by the logo image — remove it.

- [ ] **Step 4: Commit**

```bash
cd /home/magiccat/Nova-Rig/moonlight/business-builders-platform
git add apps/client-sites/moonlight-farm/public/logo.png
git add apps/client-sites/moonlight-farm/components/layout/Header.tsx
git commit -m "feat: replace placeholder logo with real Moonlight Run Farm logo"
```

---

### Task 3: Fix Port Numbers

**Files:**
- Modify: `apps/client-sites/moonlight-farm/package.json` (port 3001 → 3002)
- Modify: `apps/platform/package.json` (add -p 3003 to start script)
- Modify: `apps/platform/payload.config.ts` (add localhost:3002 to CORS)

Port 3001 is taken by jsm-backend. Port 3000 is taken by business-builder.

- [ ] **Step 1: Update moonlight-farm ports**

In `apps/client-sites/moonlight-farm/package.json`, change:
```json
"dev": "next dev --turbopack -p 3001",
"start": "next start -p 3001",
```
To:
```json
"dev": "next dev --turbopack -p 3002",
"start": "next start -p 3002",
```

- [ ] **Step 2: Update platform start port**

In `apps/platform/package.json`, change:
```json
"start": "next start",
```
To:
```json
"start": "next start -p 3003",
```

- [ ] **Step 3: Fix CORS in payload.config.ts**

In `apps/platform/payload.config.ts`, the CORS array currently allows `localhost:3001`. After the port change, the moonlight-farm frontend runs on `localhost:3002`. Update:

```ts
cors: [
  'http://localhost:3001',   // ← remove this line
  'http://localhost:3002',   // ← add this line
  'http://localhost:3000',
  process.env.NEXT_PUBLIC_CLIENT_URL || '',
].filter(Boolean),
```

- [ ] **Step 4: Commit**

```bash
git add apps/client-sites/moonlight-farm/package.json apps/platform/package.json apps/platform/payload.config.ts
git commit -m "fix: assign dedicated ports — moonlight-farm:3002, platform:3003 — fix CORS"
```

---

### Task 4: Add Production Image Domain to Next.js Config

**Files:**
- Modify: `apps/client-sites/moonlight-farm/next.config.mjs`

Gallery images are served from Payload CMS. In production, Payload runs at `admin.moonlightrunfarm.com`. Next.js `<Image>` requires the domain to be whitelisted.

- [ ] **Step 1: Add admin.moonlightrunfarm.com to remotePatterns**

Current `next.config.mjs`:
```js
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
}
```

Replace with:
```js
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'admin.moonlightrunfarm.com' },
    ],
  },
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/client-sites/moonlight-farm/next.config.mjs
git commit -m "feat: allow gallery images from admin.moonlightrunfarm.com"
```

---

### Task 5: Create .env.example Files

**Files:**
- Create: `apps/client-sites/moonlight-farm/.env.example`
- Create: `apps/platform/.env.example`

These guide the VPS setup. The actual `.env.local` files are NOT committed.

- [ ] **Step 1: Create moonlight-farm .env.example**

```bash
# apps/client-sites/moonlight-farm/.env.example
NEXT_PUBLIC_PLATFORM_URL=https://admin.moonlightrunfarm.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
BB_API_URL=http://localhost:3003
BB_API_KEY=bb_xxxxxxxxxxxxxxxxxxxx
BB_TENANT_ID=moonlight-farm
```

- [ ] **Step 2: Create platform .env.example**

```bash
# apps/platform/.env.example
DATABASE_URL=postgresql://moonlight:CHANGE_ME@localhost:5432/moonlight
PAYLOAD_SECRET=CHANGE_ME_32_CHAR_RANDOM_STRING
NODE_ENV=production
NEXT_PUBLIC_CLIENT_URL=https://moonlightrunfarm.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

- [ ] **Step 3: Ensure .env files are gitignored**

```bash
# Verify .gitignore has these entries — add if missing:
grep -q "\.env\.local" /home/magiccat/Nova-Rig/moonlight/.gitignore || echo ".env.local" >> /home/magiccat/Nova-Rig/moonlight/.gitignore
grep -q "\.env$" /home/magiccat/Nova-Rig/moonlight/.gitignore || echo ".env" >> /home/magiccat/Nova-Rig/moonlight/.gitignore
```

- [ ] **Step 4: Commit**

```bash
git add apps/client-sites/moonlight-farm/.env.example apps/platform/.env.example .gitignore
git commit -m "docs: add .env.example files for both apps"
```

---

### Task 6: Build Verification (Local)

Confirm the build still passes cleanly after all changes.

- [ ] **Step 1: Run full build locally**

```bash
cd /home/magiccat/Nova-Rig/moonlight/business-builders-platform
pnpm build:moonlight
```

Expected output ends with:
```
Tasks:    2 successful, 2 total
```

- [ ] **Step 2: Fix any TypeScript or build errors before pushing**

- [ ] **Step 3: Push to GitHub**

```bash
cd /home/magiccat/Nova-Rig/moonlight
git push origin main
```

---

## Chunk 2: VPS Infrastructure

> All commands run via SSH: `ssh linuxuser@66.42.116.215`
> Prefix node/npm/pnpm commands with: `source ~/.nvm/nvm.sh &&`

### Task 7: Install pnpm on VPS

- [ ] **Step 1: Install pnpm globally**

```bash
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && npm install -g pnpm@10.6.2"
```

- [ ] **Step 2: Verify**

```bash
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && pnpm --version"
```

Expected: `10.6.2`

---

### Task 8: Install and Configure PostgreSQL

- [ ] **Step 1: Install PostgreSQL**

```bash
ssh linuxuser@66.42.116.215 "sudo apt-get update && sudo apt-get install -y postgresql postgresql-contrib"
```

- [ ] **Step 2: Enable and start PostgreSQL service**

```bash
ssh linuxuser@66.42.116.215 "sudo systemctl enable postgresql && sudo systemctl start postgresql"
```

- [ ] **Step 3: Create the moonlight database user**

```bash
ssh linuxuser@66.42.116.215 "sudo -u postgres psql -c \"CREATE USER moonlight WITH PASSWORD 'CHOOSE_A_STRONG_PASSWORD_HERE';\""
```

⚠️ Replace `CHOOSE_A_STRONG_PASSWORD_HERE` with a real password. Save it — needed in .env.

- [ ] **Step 4: Create the moonlight database**

```bash
ssh linuxuser@66.42.116.215 "sudo -u postgres psql -c \"CREATE DATABASE moonlight OWNER moonlight;\""
```

- [ ] **Step 5: Verify connection**

```bash
ssh linuxuser@66.42.116.215 "sudo -u postgres psql -c \"\\l\"" | grep moonlight
```

Expected: `moonlight | moonlight | UTF8 ...`

---

### Task 9: Clone Repo and Install Dependencies on VPS

- [ ] **Step 1: Clone the moonlight repo**

```bash
ssh linuxuser@66.42.116.215 "git clone https://github.com/SuperNovaRobot/moonlight.git /home/linuxuser/moonlight"
```

- [ ] **Step 2: Confirm you are on the latest commit (all local changes pushed before this step)**

```bash
ssh linuxuser@66.42.116.215 "cd /home/linuxuser/moonlight && git log --oneline -5"
```

Verify the top commit matches `git log --oneline -5` on your local machine. If behind, run:
```bash
ssh linuxuser@66.42.116.215 "cd /home/linuxuser/moonlight && git pull origin main"
```

- [ ] **Step 3: Install dependencies**

```bash
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && cd /home/linuxuser/moonlight/business-builders-platform && pnpm install"
```

Expected: `Done in Xs using pnpm vX.X.X`

---

### Task 10: Create .env Files on VPS

- [ ] **Step 1: Create platform .env**

```bash
ssh linuxuser@66.42.116.215 "cat > /home/linuxuser/moonlight/business-builders-platform/apps/platform/.env << 'EOF'
DATABASE_URL=postgresql://moonlight:YOUR_DB_PASSWORD@localhost:5432/moonlight
PAYLOAD_SECRET=REPLACE_WITH_32_CHAR_RANDOM_STRING
NODE_ENV=production
NEXT_PUBLIC_CLIENT_URL=https://moonlightrunfarm.com
RESEND_API_KEY=YOUR_RESEND_KEY_HERE
EOF"
```

To generate a secure PAYLOAD_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

- [ ] **Step 2: Create moonlight-farm .env.local**

```bash
ssh linuxuser@66.42.116.215 "cat > /home/linuxuser/moonlight/business-builders-platform/apps/client-sites/moonlight-farm/.env.local << 'EOF'
NEXT_PUBLIC_PLATFORM_URL=https://admin.moonlightrunfarm.com
RESEND_API_KEY=YOUR_RESEND_KEY_HERE
BB_API_URL=http://localhost:3003
BB_TENANT_ID=moonlight-farm
EOF"
```

Note: `BB_API_KEY` is added after creating the Moonlight tenant in Payload (Task 11 Step 5).

---

### Task 11: Initialize Payload CMS Database + Create Moonlight Tenant

Payload uses `push: false` in production (migrations required). For a fresh database, we use a one-time init approach.

- [ ] **Step 1: Temporarily set NODE_ENV to development for initial schema push**

Edit the platform .env to temporarily set `NODE_ENV=development`, run Payload once to push schema, then reset.

```bash
ssh linuxuser@66.42.116.215 "sed -i 's/NODE_ENV=production/NODE_ENV=development/' /home/linuxuser/moonlight/business-builders-platform/apps/platform/.env"
```

- [ ] **Step 2: Build the platform app**

```bash
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && cd /home/linuxuser/moonlight/business-builders-platform && pnpm build:platform"
```

Expected: build completes successfully.

- [ ] **Step 3: Start platform temporarily to push schema (runs in foreground, Ctrl+C after "Ready")**

```bash
ssh -t linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && cd /home/linuxuser/moonlight/business-builders-platform && pnpm --filter @business-builders/platform run start"
```

Wait for `✓ Ready` message, then Ctrl+C. Payload will have pushed the full schema to PostgreSQL.

- [ ] **Step 4: Restore NODE_ENV=production**

```bash
ssh linuxuser@66.42.116.215 "sed -i 's/NODE_ENV=development/NODE_ENV=production/' /home/linuxuser/moonlight/business-builders-platform/apps/platform/.env"
```

- [ ] **Step 5: Create the moonlight-farm tenant via Payload seed**

```bash
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && cd /home/linuxuser/moonlight/business-builders-platform && pnpm db:seed"
```

If the seed script doesn't create a moonlight-farm tenant automatically, create it manually via the Payload admin UI after PM2 starts the service (Task 12). Navigate to `https://admin.moonlightrunfarm.com/admin`, log in as super_admin, go to Tenants → Create, slug: `moonlight-farm`.

- [ ] **Step 6: Build moonlight-farm frontend**

The frontend needs `NEXT_PUBLIC_PLATFORM_URL` at build time (baked into client bundle).

```bash
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && cd /home/linuxuser/moonlight/business-builders-platform && pnpm build:moonlight"
```

---

### Task 12: Set Up PM2 Processes

Add two new PM2 processes. **Do NOT touch existing processes (id=0, id=1).**

- [ ] **Step 1: Start Payload CMS platform**

```bash
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && cd /home/linuxuser/moonlight/business-builders-platform && pm2 start 'pnpm --filter @business-builders/platform run start' --name moonlight-cms"
```

- [ ] **Step 2: Verify platform is running**

```bash
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && pm2 list"
```

Expected: `moonlight-cms` shows `online` status.

- [ ] **Step 3: Start Moonlight Farm frontend**

```bash
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && cd /home/linuxuser/moonlight/business-builders-platform && pm2 start 'pnpm --filter @business-builders/moonlight-farm run start' --name moonlight-farm"
```

- [ ] **Step 4: Verify both new processes are online**

```bash
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && pm2 list"
```

Expected: 4 total processes — `jsm-backend` (online), `business-builder` (online), `moonlight-cms` (online), `moonlight-farm` (online).

⚠️ If either new process shows `errored`, check logs:
```bash
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && pm2 logs moonlight-cms --lines 50"
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && pm2 logs moonlight-farm --lines 50"
```

- [ ] **Step 5: Quick port check — confirm no conflicts**

```bash
ssh linuxuser@66.42.116.215 "ss -tlnp | grep -E ':(3000|3001|3002|3003)'"
```

Expected: 4 lines, one per port. All occupied, no conflicts.

- [ ] **Step 6: Verify PM2 startup is configured (so all processes survive reboots)**

```bash
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && pm2 startup"
```

If the output shows a command like `sudo env PATH=... pm2 startup systemd -u linuxuser`, run that command. If it says startup is already configured, skip.

- [ ] **Step 7: Save PM2 process list**

```bash
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && pm2 save"
```

---

## Chunk 3: Nginx, SSL, and DNS

> ⚠️ SAFETY FIRST: Every nginx change must pass `sudo nginx -t` before reloading.
> NEVER restart nginx. Use `sudo systemctl reload nginx` only.

### Task 13: Create Nginx Config for moonlightrunfarm.com

**Creates a NEW file only. Never touches existing configs.**

- [ ] **Step 1: Write the new config file**

```bash
ssh linuxuser@66.42.116.215 "sudo tee /etc/nginx/sites-available/moonlightrunfarm.com > /dev/null << 'EOF'
server {
    listen 80;
    server_name moonlightrunfarm.com www.moonlightrunfarm.com;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 60;
    }
}
EOF"
```

- [ ] **Step 2: Create Nginx config for admin.moonlightrunfarm.com**

```bash
ssh linuxuser@66.42.116.215 "sudo tee /etc/nginx/sites-available/admin.moonlightrunfarm.com > /dev/null << 'EOF'
server {
    listen 80;
    server_name admin.moonlightrunfarm.com;

    # Allow large uploads for gallery images
    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 120;
    }
}
EOF"
```

- [ ] **Step 3: Enable both new sites**

```bash
ssh linuxuser@66.42.116.215 "sudo ln -s /etc/nginx/sites-available/moonlightrunfarm.com /etc/nginx/sites-enabled/ && sudo ln -s /etc/nginx/sites-available/admin.moonlightrunfarm.com /etc/nginx/sites-enabled/"
```

- [ ] **Step 4: Test nginx config — MUST PASS before reload**

```bash
ssh linuxuser@66.42.116.215 "sudo nginx -t"
```

Expected: `nginx: configuration file /etc/nginx/nginx.conf test is successful`
If it fails: read the error, fix the new config file, do NOT proceed until this passes.

- [ ] **Step 5: Graceful reload (zero downtime)**

```bash
ssh linuxuser@66.42.116.215 "sudo systemctl reload nginx"
```

---

### Task 14: DNS Setup

Point the domain to the VPS. This is done in the domain registrar's DNS panel.

- [ ] **Step 1: Add DNS records for moonlightrunfarm.com**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` (or `moonlightrunfarm.com`) | `66.42.116.215` | 300 |
| A | `www` | `66.42.116.215` | 300 |
| A | `admin` | `66.42.116.215` | 300 |

- [ ] **Step 2: Wait for DNS propagation (5–30 min)**

Check propagation using Google's DNS (more reliable than local resolver):
```bash
dig @8.8.8.8 moonlightrunfarm.com A +short
dig @8.8.8.8 www.moonlightrunfarm.com A +short
dig @8.8.8.8 admin.moonlightrunfarm.com A +short
```

All three MUST return `66.42.116.215` before running Certbot. Certbot uses its own DNS lookup — if DNS hasn't propagated, the ACME challenge fails.

---

### Task 15: SSL via Certbot (New Domains Only)

**Only runs on new domains. Does NOT touch existing SSL certificates.**

- [ ] **Step 1: Check existing Certbot account email to avoid conflicts**

```bash
ssh linuxuser@66.42.116.215 "sudo certbot certificates"
```

Note the email shown. Use that same email in the next command.

- [ ] **Step 2: Obtain SSL cert for all three new hostnames in one command**

```bash
ssh linuxuser@66.42.116.215 "sudo certbot --nginx -d moonlightrunfarm.com -d www.moonlightrunfarm.com -d admin.moonlightrunfarm.com --non-interactive --agree-tos -m info@business-builder.online"
```

Certbot will:
- Modify ONLY the two new config files (moonlightrunfarm.com and admin.moonlightrunfarm.com)
- Add SSL redirect and certificate paths to those files
- NOT touch any other nginx config

- [ ] **Step 2: Verify nginx still passes test**

```bash
ssh linuxuser@66.42.116.215 "sudo nginx -t && sudo systemctl reload nginx"
```

- [ ] **Step 3: Verify auto-renewal is configured**

```bash
ssh linuxuser@66.42.116.215 "sudo certbot renew --dry-run"
```

Expected: `Congratulations, all simulated renewals succeeded`

---

### Task 16: Smoke Test

Verify everything is live and working end-to-end.

- [ ] **Step 1: Frontend is live**

```bash
curl -sI https://moonlightrunfarm.com | head -5
```

Expected: `HTTP/2 200`

- [ ] **Step 2: Payload CMS admin is live**

```bash
curl -sI https://admin.moonlightrunfarm.com/admin | head -5
```

Expected: `HTTP/2 200`

- [ ] **Step 3: Gallery API is reachable**

```bash
curl -s https://admin.moonlightrunfarm.com/api/gallery?limit=1 | head -c 200
```

Expected: JSON response with `{"docs":[], "totalDocs":0, ...}` (empty but valid)

- [ ] **Step 4: Existing sites still running — confirm no regression**

```bash
curl -sI https://jsmcompliance.com | head -3
curl -sI https://business-builder.online | head -3
```

Expected: both return `HTTP/2 200` — if either fails, the VPS change caused a problem. Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`

- [ ] **Step 5: Verify PM2 all healthy**

```bash
ssh linuxuser@66.42.116.215 "source ~/.nvm/nvm.sh && pm2 list"
```

Expected: all 4 processes showing `online` status.

---

## Post-Launch: Payload CMS Setup (Jesse's First Login)

After the site is live, complete these steps to set up Jesse's admin access:

1. **Navigate to** `https://admin.moonlightrunfarm.com/admin`
2. **Create super admin account** (first run prompts for this)
3. **Create Moonlight Farm tenant** → Tenants → New → Name: "Moonlight Run Farm", Slug: `moonlight-farm`
4. **Create Jesse's admin user** → Users → New → role: `client_admin`, tenant: moonlight-farm
5. **Generate API key** → API Keys → New → tenant: moonlight-farm → copy the key
6. **Add API key to moonlight-farm .env.local** on VPS:
   ```bash
   echo "BB_API_KEY=the_generated_key" >> /home/linuxuser/moonlight/business-builders-platform/apps/client-sites/moonlight-farm/.env.local
   ```
7. **Rebuild + restart moonlight-farm frontend**:
   ```bash
   source ~/.nvm/nvm.sh && cd /home/linuxuser/moonlight/business-builders-platform && pnpm build:moonlight && pm2 restart moonlight-farm
   ```
8. **Jesse uploads first gallery photo** → Gallery → Media section → Upload → verify it appears at `https://moonlightrunfarm.com/gallery`

---

## Environment Variables Reference

### `apps/client-sites/moonlight-farm/.env.local` (on VPS)
```env
NEXT_PUBLIC_PLATFORM_URL=https://admin.moonlightrunfarm.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
BB_API_URL=http://localhost:3003
BB_API_KEY=bb_xxxxxxxxxxxxxxxxxxxx      # add after creating tenant in Payload
BB_TENANT_ID=moonlight-farm
```

### `apps/platform/.env` (on VPS)
```env
DATABASE_URL=postgresql://moonlight:YOUR_PASSWORD@localhost:5432/moonlight
PAYLOAD_SECRET=YOUR_32_CHAR_RANDOM_STRING
NODE_ENV=production
NEXT_PUBLIC_CLIENT_URL=https://moonlightrunfarm.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```
