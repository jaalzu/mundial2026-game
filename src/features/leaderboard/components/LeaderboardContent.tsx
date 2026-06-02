import { LeaderboardTable } from "./LeaderboardTable";
import type { LeaderboardEntry } from "../actions/getLeaderboard";

type LeaderboardContentProps = {
  entries: LeaderboardEntry[];
  currentUserId: string;
};

export function LeaderboardContent({
  entries,
  currentUserId,
}: LeaderboardContentProps) {
  return <LeaderboardTable entries={entries} currentUserId={currentUserId} />;
}
