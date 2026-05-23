export type MatchScoreInput = {
  predictedHome: number | null;
  predictedAway: number | null;
  actualHome: number;
  actualAway: number;
};

export type MatchScoreResult = {
  points: number;
  exactHit: boolean;
  result: "EXACT_SCORE" | "WINNER" | "DRAW" | "WRONG";
};

export function calculateMatchScore(input: MatchScoreInput): MatchScoreResult {
  const { predictedHome, predictedAway, actualHome, actualAway } = input;

  if (predictedHome === null || predictedAway === null) {
    return { points: 0, exactHit: false, result: "WRONG" };
  }

  if (predictedHome === actualHome && predictedAway === actualAway) {
    return { points: 5, exactHit: true, result: "EXACT_SCORE" };
  }

  const predictedOutcome = getOutcome(predictedHome, predictedAway);
  const actualOutcome = getOutcome(actualHome, actualAway);

  if (predictedOutcome === actualOutcome) {
    return {
      points: 3,
      exactHit: false,
      result: actualOutcome === "DRAW" ? "DRAW" : "WINNER"
    };
  }

  return { points: 0, exactHit: false, result: "WRONG" };
}

function getOutcome(home: number, away: number) {
  if (home === away) {
    return "DRAW";
  }

  return home > away ? "HOME" : "AWAY";
}
