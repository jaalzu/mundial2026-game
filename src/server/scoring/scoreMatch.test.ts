import { describe, it, expect } from "vitest";
import { scoreMatchPrediction } from "./scoreMatch";
import { POINTS_EXACT, POINTS_WINNER, POINTS_MISS } from "./points";

describe("scoreMatchPrediction", () => {
  it("otorga POINTS_EXACT cuando el resultado predicho es exacto", () => {
    const result = scoreMatchPrediction({
      predictedHome: 2,
      predictedAway: 1,
      actualHome: 2,
      actualAway: 1,
    });

    expect(result).toEqual({
      points: POINTS_EXACT,
      exactHit: true,
      result: "EXACT_SCORE",
    });
  });

  it("otorga POINTS_EXACT en un empate exacto (0-0)", () => {
    const result = scoreMatchPrediction({
      predictedHome: 0,
      predictedAway: 0,
      actualHome: 0,
      actualAway: 0,
    });

    expect(result.result).toBe("EXACT_SCORE");
    expect(result.points).toBe(POINTS_EXACT);
  });

  it("otorga POINTS_WINNER cuando acierta el ganador pero no el marcador", () => {
    const result = scoreMatchPrediction({
      predictedHome: 3,
      predictedAway: 1,
      actualHome: 1,
      actualAway: 0,
    });

    expect(result).toEqual({
      points: POINTS_WINNER,
      exactHit: false,
      result: "WINNER",
    });
  });

  it("otorga POINTS_WINNER cuando acierta el empate sin acertar el marcador", () => {
    const result = scoreMatchPrediction({
      predictedHome: 1,
      predictedAway: 1,
      actualHome: 2,
      actualAway: 2,
    });

    expect(result).toEqual({
      points: POINTS_WINNER,
      exactHit: false,
      result: "WINNER",
    });
  });

  it("otorga POINTS_MISS cuando predice el equipo equivocado", () => {
    const result = scoreMatchPrediction({
      predictedHome: 2,
      predictedAway: 0,
      actualHome: 0,
      actualAway: 1,
    });

    expect(result).toEqual({
      points: POINTS_MISS,
      exactHit: false,
      result: "WRONG",
    });
  });

  it("otorga POINTS_MISS cuando predice empate pero hubo ganador", () => {
    const result = scoreMatchPrediction({
      predictedHome: 1,
      predictedAway: 1,
      actualHome: 2,
      actualAway: 1,
    });

    expect(result.result).toBe("WRONG");
    expect(result.points).toBe(POINTS_MISS);
  });

  it("otorga POINTS_MISS cuando predice ganador visitante pero ganó local", () => {
    const result = scoreMatchPrediction({
      predictedHome: 0,
      predictedAway: 2,
      actualHome: 1,
      actualAway: 0,
    });

    expect(result.result).toBe("WRONG");
  });

  it("maneja marcadores altos correctamente (regresión simple)", () => {
    const result = scoreMatchPrediction({
      predictedHome: 5,
      predictedAway: 4,
      actualHome: 5,
      actualAway: 4,
    });

    expect(result.result).toBe("EXACT_SCORE");
  });
});
