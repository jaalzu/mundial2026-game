"use client";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { LeaderboardTable } from "./LeaderboardTable";
import type { LeaderboardEntry } from "../actions/getLeaderboard";

type LeaderboardContentProps = {
  entries: LeaderboardEntry[];
  currentUserId: string;
};

export function LeaderboardContent({
  entries: initialEntries,
  currentUserId,
}: LeaderboardContentProps) {
  const { entries } = useLeaderboard(initialEntries);

  // usar initialEntries hasta que React Query hidrate
  const displayEntries = entries.length > 0 ? entries : initialEntries;

  return (
    <LeaderboardTable entries={displayEntries} currentUserId={currentUserId} />
  );
}
