# 00 - Master Overview: System Interactions

> **El mapa completo: cómo todos los componentes interactúan entre sí.**  
> Este documento muestra el flujo de datos, las dependencias entre módulos, y cómo cada pieza del sistema se conecta con las demás.

---

## Visión General del Sistema

### Arquitectura en Capas

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                       │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  UI Layer   │  │ State Layer  │  │  Server Actions  │   │
│  │  (React)    │→ │ (Zustand +   │→ │  (Mutations)     │   │
│  │             │  │  TanStack)   │  │                  │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (Next.js API)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ Route        │  │ Business     │  │  Prisma Client  │   │
│  │ Handlers     │→ │ Logic        │→ │  (ORM)          │   │
│  │              │  │              │  │                 │   │
│  └──────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              DATABASE (Supabase Postgres)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  users | teams | players | matches | predictions    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│            EXTERNAL SERVICES                                │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ API-Football │  │ Supabase     │  │  Vercel Cron    │   │
│  │ (Data Sync)  │  │ Auth         │  │  (Daily Jobs)   │   │
│  └──────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Flujos de Datos Principales

### 1. FLUJO DE AUTENTICACIÓN

```
User opens app
      ↓
[Middleware] Check Supabase session cookie
      ↓
   ┌─────────────────┐
   │ Session exists? │
   └─────────────────┘
      ↓              ↓
    YES             NO
      ↓              ↓
Restore session   Create anonymous auth
      ↓              ↓
Fetch user data   Create users row (Prisma)
      ↓              ↓
Load app state    Generate recovery_key
      ↓              ↓
  Dashboard      Store in localStorage
                      ↓
                  Dashboard
```

**Interacciones:**

- **Frontend** → Supabase Auth (Cookie check)
- **Supabase Auth** → Middleware (Session validation)
- **Server Action** → Prisma → Postgres (Create user)
- **Prisma** → Frontend (User data hydration)

---

### 2. FLUJO DE PREDICCIONES DE PARTIDO

```
User selects match
      ↓
Opens prediction form
      ↓
Enters scores (stepper buttons)
      ↓
Clicks "Save Predictions"
      ↓
[Frontend] Zod validation
      ↓
   ┌─────────────────┐
   │   Valid data?   │
   └─────────────────┘
      ↓              ↓
    YES             NO
      ↓              ↓
Server Action    Show error
      ↓
[Backend] Check match lock
      ↓
   ┌──────────────────────────┐
   │ currentTime >= starts_at? │
   └──────────────────────────┘
      ↓              ↓
    YES             NO
      ↓              ↓
Reject (locked)  Insert prediction (Prisma)
      ↓              ↓
Show error     Invalidate cache
                     ↓
                Show success
```

**Interacciones:**

- **Frontend** → Zod (Schema validation)
- **Server Action** → Match data (Lock check)
- **Server Action** → Prisma → Postgres (Insert prediction)
- **Server Action** → TanStack Query (Cache invalidation)

---

### 3. FLUJO DE CIERRE DE PARTIDO Y PUNTUACIÓN

```
Admin enters final score
      ↓
[Admin Panel] Submit via Server Action
      ↓
Update match in DB (Prisma)
   - score_home
   - score_away
   - winner_team_id
   - status = "FINISHED"
      ↓
Trigger CALCULATE_MATCH_SCORE
      ↓
For each user prediction:
   ┌─────────────────────────┐
   │ Compare predicted vs    │
   │ actual scores           │
   └─────────────────────────┘
      ↓
   ┌─────────────────────────┐
   │ Exact score?            │ → +5 points, exact_hit = true
   │ Correct winner/draw?    │ → +3 points
   │ Wrong?                  │ → 0 points
   └─────────────────────────┘
      ↓
Update prediction points (Prisma)
      ↓
Trigger UPDATE_GLOBAL_LEADERBOARD
      ↓
Recalculate full leaderboard:
   - Aggregate total_points per user
   - Count exact_scores_count per user
   - Sort by: points DESC, exact_scores DESC
      ↓
Update leaderboard_daily (Prisma)
      ↓
Invalidate frontend cache
      ↓
Users see updated rankings
```

**Interacciones:**

- **Admin Panel** → Server Action (Score submission)
- **Server Action** → Prisma → Postgres (Update match)
- **Scoring Engine** → All predictions (Point calculation)
- **Scoring Engine** → Prisma → Postgres (Update points)
- **Leaderboard Service** → Prisma → Postgres (Recalculate ranks)
- **Backend** → Frontend (Cache invalidation signal)

---

### 4. FLUJO DE SINCRONIZACIÓN CON API EXTERNA

```
Cron trigger (03:00 AM daily)
  OR
Admin manual sync
      ↓
[Sync Service] Call API-Football
      ↓
Fetch latest fixture data:
   - Match dates/times
   - Postponements
   - Team info updates
      ↓
[FootballApiProvider] Map response
      ↓
   ┌─────────────────────────┐
   │ Match exists in DB?     │
   └─────────────────────────┘
      ↓              ↓
    YES             NO
      ↓              ↓
Update dates    Insert new match
(Prisma upsert)  (Prisma create)
      ↓              ↓
Log sync result (api_sync_logs)
      ↓
Return success/failure
```

