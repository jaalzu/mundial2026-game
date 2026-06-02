export type UserStats = {
  position: number | null;
  totalPlayers: number;
  totalPoints: number;
  exactPredictions: number;
  rankDelta: number;
};

export type TournamentPredictions = {
  champion: string;
  runnerUp: string;

  surprise: string;
  disappointment: string;
  mvp: string;
  goldenBoot: string;
  bestGoalkeeper: string;
  revelation: string;
};

export type ProfileUser = {
  id: string;
  name: string;
  avatarPlayerId: string | null;
  recoveryKey: string;
};
