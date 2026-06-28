"use client";

import { Flag } from "@/shared/constants/flags";
import { getTeamNameEs } from "@/shared/utils/teamNames";
import { colors, typography } from "@/shared/constants/designSystem";
import type { Team } from "../../models/types";

interface TeamSlotProps {
  team: Team | null;
}

export function TeamSlot({ team }: TeamSlotProps) {
  if (!team) {
    return (
      <div className="flex flex-col items-center gap-1 w-full justify-center">
        <div
          style={{
            width: "36px",
            height: "26px",
            backgroundColor: "#FFFFFF",
            border: `1px solid ${colors.border}`,
          }}
          className="shrink-0"
        />
        <span
          className="text-center block w-full"
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.sm,
            color: colors.mutedText,
            maxWidth: "100px",
          }}
        >
          TBD
        </span>
      </div>
    );
  }

  const displayName = getTeamNameEs(team.code, team.name);
  return (
    <div className="flex flex-col items-center gap-1 w-full justify-center">
      <div style={{ width: "36px", height: "26px" }} className="shrink-0">
        <Flag code={team.code} className="w-full h-full object-cover" />
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
