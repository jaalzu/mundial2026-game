"use client";

import type { UseFormRegister, UseFormWatch } from "react-hook-form";
import type { Match } from "../models/types";
import { Flag } from "@/shared/constants/flags";
import { getTeamNameEs } from "@/shared/utils/teamNames";
import type { GroupPredictionsForm } from "./GroupMatches";
import { MatchScoreInput } from "./MatchScoreInput";
import {
  colors,
  borders,
  typography,
  states,
} from "@/shared/constants/designSystem";

interface MatchRowProps {
  match: Match;
  index: number;
  isActive: boolean;
  register: UseFormRegister<GroupPredictionsForm>;
  watch: UseFormWatch<GroupPredictionsForm>;
  onFocusRequest: () => void;
}

// esto va en utils

function formatMatchDate(isoString: string): string {
  const d = new Date(isoString);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const hours = String(d.getUTCHours()).padStart(2, "0");
  const mins = String(d.getUTCMinutes()).padStart(2, "0");
  return `${day}/${month} ${hours}:${mins}`;
}

interface TeamDisplayProps {
  code: string;
  name: string;
}

// esto va solito
function TeamDisplay({ code, name }: TeamDisplayProps) {
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

export function MatchRow({
  match,
  index,
  isActive,
  register,
  watch,
  onFocusRequest,
}: MatchRowProps) {
  const homeVal = watch(`matches.${index}.predictedHome`);
  const awayVal = watch(`matches.${index}.predictedAway`);
  const homeIsFilled =
    homeVal !== "" && homeVal !== null && homeVal !== undefined;
  const awayIsFilled =
    awayVal !== "" && awayVal !== null && awayVal !== undefined;
  const isComplete = homeIsFilled && awayIsFilled;

  const rowBorder = isActive
    ? borders.light
    : isComplete
      ? states.completed.border
      : borders.default;

  return (
    <div
      onClick={onFocusRequest}
      className="flex flex-col cursor-pointer transition-all px-1 pb-4"
      style={{
        border: rowBorder,
        height: "85px",
      }}
    >
      <div className="w-full text-center pt-1 shrink-0 ">
        <p
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.xs,
            color: colors.mutedText,
          }}
        >
          {formatMatchDate(match.startsAt)}
        </p>
      </div>

      <div
        className="grid items-center w-full flex-1"
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        <TeamDisplay code={match.homeTeam.code} name={match.homeTeam.name} />

        <div className="flex items-center gap-1 px-2 justify-center">
          <MatchScoreInput
            registration={register(`matches.${index}.predictedHome`)}
            isFilled={homeIsFilled}
          />
          <span
            style={{
              fontSize: typography.sizes.xs,
              color: colors.mutedText,
              fontFamily: typography.fontFamily,
            }}
          >
            vs
          </span>
          <MatchScoreInput
            registration={register(`matches.${index}.predictedAway`)}
            isFilled={awayIsFilled}
          />
        </div>

        <TeamDisplay code={match.awayTeam.code} name={match.awayTeam.name} />
      </div>
    </div>
  );
}
