"use client";

import { useState, useMemo } from "react";
import type {
  KnockoutMatch,
  KnockoutPhase,
  BracketSide,
  KnockoutPredictionsMap,
} from "../../models/types";
import { KNOCKOUT_ROUNDS } from "../../models/types";
import { KnockoutRoundTabs } from "./KnockoutRoundTabs";
import { BracketTabs } from "./BracketTabs";
import { KnockoutMatchRow } from "./KnockoutMatchRow";
import { colors, typography } from "@/shared/constants/designSystem";

interface KnockoutMatchesProps {
  userId: string;
  matches: KnockoutMatch[];
  predictions: KnockoutPredictionsMap;
  onAutosave: (
    matchId: string,
    home: number,
    away: number,
    penaltyWinnerId: string | null,
  ) => void;
}

export function KnockoutMatches({
  matches,
  predictions,
  onAutosave,
}: KnockoutMatchesProps) {
  const [activePhase, setActivePhase] =
    useState<KnockoutPhase>("QUARTER_FINAL");
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

  const handleChange = (
    matchId: string,
    values: {
      predictedHome: string;
      predictedAway: string;
      predictedPenaltyWinnerId: string | null;
    },
  ) => {
    const h = parseInt(values.predictedHome, 10);
    const a = parseInt(values.predictedAway, 10);
    if (isNaN(h) || isNaN(a)) return;
    onAutosave(matchId, h, a, values.predictedPenaltyWinnerId);
  };

  return (
    <div className="flex flex-col">
      <KnockoutRoundTabs
        activePhase={activePhase}
        onSelectPhase={handleSelectPhase}
      />

      {roundConfig.hasBracket && (
        <BracketTabs active={activeBracket} onSelect={setActiveBracket} />
      )}

      <div className="mx-1">
        <div className="flex items-center justify-between mx-3 ">
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.xl,
              fontWeight: 700,
              color: colors.text,
            }}
          >
            {roundConfig.label}
            {roundConfig.hasBracket ? ` — LLAVE ${activeBracket}` : ""}
          </span>
        </div>

        <div className="flex flex-col gap-2 p-2">
          {visibleMatches.length === 0 ? (
            <span
              className="text-center py-6"
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.sm,
                color: colors.mutedText,
              }}
            >
              Todavía no hay partidos cargados para esta ronda.
            </span>
          ) : (
            visibleMatches.map((match) => {
              const pred = predictions[match.id];
              return (
                <KnockoutMatchRow
                  key={match.id}
                  match={match}
                  predictedHome={
                    pred?.predictedHome != null
                      ? String(pred.predictedHome)
                      : ""
                  }
                  predictedAway={
                    pred?.predictedAway != null
                      ? String(pred.predictedAway)
                      : ""
                  }
                  predictedPenaltyWinnerId={
                    pred?.predictedPenaltyWinnerId ?? null
                  }
                  onChange={(values) => handleChange(match.id, values)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
