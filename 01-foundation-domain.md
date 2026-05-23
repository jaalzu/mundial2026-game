# 01 - Foundation & Domain

> Documento canonico del dominio. Define que existe en el sistema, que reglas lo gobiernan y que decisiones quedan fijas antes de crear Prisma/Supabase.

---

## 1. Product Scope

La app es un juego privado de predicciones para el Mundial 2026.

Los usuarios entran sin email ni password, eligen un nombre y un avatar basado en jugadores, cargan predicciones de partidos y picks generales del torneo, y compiten en un leaderboard global unico.

No hay grupos, no hay realtime, no hay pagos, no hay chat y no hay cargas de imagen propias en el MVP.

---

## 2. Fixed Decisions

- La fuente unica de auth es Supabase Anonymous Auth.
- No existe tabla custom de sessions.
- `users.id` usa el mismo UUID que `auth.users.id` de Supabase.
- La recuperacion de cuenta se hace con una `recovery_key` local.
- La zona horaria del negocio es `America/Argentina/Buenos_Aires`.
- El bloqueo de torneo ocurre el `2026-06-11 00:00:00` hora Argentina.
- API-Football es fuente de seed/sync estructural, nunca fuente automatica de resultados.
- Los resultados oficiales se cargan manualmente desde admin.
- El leaderboard es global y unico.
- Las predicciones no se editan despues de enviarse.

---

## 3. Core Entities

### users

Perfil local del usuario autenticado anonimamente con Supabase.

```ts
{
  id: uuid // auth.users.id
  name: string
  avatar_player_id: uuid | null
  recovery_key: string
  name_updated_at: timestamp | null
  avatar_updated_at: timestamp | null
  created_at: timestamp
  updated_at: timestamp
}
```

### teams

Selecciones del Mundial.

```ts
{
  id: uuid
  external_id: string | null
  name: string
  code: string
  region: TeamRegion | null
  flag_url: string
  created_at: timestamp
  updated_at: timestamp
}
```

### players

Jugadores usados para avatares y picks de torneo.

```ts
{
  id: uuid
  external_id: string | null
  team_id: uuid
  name: string
  photo_url: string | null
  position: PlayerPosition
  created_at: timestamp
  updated_at: timestamp
}
```

### matches

Partidos del fixture local. La DB propia es la fuente de verdad.

```ts
{
  id: uuid
  external_id: string | null
  home_team_id: uuid
  away_team_id: uuid
  winner_team_id: uuid | null
  phase: MatchPhase
  status: MatchStatus
  starts_at: timestamp
  score_home: number | null
  score_away: number | null
  created_at: timestamp
  updated_at: timestamp
}
```

`winner_team_id` representa el ganador oficial/cual equipo avanza cuando el admin cierra el partido. Se mantiene aunque haya penales. No se usa para dar puntos de score exacto; esos puntos salen de `score_home` y `score_away`.

### match_predictions

Predicciones de un usuario para un partido.

```ts
{
  id: uuid
  user_id: uuid
  match_id: uuid
  predicted_home: number
  predicted_away: number
  points: number
  exact_hit: boolean
  result: MatchPredictionResult | null
  created_at: timestamp
}
```

En el MVP no guardamos `predicted_winner_id`. Primero resolvemos fase de grupos y scoring por goles. Si eliminatorias lo necesitan, se agrega despues de cerrar la UX.

### tournament_predictions

Picks generales del torneo. Se guardan juntos, una sola vez. Los campos son opcionales porque el usuario puede dejar picks incompletos.

```ts
{
  id: uuid
  user_id: uuid
  champion_team_id: uuid | null
  runner_up_team_id: uuid | null
  final_home_team_id: uuid | null
  final_away_team_id: uuid | null
  surprise_team_id: uuid | null
  disappointment_team_id: uuid | null
  mvp_player_id: uuid | null
  golden_boot_player_id: uuid | null
  best_goalkeeper_player_id: uuid | null
  revelation_player_id: uuid | null
  points: number
  created_at: timestamp
}
```

### leaderboard_daily

Snapshot calculado del ranking global.

```ts
{
  id: uuid
  user_id: uuid
  total_points: number
  exact_hits: number
  rank: number
  previous_rank: number | null
  rank_delta: number
  calculated_at: timestamp
}
```

