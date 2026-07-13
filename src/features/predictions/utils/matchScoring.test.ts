import { describe, it, expect, vi, afterEach } from "vitest";
import { isMatchLocked, getKnockoutMatchDisplay } from "./matchScoring";

describe("isMatchLocked", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("está bloqueado si el status es FINISHED, sin importar la fecha", () => {
    const result = isMatchLocked({
      status: "FINISHED",
      startsAt: "2026-12-31T23:59:59.000Z", // fecha futura, no debería importar
    });
    expect(result).toBe(true);
  });

  it("NO está bloqueado si no hay startsAt (fecha por confirmar)", () => {
    const result = isMatchLocked({
      status: "SCHEDULED",
      startsAt: null,
    });
    expect(result).toBe(false);
  });

  it("NO está bloqueado antes de la hora de inicio + 3hs de gracia", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-15T11:59:00.000Z"));

    const result = isMatchLocked({
      status: "SCHEDULED",
      startsAt: "2026-06-15T12:00:00.000Z",
    });
    expect(result).toBe(false);
  });

  it("NO está bloqueado justo al inicio del partido (dentro de la ventana de 3hs)", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-15T12:00:00.000Z"));

    const result = isMatchLocked({
      status: "SCHEDULED",
      startsAt: "2026-06-15T12:00:00.000Z",
    });
    expect(result).toBe(false);
  });

  it("NO está bloqueado 2:59hs después del inicio (todavía dentro del margen)", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-15T14:59:00.000Z"));

    const result = isMatchLocked({
      status: "SCHEDULED",
      startsAt: "2026-06-15T12:00:00.000Z",
    });
    expect(result).toBe(false);
  });

  it("SÍ está bloqueado justo después de las 3hs de margen", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-15T15:00:01.000Z"));

    const result = isMatchLocked({
      status: "SCHEDULED",
      startsAt: "2026-06-15T12:00:00.000Z",
    });
    expect(result).toBe(true);
  });

  it("SÍ está bloqueado mucho tiempo después del inicio", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-16T12:00:00.000Z"));

    const result = isMatchLocked({
      status: "SCHEDULED",
      startsAt: "2026-06-15T12:00:00.000Z",
    });
    expect(result).toBe(true);
  });
});

describe("getKnockoutMatchDisplay", () => {
  const HOME = { id: "team-home" };
  const AWAY = { id: "team-away" };

  it("devuelve el label de exact score cuando el marcador coincide", () => {
    const { label } = getKnockoutMatchDisplay("2", "1", null, {
      scoreHome: 2,
      scoreAway: 1,
      winnerTeamId: HOME.id,
      homeTeam: HOME,
      awayTeam: AWAY,
    });
    expect(label).toBe("+6");
  });

  it("devuelve el label de winner cuando acierta el ganador de penales en empate", () => {
    const { label } = getKnockoutMatchDisplay("1", "1", AWAY.id, {
      scoreHome: 1,
      scoreAway: 1,
      winnerTeamId: AWAY.id,
      homeTeam: HOME,
      awayTeam: AWAY,
    });
    expect(label).toBe("+2");
  });

  it("devuelve 0 cuando le erra al ganador de penales en empate", () => {
    const { label } = getKnockoutMatchDisplay("1", "1", HOME.id, {
      scoreHome: 1,
      scoreAway: 1,
      winnerTeamId: AWAY.id,
      homeTeam: HOME,
      awayTeam: AWAY,
    });
    expect(label).toBe("0");
  });
});
