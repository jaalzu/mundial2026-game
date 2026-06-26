"use client";

import { useRef } from "react";
import type { KnockoutPhase } from "../../models/types";
import { KNOCKOUT_ROUNDS } from "../../models/types";
import { colors, borders, typography } from "@/shared/constants/designSystem";

interface KnockoutRoundTabsProps {
  activePhase: KnockoutPhase;
  onSelectPhase: (phase: KnockoutPhase) => void;
}

export function KnockoutRoundTabs({
  activePhase,
  onSelectPhase,
}: KnockoutRoundTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelect = (phase: KnockoutPhase) => {
    onSelectPhase(phase);
    const el = scrollRef.current?.querySelector(`[data-phase="${phase}"]`);
    el?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto gap-2 mx-3 mb-4"
      style={{ scrollbarWidth: "none" }}
    >
      {KNOCKOUT_ROUNDS.map(({ phase, label }) => {
        const isActive = activePhase === phase;
        return (
          <button
            key={phase}
            data-phase={phase}
            onClick={() => handleSelect(phase)}
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
