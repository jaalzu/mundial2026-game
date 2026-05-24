# 03 - Frontend Engineering

> **Acá es donde vos brillás como Frontend. Cómo se construye la interfaz.**  
> Este documento define la arquitectura de estado del cliente, la estructura de carpetas, las decisiones de UI/UX, y el sistema de diseño visual.

---

## 14. Frontend State Architecture (PRISMA + SERVER-FIRST MATCH)

### FRONTEND STATE PHILOSOPHY

Feature-driven organization, strict custom hooks separation, presentational "dumb" UI, and aggressive caching.

### MAIN STATE STACK

**TanStack Query + Zustand + React Hook Form + Zod**

---

## REACT BEST PRACTICES & COMPONENT STRATEGY

### 100% REUSABLE UI PRIMITIVES (Atomic / Design System)

- Reusable primitives (buttons, inputs, dialogs, cards) live in `shared/components/ui`
- Strictly presentational, completely stateless, and decoupled from business rules
- Built using composition patterns to ensure maximum extensibility without breaking props

### DUMB / PRESENTATIONAL COMPONENTS

- Feature components receive data via plain React props
- They do not fetch data, do not call Prisma/Server Actions directly, and do not trigger side effects
- **Job:** Render UI, map arrays, and emit user actions via callbacks (`onClick`, `onSubmit`)

### DECOUPLED BUSINESS LOGIC (Custom Hooks First)

- **ZERO business or server logic inside `.tsx` files**
- All state management, form configurations, mutations, and cache invalidation logic are isolated into highly specialized Custom Hooks (e.g., `useMatchPredictions`, `useGlobalLeaderboard`)
- UI files only import the hook, destructure the data/methods, and bind them to the components
- Modifying backend integration or client state requires changing the hook, never the UI markup

---

## RESPONSIBILITY SPLIT

### TANSTACK QUERY (Client-side Server State)

Handles API cache, query invalidation, client-side loading, and error states for data fetching.

**Examples:** leaderboard, matches, current user predictions

### ZUSTAND (Client-side UI State)

local client drafts and autosave in inputs , just forthat.

**Examples:** predictionDrafts, modalState, onboarding_completed

### REACT HOOK FORM + ZOD

Handles form states, controlled/uncontrolled inputs, and validation flows.

**Used for:** Match/Tournament prediction submissions and user setup form

---

## FEATURE-BASED ARCHITECTURE

Organized by self-contained features. Each feature folder (auth, leaderboard, matches, predictions, users) owns its unique components, custom hooks, schemas, types, and client-side store slices.

### SHARED LAYER

`shared/` → Reusable, cross-app layout components, UI primitives , global hooks, types, constants, and utils.

### GLOBAL STORE STRATEGY

Single global Zustand store really simple
**REMOVED:** `groupSlice`, `sessionSlice` (handled by Supabase Auth cookies / server layout)

---

## QUERY KEY STRATEGY

Strictly flat and predictable keys for clean cache management:

- `["matches", phase]`
- `["leaderboard"]`
- `["predictions", userId]`

---

## CACHE & REFETCH STRATEGY

Aggressive database-only and client caching. Updates happen infrequently.

**DISABLED natively:**

- refetchOnWindowFocus
- polling
- auto-intervals

**Invalidation:** Manual cache invalidation via `queryClient.invalidateQueries` after an Admin update or User prediction submit action.

---

## OPTIMISTIC UPDATES

**NOT USED.** Priority: Simplicity > Complex UI rollbacks. Uses clean loading states/spinners instead.

---

## URL STATE

URL-driven navigation for global tabs and views.

**Examples:** `?phase=groups`, `?tab=leaderboard`

---

## DRAFT SYSTEM (Local Autosave)

Local-only autosave via Zustand persisted state before manual form submission. No background server autosave to minimize requests.

---

## REALTIME STRATEGY

**NO realtime infrastructure** (No WebSockets, no Supabase subscriptions). Unnecessary complexity.

