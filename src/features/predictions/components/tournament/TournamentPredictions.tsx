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

  const completedCount = Object.values(data).filter(Boolean).length;
  const totalCount = TOURNAMENT_CARDS.length;

  const handleChange = useCallback(
    async (field: TournamentPredictionField, value: string | null) => {
      // Optimistic update
      setField(field, value);

      const result = await saveTournamentPrediction(userId, field, value);
      if (!result.success) {
        console.error("[TournamentPredictions] Autosave failed:", result.error);
        // TODO: toast notification
      }
    },
    [userId, setField],
  );

  return (
    <div className="flex flex-col ">
      {/* Progress header */}
      <div className="flex items-center justify-between px-5 py-1 ">
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
      </div>

      {/* Cards */}
      <div className="flex flex-col  ">
        {TOURNAMENT_CARDS.map((config) => (
          <PredictionCard
            key={config.field}
            config={config}
            data={data}
            teams={teams}
            players={players}
            isActive={activeField === config.field}
            onActivate={() => setActiveField(config.field)}
            onChange={(value) => handleChange(config.field, value)}
          />
        ))}
      </div>
    </div>
  );
}