**Interacciones:**

- **Vercel Cron** → Server Route Handler (Trigger)
- **Route Handler** → API-Football (HTTP request)
- **FootballApiProvider** → Response mapping (JSON → Schema)
- **Sync Service** → Prisma → Postgres (Upsert matches)
- **Sync Service** → Prisma → Postgres (Log sync status)

---

### 5. FLUJO DE LEADERBOARD (Frontend)

```
User opens Leaderboard view
      ↓
[TanStack Query] Check cache
      ↓
   ┌─────────────────────────┐
   │ Cache valid (< 12h)?    │
   └─────────────────────────┘
      ↓              ↓
    YES             NO
      ↓              ↓
Render from cache  Fetch from DB
                      ↓
                [Server Component] Query Prisma
                      ↓
                Fetch leaderboard_daily
                   - user_id
                   - total_points
                   - exact_hits
                   - rank
                      ↓
                Return to frontend
                      ↓
                Cache response (localStorage)
                      ↓
                Render leaderboard table
```

**Interacciones:**

- **Frontend** → TanStack Query (Cache check)
- **Server Component** → Prisma → Postgres (Fetch leaderboard)
- **TanStack Query** → localStorage (Cache persistence)
- **UI Component** → Cached data (Render table)

---

## Mapa de Dependencias entre Módulos

### FOUNDATION → ARCHITECTURE

```
Entities & Relations
      ↓
Database Schema (Prisma)
      ↓
API Design (Server Actions + Routes)
```

**Por qué:** Las entidades definen la estructura de datos, que se mapea directamente al schema de Prisma, que a su vez determina cómo se diseñan las APIs.

---

### ARCHITECTURE → FRONTEND

```
API Design
      ↓
Server Actions (Mutations)
      ↓
Frontend Hooks (useMatchPredictions, useLeaderboard)
      ↓
UI Components (MatchCard, LeaderboardTable)
```

**Por qué:** La arquitectura del backend define los contratos que el frontend consume mediante hooks personalizados que abstraen la lógica de estado.

---

### FRONTEND → DEVOPS

```
UI Components
      ↓
Build Process (Next.js)
      ↓
Deployment (Vercel)
      ↓
Monitoring (Logs)
```

**Por qué:** El código del frontend se compila y despliega, generando logs que se monitorean para detectar errores.

---

### DEVOPS → FOUNDATION

```
Cron Jobs (Daily sync)
      ↓
External API Integration
      ↓
Database Updates (Teams, Matches)
      ↓
Foundation Data (Entities)
```

**Por qué:** Los cron jobs mantienen sincronizados los datos fundacionales del sistema con fuentes externas.

---

## Puntos de Integración Críticos

### 1. PREDICTION LOCKING

**Dónde interactúan:**

- Business Rules (Foundation) → Server Action validation (Architecture) → UI disabled state (Frontend)

**Flujo:**

1. Business Rule define: "Lock cuando `currentTime >= match.starts_at`"
2. Server Action verifica esta condición antes de insertar
3. Frontend muestra UI bloqueada basándose en la misma condición

---

### 2. SCORING CALCULATION

**Dónde interactúan:**

- Scoring System (Foundation) → Scoring Engine (Backend) → Leaderboard Update (Infrastructure) → Cache Invalidation (Frontend)

**Flujo:**

1. Reglas de scoring definen puntos (0, 3, 5)
2. Backend aplica lógica de puntuación
3. Leaderboard se recalcula completamente
4. Frontend invalida cache y muestra datos frescos

---

### 3. SESSION PERSISTENCE

**Dónde interactúan:**

- Auth Strategy (Architecture) → Supabase Auth (External) → Middleware (Backend) → Local Storage (Frontend) → Recovery Key (Foundation)

**Flujo:**

1. Supabase maneja sesión anónima
2. Middleware verifica cookie en cada request
3. Frontend persiste estado de onboarding en localStorage
4. Recovery key en DB permite restaurar sesión perdida

---

### 4. DATA SEEDING

**Dónde interactúan:**

- Database Seed Strategy (Foundation) → Prisma Seed Scripts (Backend) → API-Football (External) → Local JSON Files (DevOps)

**Flujo:**

1. Una vez: fetch API-Football → dump JSON local
2. Seed scripts leen JSON local (no API)
3. Prisma upsert en DB
4. Desarrollo sin consumir quota de API

---

## Diagrama de Estado Global

