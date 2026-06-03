// ─── Existing types ──────────────────────────────────────────────────────────

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

export type PredictionsMap = Record<string, MatchPredictionValue>;

export type PredictionPhase = "GROUPS" | "TOURNAMENT" | "KNOCKOUT";

export interface GroupData {
  group: string;
  matches: Match[];
}

export interface GroupPredictionsFormValues {
  matches: {
    matchId: string;
    predictedHome: string;
    predictedAway: string;
  }[];
}

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

// ─── Tournament types ────────────────────────────────────────────────────────

export type PlayerPosition = "GK" | "DEF" | "MID" | "FWD";

export interface PlayerOption {
  id: string;
  name: string;
  photoUrl: string | null;
  position: PlayerPosition;
  team: {
    id: string;
    name: string;
    code: string;
    flagUrl: string;
  };
}

export interface TeamOption {
  id: string;
  name: string;
  code: string;
  flagUrl: string;
}

export interface TournamentPredictionData {
  championTeamId: string | null;
  runnerUpTeamId: string | null;
  // finalHomeTeamId: string | null;
  // finalAwayTeamId: string | null;
  surpriseTeamId: string | null;
  disappointmentTeamId: string | null;
  mvpPlayerId: string | null;
  goldenBootPlayerId: string | null;
  bestGoalkeeperPlayerId: string | null;
  revelationPlayerId: string | null;
}

export type TournamentPredictionField = keyof TournamentPredictionData;

export type TournamentSelectionType = "team" | "player";

export interface TournamentCardConfig {
  field: TournamentPredictionField;
  label: string;
  description: string;
  type: TournamentSelectionType;
}