### tournament_results

Resoluciones oficiales de picks generales. Se cargan manualmente por admin cuando existan.

```ts
{
  id: uuid
  champion_team_id: uuid | null
  runner_up_team_id: uuid | null
  final_home_team_id: uuid | null
  final_away_team_id: uuid | null
  surprise_team_id: uuid | null
  disappointment_team_id: uuid | null
  mvp_player_id: uuid | null
  golden_boot_player_id: uuid | null
  best_goalkeeper_player_id: uuid | null
  revelation_player_id: uuid | null
  created_at: timestamp
  updated_at: timestamp
}
```

### api_sync_logs

Registro simple de sync con API-Football.

```ts
{
  id: uuid
  endpoint: string
  status_code: number | null
  success: boolean
  message: string | null
  requests_used: number | null
  remaining_quota: number | null
  synced_at: timestamp
}
```

---

## 4. Relations

```txt
users
  1:N match_predictions
  1:1 tournament_predictions
  1:N leaderboard_daily
  N:1 players as avatar_player

teams
  1:N players
  1:N matches as home_team
  1:N matches as away_team
  1:N matches as winner_team
  1:N tournament_predictions through team pick fields
  1:N tournament_results through team result fields

players
  N:1 teams
  1:N users as avatar_player
  1:N tournament_predictions through player pick fields
  1:N tournament_results through player result fields

matches
  N:1 teams as home_team
  N:1 teams as away_team
  N:1 teams as winner_team
  1:N match_predictions
```

---

## 5. Enums

```ts
export type MatchPhase =
  | "GROUP"
  | "ROUND_OF_16"
  | "QUARTER_FINAL"
  | "SEMI_FINAL"
  | "THIRD_PLACE"
  | "FINAL";

export type MatchStatus = "SCHEDULED" | "FINISHED";

export type PlayerPosition = "GK" | "DEF" | "MID" | "FWD";

export type TeamRegion =
  | "CONMEBOL"
  | "UEFA"
  | "CONCACAF"
  | "CAF"
  | "AFC"
  | "OFC";

export type MatchPredictionResult =
  | "EXACT_SCORE"
  | "WINNER"
  | "DRAW"
  | "WRONG";
```

---

## 6. Constraints

### users

- `id` primary key.
- `name` required.
- `name` unique.
- `recovery_key` required and unique.
- `avatar_player_id` optional foreign key to `players.id`.

### teams

- `id` primary key.
- `code` required and unique.
- `external_id` optional and unique when present.
- `name` required.
- `flag_url` required.

### players

- `id` primary key.
- `team_id` required foreign key.
- `external_id` optional and unique when present.
- `name` required.
- `position` required.

### matches

- `id` primary key.
- `external_id` optional and unique when present.
- `home_team_id` and `away_team_id` required.
- `winner_team_id` optional.
- `home_team_id != away_team_id`.
- `starts_at` required.
- `score_home` and `score_away` optional but must be `>= 0` when present.
- `status` starts as `SCHEDULED` and can become `FINISHED`.

### match_predictions

- `id` primary key.
- `user_id` and `match_id` required.
- Unique pair: `(user_id, match_id)`.
- `predicted_home` and `predicted_away` required and `>= 0`.
- `points` defaults to `0`.
- `exact_hit` defaults to `false`.

### tournament_predictions

- `id` primary key.
- `user_id` required and unique.
- Pick fields are nullable.
- `points` defaults to `0`.

### leaderboard_daily

- `id` primary key.
- `user_id` required.
- Unique pair: `(user_id, calculated_at)` or a date-based equivalent.

---

## 7. Business Rules

### Auth and users

- Supabase creates the anonymous auth user.
- The local `users` row is created after Supabase auth exists.
- `users.id` must equal the Supabase auth UID.
- The session is persisted by Supabase cookies.
- `recovery_key` exists only to recover anonymous accounts after cookie loss.
- A user can change `name` once per day.
- A user can change `avatar_player_id` once per day.
- Duplicate names are not allowed.

### Tournament predictions

