"use client";

import { colors, borders, typography } from "@/shared/constants/designSystem";
import type { BracketSide } from "../../models/types";

interface BracketTabsProps {
  active: BracketSide;
  onSelect: (bracket: BracketSide) => void;
}

export function BracketTabs({ active, onSelect }: BracketTabsProps) {
  return (
    <div className="flex gap-0 mx-3 mb-4">
      {[1, 2].map((bracket) => {
        const isActive = active === bracket;
        return (
          <button
            key={bracket}
            onClick={() => onSelect(bracket as BracketSide)}
            className="flex-1 py-1.5 transition-all"
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.md,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? colors.text : colors.mutedText,
              border: isActive ? borders.light : borders.default,
              backgroundColor: colors.background,
            }}
          >
            LLAVE {bracket}
          </button>
        );
      })}
    </div>
  );
}
