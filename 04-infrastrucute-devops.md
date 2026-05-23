# 04 - Infrastructure & DevOps

> **Cómo se despliega, escala y se mantiene sano el sistema.**  
> Este documento cubre caching, deployment, CI/CD, monitoreo, seguridad, performance, manejo de errores, y cron jobs.

---

## 15. Cache & Persistence Architecture (PRISMA + NEXT.JS MATCH)

### CACHE PHILOSOPHY

Client-driven caching, minimal server requests, local-first UX, and safe tolerance for stale data.

### SOURCE OF TRUTH

**Database Dominance:** Your Postgres DB (via Prisma) is the absolute source of truth. API-Football only populates raw data. If the API fails, the application functions perfectly using cached local data.

---

## CACHE ENGINE STRATEGY

### No Redis / Server Caching Layers

Completely unnecessary due to the micro-scale user base.

### Core Engine

**TanStack Query Cache** (Client-side) for active data, combined with **Next.js native fetch caching** for truly static configurations.

---

## CACHE PERSISTENCE & STORAGE

**Engine:** TanStack Query `experimental-createPersister` using `localStorage`

**Stores:**

- Hydrated query caches
- Local UI theme
- Onboarding state
- Local prediction drafts

**REMOVED:** group session hydration

---

## STALE TIME STRATEGY (Ultra-Aggressive)

Data barely changes throughout the day.

- **Teams & Players:** `Infinity` (Fetched once during initialization/static build)
- **Matches & Fixtures:** 12h - 24h
- **Global Leaderboard:** 12h (Recalculated once daily or on manual admin action)

---

## AUTO REFETCH STRATEGY

**Disabled Globally:**

- No `refetchOnWindowFocus`
- No polling intervals
- No reconnect refetching

---

## MANUAL INVALIDATION STRATEGY

Precise, granular invalidation via query keys. No massive cache wipes.

**After User Prediction Submit:**

- Invalidate `["predictions", userId]` only

**After Admin Score Update:**

- Server Action triggers Next.js revalidation
- Client executes `queryClient.invalidateQueries({ queryKey: ["leaderboard"] })` and `["matches"]`

---

## QUERY KEY MAP (Clean & Group-free)

- `["matches", phase]` → Cached per tournament phase
- `["leaderboard"]` → Single global ranking data
- `["predictions", userId]` → Current user's submission history

---

## STATIC VS DYNAMIC DATA

**Static Assets (Build time):**

- Teams
- Players
- Rules
- Initial structural fixtures

**Dynamic Assets (Request/Cache time):**

- Global leaderboard
- Active match scores
- User predictions

---

## OFFLINE STRATEGY (Read-Only)

### Graceful Degradation

If offline, users can open the app and view the fully cached:

- Leaderboard
- Historical matches
- Local drafts stored in `localStorage`

### Limitations

- No offline submission queues
- No background sync
- No complex PWA service workers

---

## DRAFT CACHE

**Local Autosave:** Handled entirely by Zustand + `persist` middleware storing drafts in `localStorage`. Zero database hits until the user clicks the explicit "Submit Predictions" button.

---

## IMAGE CACHE STRATEGY

**Native CDN:** External photo/flag URLs use the browser's native HTTP cache and external CDN headers directly. No custom image proxies.

---

## CACHE PRIORITIES

1. Absolute minimal database and API requests
2. Local-first instant UX
3. Architecture simplicity (No Redis/Memcached)
4. Persistent offline readability

---

## 17. Deployment Architecture (PRISMA + VERCEL FULLSTACK)

### DEPLOYMENT PHILOSOPHY

Single-repo, zero infrastructure cost, and friction-free deployment.

---

## FINAL DEPLOY STACK

- **Frontend & Backend:** Next.js (App Router) monolithic repository
- **Hosting:** Vercel (Auto-deploy via GitHub push)
- **Database:** Supabase Postgres hosted instance
- **ORM:** Prisma Client for database schema, queries, and migrations
- **Auth:** Supabase Auth (Anonymous cookie-based)
- **Cron:** Vercel Cron Jobs (Single daily fallback trigger)

---

## PROJECT STRUCTURE (Feature-Sliced Design / Clean Architecture)

```
src/
├── app/       # Next.js App Router (Rutas y layouts globales)
├── features/  # Módulos de negocio aislados (auth, leaderboard, matches, predictions, users)
│   └── [feature]/  # Components, Hooks, Schemas, Slices, y Types locales
├── shared/    # Componentes visuales genéricos (Shadcn), global Hooks, Utils y Constants
└── lib/       # Inicialización de clientes (prisma.ts, supabase.ts, api-football.ts, env.ts)
```

---

