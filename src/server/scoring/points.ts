/**
 * Single source of truth for all point values.
 * Change here and it propagates everywhere.
 */

// Match predictions
export const POINTS_EXACT = 6; // exact score
export const POINTS_WINNER = 2; // correct winner/draw
export const POINTS_MISS = 0; // wrong

// Tournament predictions
export const TOURNAMENT_POINTS: Record<string, number> = {
  championTeamId: 30,
  runnerUpTeamId: 15,
  surpriseTeamId: 15,
  disappointmentTeamId: 15,
  mvpPlayerId: 20,
  goldenBootPlayerId: 20,
  bestGoalkeeperPlayerId: 15,
  revelationPlayerId: 15,
} as const;
