# Mundial 2026 — Predictions App

Juego privado de predicciones para el Mundial 2026. Los usuarios entran sin email/password, arman un perfil con avatar de jugador, cargan predicciones de partidos y picks generales del torneo, y compiten en un leaderboard global.

---

## 🧱 Stack Técnico

```
Cliente
├── Next.js 16 (App Router)
├── React 19
├── Zustand              → estado global (predicciones en curso, UI state)
├── React Hook Form       → manejo de formularios
├── Zod                   → validación de schemas (cliente + servidor)
├── Tailwind CSS 4
├── Radix UI (react-slot) → primitives accesibles
├── lucide-react          → iconografía
└── flag-icons / country-flag-icons → banderas de selecciones

Backend
├── Next.js Server Actions / Route Handlers
├── Prisma ORM 6.19       → acceso a datos + migraciones
└── zod-prisma-types      → generación de schemas Zod desde Prisma

Base de Datos
├── PostgreSQL (Supabase)
└── Prisma Migrate        → versionado de schema

Auth
└── Supabase Anonymous Auth (@supabase/ssr + @supabase/supabase-js)
    → users.id = auth.users.id, sin tabla custom de sesiones

Tooling
├── pnpm                  → package manager
├── TypeScript (strict)
├── ESLint 9
├── Vitest                → testing
└── ts-node               → scripts utilitarios
```

> **Nota:** el proyecto no depende de ninguna API externa de datos (ej. API-Football). Equipos, jugadores, fixtures y resultados se cargan y actualizan manualmente vía seeds y scripts propios.

---

## 🏗️ Arquitectura del Proyecto

Organización feature-based, con route groups de Next.js para separar zonas públicas, autenticadas y admin.

```
src/
├── app/
│   ├── (public)/        → landing, login, create-user
│   ├── (auth)/           → predictions, leaderboard, profile
│   └── admin/             → panel de administración (carga manual de resultados)
│
├── features/
│   ├── auth/              → actions, hooks, schemas, utils
│   ├── predictions/        → components (groups, knockout, tournament), store, models
│   ├── leaderboard/         → actions, components
│   ├── profile/              → actions, queries, data
│   ├── admin/                 → gestión de matches, knockout, tournament
│   └── landing/                 → componentes de landing
│
├── server/
│   ├── scoring/            → motor de cálculo de puntos
│   └── leaderboard/         → recálculo de ranking global
│
├── lib/supabase/            → clientes Supabase (server/browser)
└── shared/
    ├── components/ui         → design system propio
    ├── constants, data, utils

prisma/
├── migrations/                → historial de schema (init, knockout fields)
├── seed/                      → carga manual de teams, players, matches
└── queries/                   → queries reutilizables
```

Cada `feature` encapsula sus propias `actions` (server actions), `components` y lógica de dominio — evita un `src/api` centralizado y mantiene el acoplamiento bajo entre módulos.

---

## 🗃️ Modelo de Datos

Entidades principales (Postgres vía Prisma):

```
users
├── id (uuid, = auth.users.id)
├── name (único)
├── avatar_player_id → players
├── recovery_key       → recuperación de cuenta anónima
└── name/avatar_updated_at → rate-limit de 1 cambio por día

teams ── players (1:N)

matches
├── home_team_id / away_team_id / winner_team_id → teams
├── phase (GROUP, ROUND_OF_16 … FINAL)
├── group / bracket   → ubicación en el fixture
├── status (SCHEDULED | FINISHED)
└── score_home / score_away → carga manual de admin

match_predictions
├── (user_id, match_id) único
├── predicted_home / predicted_away
├── predicted_penalty_winner_id → definición por penales en KO
├── points / exact_hit / result
└── inmutable post-submit

tournament_predictions (1 por usuario)
├── champion / runner_up / final_home / final_away
├── surprise_team / disappointment_team
└── mvp / golden_boot / best_goalkeeper / revelation_player

tournament_results       → resolución oficial (carga manual admin)
leaderboard_daily         → snapshot de ranking global (recalculable)
```

**Reglas clave del dominio:**

- Predicciones de partido y de torneo son **inmutables** una vez enviadas.
- Cerrar un partido (admin) dispara el motor de scoring y el recálculo del leaderboard.
- El leaderboard es único y global, ordenado por `total_points → exact_hits → name`.
- Scoring de partidos: 5 pts resultado exacto / 3 pts ganador o empate correcto / 0 pts errado.
- Scoring de torneo: entre 8 y 20 pts por pick, según categoría.

---

## ⚙️ Scripts Disponibles

```bash
pnpm dev                  # entorno de desarrollo
pnpm build                 # prisma generate + next build
pnpm typecheck               # chequeo de tipos
pnpm test                     # vitest

pnpm db:migrate                 # nueva migración (dev)
pnpm db:generate                  # regenerar prisma client
pnpm db:seed                        # carga manual de teams/players/matches
pnpm db:seed:knockout                 # seed de fase eliminatoria
pnpm db:seed:matches                    # actualización manual de fixture
```