---

## FRONTEND PRIORITIES

1. Extreme Decoupling (Logic completely detached from markup)
2. Modularity (Feature-based separation)
3. Predictable state flow
4. 100% Reusable & composable components

---

## 23. Folder Structure

```
src/
├── app/          # Routing layer (App Router)
├── features/     # Modular business domains
├── shared/       # Reusable agnostic infrastructure
├── server/       # Pure backend-only engines
└── middleware.ts # Global auth/session routing
```

### 1. app/

**Role:** Next.js App Router configuration only. Handles orchestration, layouts, pages, and route groups. No business logic.

**Structure:**

```
app/
├── (auth)/
├── (public)/     # Landing / Home
├── admin/
├── leaderboard/
├── predictions/
├── api/
└── layout.tsx
```

---

### 2. features/

**Role:** Isolated, self-contained business modules. Each feature folder completely owns its domain ecosystem.

**Modules:** `auth`, `users`, `matches`, `predictions`, `leaderboard`, `admin`

**Internal Feature Blueprint (e.g., features/predictions/):**

```
├── actions/      # Next.js Server Actions (Mutations)
├── components/   # Feature-specific UI (MatchCard, PredictionForm)
├── hooks/        # Custom React hooks decoupling UI from state
├── queries/      # TanStack Query hooks (Data fetching)
├── schemas/      # Domain-specific Zod validation schemas
└── types/        # Domain-specific type definitions
```

---

### 3. shared/

**Role:** Global, cross-project infrastructure. Zero specific business rules allowed.

**Structure:**

```
├── components/ui/  # Stateless atomic UI primitives (Shadcn)
├── providers/      # QueryProvider, ThemeProvider wrappers
└── lib/            # Instantiated technical clients (prisma.ts, supabase.ts, env.ts)
```

---

### 4. server/

**Role:** Non-visual backend-only services. Keeps complex server engines detached from the frontend mental model without resorting to microservices.

**Structure:**

```
server/
├── scoring/        # Match scoring and leaderboard math calculators
├── cron/           # Daily sync execution scripts
└── football-api/   # API-Football client wrapper and response mappers
```

---

### 5. prisma/

**Location:** Root directory (`/prisma`)

**Contains:** `schema.prisma`, SQL migrations, and the local `seed.ts` execution file

---

## ARCHITECTURAL RULES & TYPE STRATEGY

### Data Fetching & Mutations

TanStack Queries and Server Actions live inside their respective feature folders, never globally.

### Type Inferences

Zero manual type duplication. Leverage structural definitions directly using:

- Prisma implicit models (`Prisma.UserGetPayload`)
- Zod inference (`z.infer<typeof schema>`)

### File Limit Constrain

Keep a strict **150-250 lines maximum** limit per file across components, actions, and hooks to enforce modular decoupling.

---

## 21. UI / UX Architecture

### UX PHILOSOPHY

Mobile-first, sports-minimalist, lightning-fast interactions, and frictionless layout.

### PRIMARY TARGET PLATFORM

**Mobile-First Design:** 95% of user interactions occur on smartphones. Desktop layout acts as a centered responsive container max-width adaptation, avoiding empty multi-column canvas splits.

---

## MAIN NAVIGATION (Bottom Nav Bar)

Fixed bottom navigation bar for thumb-driven mobile ergonomics with **3 core sections:**

1. **Leaderboard** (Default Landing View) → The tournament ranking drives the primary competitive engagement loop
2. **Predictions** → Split via clean tabs/pills into [Group Predictions] [Tournament Picks] and [ELIMINATORIAS Predictions]
3. **My Stats & Config** → Individual metrics, name/avatar updates, and recovery key access

---

## LEADERBOARD UX (Classic League Standings)

Clean grid inspired by real-world football tables (Premier League/FIFA standings):

