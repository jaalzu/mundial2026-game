import { POINTS_EXACT, POINTS_WINNER, POINTS_MISS } from "./points";

export interface KnockoutScoreInput {
  predictedHome: number;
  predictedAway: number;
  predictedPenaltyWinnerId: string | null;
  actualHome: number;
  actualAway: number;
  actualWinnerTeamId: string | null;
  homeTeamId: string;
  awayTeamId: string;
}

export interface KnockoutScoreOutput {
  points: number;
  exactHit: boolean;
  result: "EXACT_SCORE" | "WINNER" | "WRONG";
}

export function scoreKnockoutPrediction({
  predictedHome,
  predictedAway,
  predictedPenaltyWinnerId,
  actualHome,
  actualAway,
  actualWinnerTeamId,
  homeTeamId,
  awayTeamId,
}: KnockoutScoreInput): KnockoutScoreOutput {
  const isExactScore =
    predictedHome === actualHome && predictedAway === actualAway;

  if (isExactScore) {
    return { points: POINTS_EXACT, exactHit: true, result: "EXACT_SCORE" };
  }

  // Determina a quién "eligió" el usuario como avanzando
  const predictedWinnerId =
    predictedHome > predictedAway
      ? homeTeamId
      : predictedAway > predictedHome
        ? awayTeamId
        : predictedPenaltyWinnerId; // empate -> depende de su elección de penal

  if (predictedWinnerId && predictedWinnerId === actualWinnerTeamId) {
    return { points: POINTS_WINNER, exactHit: false, result: "WINNER" };
  }

  return { points: POINTS_MISS, exactHit: false, result: "WRONG" };
}
