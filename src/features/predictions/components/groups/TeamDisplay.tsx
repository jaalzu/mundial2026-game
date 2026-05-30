"use client";

import { Flag } from "@/shared/constants/flags";
import { getTeamNameEs } from "@/shared/utils/teamNames";
import { colors, typography } from "@/shared/constants/designSystem";

interface TeamDisplayProps {
  code: string;
  name: string;
}

export function TeamDisplay({ code, name }: TeamDisplayProps) {
  const displayName = getTeamNameEs(code, name);
  return (
    <div className="flex flex-col items-center gap-1 w-full justify-center">
      <div style={{ width: "36px", height: "26px" }} className="shrink-0">
        <Flag code={code} className="w-full h-full object-cover" />
      </div>
      <span
        className="text-center block w-full"
        style={{
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.sm,
          color: colors.text,
          maxWidth: "100px",
        }}
      >
        {displayName}
      </span>
    </div>
  );
}