- One user can submit at most one tournament prediction row.
- Tournament predictions are submitted as one batch.
- Tournament predictions cannot be edited after submit in the MVP.
- Pick fields are optional.
- Tournament predictions lock at `2026-06-11 00:00:00 America/Argentina/Buenos_Aires`.

### Match predictions

- One user can submit at most one prediction per match.
- Match predictions cannot be edited after submit in the MVP.
- `predicted_home` and `predicted_away` are mandatory.
- A prediction is rejected when `currentTime >= match.starts_at`.
- Frontend lock state is only UX; server-side lock is mandatory.
- Knockout-specific winner prediction is deferred until UX is defined.

### Matches and results

- API-Football can create/update teams, players and fixture structure.
- API-Football must not close matches or set official scores automatically.
- Admin manually closes a match by setting:
  - `score_home`
  - `score_away`
  - `winner_team_id`
  - `status = FINISHED`
- Closing a match triggers match scoring and leaderboard recalculation.

### Leaderboard

- One global leaderboard for all users.
- Sort order:
  1. `total_points DESC`
  2. `exact_hits DESC`
  3. `name ASC`
- Leaderboard can be recalculated fully from scratch.
- Rank movement uses previous snapshot: `rank_delta = previous_rank - current_rank`.

---

## 8. Scoring

### Match prediction scoring

```txt
Exact score      = 5 points
Correct winner   = 3 points
Correct draw     = 3 points
Wrong prediction = 0 points
Empty prediction = 0 points
```

Exact score increments `exact_hit`.

### Knockout note

Score points are based on `score_home` and `score_away` as entered by admin. `winner_team_id` resolves who officially won/advanced, especially if penalties are involved, but does not change exact-score calculation.

### Tournament prediction scoring

```txt
Champion                    = 20 points
Runner-up                   = 15 points
Final home team             = 12 points
Final away team             = 12 points
Surprise team               = 8 points
Disappointment team         = 8 points
Tournament MVP              = 10 points
Golden Boot                 = 10 points
Best Goalkeeper             = 10 points
Revelation Player           = 10 points
```

Nullable picks score `0`.

---

## 9. Core Flows

### Create user

```txt
Open app
-> Supabase creates anonymous auth user
-> User enters name and chooses avatar player
-> Server validates name uniqueness
-> Prisma creates users row with id = auth UID
-> Server generates recovery_key
-> User enters app
```

### Recover account

```txt
User enters recovery_key
-> Server finds users row
-> App creates/restores access flow through Supabase Auth
-> User gets access to same local user identity
```

Implementation detail can be refined during auth architecture, but the domain requirement is: a lost anonymous account must be recoverable with `recovery_key`.

### Submit match prediction

```txt
User selects match scores
-> Server validates auth
-> Server validates match exists
-> Server validates currentTime < match.starts_at
-> Server validates no previous prediction exists
-> Prisma inserts match_prediction
-> Client invalidates user predictions cache
```

### Close match

```txt
Admin enters final score and official winner
-> Server validates ADMIN_SECRET
-> Prisma updates match as FINISHED
-> Scoring engine calculates points for all predictions of that match
-> Leaderboard engine recalculates global ranking
```

### Submit tournament predictions

```txt
User submits optional picks
-> Server validates auth
-> Server validates currentTime < tournament lock date
-> Server validates no previous tournament prediction exists
-> Prisma inserts tournament_predictions row
```

---

## 10. Seed Strategy

Seed is local-first and repeatable.

```txt
prisma/
  seed/
    modules/
      teams.seed.ts
      players.seed.ts
      matches.seed.ts
      dev-users.seed.ts
    raw-data/
      raw-teams.json
      raw-players.json
      raw-matches.json
```

Rules:

- Fetch API-Football data once into local JSON.
- Development seeds read local JSON, not the API.
- Seed scripts use Prisma `upsert`.
- Dev seed can generate fake users, predictions and leaderboard data.
- External image URLs are stored as strings.
- No local image download/proxy in MVP.

---

## 11. Out Of Scope For MVP

- Custom auth sessions.
- Email/password login.
- User groups.
- Realtime updates.
- Live match data.
- Automatic score sync from API-Football.
- Custom avatar uploads.
- Complex knockout prediction logic before group-stage MVP is stable.
- Marketing landing page.