**Columns:** Rank (#) | Avatar | Name | Points (PTS) | Trend (+/-)

**Trend System:** Visual indicators (▲ Climbed, ▼ Dropped, • Unchanged) comparing current_rank against previous_rank snapshots.

---

## PREDICTIONS PAGE UX & MATCH CARDS

Scrollable feed grouped chronologically by tournament matchday or knockout phases.

**Match Card Content:**

- Country flags
- Team names
- Match time/date
- User prediction slot
- Lock status indicators

**Score Input Strategy:** Numeric stepper buttons (+ / -). Prevents standard virtual keyboard layout popups on mobile, avoids fat-finger typos, and restricts inputs strictly to valid positive integers.

---

## SUBMISSION & LOCK STATES

### Explicit Save Button

No background server autosave. Users interact with a floating action button that changes states:

`[Save Predictions]` → `[Saving...]` → `[Saved! ✓]`

Reduces database mutation overhead.

### Locked Match UI

Once `currentTime >= match.starts_at`, the card transitions to a visually distinct read-only state:

- Elements fade slightly (lower opacity)
- Inputs are completely disabled
- A subtle lock icon appears

---

## MY STATS & USER MANAGEMENT PANEL

### Profile Customization

NOTHING FOR NOW.

### Analytics Widgets

Displaying:

- Total points
- Exact prediction count
- Current global rank

ALL TOURNAMENT PREDICTIONS LIKE CHAMPION RUNNER UP GOLDEN BOOT ETC.

### Account Backup Tool

A distinct, secure section displaying the single alphanumeric `recovery_key` with a prominent "Copy Key" utility button so users can restore their anonymous sessions.

---

## UI/UX PRIORITIES

1. Mobile-thumb ergonomic accessibility
2. Absolute visibility over match lock states
3. High-scannability leaderboard layout
4. Lightweight and fast load feel (Micro-sessions optimized)

---

## 26. Mobile Experience Architecture

### MOBILE PHILOSOPHY

Thumb-first ergonomics, quasi-native interface feeling, single-action submission flows, and zero cognitive load.

---

## RESPONSIVE WRAPPING STRATEGY

### Target Base

Built starting from small mobile displays (320px–375px viewports) upward.

### Desktop Adaptability

Renders as a centered responsive container (`max-width: 500px`) with clean side-margins on larger monitors. Avoids wide full-width dashboard layouts, preserving its mobile identity.

### Orientation Constraint

Strict vertical portrait support only. Landscape layout is left to basic browser scaling to avoid viewport responsive overengineering.

---

## NAVIGATION & HEADER LAYOUT

### Fixed Bottom Navigation

Thumb-reachable menu anchoring the 3 core views (Leaderboard, Predictions, and Profile). Ensures immediate view transitions without layout shifts.

### Sticky Top Header

Minimalist branding container showing:

- App title/logo
- Current tournament phase label (e.g., "Group Stage")
- Username

---

## COMPACT DATA VIEWS (No Horizontal Scroll)

### Mobile Standings Table

Optimizes layout width strictly to fit:
`Rank | Avatar | Name | PTS |  Trend`

In a clean, non-wrapping row format. Suppresses sticky header overlaps or floating top-user cards to maintain layout simplicity.

### Predictions Feed

Uses vertical cards grouped cleanly by matchday or phase. Leverages horizontal tab pill selections at the top to navigate between different tournament groups smoothly.

---

## INTERACTION DESIGN & INPUTS

### Score Stepper Buttons

Completely eliminates native virtual keyboard triggers by using numeric stepper buttons (+ / -) for score inputs. Eliminates fat-finger typing errors and removes input overlay obstructions on small screens.

### Controlled Bottom Sheets

Employs standard Shadcn/Radix bottom sheets for complex selections (e.g., picking tournament champion/MVP choices) to mimic native iOS/Android component behavior without true PWA wrapping.

### Pull-to-Refresh

Implemented exclusively on the Leaderboard view using a standard, lightweight loading indicator wrapper. This provides an app-like feedback mechanism where users naturally expect data updates.

---

## THE FLOATING ACTION SAVE BAR

### Single Action Batch Save

Avoids automated inputs-blur server hits. Users edit multiple match scores locally inside the client state, then commit changes globally using a sticky bottom save bar.

### Ergonomics

Strategically placed at the bottom-right zone of the viewport for comfortable one-handed thumb interaction, switching cleanly between:

`[Save]` → `[Saving...]` → `[Saved! ✓]`

Interactive feedback states.

---

## ANIMATION DESIGN SYSTEM

### Minimal Motion Constraints

Restricted to native hardware-accelerated transitions (CSS transforms/opacities) for:

- Bottom-sheet slide-ins
- Page transitions
- Main football loader spinner

Framer Motion is avoided to prevent client-side runtime script inflation.

---

## MOBILE EXPERIENCE PRIORITIES

1. Fluid one-handed accessibility (Bottom navigation and action zones)
2. Keyboardless numeric interaction (Steppers over inputs)
3. Zero layout clutter on narrow viewports

---

## 28. Design System (Geometric Sports Brutalism)

### VISUAL PHILOSOPHY

**Tournament Companion Experience:** Abandon the corporate SaaS dashboard aesthetic. The interface must feel like a premium retro, competitive, and high-energy sports utility.

---

## VISUAL PRINCIPLES & SURFACES

### Hard Geometry

Strict 90-degree squared edges, solid borders using 2px solid and 3px solid for selected items, sharp layouts, and high structural contrast.

**PROHIBITED:**

- Soft corners
- Glassmorphism blur layers
- Pastel color palettes
- Floating soft shadows
- Blurry gradient fills
- Fancy animations

---

## PALETTE STRATEGY (High-Contrast Neon Focus)

The application maintains a deeply dark, neutral baseline. High-vibrancy colors are locked strictly behind critical interactive events or metric highlights to maximize visual impact.

### Neutral Tokens

- Base Background: `1A1A1A`
- Borders: #666666

### Typography Tokens

- Core Text: `#FFFFFF`
- Muted Secondary Text: `#BCBCBC`

### Accent Tokens

- Average green - PRIMARY: `#3CAC3B` FOR PRIMARY
- Hermes: `#2A398D` JUST FOR SOO MUCH LITTLE THINGS.
- Red Torch - for mark things. : `#E61D25`

---

## TYPOGRAPHY SYSTEM

### Display Typeface

Anonymous Pro will be the only font using

will be using regular and bold just to highligh things.

---

## COMPONENT STYLING

### Button Mechanics

Flat, square edge blocks with crisp borders. Hover/Active transitions invert background/text colors instantly instead of mimicking depth.

### Card & Grid Blocks

Every match row, leaderboard item, or navigation slot is built as an explicit geometric container aligned to a strict spacing grid scale:
`4px, 8px, 12px, 16px, 24px, 32px`

---

## NAVIGATION & ICONOGRAPHY

### Thumb Bar

Full solid background block with thick, heavy-stroke Lucide icons. Active routing tabs indicate their selection via a razor-sharp neon bottom border edge or glow.

### Icon Style

Low icon count overall, favoring heavier stroke weights to match the dense typography layout.

---

## FUNCTIONAL MOTION & GRAPHICS

### Animation Constraints

Zero playful, elastic micro-interactions. Transitions use ultra-short duration curves (150ms–200ms) for:

- Snappy tab switches
- Stepper increments
- Instant bottom-sheet slide-ups

### Asset Presentation

Team flags and player profile images utilize clear backgrounds to look like transparent cutouts resting on top of dark geometric sheets, evoking a classic football trading-card layout.

---

## DESIGN SYSTEM PRIORITIES

1. Extreme layout scannability via high typographical hierarchy
2. Absolute geometric edge and padding consistency
3. Intentional neon usage restricted to active user engagement spots
