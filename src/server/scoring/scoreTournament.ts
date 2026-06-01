import { TOURNAMENT_POINTS } from "./points";
import type { TournamentPrediction, TournamentResult } from "@prisma/client";

/**
 * Calculates total points for a user's tournament prediction
 * by comparing it against the official TournamentResult.
 *
 * Pure function — no DB calls, easy to test.
 */
export function scoreTournamentPrediction(
  prediction: Pick<
    TournamentPrediction,
    | "championTeamId"
    | "runnerUpTeamId"
    | "surpriseTeamId"
    | "disappointmentTeamId"
    | "mvpPlayerId"
    | "goldenBootPlayerId"
    | "bestGoalkeeperPlayerId"
    | "revelationPlayerId"
  >,
  result: Pick<
    TournamentResult,
    | "championTeamId"
    | "runnerUpTeamId"
    | "surpriseTeamId"
    | "disappointmentTeamId"
    | "mvpPlayerId"
    | "goldenBootPlayerId"
    | "bestGoalkeeperPlayerId"
    | "revelationPlayerId"
  >,
): number {
  let total = 0;

  for (const [field, pts] of Object.entries(TOURNAMENT_POINTS)) {
    const predicted = prediction[field as keyof typeof prediction];
    const actual = result[field as keyof typeof result];

    if (predicted && actual && predicted === actual) {
      total += pts;
    }
  }

  return total;
}
