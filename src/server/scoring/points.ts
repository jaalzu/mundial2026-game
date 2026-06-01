/**
 * Single source of truth for all point values.
 * Change here and it propagates everywhere.
 */

// Match predictions
export const POINTS_EXACT = 3; // exact score
export const POINTS_WINNER = 1; // correct winner/draw
export const POINTS_MISS = 0; // wrong

// Tournament predictions
export const TOURNAMENT_POINTS: Record<string, number> = {
  championTeamId: 20,
  runnerUpTeamId: 10,
  surpriseTeamId: 10,
  disappointmentTeamId: 10,
  mvpPlayerId: 10,
  goldenBootPlayerId: 10,
  bestGoalkeeperPlayerId: 10,
  revelationPlayerId: 10,
} as const;
