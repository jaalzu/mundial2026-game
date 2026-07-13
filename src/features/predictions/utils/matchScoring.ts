import type { Match } from "../models/types";
import { colors } from "@/shared/constants/designSystem";
import {
  POINTS_EXACT,
  POINTS_WINNER,
  POINTS_MISS,
} from "@/server/scoring/points";

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

interface LockableMatch {
  status: "SCHEDULED" | "FINISHED";
  startsAt: string | null;
}

export function isMatchLocked(match: LockableMatch): boolean {
  if (match.status === "FINISHED") return true;
  if (!match.startsAt) return false; //

  const now = new Date();
  const matchTime = new Date(match.startsAt);
  const correctedMatchTime = new Date(matchTime.getTime() + 3 * 60 * 60 * 1000);

  return now > correctedMatchTime;
}

export function getKnockoutMatchDisplay(
  predictedHome: string,
  predictedAway: string,
  predictedPenaltyWinnerId: string | null,
  match: {
    scoreHome?: number;
    scoreAway?: number;
    winnerTeamId?: string | null;
    homeTeam: { id: string };
    awayTeam: { id: string };
  },
): { label: string; color: string } {
  const ph = parseInt(predictedHome, 10);
  const pa = parseInt(predictedAway, 10);
  const sh = match.scoreHome!;
  const sa = match.scoreAway!;

  if (ph === sh && pa === sa) {
    return { label: `+${POINTS_EXACT}`, color: colors.primary };
  }

  const predictedWinnerId =
    ph > pa
      ? match.homeTeam.id
      : pa > ph
        ? match.awayTeam.id
        : predictedPenaltyWinnerId;

  if (predictedWinnerId && predictedWinnerId === match.winnerTeamId) {
    return { label: `+${POINTS_WINNER}`, color: "#f59f0be4" };
  }

  return { label: `${POINTS_MISS}`, color: colors.secondary };
}
