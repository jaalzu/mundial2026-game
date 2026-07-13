import { describe, it, expect } from "vitest";
import { scoreTournamentPrediction } from "./scoreTournament";

const empty = {
  championTeamId: null,
  runnerUpTeamId: null,
  surpriseTeamId: null,
  disappointmentTeamId: null,
  mvpPlayerId: null,
  goldenBootPlayerId: null,
  bestGoalkeeperPlayerId: null,
  revelationPlayerId: null,
};

describe("scoreTournamentPrediction", () => {
  it("suma todos los puntos cuando acierta absolutamente todo", () => {
    const prediction = {
      ...empty,
      championTeamId: "arg",
      runnerUpTeamId: "fra",
      surpriseTeamId: "mar",
      disappointmentTeamId: "ger",
      mvpPlayerId: "messi",
      goldenBootPlayerId: "mbappe",
      bestGoalkeeperPlayerId: "martinez",
      revelationPlayerId: "julian",
    };
    const result = { ...prediction };

    expect(scoreTournamentPrediction(prediction, result)).toBe(145);
  });

  it("devuelve 0 cuando no acierta ningún campo", () => {
    const prediction = {
      ...empty,
      championTeamId: "arg",
      mvpPlayerId: "messi",
    };
    const result = { ...empty, championTeamId: "bra", mvpPlayerId: "vini" };

    expect(scoreTournamentPrediction(prediction, result)).toBe(0);
  });

  it("suma parcialmente cuando acierta solo algunos campos", () => {
    const prediction = {
      ...empty,
      championTeamId: "arg",
      runnerUpTeamId: "fra",
      mvpPlayerId: "messi",
    };
    const result = {
      ...empty,
      championTeamId: "arg",
      runnerUpTeamId: "fra",
      mvpPlayerId: "vini",
    };

    expect(scoreTournamentPrediction(prediction, result)).toBe(45);
  });

  it("no suma puntos si predicción y resultado están ambos vacíos en un campo (null vs null)", () => {
    const prediction = { ...empty, mvpPlayerId: null };
    const result = { ...empty, mvpPlayerId: null };

    expect(scoreTournamentPrediction(prediction, result)).toBe(0);
  });

  it("no suma puntos si el usuario predijo algo pero el resultado oficial aún es null", () => {
    const prediction = { ...empty, championTeamId: "arg" };
    const result = { ...empty, championTeamId: null };

    expect(scoreTournamentPrediction(prediction, result)).toBe(0);
  });

  it("es simétrico respecto al orden de comparación de cada campo", () => {
    const prediction = { ...empty, goldenBootPlayerId: "mbappe" };
    const result = { ...empty, goldenBootPlayerId: "mbappe" };

    expect(scoreTournamentPrediction(prediction, result)).toBe(20);
  });
});
