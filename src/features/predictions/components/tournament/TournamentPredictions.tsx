"use client";

import { useState, useEffect, useCallback } from "react";
import { useTournamentPredictionsStore } from "../../store/useTournamentPredictionsStore";
import { saveTournamentPrediction } from "../../actions/saveTournamentPredictions";
import { TOURNAMENT_CARDS } from "../../utils/tournamentCards";
import { PredictionCard } from "./PredictionCard";
import type {
  TournamentPredictionData,
  TournamentPredictionField,
  TeamOption,
  PlayerOption,
} from "../../models/types";
import { colors, typography } from "@/shared/constants/designSystem";

const TOURNAMENT_DEADLINE = new Date("2026-06-14T00:00:00-05:00");

interface TournamentPredictionsProps {
  userId: string;
  initialData: TournamentPredictionData | null;
  teams: TeamOption[];
  players: PlayerOption[];
}

export function TournamentPredictions({
  userId,
  initialData,
  teams,
  players,
}: TournamentPredictionsProps) {
  const [activeField, setActiveField] =
    useState<TournamentPredictionField | null>(null);
  const { data, hydrate, setField } = useTournamentPredictionsStore();

  useEffect(() => {
    hydrate(initialData);
  }, [hydrate, initialData]);

  const isLocked = new Date() > TOURNAMENT_DEADLINE;
  const completedCount = Object.values(data).filter(Boolean).length;
  const totalCount = TOURNAMENT_CARDS.length;

  const handleChange = useCallback(
    async (field: TournamentPredictionField, value: string | null) => {
      if (isLocked) return;
      setField(field, value);
      await saveTournamentPrediction(userId, field, value);
    },
    [userId, setField, isLocked],
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-1">
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.md,
            color:
              completedCount === totalCount ? colors.primary : colors.mutedText,
          }}
        >
          {completedCount}/{totalCount}
        </span>
        {isLocked && (
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.xs,
              color: colors.mutedText,
              letterSpacing: "0.05em",
            }}
          >
            CERRADO
          </span>
        )}
      </div>

      <div className="flex flex-col">
        {TOURNAMENT_CARDS.map((config) => (
          <PredictionCard
            key={config.field}
            config={config}
            data={data}
            teams={teams}
            players={players}
            isActive={!isLocked && activeField === config.field}
            onActivate={() => !isLocked && setActiveField(config.field)}
            onChange={(value) => handleChange(config.field, value)}
            isLocked={isLocked}
          />
        ))}
      </div>
    </div>
  );
}
