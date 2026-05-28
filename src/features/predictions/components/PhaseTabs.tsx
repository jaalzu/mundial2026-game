"use client";

import type { PredictionPhase } from "../types";
import { colors, typography } from "@/shared/constants/designSystem";

const PHASES: { id: PredictionPhase; label: string }[] = [
  { id: "GROUPS", label: "GRUPOS" },
  { id: "TOURNAMENT", label: "CAMPEONATO" },
  { id: "KNOCKOUT", label: "ELIMINATORIAS" },
];

interface PhaseTabsProps {
  activePhase: PredictionPhase;
  onSelectPhase: (phase: PredictionPhase) => void;
}

export function PhaseTabs({ activePhase, onSelectPhase }: PhaseTabsProps) {
  return (
    <div
      className="grid grid-cols-3 mb-4"
      style={{ border: `2px solid ${colors.border}` }}
    >
      {PHASES.map(({ id, label }, i) => {
        const isActive = activePhase === id;
        return (
          <button
            key={id}
            onClick={() => onSelectPhase(id)}
            className="py-2 text-center transition-all"
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.lg,
              letterSpacing: "-0.03em",
              fontWeight: isActive ? 700 : 400,
              color: isActive ? colors.text : colors.mutedText,
              backgroundColor: colors.background,
              borderLeft: i === 0 ? "none" : `2px solid ${colors.border}`,
              outline: isActive ? `2px solid ${colors.primary}` : "none",
              outlineOffset: "-1px",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
