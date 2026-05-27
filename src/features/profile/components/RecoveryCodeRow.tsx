"use client";

import { useState } from "react";
import { colors, typography } from "@/shared/constants/designSystem";

type RecoveryCodeRowProps = {
  code: string;
};

export function RecoveryCodeRow({ code }: RecoveryCodeRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="flex items-center gap-2"
      style={{ fontFamily: typography.fontFamily }}
    >
      <span style={{ fontSize: typography.sizes.md, opacity: 0.7 }}>
        Recovery code:
      </span>
      <span
        style={{
          fontSize: typography.sizes.md,
          color: colors.primary,
          letterSpacing: "0.08em",
        }}
      >
        {code}
      </span>
      <button
        onClick={handleCopy}
        className="ml-auto"
        style={{
          background: "transparent",
          border: `1px solid ${copied ? colors.primary : colors.text}`,
          color: copied ? colors.primary : colors.text,
          fontFamily: typography.fontFamily,
          fontSize: "10px",
          padding: "2px 6px",
          cursor: "pointer",
          borderRadius: "2px",
          lineHeight: 1.4,
          opacity: copied ? 1 : 0.5,
          transition: "all 0.2s ease",
        }}
      >
        {copied ? "COPIADO" : "COPY"}
      </button>
    </div>
  );
}
