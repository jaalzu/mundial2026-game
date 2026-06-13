// features/predictions/utils/matchScoring.ts
import type { Match } from "../models/types";
import { colors } from "@/shared/constants/designSystem";

export function getMatchPoints(
  home: string,
  away: string,
  match: Match,
): string {
  const ph = parseInt(home, 10);
  const pa = parseInt(away, 10);
  const sh = match.scoreHome!;
  const sa = match.scoreAway!;

  if (ph === sh && pa === sa) return "+3";

  const predictedWinner = ph > pa ? "home" : ph < pa ? "away" : "draw";
  const actualWinner = sh > sa ? "home" : sh < sa ? "away" : "draw";

  return predictedWinner === actualWinner ? "+1" : "0";
}

export function getMatchPointsColor(
  home: string,
  away: string,
  match: Match,
): string {
  const points = getMatchPoints(home, away, match);
  if (points === "+3") return colors.primary;
  if (points === "+1") return "#f59f0be4";
  return colors.secondary;
}

export function isMatchLocked(match: Match): boolean {
  const now = new Date();
  const matchTime = new Date(match.startsAt);

  const correctedMatchTime = new Date(matchTime.getTime() + 3 * 60 * 60 * 1000);

  return match.status === "FINISHED" || now > correctedMatchTime;
}
