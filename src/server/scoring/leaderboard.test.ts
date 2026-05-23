import { describe, expect, it } from "vitest";
import { calculateLeaderboard } from "@/server/scoring/leaderboard";

describe("calculateLeaderboard", () => {
  it("sorts by total points and exact hits as the tiebreaker", () => {
    expect(
      calculateLeaderboard([
        {
          userId: "1",
          name: "Ana",
          matchPoints: 10,
          tournamentPoints: 0,
          exactHits: 1,
          previousRank: 2
        },
        {
          userId: "2",
          name: "Bruno",
          matchPoints: 10,
          tournamentPoints: 0,
          exactHits: 3,
          previousRank: 3
        },
        {
          userId: "3",
          name: "Caro",
          matchPoints: 8,
          tournamentPoints: 0,
          exactHits: 5,
          previousRank: 1
        }
      ])
    ).toEqual([
      {
        userId: "2",
        name: "Bruno",
        totalPoints: 10,
        exactHits: 3,
        rank: 1,
        previousRank: 3,
        rankDelta: 2
      },
      {
        userId: "1",
        name: "Ana",
        totalPoints: 10,
        exactHits: 1,
        rank: 2,
        previousRank: 2,
        rankDelta: 0
      },
      {
        userId: "3",
        name: "Caro",
        totalPoints: 8,
        exactHits: 5,
        rank: 3,
        previousRank: 1,
        rankDelta: -2
      }
    ]);
  });
});
