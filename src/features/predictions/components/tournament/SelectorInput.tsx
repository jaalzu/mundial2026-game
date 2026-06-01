"use client";

import { colors, borders } from "@/shared/constants/designSystem";

interface SelectorInputProps {
  isActive: boolean;
  hasValue: boolean;
  onClear: () => void;
  children: React.ReactNode; // el contenido cuando hay valor
  input: React.ReactNode; // el input cuando no hay valor
}

export function SelectorInput({
  isActive,
  hasValue,
  onClear,
  children,
  input,
}: SelectorInputProps) {
  return (
    <div
      className="flex items-center gap-2 px-2 py-3"
      style={{
        border: isActive
          ? borders.light
          : hasValue
            ? `1px solid ${colors.primary}`
            : borders.default,
      }}
    >
      {hasValue ? (
        <>
          {children}
          {isActive && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              style={{ color: colors.mutedText, fontSize: "0.75rem" }}
            >
              ✕
            </button>
          )}
        </>
      ) : (
        <>
          {input}
          {!isActive && (
            <span style={{ color: colors.mutedText, fontSize: "0.75rem" }}>
              ↓
            </span>
          )}
        </>
      )}
    </div>
  );
}
