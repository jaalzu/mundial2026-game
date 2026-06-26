"use client";

import { useState } from "react";
import type {
  KnockoutMatch,
  TeamOption,
} from "@/features/predictions/models/types";
import { colors, borders, typography } from "@/shared/constants/designSystem";

interface AdminKnockoutMatchRowProps {
  match: KnockoutMatch;
  teams: TeamOption[];
  onUpdate: (updated: KnockoutMatch) => void;
}

export function AdminKnockoutMatchRow({
  match,
  teams,
  onUpdate,
}: AdminKnockoutMatchRowProps) {
  const [homeTeamId, setHomeTeamId] = useState(match.homeTeam?.id ?? "");
  const [awayTeamId, setAwayTeamId] = useState(match.awayTeam?.id ?? "");
  const [startsAt, setStartsAt] = useState(
    match.startsAt ? match.startsAt.slice(0, 16) : "",
  );
  const [scoreHome, setScoreHome] = useState(
    match.scoreHome != null ? String(match.scoreHome) : "",
  );
  const [scoreAway, setScoreAway] = useState(
    match.scoreAway != null ? String(match.scoreAway) : "",
  );
  const [penaltyWinnerId, setPenaltyWinnerId] = useState<string>("");

  const hasBothTeams = !!match.homeTeam && !!match.awayTeam;
  const isFinished = match.status === "FINISHED";

  const isDraw =
    scoreHome !== "" &&
    scoreAway !== "" &&
    !isNaN(parseInt(scoreHome, 10)) &&
    !isNaN(parseInt(scoreAway, 10)) &&
    parseInt(scoreHome, 10) === parseInt(scoreAway, 10);

  const findTeam = (id: string) => teams.find((t) => t.id === id) ?? null;

  const handleAssignTeams = () => {
    if (!homeTeamId || !awayTeamId || homeTeamId === awayTeamId) return;
    onUpdate({
      ...match,
      homeTeam: findTeam(homeTeamId),
      awayTeam: findTeam(awayTeamId),
      startsAt: startsAt ? new Date(startsAt).toISOString() : null,
    });
  };

  const handleFinish = () => {
    const sh = parseInt(scoreHome, 10);
    const sa = parseInt(scoreAway, 10);
    if (isNaN(sh) || isNaN(sa)) return;

    let winnerTeamId: string | null;
    if (sh > sa) {
      winnerTeamId = match.homeTeam?.id ?? null;
    } else if (sa > sh) {
      winnerTeamId = match.awayTeam?.id ?? null;
    } else {
      if (!penaltyWinnerId) return; // empate sin penal elegido: no deja cerrar
      winnerTeamId = penaltyWinnerId;
    }

    onUpdate({
      ...match,
      status: "FINISHED",
      scoreHome: sh,
      scoreAway: sa,
      winnerTeamId,
    });
  };

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{ border: borders.default }}
    >
      {!hasBothTeams ? (
        // ── Estado TBD: asignar equipos + fecha ──────────────────────────
        <div className="flex flex-col gap-2">
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.xs,
              color: colors.mutedText,
              letterSpacing: "0.05em",
            }}
          >
            ASIGNAR EQUIPOS
          </span>
          <div className="flex gap-2 items-center">
            <select
              value={homeTeamId}
              onChange={(e) => setHomeTeamId(e.target.value)}
              className="flex-1 p-1"
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.sm,
                color: colors.text,
                backgroundColor: colors.background,
                border: borders.default,
              }}
            >
              <option value="">Equipo local...</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <span style={{ color: colors.mutedText }}>vs</span>
            <select
              value={awayTeamId}
              onChange={(e) => setAwayTeamId(e.target.value)}
              className="flex-1 p-1"
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.sm,
                color: colors.text,
                backgroundColor: colors.background,
                border: borders.default,
              }}
            >
              <option value="">Equipo visitante...</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="datetime-local"
            value={startsAt}
            onChange={(e) => setStartsAt(e.target.value)}
            className="p-1"
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.sm,
              color: colors.text,
              backgroundColor: colors.background,
              border: borders.default,
            }}
          />
          <button
            onClick={handleAssignTeams}
            disabled={!homeTeamId || !awayTeamId || homeTeamId === awayTeamId}
            className="py-1.5"
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.sm,
              fontWeight: 700,
              color: colors.text,
              border: borders.light,
              backgroundColor: colors.background,
              opacity:
                !homeTeamId || !awayTeamId || homeTeamId === awayTeamId
                  ? 0.4
                  : 1,
            }}
          >
            GUARDAR CRUCE
          </button>
        </div>
      ) : (
        // ── Equipos ya asignados ─────────────────────────────────────────
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.md,
                color: colors.text,
                fontWeight: 700,
              }}
            >
              {match.homeTeam!.name} vs {match.awayTeam!.name}
            </span>
            {isFinished && (
              <span
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: typography.sizes.xs,
                  color: colors.primary,
                  letterSpacing: "0.05em",
                }}
              >
                CERRADO
              </span>
            )}
          </div>

          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.xs,
              color: colors.mutedText,
            }}
          >
            {match.startsAt
              ? new Date(match.startsAt).toLocaleString("es-AR")
              : "Fecha por confirmar"}
          </span>

          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={scoreHome}
              onChange={(e) => setScoreHome(e.target.value.replace(/\D/g, ""))}
              disabled={isFinished}
              className="text-center p-1"
              style={{
                width: "42px",
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.lg,
                color: colors.text,
                backgroundColor: colors.background,
                border: borders.default,
                opacity: isFinished ? 0.5 : 1,
              }}
            />
            <span style={{ color: colors.mutedText }}>—</span>
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={scoreAway}
              onChange={(e) => setScoreAway(e.target.value.replace(/\D/g, ""))}
              disabled={isFinished}
              className="text-center p-1"
              style={{
                width: "42px",
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.lg,
                color: colors.text,
                backgroundColor: colors.background,
                border: borders.default,
                opacity: isFinished ? 0.5 : 1,
              }}
            />

            {!isFinished && (
              <button
                onClick={handleFinish}
                disabled={
                  scoreHome === "" ||
                  scoreAway === "" ||
                  (isDraw && !penaltyWinnerId)
                }
                className="ml-auto py-1.5 px-3"
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: typography.sizes.sm,
                  fontWeight: 700,
                  color: colors.text,
                  border: borders.light,
                  backgroundColor: colors.background,
                  opacity:
                    scoreHome === "" ||
                    scoreAway === "" ||
                    (isDraw && !penaltyWinnerId)
                      ? 0.4
                      : 1,
                }}
              >
                CERRAR PARTIDO
              </button>
            )}

            {isFinished && (
              <span
                className="ml-auto"
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: typography.sizes.sm,
                  color: colors.text,
                }}
              >
                Avanza:{" "}
                <strong style={{ color: colors.primary }}>
                  {match.winnerTeamId === match.homeTeam!.id
                    ? match.homeTeam!.name
                    : match.awayTeam!.name}
                </strong>
              </span>
            )}
          </div>

          {isDraw && !isFinished && (
            <div className="flex items-center gap-4">
              <span
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: typography.sizes.xs,
                  color: colors.mutedText,
                }}
              >
                Empate — ¿quién avanza por penales?
              </span>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name={`penalty-${match.id}`}
                  checked={penaltyWinnerId === match.homeTeam?.id}
                  onChange={() => setPenaltyWinnerId(match.homeTeam?.id ?? "")}
                />
                <span
                  style={{
                    fontFamily: typography.fontFamily,
                    fontSize: typography.sizes.sm,
                    color: colors.text,
                  }}
                >
                  {match.homeTeam!.name}
                </span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name={`penalty-${match.id}`}
                  checked={penaltyWinnerId === match.awayTeam?.id}
                  onChange={() => setPenaltyWinnerId(match.awayTeam?.id ?? "")}
                />
                <span
                  style={{
                    fontFamily: typography.fontFamily,
                    fontSize: typography.sizes.sm,
                    color: colors.text,
                  }}
                >
                  {match.awayTeam!.name}
                </span>
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
