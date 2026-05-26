export type UserStats = {
  position: number;
  totalPlayers: number;
  totalPoints: number;
  exactPredictions: number;
};

export type TournamentPredictions = {
  champion: string;
  runnerUp: string;
  goldenBoot: string;
  mvp: string;
  youngPlayer: string;
  disappointmentTeam: string;
  revelationTeam: string;
  goldenGlove: string;
};

export type ProfileUser = {
  id: string;
  name: string;
  avatarPlayerId: string | null;
  recoveryCode: string;
};
