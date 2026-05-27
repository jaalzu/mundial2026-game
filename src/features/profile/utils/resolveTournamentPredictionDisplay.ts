/**
 * Transforma la respuesta de getTournamentPredictions en el formato
 * que espera el componente TournamentPredictionsSection.
 *
 * Mapea relaciones resueltas (teamName, playerName) a strings.
 * Si hay null, retorna "—" para mantener la UI limpia.
 */
export function resolveTournamentPredictionDisplay(
  prediction: Awaited<
    ReturnType<
      typeof import("../actions/getTournamentPredictions").getTournamentPredictions
    >
  > | null,
): TournamentPredictionDisplay {
  if (!prediction) {
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

  return {
    champion: prediction.championTeam?.name ?? "—",
    runnerUp: prediction.runnerUpTeam?.name ?? "—",
    finalHome: prediction.finalHomeTeam?.name ?? "—",
    finalAway: prediction.finalAwayTeam?.name ?? "—",
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
  finalHome: string;
  finalAway: string;
  surprise: string;
  disappointment: string;
  mvp: string;
  goldenBoot: string;
  bestGoalkeeper: string;
  revelation: string;
};
