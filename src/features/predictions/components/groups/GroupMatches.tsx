"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type {
  GroupData,
  GroupPredictionsFormValues,
  PredictionsMap,
} from "../../models/types";
import { buildGroupDefaultValues } from "../../utils/predictionHelpers";
import { useGroupAutosave } from "./useGroupAutoSave";
import { MatchRow } from "./MatchRow";
import { colors, borders, typography } from "@/shared/constants/designSystem";

const POINTS_LEGEND = [
  { points: "+3", label: "exacto", color: colors.primary },
  { points: "+1", label: "ganador", color: "#f59f0be4" },
  { points: "0", label: "fallo", color: colors.secondary },
] as const;

interface GroupMatchesProps {
  groupData: GroupData;
  initialPredictions: PredictionsMap;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
  nextGroupLabel?: string;
  prevGroupLabel?: string;
  onAutosave: (matchId: string, home: number, away: number) => void;
}

export function GroupMatches({
  groupData,
  initialPredictions,
  onNavigateNext,
  onNavigatePrev,
  nextGroupLabel,
  prevGroupLabel,
  onAutosave,
}: GroupMatchesProps) {
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);

  const { register, watch, setFocus } = useForm<GroupPredictionsFormValues>({
    defaultValues: buildGroupDefaultValues(
      groupData.matches,
      initialPredictions,
    ),
  });

  useGroupAutosave({
    watch,
    setFocus,
    matches: groupData.matches,
    onAutosave,
    onNavigateNext,
    setActiveMatchIndex,
  });

  return (
    <div className="flex flex-col mt-1">
      <div className="flex justify-end gap-3 px-4">
        {POINTS_LEGEND.map(({ points, label, color }) => (
          <span
            key={label}
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.sm,
              color,
            }}
          >
            <strong>{points}</strong> {label}
          </span>
        ))}
      </div>

      <div className="mx-2" style={{ border: borders.default }}>
        <div className="flex items-center justify-between px-6 py-1">
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.xl,
              fontWeight: 700,
              color: colors.text,
            }}
          >
            Grupo {groupData.group}
          </span>
        </div>

        <div className="flex flex-col">
          {groupData.matches.map((match, index) => (
            <MatchRow
              key={match.id}
              match={match}
              index={index}
              isActive={activeMatchIndex === index}
              register={register}
              watch={watch}
              onFocusRequest={() => {
                setActiveMatchIndex(index);
                setFocus(`matches.${index}.predictedHome`);
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between px-3 pt-4 pb-1">
        {prevGroupLabel ? (
          <button
            onClick={onNavigatePrev}
            className="transition-opacity hover:opacity-100"
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.md,
              fontWeight: 700,
              color: colors.mutedText,
              letterSpacing: "0.10em",
              opacity: 0.8,
              background: "none",
              border: "none",
            }}
          >
            ← GRUPO {prevGroupLabel}
          </button>
        ) : (
          <span />
        )}

        {nextGroupLabel && (
          <button
            onClick={onNavigateNext}
            className="transition-opacity hover:opacity-100"
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.md,
              fontWeight: 700,
              color: colors.mutedText,
              letterSpacing: "0.10em",
              opacity: 0.8,
              background: "none",
              border: "none",
            }}
          >
            GRUPO {nextGroupLabel} →
          </button>
        )}
      </div>
    </div>
  );
}
