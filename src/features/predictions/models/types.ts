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
  filterPosition?: PlayerPosition;
  points: number;
}

// ─── Knockout types ──────────────────────────────────────────────────────────

export type KnockoutPhase =
  | "ROUND_OF_16"
  | "ROUND_OF_8"
  | "QUARTER_FINAL"
  | "SEMI_FINAL"
  | "THIRD_PLACE"
  | "FINAL";

export type BracketSide = 1 | 2 | null;

export interface KnockoutMatch {
  id: string;
  phase: KnockoutPhase;
  bracket: BracketSide;
  homeTeam: Team | null;
  awayTeam: Team | null;
  startsAt: string | null;
  status: MatchStatus;
  scoreHome?: number;
  scoreAway?: number;
  winnerTeamId?: string | null;
}

export const KNOCKOUT_ROUNDS: {
  phase: KnockoutPhase;
  label: string;
  hasBracket: boolean;
}[] = [
  { phase: "ROUND_OF_16", label: "16AVOS", hasBracket: true },
  { phase: "ROUND_OF_8", label: "8VOS", hasBracket: true },
  { phase: "QUARTER_FINAL", label: "4TOS", hasBracket: false },
  { phase: "SEMI_FINAL", label: "SEMIS", hasBracket: false },
  { phase: "THIRD_PLACE", label: "3ER", hasBracket: false },
  { phase: "FINAL", label: "FINAL", hasBracket: false },
];

export interface KnockoutPredictionValue {
  matchId: string;
  predictedHome: number | null;
  predictedAway: number | null;
  predictedPenaltyWinnerId: string | null; // solo se usa si predictedHome === predictedAway
}

export type KnockoutPredictionsMap = Record<string, KnockoutPredictionValue>;