## DATABASE & ORM ROLE

### Supabase Postgres

Provides the production-ready relational database, dashboard interface, and managed auth.

### Prisma

Acts as the absolute interface layer handling:

- Server-side type-safety
- Database migrations
- Queries

**REMOVED:**

- Realtime
- Edge Functions
- Storage buckets (No image uploads, uses external player URLs)

---

## NEXT.JS APPLICATION STRATEGY

### Server Actions

Used for rapid user-facing mutations (e.g., updating user setup, submitting match or tournament predictions)

### API Route Handlers

Used strictly for secured system operations under the `/api` prefix:

- Scoring recalculation
- Cron job endpoints
- Manual admin triggers

---

## ADMIN ACCESS SECURITY

Ultra-simple admin secret header/token verification. No complex Role-Based Access Control (RBAC) database structures or permission tables required for this scale.

---

## MONITORING & BACKUPS

- Standard Vercel Serverless/Cron runtime execution logs
- Basic local `api_sync_logs` table tracking
- Database safety relies entirely on Supabase automated daily platform backups

---

## DEPLOYMENT PRIORITIES

1. Monolithic simplicity (One repo, one deployment)
2. Zero operational hosting cost
3. Lightning-fast development iteration

---

## 18. CI/CD (PRISMA + VERCEL FULLSTACK)

### CI/CD PHILOSOPHY

Automatic, zero-maintenance, single-developer optimized, and focused on maximum shipping speed.

---

## GIT STRATEGY

**Single Branch (`main` only):** No complex Git-flow or `dev` branches. Maybe just another one like `test`.

---

## DEPLOYMENT FLOW

**Automated Pipeline:**

```
Code push to GitHub
→ Triggers Vercel GitHub integration
→ Instantly builds and deploys to production
```

### Preview Environments

Enabled automatically for isolated branch testing before merging critical code changes to `main`.

---

## CI BUILD CHECKS (Blocking Criteria)

The production deployment is blocked if and only if any of the following automated checks fail:

1. `pnpm lint` → Code style check
2. `pnpm typecheck` → Strict TypeScript type compilation check
3. `pnpm build` → Next.js production build verification

---

## TESTING PIPELINE (Speed First)

**REMOVED:** Mandatory testing steps in CI workflows. Playwright and heavy automation tests slow down fast deployment loops.

**Local Execution:** Critical business logic unit tests (scoring, locking, leaderboard sorting) are executed manually in the local environment before pushing code to production.

---

## DATABASE MIGRATIONS FLOW

**Managed Manual Deployments:** Prisma migrations are verified and executed manually from the local environment targeting the live Supabase instance (`prisma migrate deploy`). Much safer and offers total control for a solo project.

---

## SECRET & ENVIRONMENT VARIABLES MANAGEMENT

Centralized securely inside Vercel Dashboard and Supabase configuration panels.

**Critical Env Vars:**

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `API_FOOTBALL_KEY`
- `ADMIN_SECRET`

---

## ROLLBACK & DEVOPS STRATEGY

### Instant Rollbacks

Relies entirely on Vercel's native production deployment rollback to switch back to the last valid build in 2 seconds if a production bug slips through.

### Notifications

None. No Slack, Discord, or email webhooks configured to avoid unnecessary external pipeline alerts.

---

## CI/CD PRIORITIES

1. Fast deployment cycles (Code to production in minutes)
2. Zero DevOps maintenance overhead
3. Basic blocking build guarantees

---

## 19. Monitoring & Logs (PRISMA + VERCEL FULLSTACK)

### MONITORING PHILOSOPHY

Simple, debugging-first, zero-cost oriented, and 100% focused on API quota visibility and error tracing.

---

## MAIN MONITORING STACK

- **Vercel Logs** (Runtime serverless execution logs)
- **Supabase Dashboard** (Database health, connections, and Auth users audit)
- **Custom Database Logs** (Simple table for API-Football tracking)

---

## REMOVED ENTERPRISE INFRASTRUCTURE

No Datadog, Sentry, Grafana, or Prometheus. Completely unnecessary for a short-lived tournament app with a micro-scale user base.

---

## CUSTOM APPLICATION LOGGING

Lightweight console logging using strict log levels (`INFO`, `WARN`, `ERROR`) handled inside Server Actions and Route Handlers:

**Cron Jobs / Admin Sync:** Track start, finish, duration, and completion status

**Scoring Logic:** Track execution timestamps and full leaderboard recalculation status

---

## CRITICAL API-FOOTBALL QUOTA MONITORING

Since API quota is your biggest infrastructure constraint, a dedicated `api_sync_logs` table via Prisma tracks:

