import { describe, it, expect } from "vitest";
import { scoreKnockoutPrediction } from "./scoreKnockoutPrediction";
import { POINTS_EXACT, POINTS_WINNER, POINTS_MISS } from "./points";

const HOME = "team-home";
const AWAY = "team-away";

describe("scoreKnockoutPrediction", () => {
  it("otorga POINTS_EXACT cuando el marcador predicho es exacto", () => {
    const result = scoreKnockoutPrediction({
      predictedHome: 2,
      predictedAway: 1,
      predictedPenaltyWinnerId: null,
      actualHome: 2,
      actualAway: 1,
      actualWinnerTeamId: HOME,
      homeTeamId: HOME,
      awayTeamId: AWAY,
    });

    expect(result).toEqual({
      points: POINTS_EXACT,
      exactHit: true,
      result: "EXACT_SCORE",
    });
  });

  it("prioriza EXACT_SCORE sobre el ganador de penales cuando el marcador en tiempo regular coincide", () => {
    // Caso real de KO: el partido terminó 1-1 y se definió por penales.
    // El usuario predijo el 1-1 exacto pero eligió mal el ganador de penales.
    // La regla de negocio dice: el resultado exacto pesa más, así que debe
    // dar EXACT_SCORE igual, sin importar si le pifió al penal.
    const result = scoreKnockoutPrediction({
      predictedHome: 1,
      predictedAway: 1,
      predictedPenaltyWinnerId: AWAY, // le erró al ganador de penales
      actualHome: 1,
      actualAway: 1,
      actualWinnerTeamId: HOME, // ganó local por penales
      homeTeamId: HOME,
      awayTeamId: AWAY,
    });

    expect(result.result).toBe("EXACT_SCORE");
    expect(result.points).toBe(POINTS_EXACT);
  });

  it("otorga POINTS_WINNER cuando acierta el ganador por marcador (sin penales)", () => {
    const result = scoreKnockoutPrediction({
      predictedHome: 3,
      predictedAway: 1,
      predictedPenaltyWinnerId: null,
      actualHome: 1,
      actualAway: 0,
      actualWinnerTeamId: HOME,
      homeTeamId: HOME,
      awayTeamId: AWAY,
    });

    expect(result).toEqual({
      points: POINTS_WINNER,
      exactHit: false,
      result: "WINNER",
    });
  });

  it("otorga POINTS_WINNER cuando predice empate + acierta el ganador de penales", () => {
    const result = scoreKnockoutPrediction({
      predictedHome: 1,
      predictedAway: 1,
      predictedPenaltyWinnerId: AWAY,
      actualHome: 2,
      actualAway: 2,
      actualWinnerTeamId: AWAY, // ganó visitante por penales
      homeTeamId: HOME,
      awayTeamId: AWAY,
    });

    expect(result).toEqual({
      points: POINTS_WINNER,
      exactHit: false,
      result: "WINNER",
    });
  });

  it("otorga POINTS_MISS cuando predice empate + le erra al ganador de penales", () => {
    const result = scoreKnockoutPrediction({
      predictedHome: 1,
      predictedAway: 1,
      predictedPenaltyWinnerId: HOME,
      actualHome: 2,
      actualAway: 2,
      actualWinnerTeamId: AWAY,
      homeTeamId: HOME,
      awayTeamId: AWAY,
    });

    expect(result.result).toBe("WRONG");
    expect(result.points).toBe(POINTS_MISS);
  });

  it("otorga POINTS_MISS cuando predice empate y NO elige ganador de penales (null)", () => {
    // Caso borde: el usuario predijo empate pero dejó el pick de penales vacío.
    // predictedWinnerId termina siendo null -> nunca puede matchear actualWinnerTeamId.
    const result = scoreKnockoutPrediction({
      predictedHome: 1,
      predictedAway: 1,
      predictedPenaltyWinnerId: null,
      actualHome: 2,
      actualAway: 2,
      actualWinnerTeamId: HOME,
      homeTeamId: HOME,
      awayTeamId: AWAY,
    });

    expect(result.result).toBe("WRONG");
    expect(result.points).toBe(POINTS_MISS);
  });

  it("otorga POINTS_MISS cuando predice el equipo que no avanzó", () => {
    const result = scoreKnockoutPrediction({
      predictedHome: 2,
      predictedAway: 0,
      predictedPenaltyWinnerId: null,
      actualHome: 0,
      actualAway: 1,
      actualWinnerTeamId: AWAY,
      homeTeamId: HOME,
      awayTeamId: AWAY,
    });

    expect(result.result).toBe("WRONG");
  });

  it("ignora predictedPenaltyWinnerId si el usuario no predijo empate", () => {
    // Si predictedHome !== predictedAway, el ganador se decide por marcador,
    // predictedPenaltyWinnerId no debería influir en absoluto.
    const result = scoreKnockoutPrediction({
      predictedHome: 2,
      predictedAway: 0,
      predictedPenaltyWinnerId: AWAY, // dato "sucio"/irrelevante, no debería usarse
      actualHome: 1,
      actualAway: 0,
      actualWinnerTeamId: HOME,
      homeTeamId: HOME,
      awayTeamId: AWAY,
    });

    expect(result.result).toBe("WINNER");
    expect(result.points).toBe(POINTS_WINNER);
  });
});
