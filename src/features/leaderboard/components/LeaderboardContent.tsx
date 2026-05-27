// LeaderboardContent.tsx
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
  return <LeaderboardTable entries={entries} currentUserId={currentUserId} />;
}
