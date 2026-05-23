# 05 - Delivery & Quality

> **Cómo aseguramos la calidad y cómo salimos al mercado.**  
> Este documento cubre la estrategia de testing, el plan de desarrollo por sprints, y el plan de lanzamiento.

---

## 16. Testing Strategy

### TESTING PHILOSOPHY

High-confidence, low-maintenance, and strictly focused on critical paths.

---

## TESTING STACK

**Vitest** (Unit/Integration) + **Playwright** (Minimal E2E) + **Zod**

---

## CRITICAL UNIT TEST PRIORITIES (The Core Product)

Absolute focus on pure business logic functions via Vitest:

1. **Scoring System:** Validating correct point distribution (0, 3, 5 pts)
2. **Match Locking Logic:** Ensuring predictions reject submissions when `currentTime >= match.starts_at`
3. **Leaderboard Calculations:** Testing ranking sorting and `exact_scores_count` tiebreakers

---

## FRONTEND & COMPONENT TESTING

**Minimal component testing:** UI components are presentational ("dumb"). Logic is decoupled in hooks, reducing the need for heavy component unit tests.

---

## E2E PLAYWRIGHT STRATEGY (Critical Paths Only)

No visual regression or complex multi-browser matrices. Test only **3 critical flows:**

1. **User creation** (Anonymous auth + local users row)
2. **Submit prediction** (Form validation + Server Action trigger)
3. **View leaderboard** (Render global rank)

---

## EXTERNAL API & DATABASE MOCKING

**100% Mocked:** No real API-Football or live database connections during tests. Uses local static JSON fixtures for predictable testing environments.

---

## TEST STRUCTURE

**Co-located:** Tests live inside their respective feature folders (e.g., `features/predictions/__tests__`).

---

## TESTING PRIORITIES

1. Scoring and leaderboard reliability
2. Prediction validation accuracy
3. Fast execution & low maintenance

---

## 22. Sprint & Development Plan

### DEVELOPMENT PHILOSOPHY

Feature-by-feature implementation with architectural and data foundations built first.

**Core Priority:** Predictions, Leaderboard, and Scoring. Delay animations, analytics, and admin UI polish.

---

## PHASE 1 — FOUNDATION

- Setup Next.js (App Router), FSD folder structure, and lib initializations (Supabase, Prisma, Env)
- Install Shadcn UI, Zustand, and TanStack Query
- Build global mobile navigation layout

---

## PHASE 2 — DATABASE & SEEDING (Critical Data Layer)

- Design Prisma schema (enums, relations, keys)
- Run initial migration against Supabase
- Build local seed scripts (`pnpm seed:*`) using mock JSON fixtures for teams, players, and matches

---

## PHASE 3 — AUTH & USER SETUP

- Implement Supabase Anonymous Auth and session cookie middleware
- Create user setup form (username, avatar_player_id) with automated Prisma `users` row insertion

---

## PHASE 4 — FIXTURES MODULE

- Build chronological matches feed grouped by day/phase
- Design presentational match cards with interactive stepper button inputs and reactive lock state UI

---

## PHASE 5 — MATCH PREDICTIONS (Core Gameplay Loop)

- Implement frontend Hook Form + Zod schema
- Build Server Action handling submission
- Enforce rigid server-side locking verification (`currentTime >= match.starts_at`) inside the action

---

## PHASE 6 — TOURNAMENT PREDICTIONS

- Build long-term pick forms (Champion, Golden Boot, etc.) locked strictly by tournament start date

---

## PHASE 7 — GLOBAL LEADERBOARD

- Render classic league ranking standings using cached query state
- Implement column mappings for points, `exact_scores_count`, and daily visual MVP badges

---

## PHASE 8 — SCORING & RECALCULATION ENGINE (Critical Logic)

- Write core math services evaluating prediction points (0, 3, or 5 pts)
- Code the complete Global Leaderboard atomic recalculation trigger via Prisma

---

## PHASE 9 — API-FOOTBALL INTEGRATION

- Create `FootballApiProvider` abstraction layer to map external JSON payloads to internal schemas
- Replace mock data seeding with real World Cup 2026 fixtures, teams, and player databases

---

## PHASE 10 — ADMIN AUTOMATION & CRONS

- Deploy single daily Vercel Cron Job (03:00 AM) to sync calendar updates
- Create secure admin panel endpoints (`/api/admin/*`) for manual score input and force-recalculation

---

## PHASE 11 — PRODUCTION POLISH & DEPLOY

- Add loading skeletons and global error boundaries
- Run TypeScript/Lint validation checks
- Connect production branch to Vercel for automated pipeline deployment

---

## DAILY WORKFLOW PATTERN

1. Database/Schema
2. Server Action/Logic
3. Presentational UI Component
4. Polish/UX States

---

## 27. Launch Plan (Target: World Cup 2026 Kickoff)

### LAUNCH PHILOSOPHY

High-integrity, stable MVP. Priority is absolute algorithmic accuracy (scoring and locking) over visual polish.

---

## CRITICAL HARD MVP REQUIREMENTS

The application will not launch unless these core pillars function with **zero failures:**

1. **Session Pipeline:** Anonymous user row insertion and reliable browser cookie recovery
2. **Prediction Engine:** Successful batch submission via Server Actions and rigid time-lock enforcement
3. **Ranking Core:** Correct point calculations, tiebreaker execution, and leaderboard sorting
4. **Fail-Safe Operations:** Secure manual admin overrides for matches, scores, and force-recalculations

---

## SOFT LAUNCH & VALIDATION STRATEGY

### Target Group

Closed internal testing phase with **5–10 selected users** before opening access.

### Objectives

- Live-test the core prediction loops
- Evaluate real mobile ergonomics across multiple device sizes
- Audit the state changes of the leaderboard trends in a staging environment

---

## POST-LAUNCH PIPELINE (Delayed Iterations)

The following tasks are **strictly prohibited** from consuming development hours before launch:

- Knockout phase advanced logic (handled post-group stage)
- Trend history charts or complex leaderboard micro-animations
- Metadata, SEO indexation optimizations, or marketing landings (irrelevant for an invite-only utility)

---

## CRON FAILURE & DEGRADATION MITIGATION

### Manual Fallback

If Vercel Cron fails to trigger the automated 03:00 AM daily synchronization, the system relies entirely on the admin secret endpoint (`/api/admin/sync`) to trigger updates on demand.

### API Independence

Once the base tournament fixtures are seeded, the database owns the state. An external API-Football platform collapse will not crash or block the ongoing user prediction game.

---

## ADMINISTRATION & RECOVERY TOOLKIT

The secure `/admin/system` dashboard must provide **4 operational functions** to manage runtime issues:

1. **`Force API Sync`** → Immediate calendar updates
2. **`Manual Score Input`** → Direct override for specific match results
3. **`Recalculate Leaderboard`** → Re-run points mapping service across all user rows
4. **`Database Soft Reset`** → Clear test users/predictions without dropping the match schema

---

## MILESTONE & DEADLINE CALENDAR

**June 7:** Feature Complete. Code freeze on all database models, server components, and layout structures.

**June 8 – June 10:** Buffer Phase. Focus entirely on user-journey edge cases, layout adjustments, and stress-testing the scoring math.

**Launch:** Safe deployment handover into Vercel production environment with a stable data state.

---

## LAUNCH PRIORITIES

1. Score calculation accuracy and point fairness
2. Unbreakable server-side prediction locks
3. Zero-downtime database state recovery via admin secrets
