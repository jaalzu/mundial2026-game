"use client";

import type { KnockoutPhase } from "@/features/predictions/models/types";
import { KNOCKOUT_ROUNDS } from "@/features/predictions/models/types";
import { colors, borders, typography } from "@/shared/constants/designSystem";

interface AdminKnockoutTabsProps {
  activePhase: KnockoutPhase;
  onSelectPhase: (phase: KnockoutPhase) => void;
}

export function AdminKnockoutTabs({
  activePhase,
  onSelectPhase,
}: AdminKnockoutTabsProps) {
  return (
    <div
      className="flex overflow-x-auto gap-3 mb-4"
      style={{ scrollbarWidth: "none" }}
    >
      {KNOCKOUT_ROUNDS.map(({ phase, label }) => {
        const isActive = activePhase === phase;
        return (
          <button
            key={phase}
            onClick={() => onSelectPhase(phase)}
            className="flex-shrink-0 px-3.5 py-1 transition-all"
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.md,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? colors.text : colors.mutedText,
              border: isActive ? borders.light : borders.default,
              backgroundColor: colors.background,
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
