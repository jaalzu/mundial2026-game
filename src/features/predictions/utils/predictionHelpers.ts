import type { Match } from "../models/types";
import type { PredictionsMap } from "../models/types";
import type { GroupPredictionsFormValues } from "../models/types";

/**
 * Builds the default values for a group's react-hook-form,
 * hydrating any previously saved predictions from the server.
 */
export function buildGroupDefaultValues(
  matches: Match[],
  initialPredictions: PredictionsMap,
): GroupPredictionsFormValues {
  return {
    matches: matches.map((m) => {
      const saved = initialPredictions[m.id];
      return {
        matchId: m.id,
        predictedHome:
          saved?.predictedHome != null ? String(saved.predictedHome) : "",
        predictedAway:
          saved?.predictedAway != null ? String(saved.predictedAway) : "",
      };
    }),
  };
}

/**
 * Returns true if a string field value represents a valid score (0–99).
 */
export function isValidScore(value: string | undefined | null): boolean {
  if (value === "" || value == null) return false;
  const n = parseInt(value, 10);
  return !isNaN(n) && n >= 0 && n <= 99;
}

/**
 * Returns true when both home and away inputs are filled with valid scores.
 */
export function isPredictionComplete(
  home: string | undefined,
  away: string | undefined,
): boolean {
  return isValidScore(home) && isValidScore(away);
}
