import { describe, expect, it } from "vitest";
import { calculateMatchScore } from "@/server/scoring/match-scoring";

describe("calculateMatchScore", () => {
  it("awards 5 points for an exact score", () => {
    expect(
      calculateMatchScore({
        predictedHome: 2,
        predictedAway: 1,
        actualHome: 2,
        actualAway: 1
      })
    ).toEqual({ points: 5, exactHit: true, result: "EXACT_SCORE" });
  });

  it("awards 3 points for the correct winner", () => {
    expect(
      calculateMatchScore({
        predictedHome: 1,
        predictedAway: 0,
        actualHome: 3,
        actualAway: 1
      })
    ).toEqual({ points: 3, exactHit: false, result: "WINNER" });
  });

  it("awards 3 points for the correct draw", () => {
    expect(
      calculateMatchScore({
        predictedHome: 0,
        predictedAway: 0,
        actualHome: 2,
        actualAway: 2
      })
    ).toEqual({ points: 3, exactHit: false, result: "DRAW" });
  });

  it("awards 0 points for a wrong result", () => {
    expect(
      calculateMatchScore({
        predictedHome: 2,
        predictedAway: 0,
        actualHome: 0,
        actualAway: 1
      })
    ).toEqual({ points: 0, exactHit: false, result: "WRONG" });
  });
});
