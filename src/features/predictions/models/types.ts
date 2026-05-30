export type MatchPhase =
  | "GROUP"
  | "ROUND_OF_16"
  | "QUARTER_FINAL"
  | "SEMI_FINAL"
  | "THIRD_PLACE"
  | "FINAL";

export type MatchStatus = "SCHEDULED" | "FINISHED";

export interface Team {
  id: string;
  name: string;
  code: string;
  flagUrl: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  phase: MatchPhase;
  status: MatchStatus;
  startsAt: string;
  group?: string;
  scoreHome?: number;
  scoreAway?: number;
}

export interface MatchPredictionValue {
  matchId: string;
  predictedHome: number | null;
  predictedAway: number | null;
}

/** Keyed by matchId for O(1) lookup */
export type PredictionsMap = Record<string, MatchPredictionValue>;

export type PredictionPhase = "GROUPS" | "TOURNAMENT" | "KNOCKOUT";

export interface GroupData {
  group: string;
  matches: Match[];
}

/** Shape of the react-hook-form for a single group */
export interface GroupPredictionsFormValues {
  matches: {
    matchId: string;
    predictedHome: string;
    predictedAway: string;
  }[];
}

/** Result type for server actions */
export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };
