import type { UserStats, TournamentPredictions } from "../types";

// ─── Reemplazar estas funciones con queries reales cuando estén disponibles ───
// Ejemplo:
//   import { getUserStats } from "@/features/profile/queries/getUserStats"
//   import { getTournamentPredictions } from "@/features/profile/queries/getTournamentPredictions"

export function getMockStats(): UserStats {
  return {
    position: 4,
    totalPlayers: 30,
    totalPoints: 40,
    exactPredictions: 3,
  };
}

export function getMockTournamentPredictions(): TournamentPredictions {
  return {
    champion: "Argentina",
    runnerUp: "Francia",
    goldenBoot: "Messi",
    mvp: "Messi",
    youngPlayer: "Messi",
    disappointmentTeam: "Chile",
    revelationTeam: "Jamaica",
    goldenGlove: "Dibu Martinez",
  };
}

// TODO: reemplazar con recovery key real (viene de DB)
export const MOCK_RECOVERY_CODE = "W4RLD-CUP26-XJKL9P";