- `endpoint` (e.g., /fixtures)
- `status_code` (e.g., 200, 429)
- `requests_used` & `remaining_quota` (Parsed directly from API headers)
- `timestamp`

---

## USER ANALYTICS (Minimal Metrics)

Track basic product engagement markers directly via your Prisma models:

- Active users count (`users` table total rows)
- Total predictions submitted (`match_predictions` table count)

**REMOVED:** Groups created tracking

---

## ADMIN SYSTEM MONITORING STATUS PANEL

A secure dashboard route (`/admin/system`) protected by a simple `ADMIN_SECRET` token header.

**It displays:**

- Last successful API sync timestamp
- Current day's API-Football remaining quota balance
- Last global leaderboard recalculation runtime duration
- Latest production `ERROR` log stack outputs

---

## ALERTING & NOTIFICATIONS

**Disabled:** No real-time WebSockets, Discord webhooks, Slack alerts, or email notification pipelines. If a failure occurs, it degrades gracefully and is inspected manually on the admin panel.

---

## MONITORING PRIORITIES

1. Absolute visibility over API-Football remaining quota
2. Fast and clear error debugging logs
3. Zero implementation cost and zero maintenance overhead

---

## 20. Security Architecture

### SECURITY PHILOSOPHY

Practical, backend-enforced, anti-manipulation focused, and zero-cost friendly.

---

## THE ABSOLUTE PRIORITY: PREDICTION INTEGRITY

**Preventing prediction manipulation after a match starts is the single most critical security requirement.**

If users can tamper with predictions, the leaderboard integrity (the core product) is destroyed.

---

## PREDICTION LOCKING MECHANISM

Frontend UI state is for UX only. The server (Next.js Server Actions) strictly enforces the lock by verifying:

```javascript
if (currentTime >= match.starts_at) throw new Error("Predictions are locked");
```

Right before executing the Prisma query.

---

## DATA ACCESS & SERVER ISOLATION (Prisma Edge)

By utilizing Prisma Client exclusively on the server-side inside Next.js:

- Database connection strings
- Write access
- Your `API_FOOTBALL_KEY`

Are fundamentally hidden from the browser. The frontend never talks directly to Postgres or external APIs.

---

## DATABASE & ROW-LEVEL PROTECTION

### Database Level

Supabase Row Level Security (RLS) remains enabled as a safety net.

### Prisma Query Level

Data ownership is tightly scoped using the active Supabase Auth user ID retrieved from the secure middleware cookies:

```javascript
where: {
  userId: sessionUser.id;
}
```

A user can never update or insert data belonging to another UID.

---

## ADMIN & SYSTEM SECURITY

### Secured Endpoints & Actions

All administrative tasks under `/api/admin/*` and internal Route Handlers require a secret bearer token header (`cron_secret` or `ADMIN_SECRET`).

Any unauthorized trigger returns a flat `401 Unauthorized` or `403 Forbidden`.

### No RBAC

No complex multi-role database tables. A single environment variable secret controls administrative access.

---

## INPUT VALIDATION (Anti-Injection & XSS)

### Zod Everywhere

Every payload hitting a Server Action or Route Handler is strictly parsed against a Zod schema.

### Native Escaping

- React handles UI XSS protection natively
- Prisma parameterizes queries automatically, neutralizing SQL injection vectors out of the box

---

## REMOVED COMPLEXITY (Scale Alignment)

**REMOVED:**

- Session limits
- Group exploit validations (groups no longer exist)
- File upload virus scanning (no local uploads allowed; uses external image URLs)

---

## SECURITY REALITY CHECK

For a short-lived tournament app with:

- Zero monetary transactions
- No sensitive health/financial data
- A micro-scale user base

Vercel and Supabase platform defaults combined with strict server-side validation offer more than enough production-safe protection.

---

## SECURITY PRIORITIES

1. Absolute prediction lock enforcement (Anti-cheat)
2. Server-side API key and secret isolation
3. Robust Zod input validation
4. Low maintenance architecture

---

## 25. Error & Performance Architecture (PRISMA + SSR MATCH)

### PHILOSOPHY

Server-First, mobile-optimized, minimal client-side request overhead, and predictable error boundaries.

---

## FRONTEND ERROR STRATEGY (Graceful Degradation)

### Global Error Boundaries

Configured at the root layout level. If an unhandled client crash occurs, it renders a custom fallback view with a single "Retry" button. Never expose a blank white screen.

### Form Validation Errors

Handled inline via React Hook Form + Zod directly underneath the inputs (e.g., "Username must be at least 3 characters").

### Global Feedback Notifications

Handled via `sonner` toast alerts for server mutations.

**Success:**

- "Predictions saved successfully"
- "Username updated"

