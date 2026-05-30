// PredictionCard.tsx

"use client";

import type {
  TournamentCardConfig,
  TeamOption,
  PlayerOption,
  TournamentPredictionData,
} from "../../models/types";
import { TeamSelector } from "./TeamSelector";
import { PlayerSelector } from "./PlayerSelector";
import { colors, borders, typography } from "@/shared/constants/designSystem";

interface PredictionCardProps {
  config: TournamentCardConfig;
  data: TournamentPredictionData;
  teams: TeamOption[];
  players: PlayerOption[];
  isActive: boolean;
  onActivate: () => void;
  onChange: (value: string | null) => void;
}

export function PredictionCard({
  config,
  data,
  teams,
  players,
  isActive,
  onActivate,
  onChange,
}: PredictionCardProps) {
  const value = data[config.field];
  const isCompleted = value !== null;

  return (
    <div
      className="flex flex-col mx-2  mb-5"
      style={{ border: borders.default }}
    >
      {/* Header: TÍTULO — PUNTOS */}
      <div
        className="flex items-center justify-between px-4 py-1"
        style={{ borderBottom: borders.default }}
      >
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.xl,
            fontWeight: 700,
            color: colors.text,
          }}
        >
          {config.label}
        </span>
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.lg,
            fontWeight: 700,
            color: colors.text,
          }}
        >
          +20 puntos
        </span>
      </div>

      {/* Selector */}
      <div className="px-5 py-5.5" onClick={onActivate}>
        {config.type === "team" ? (
          <TeamSelector
            teams={teams}
            value={value}
            onChange={onChange}
            isActive={isActive}
            onActivate={onActivate}
          />
        ) : (
          <PlayerSelector
            players={players}
            value={value}
            onChange={onChange}
            isActive={isActive}
            onActivate={onActivate}
            filterPosition={config.playerPosition}
          />
        )}
      </div>
    </div>
  );
}
