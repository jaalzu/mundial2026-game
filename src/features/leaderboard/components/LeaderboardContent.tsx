"use client";

import { LeaderboardTable } from "./LeaderboardTable";
import { useLeaderboard } from "../hooks/useLeaderboard";

type LeaderboardContentProps = {
  currentUserId?: string;
};

export function LeaderboardContent({ currentUserId }: LeaderboardContentProps) {
  const { entries, isLoading, error } = useLeaderboard(currentUserId);

  if (error) {
    return null;
  }

  return <LeaderboardTable entries={entries} currentUserId={currentUserId} />;
}