**Error:**

- "Connection timeout"
- "Failed to submit prediction"
- "Match already locked"

---

## PERFORMANCE & RENDER STRATEGY (SSR-First)

### Hybrid Architecture

Heavy emphasis on **Server-Side Rendering (SSR)** for initial loads to keep the client JavaScript bundle exceptionally lightweight for mobile devices.

### SSR Core Components

Global Leaderboard and Matches fixture feeds. Data is fetched on the server via Prisma and server-rendered instantly.

### Client-Side Islands

Restricted strictly to interactive forms:

- Prediction inputs
- Theme toggles
- Tabs
- Local draft synchronization

### Component Optimization

No speculative over-optimization. Avoid premature usage of `React.memo`, `useMemo`, or element virtualization.

The app targets **fewer than 100 concurrent users**, making standard React rendering overhead negligible.

---

## ASSET & DATA PREFETCH MANAGEMENT

### Next.js Images

External player photo and team flag URLs are routed through the native `<Image />` component to automatically enforce:

- Lazy-loading
- WebP format conversion
- Browser-level caching

### Query Fetch Retries

TanStack Query global retry configuration is restricted strictly to `retry: 1`. Prevents client loops from spamming Server Actions or Route Handlers during network drops.

### Prefetching Policy

Default Next.js link prefetching is minimized to protect mobile data plans and significantly lower server connection hits.

---

## OFFLINE READABILITY

**Read-Only Persistence:** Leverages the automated TanStack Query local storage persister. If a user loses internet connectivity, they can still view the last cached state of:

- Global leaderboard
- Match fixtures

Form submissions are strictly blocked while offline.

---

## BACKEND ERROR MANAGEMENT

### Isolation

All database connection drops, Zod parsing failures inside Server Actions, and API-Football timeout exceptions are wrapped in `try/catch` blocks.

### Logging

Server failures dump raw stack traces into Vercel runtime logs with accurate context tags:

```
[ERROR] [ScoringEngine] Recalculation failed
```

For immediate debugging.

---

## PERFORMANCE PRIORITIES

1. Mobile load smoothness (Excellent First Contentful Paint)
2. Minimal database and Serverless function execution count
3. Clean, informative visual feedback for network failures

---

## 12. Cron Jobs & Admin Automation

### CRON PHILOSOPHY

Minimal automation, serverless-friendly, and 100% backed by manual admin overrides.

---

## MAIN AUTOMATION STRATEGY (Vercel Cron Jobs)

Only **ONE automated cron job per day** at **03:00 AM** (America/Argentina/Buenos_Aires).

**Purpose:** Safely sync any structural fixture changes (dates/postponements) from the API and calculate a clean daily snapshot of the leaderboard while users sleep.

---

## THE REALITY: MANUAL CONTROL FIRST

Since you control the official results to avoid API errors, the primary data flow is manual via **Admin Server Actions:**

**Action:** Admin enters match score → Updates local DB to "FINISHED" → Triggers point calculation → Triggers Global Leaderboard recalculation instantly.

---

## MATCH LOCKING (Zero Crons)

Completely passive. Implemented via database/code checks:

- **Match Predictions:** Automatically locked when `currentTime >= match.starts_at`
- **Tournament Predictions:** Automatically locked on June 11 at 00:00

---

## API REQUEST STRATEGY

Extremely conservative. Since the app relies on manual closing, external API requests are limited to:

- The initial setup
- The single daily structural sync

Easily stays under **5 requests/day**, protecting any free-tier API quota.

---

## MANUAL ADMIN ACTIONS (Prisma-backed Server Actions)

You will build a basic secured admin panel executing these direct operations:

- **`/admin/matches`** → Input score, set winner_team_id, and set status = "FINISHED" (Triggers cascade scoring)
- **`/admin/recalculate`** → Forces a complete recalculation of the global leaderboard from scratch
- **`/admin/sync-fixture`** → Forces a manual pull from API-Football to populate teams, players, or initial match schedules

---

## DATA RETENTION & CLEANUP

### Sessions

Natural expiration handled entirely by Supabase Auth. No cleanup cron needed.

### History

Permanent retention of:

- All user prediction logs
- Match scores
- Daily rank snapshots

For analytics and transparency.

---

## CRON FAILURE STRATEGY

Fail safely. If the automated 03:00 AM cron fails:

1. It retries once
2. If it fails again, it stops
3. No data is overwritten
4. The app continues to serve the last valid state until you press "Recalculate" manually in your admin panel

---

## AUTOMATION PRIORITIES

1. Manual override dominance (Full control)
2. Ultra-low API usage
3. Simplicity (No complex event-driven cron loops)
4. Zero infra cost
