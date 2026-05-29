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
        width: "42px",
        height: "38px",
        fontFamily: typography.fontFamily,
        fontSize: typography.sizes.xl,
        fontWeight: 400,
        color: isFilled ? colors.primary : colors.mutedText,
        border: isFilled ? borders.light : borders.default,
        borderRadius: "1px",
        caretColor: colors.primary,
      }}
    />
  );
}
