"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { GroupData } from "../models/types";
import { MatchRow } from "./MatchRow";
import { colors, borders, typography } from "@/shared/constants/designSystem";

// Form shape: one entry per match in the group
export interface GroupPredictionsForm {
  matches: {
    matchId: string;
    predictedHome: string;
    predictedAway: string;
  }[];
}

interface GroupMatchesProps {
  groupData: GroupData;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
  nextGroupLabel?: string;
  prevGroupLabel?: string;
  onAutosave?: (matchId: string, home: number, away: number) => void;
}

// esto iria en constants?
const POINTS_LEGEND = [
  { points: "+3", label: "exacto", color: colors.primary },
  { points: "+1", label: "ganador", color: "#f59f0be4" },
  { points: "0", label: "fallo", color: colors.secondary },
];

export function GroupMatches({
  groupData,
  onNavigateNext,
  onNavigatePrev,
  nextGroupLabel,
  prevGroupLabel,
  onAutosave,
}: GroupMatchesProps) {
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);

  const { register, watch, setFocus } = useForm<GroupPredictionsForm>({
    defaultValues: {
      matches: groupData.matches.map((m) => ({
        matchId: m.id,
        predictedHome: "",
        predictedAway: "",
      })),
    },
  });

  // Autosave: watch all fields, fire when both home+away are filled for a match
  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (!name) return;

      // Extract index from field name e.g. "matches.2.predictedHome"
      const match = name.match(/^matches\.(\d+)\./);
      if (!match) return;

      const idx = parseInt(match[1], 10);
      const entry = values.matches?.[idx];
      if (!entry) return;

      const home = parseInt(entry.predictedHome ?? "", 10);
      const away = parseInt(entry.predictedAway ?? "", 10);

      if (!isNaN(home) && !isNaN(away)) {
        onAutosave?.(groupData.matches[idx].id, home, away);

        // Advance focus to next match
        const nextIdx = idx + 1;
        if (nextIdx < groupData.matches.length) {
          setActiveMatchIndex(nextIdx);
          setFocus(`matches.${nextIdx}.predictedHome`);
        } else {
          onNavigateNext?.();
        }
      } else if (!isNaN(home) && name.endsWith("predictedHome")) {
        // Home filled → jump to away
        setFocus(`matches.${idx}.predictedAway`);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setFocus, groupData.matches, onAutosave, onNavigateNext]);

  return (
    <div className="flex flex-col  mt-1">
      {/* Points legend */}
      <div className="flex justify-end gap-3 px-4 ">
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

      {/* Group container */}
      <div className="mx-2" style={{ border: borders.default }}>
        {/* Group header */}
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

          {groupData.matches[0] && (
            <div className="flex gap-1 items-center"></div>
          )}
        </div>

        {/* Match rows */}
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

      {/* Group navigation */}
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
