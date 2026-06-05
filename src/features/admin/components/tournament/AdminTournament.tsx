"use client";

import { useState, useCallback } from "react";
import { setTournamentResult } from "../../actions/setTournamentResult";
import { TeamSelector } from "@/features/predictions/components/tournament/TeamSelector";
import { PlayerSelector } from "@/features/predictions/components/tournament/PlayerSelector";
import type {
  TeamOption,
  PlayerOption,
} from "@/features/predictions/models/types";
import { colors, borders, typography } from "@/shared/constants/designSystem";

interface AdminTournamentProps {
  teams: TeamOption[];
  players: PlayerOption[];
  initialResult: TournamentResultState | null;
}

export interface TournamentResultState {
  championTeamId: string | null;
  runnerUpTeamId: string | null;
  surpriseTeamId: string | null;
  disappointmentTeamId: string | null;
  mvpPlayerId: string | null;
  goldenBootPlayerId: string | null;
  bestGoalkeeperPlayerId: string | null;
  revelationPlayerId: string | null;
}

const EMPTY: TournamentResultState = {
  championTeamId: null,
  runnerUpTeamId: null,
  surpriseTeamId: null,
  disappointmentTeamId: null,
  mvpPlayerId: null,
  goldenBootPlayerId: null,
  bestGoalkeeperPlayerId: null,
  revelationPlayerId: null,
};

const FIELDS: {
  key: keyof TournamentResultState;
  label: string;
  type: "team" | "player";
}[] = [
  { key: "championTeamId", label: "Campeón", type: "team" },
  { key: "runnerUpTeamId", label: "Subcampeón", type: "team" },
  { key: "surpriseTeamId", label: "Sorpresa", type: "team" },
  { key: "disappointmentTeamId", label: "Decepción", type: "team" },
  { key: "mvpPlayerId", label: "MVP", type: "player" },
  { key: "goldenBootPlayerId", label: "Bota de Oro", type: "player" },
  { key: "bestGoalkeeperPlayerId", label: "Mejor Arquero", type: "player" },
  { key: "revelationPlayerId", label: "Revelación", type: "player" },
];

export function AdminTournament({
  teams,
  players,
  initialResult,
}: AdminTournamentProps) {
  const [data, setData] = useState<TournamentResultState>(
    initialResult ?? EMPTY,
  );
  const [activeField, setActiveField] = useState<
    keyof TournamentResultState | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (key: keyof TournamentResultState, value: string | null) => {
      setData((prev) => ({ ...prev, [key]: value }));
      setSaved(false);
    },
    [],
  );

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    const result = await setTournamentResult(data);
    if (result.success) {
      setSaved(true);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {FIELDS.map(({ key, label, type }) => (
        <div key={key} style={{ border: borders.default }}>
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: borders.default }}
          >
            <span
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.md,
                fontWeight: 700,
                color: colors.text,
              }}
            >
              {label}
            </span>
          </div>
          <div className="px-4 py-3">
            {type === "team" ? (
              <TeamSelector
                teams={teams}
                value={data[key]}
                onChange={(v) => handleChange(key, v)}
                isActive={activeField === key}
                onActivate={() => setActiveField(key)}
              />
            ) : (
              <PlayerSelector
                players={players}
                value={data[key]}
                onChange={(v) => handleChange(key, v)}
                isActive={activeField === key}
                onActivate={() => setActiveField(key)}
              />
            )}
          </div>
        </div>
      ))}

      {error && (
        <span style={{ fontSize: typography.sizes.sm, color: "red" }}>
          {error}
        </span>
      )}

      <button
        onClick={handleSave}
        disabled={loading}
        style={{
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.md,
          fontWeight: 700,
          color: saved ? colors.primary : colors.text,
          border: `1px solid ${saved ? colors.primary : colors.border}`,
          padding: "10px",
          background: "none",
          cursor: loading ? "not-allowed" : "pointer",
          letterSpacing: "0.05em",
          opacity: loading ? 0.5 : 1,
        }}
      >
        {loading ? "Guardando..." : saved ? "Guardado ✓" : "Guardar resultados"}
      </button>
    </div>
  );
}
