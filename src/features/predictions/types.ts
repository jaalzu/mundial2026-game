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
  startsAt: string; // ISO string
  group?: string; // e.g. "A", "B", ...
  scoreHome?: number;
  scoreAway?: number;
}

export interface MatchPredictionValue {
  matchId: string;
  predictedHome: number | null;
  predictedAway: number | null;
}

// Keyed by matchId for easy lookup
export type PredictionsMap = Record<string, MatchPredictionValue>;

export type PredictionPhase = "GROUPS" | "TOURNAMENT" | "KNOCKOUT";

export interface GroupData {
  group: string; // "A" | "B" ...
  matches: Match[];
}
