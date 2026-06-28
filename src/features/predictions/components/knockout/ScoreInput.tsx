"use client";

import { colors, borders, typography } from "@/shared/constants/designSystem";

interface ScoreInputProps {
  value: string;
  onChange: (value: string) => void;
  isFilled: boolean;
  disabled?: boolean;
}

export function ScoreInput({
  value,
  onChange,
  isFilled,
  disabled,
}: ScoreInputProps) {
  return (
    <input
      type="text"
      inputMode="numeric"
      maxLength={2}
      value={value}
      disabled={disabled}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        const cleaned = e.target.value
          .replace(/\D/g, "")
          .replace(/^0+(\d)/, "$1");
        onChange(cleaned);
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
