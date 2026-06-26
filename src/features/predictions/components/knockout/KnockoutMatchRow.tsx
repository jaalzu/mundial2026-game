"use client";

import { useState } from "react";
import type { KnockoutMatch } from "../../models/types";
import { formatMatchDate } from "../../utils/matchDate";
import { isMatchLocked } from "../../utils/matchScoring";
import { TeamSlot } from "./TeamSlot";
import { ScoreInput } from "./ScoreInput";
import { colors, borders, typography } from "@/shared/constants/designSystem";

interface KnockoutMatchRowProps {
  match: KnockoutMatch;
  predictedHome: string;
  predictedAway: string;
  predictedPenaltyWinnerId: string | null;
  onChange: (values: {
    predictedHome: string;
    predictedAway: string;
    predictedPenaltyWinnerId: string | null;
  }) => void;
}

export function KnockoutMatchRow({
  match,
  predictedHome,
  predictedAway,
  predictedPenaltyWinnerId,
  onChange,
}: KnockoutMatchRowProps) {
  const [home, setHome] = useState(predictedHome);
  const [away, setAway] = useState(predictedAway);
  const [penalty, setPenalty] = useState(predictedPenaltyWinnerId);

  const hasBothTeams = !!match.homeTeam && !!match.awayTeam;
  const isLocked = isMatchLocked({
    status: match.status,
    startsAt: match.startsAt,
  });
  const isFinished = match.status === "FINISHED";

  const homeIsFilled = home !== "" && !isNaN(parseInt(home, 10));
  const awayIsFilled = away !== "" && !isNaN(parseInt(away, 10));
  const isDraw =
    homeIsFilled && awayIsFilled && parseInt(home, 10) === parseInt(away, 10);

  // Solo dispara onChange cuando la predicción está "completa":
  // si no hay empate, alcanza con los dos números; si hay empate, hace falta también el penal.
  const commit = (next: {
    home: string;
    away: string;
    penalty: string | null;
  }) => {
    const h = parseInt(next.home, 10);
    const a = parseInt(next.away, 10);
    if (isNaN(h) || isNaN(a)) return;
    if (h === a && !next.penalty) return; // empate sin penal elegido: no autosave todavía

    onChange({
      predictedHome: next.home,
      predictedAway: next.away,
      predictedPenaltyWinnerId: h === a ? next.penalty : null,
    });
  };

  const handleHomeChange = (value: string) => {
    setHome(value);
    commit({ home: value, away, penalty });
  };

  const handleAwayChange = (value: string) => {
    setAway(value);
    commit({ home, away: value, penalty });
  };

  const handlePenaltyChange = (teamId: string) => {
    setPenalty(teamId);
    commit({ home, away, penalty: teamId });
  };

  if (!hasBothTeams) {
    return (
      <div
        className="flex flex-col items-center justify-center px-1 py-4 "
        style={{ border: borders.default, minHeight: "90px" }}
      >
        <div
          className="grid items-center w-full"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}
        >
          <TeamSlot team={match.homeTeam} />
          <span
            style={{
              fontSize: typography.sizes.xs,
              color: colors.mutedText,
              padding: "0 18px",
            }}
          >
            vs
          </span>
          <TeamSlot team={match.awayTeam} />
        </div>
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.xs,
            color: colors.mutedText,
            marginTop: "4px",
          }}
        >
          Cruce por confirmar
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col px-1 pb-3"
      style={{
        border: isLocked ? `1px solid ${colors.primary}22` : borders.default,
      }}
    >
      <div className="w-full text-center pt-1 shrink-0">
        <p
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.xs,
            color: colors.mutedText,
          }}
        >
          {match.startsAt
            ? formatMatchDate(match.startsAt)
            : "Fecha a confirmar"}
        </p>
      </div>

      <div
        className="grid items-center w-full"
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        <TeamSlot team={match.homeTeam} />
        <div className="flex items-center gap-1 px-2 justify-center">
          <ScoreInput
            value={home}
            onChange={handleHomeChange}
            isFilled={homeIsFilled}
            disabled={isLocked}
          />
          <span
            style={{
              fontSize: typography.sizes.xs,
              color: colors.mutedText,
              fontFamily: typography.fontFamily,
            }}
          >
            vs
          </span>
          <ScoreInput
            value={away}
            onChange={handleAwayChange}
            isFilled={awayIsFilled}
            disabled={isLocked}
          />
        </div>
        <TeamSlot team={match.awayTeam} />
      </div>

      {isDraw && !isLocked && (
        <div className="flex items-center justify-center gap-4 mt-2">
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.xs,
              color: colors.mutedText,
            }}
          >
            ¿Quién avanza por penales?
          </span>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={`penalty-${match.id}`}
              checked={penalty === match.homeTeam!.id}
              onChange={() => handlePenaltyChange(match.homeTeam!.id)}
            />
            <span
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.sm,
                color: colors.text,
              }}
            >
              {match.homeTeam!.code}
            </span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={`penalty-${match.id}`}
              checked={penalty === match.awayTeam!.id}
              onChange={() => handlePenaltyChange(match.awayTeam!.id)}
            />
            <span
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.sm,
                color: colors.text,
              }}
            >
              {match.awayTeam!.code}
            </span>
          </label>
        </div>
      )}

      {isLocked &&
        isFinished &&
        match.scoreHome != null &&
        match.scoreAway != null && (
          <div className="w-full text-center mt-1">
            <span
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.sm,
                color: colors.mutedText,
              }}
            >
              Resultado:{" "}
              <strong style={{ color: colors.text }}>
                {match.homeTeam!.code} {match.scoreHome} — {match.scoreAway}{" "}
                {match.awayTeam!.code}
              </strong>
              {match.winnerTeamId && (
                <>
                  {" — Avanza "}
                  <strong style={{ color: colors.primary }}>
                    {match.winnerTeamId === match.homeTeam!.id
                      ? match.homeTeam!.code
                      : match.awayTeam!.code}
                  </strong>
                </>
              )}
            </span>
          </div>
        )}
    </div>
  );
}
