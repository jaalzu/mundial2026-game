"use client";

import type { UseFormRegisterReturn } from "react-hook-form";
import { colors, borders, typography } from "@/shared/constants/designSystem";

interface MatchScoreInputProps {
  registration: UseFormRegisterReturn;
  isFilled: boolean;
  disabled?: boolean;
}

export function MatchScoreInput({
  registration,
  isFilled,
  disabled,
}: MatchScoreInputProps) {
  return (
    <input
      {...registration}
      type="text"
      inputMode="numeric"
      maxLength={2}
      disabled={disabled}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        const cleaned = e.target.value.replace(/^0+(\d)/, "$1");
        e.target.value = cleaned;
        registration.onChange(e);
      }}
      className="text-center outline-none transition-all"
      style={{
        width: "42px",
        height: "38px",
        fontFamily: typography.fontFamily,
        fontSize: typography.sizes.xl,
        fontWeight: 400,
        color: isFilled ? colors.primary : colors.mutedText,
        border: isFilled ? borders.light : borders.default,
        borderRadius: "5px",
        caretColor: colors.primary,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "text",
      }}
    />
  );
}
