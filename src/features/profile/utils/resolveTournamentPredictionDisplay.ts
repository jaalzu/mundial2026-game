/**
 * Transforma la respuesta de getTournamentPredictions en el formato
 * que espera el componente TournamentPredictionsSection.
 *
 * Mapea relaciones resueltas (teamName, playerName) a strings.
 * Si hay null, retorna "—" para mantener la UI limpia.
 */

import type { getProfileData } from "../actions/getProfileData";
type PredictionRaw = Awaited<ReturnType<typeof getProfileData>>["prediction"];

export function resolveTournamentPredictionDisplay(
  prediction: PredictionRaw | null,
): TournamentPredictionDisplay {
  if (!prediction) {
    return {
      champion: "—",
      runnerUp: "—",
      surprise: "—",
      disappointment: "—",
      mvp: "—",
      goldenBoot: "—",
      bestGoalkeeper: "—",
      revelation: "—",
    };
  }

  return {
    champion: prediction.championTeam?.name ?? "—",
    runnerUp: prediction.runnerUpTeam?.name ?? "—",
    surprise: prediction.surpriseTeam?.name ?? "—",
    disappointment: prediction.disappointmentTeam?.name ?? "—",
    mvp: prediction.mvpPlayer?.name ?? "—",
    goldenBoot: prediction.goldenBootPlayer?.name ?? "—",
    bestGoalkeeper: prediction.bestGoalkeeperPlayer?.name ?? "—",
    revelation: prediction.revelationPlayer?.name ?? "—",
  };
}

export type TournamentPredictionDisplay = {
  champion: string;
  runnerUp: string;

  surprise: string;
  disappointment: string;
  mvp: string;
  goldenBoot: string;
  bestGoalkeeper: string;
  revelation: string;
};
