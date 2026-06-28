"use client";

import { useState, useMemo } from "react";
import type {
  KnockoutMatch,
  KnockoutPhase,
  BracketSide,
  TeamOption,
} from "@/features/predictions/models/types";
import { KNOCKOUT_ROUNDS } from "@/features/predictions/models/types";
import { AdminKnockoutTabs } from "./AdminKnockoutTabs";
import { AdminKnockoutMatchRow } from "./AdminKnockoutMatchRow";
import { colors, borders, typography } from "@/shared/constants/designSystem";

interface AdminKnockoutMatchesProps {
  initialMatches: KnockoutMatch[];
  teams: TeamOption[];
}

export function AdminKnockoutMatches({
  initialMatches,
  teams,
}: AdminKnockoutMatchesProps) {
  const [matches, setMatches] = useState<KnockoutMatch[]>(initialMatches);
  const [activePhase, setActivePhase] = useState<KnockoutPhase>("ROUND_OF_16");
  const [activeBracket, setActiveBracket] = useState<BracketSide>(1);

  const roundConfig = KNOCKOUT_ROUNDS.find((r) => r.phase === activePhase)!;

  const phaseMatches = useMemo(
    () => matches.filter((m) => m.phase === activePhase),
    [matches, activePhase],
  );

  const visibleMatches = useMemo(() => {
    if (!roundConfig.hasBracket) return phaseMatches;
    return phaseMatches.filter((m) => m.bracket === activeBracket);
  }, [phaseMatches, roundConfig.hasBracket, activeBracket]);

  const handleSelectPhase = (phase: KnockoutPhase) => {
    setActivePhase(phase);
    setActiveBracket(1);
  };

  const handleUpdate = (updated: KnockoutMatch) => {
    setMatches((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  const pendingCount = phaseMatches.filter(
    (m) => !m.homeTeam || !m.awayTeam,
  ).length;

  return (
    <div className="flex flex-col">
      <AdminKnockoutTabs
        activePhase={activePhase}
        onSelectPhase={handleSelectPhase}
      />

      {roundConfig.hasBracket && (
        <div className="flex gap-3 mb-4">
          {[1, 2].map((bracket) => {
            const isActive = activeBracket === bracket;
            return (
              <button
                key={bracket}
                onClick={() => setActiveBracket(bracket as BracketSide)}
                className="flex-1 py-1.5 transition-all"
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: typography.sizes.md,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? colors.text : colors.mutedText,
                  border: isActive ? borders.light : borders.default,
                  backgroundColor: colors.background,
                }}
              >
                LLAVE {bracket}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.lg,
            fontWeight: 700,
            color: colors.text,
          }}
        >
          {roundConfig.label}
          {roundConfig.hasBracket ? ` — LLAVE ${activeBracket}` : ""}
        </span>
        {pendingCount > 0 && (
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.xs,
              color: colors.mutedText,
            }}
          >
            {pendingCount} sin asignar
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {visibleMatches.map((match) => (
          <AdminKnockoutMatchRow
            key={match.id}
            match={match}
            teams={teams}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
