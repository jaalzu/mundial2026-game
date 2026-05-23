import type { LeaderboardRow } from "@/features/leaderboard/types";

export const mockLeaderboard: LeaderboardRow[] = [
  { userId: "1", rank: 1, avatar: "10", name: "Leo", points: 42, trend: "+2" },
  { userId: "2", rank: 2, avatar: "9", name: "Julian", points: 39, trend: "0" },
  { userId: "3", rank: 3, avatar: "7", name: "Fideo", points: 34, trend: "-1" },
  { userId: "4", rank: 4, avatar: "5", name: "Rodri", points: 31, trend: "+1" },
  { userId: "5", rank: 5, avatar: "23", name: "Dibu", points: 29, trend: "0" }
];