```
┌─────────────────────────────────────────────────────────────┐
│                    ESTADO DEL SISTEMA                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Database State (Source of Truth)                          │
│  ├── Users & Sessions                                      │
│  ├── Teams & Players (Static after initial seed)          │
│  ├── Matches (Updated by admin + daily cron)              │
│  ├── Predictions (User-generated, immutable after submit) │
│  └── Leaderboard (Derived, recalculated on triggers)      │
│                                                             │
│  Client Cache (TanStack Query + localStorage)              │
│  ├── Leaderboard (12h stale time)                         │
│  ├── Matches (12-24h stale time)                          │
│  ├── Teams & Players (Infinity stale time)                │
│  └── User Predictions (Invalidated on submit)             │
│                                                             │
│  UI State (Zustand)                                         │
│  ├── predictionDrafts (local autosave)                    │
│  ├── uiState (theme, modals, onboarding)                  │
│  └── navigationState (active tab, phase filter)           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Flujo de Datos Completo: User Journey

### Día 1: Usuario Nuevo

```
1. Open app → Anonymous auth created
2. Enter name + pick avatar → Create users row
3. View tournament predictions form → Submit picks
4. Browse matches → Submit group stage predictions
5. View leaderboard → See rank #0 (no points yet)
```

### Día 2-30: Durante el Torneo

```
1. Match starts → Predictions locked automatically
2. Admin closes match → Points calculated
3. Leaderboard recalculates → User sees new rank
4. User checks leaderboard → Sees rank movement (▲/▼)
5. Next phase unlocks → User submits knockout predictions
```

### Final del Torneo

```
1. Champion decided → Admin marks tournament winner
2. Tournament predictions scored → Bonus points added
3. Final leaderboard → User sees final rank
4. Export recovery key → Save for next tournament
```

---

## Consideraciones de Sincronización

### ¿Qué se sincroniza en tiempo real?

**NADA.** No hay WebSockets ni subscriptions.

### ¿Qué se actualiza automáticamente?

- **Cron diario (03:00 AM):** Fixture changes desde API-Football
- **Manual admin:** Match scores y leaderboard recalculation

### ¿Qué requiere refresh manual?

- **Leaderboard:** Pull-to-refresh o esperar invalidación post-scoring
- **Match list:** Cambios de fase visibles tras recarga

---

## Puntos de Fallo y Recuperación

### 1. API-Football falla

**Impacto:** No se pueden sincronizar cambios de fixture  
**Mitigación:** Base de datos local tiene fixture completo, app funciona normalmente  
**Recuperación:** Admin sync manual cuando API vuelve

### 2. Supabase Auth falla

**Impacto:** Nuevos usuarios no pueden crear cuenta  
**Mitigación:** Usuarios existentes siguen autenticados (cookie válida)  
**Recuperación:** Servicio se restaura automáticamente (managed)

### 3. Vercel Cron falla

**Impacto:** No hay sync diario automático  
**Mitigación:** Admin puede ejecutar sync manual  
**Recuperación:** Próximo día cron retry automático

### 4. Scoring Engine error

**Impacto:** Puntos no se calculan correctamente  
**Mitigación:** Admin puede forzar recalculation completo  
**Recuperación:** Logs en Vercel muestran stack trace exacto

---

## Performance Bottlenecks y Optimizaciones

### Bottleneck: Recalcular leaderboard completo

**Solución:** Solo se hace una vez por día o manualmente  
**Optimización:** Small userbase (<100 users) = cálculo instantáneo

### Bottleneck: Fetch inicial de leaderboard

**Solución:** SSR en Server Component  
**Optimización:** Cache agresivo (12h stale time)

### Bottleneck: Render de 64+ match cards

**Solución:** Group by phase, lazy load phases  
**Optimización:** Stepper buttons evitan keyboard popup

---

## Resumen de Interacciones Clave

| Componente A   | Componente B        | Tipo de Interacción | Propósito                 |
| -------------- | ------------------- | ------------------- | ------------------------- |
| Frontend UI    | TanStack Query      | Read cache          | Mostrar datos sin refetch |
| TanStack Query | Server Component    | Fetch data          | Hidratar cache desde DB   |
| Server Action  | Prisma Client       | Write data          | Guardar predicciones      |
| Prisma Client  | Postgres            | SQL queries         | Persistir en DB           |
| Scoring Engine | Leaderboard Service | Trigger recalc      | Actualizar rankings       |
| Admin Panel    | Cron Jobs           | Manual trigger      | Forzar sincronización     |
| Middleware     | Supabase Auth       | Validate session    | Proteger rutas            |
| Seed Scripts   | API-Football        | One-time fetch      | Poblar DB inicial         |

---

## Conclusión

Este sistema funciona como un **flujo unidireccional de datos:**

1. **Foundation** define QUÉ datos existen
2. **Architecture** define CÓMO se mueven esos datos
3. **Frontend** define CÓMO se muestran esos datos
4. **Infrastructure** define DÓNDE viven y CÓMO se mantienen
5. **Delivery** define CUÁNDO y CÓMO se entregan al usuario

Cada capa depende de la anterior, pero está lo suficientemente desacoplada para permitir cambios sin romper el sistema completo.
rf
