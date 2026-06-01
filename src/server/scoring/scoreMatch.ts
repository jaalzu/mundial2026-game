import { POINTS_EXACT, POINTS_WINNER, POINTS_MISS } from "./points";

type Winner = "home" | "away" | "draw";

function getWinner(home: number, away: number): Winner {
  if (home > away) return "home";
  if (away > home) return "away";
  return "draw";
}

export interface MatchScoreInput {
  predictedHome: number;
  predictedAway: number;
  actualHome: number;
  actualAway: number;
}

export interface MatchScoreOutput {
  points: number;
  exactHit: boolean;
  result: "EXACT_SCORE" | "WINNER" | "WRONG";
}

/**
 * Pure function — no side effects, easy to unit test.
 * Calculates points for a single match prediction.
 */
export function scoreMatchPrediction({
  predictedHome,
  predictedAway,
  actualHome,
  actualAway,
}: MatchScoreInput): MatchScoreOutput {
  const isExact = predictedHome === actualHome && predictedAway === actualAway;

  if (isExact) {
    return { points: POINTS_EXACT, exactHit: true, result: "EXACT_SCORE" };
  }

  const predictedWinner = getWinner(predictedHome, predictedAway);
  const actualWinner = getWinner(actualHome, actualAway);

  if (predictedWinner === actualWinner) {
    return { points: POINTS_WINNER, exactHit: false, result: "WINNER" };
  }

  return { points: POINTS_MISS, exactHit: false, result: "WRONG" };
}
