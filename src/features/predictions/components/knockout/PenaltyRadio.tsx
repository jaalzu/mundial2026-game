// features/predictions/components/knockout/PenaltyRadio.tsx
"use client";

import { colors, borders, typography } from "@/shared/constants/designSystem";

interface PenaltyRadioProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function PenaltyRadio({ label, selected, onSelect }: PenaltyRadioProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex items-center gap-2 px-3 py-1.5 transition-all"
      style={{
        fontFamily: typography.fontFamily,
        fontSize: typography.sizes.sm,
        color: selected ? colors.primary : colors.mutedText,
        backgroundColor: colors.background,
        fontWeight: selected ? 700 : 400,
      }}
    >
      <span
        className="inline-block rounded-full"
        style={{
          width: "10px",
          height: "10px",
          border: `2px solid ${selected ? colors.primary : colors.mutedText}`,
          backgroundColor: selected ? colors.primary : "transparent",
        }}
      />
      {label}
    </button>
  );
}
