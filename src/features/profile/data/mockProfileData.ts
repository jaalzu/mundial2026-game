import type { UserStats, TournamentPredictions } from "../types";

// ─── Fallback/Mock data para cuando no hay datos en DB ───
// Reemplazar estas funciones con las queries reales en page.tsx

export function getMockStats(): UserStats {
  return {
    position: 0,
    totalPlayers: 0,
    totalPoints: 0,
    exactPredictions: 0,
    rankDelta: 0,
  };
}

export function getMockTournamentPredictions(): TournamentPredictions {
  return {
    champion: "—",
    runnerUp: "—",
    finalHome: "—",
    finalAway: "—",
    surprise: "—",
    disappointment: "—",
    mvp: "—",
    goldenBoot: "—",
    bestGoalkeeper: "—",
    revelation: "—",
  };
}

// TODO: reemplazar en page.tsx - obtener de getAuthenticatedUser o DB
export const MOCK_RECOVERY_KEY = "XXXX-XXXX-XXXX-XXXX";
