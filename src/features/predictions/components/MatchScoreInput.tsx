"use client";

import type { UseFormRegisterReturn } from "react-hook-form";
import { colors, borders, typography } from "@/shared/constants/designSystem";

interface MatchScoreInputProps {
  registration: UseFormRegisterReturn;
  isFilled: boolean;
}

export function MatchScoreInput({
  registration,
  isFilled,
}: MatchScoreInputProps) {
  return (
    <input
      {...registration}
      type="text"
      inputMode="numeric"
      maxLength={2}
      className="text-center outline-none transition-all "
      style={{
        width: "41px",
        height: "38px",
        fontFamily: typography.fontFamily,
        fontSize: typography.sizes.lg,
        fontWeight: 700,
        color: isFilled ? colors.primary : colors.mutedText,
        border: isFilled ? "1px solid #3CAC3B" : "1px solid #666666",
        borderRadius: "6px",
        caretColor: colors.primary,
      }}
    />
  );
}
