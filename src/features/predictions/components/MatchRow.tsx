"use client";

import type { UseFormRegister, UseFormWatch } from "react-hook-form";
import type { Match } from "../models/types";
import { Flag } from "@/shared/constants/flags";

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

function formatMatchDate(isoString: string): string {
  const d = new Date(isoString);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const hours = String(d.getUTCHours()).padStart(2, "0");
  const mins = String(d.getUTCMinutes()).padStart(2, "0");
  return `${day}/${month} ${hours}:${mins}`;
}

/**
 * Componente reutilizable para mostrar un equipo (bandera + nombre)
 */
interface TeamDisplayProps {
  code: string;
  name: string;
}

function TeamDisplay({ code, name }: TeamDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div style={{ width: "32px", height: "25px" }}>
        <Flag code={code} className="rounded-sm w-full h-full" />
      </div>

      <span
        className="text-center leading-tight"
        style={{
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.md,
          color: colors.text,
          maxWidth: "70px",
        }}
      >
        {name}
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
    ? borders.active
    : isComplete
      ? states.completed.border
      : borders.default;

  return (
    <div
      onClick={onFocusRequest}
      className="flex flex-col cursor-pointer transition-all"
      style={{ border: rowBorder }}
    >
      {/* Date */}
      <p
        className="text-center pt-1"
        style={{
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.xs,
          color: colors.mutedText,
        }}
      >
        {formatMatchDate(match.startsAt)}
      </p>

      {/* Inner row */}
      <div
        className="grid items-center px-1 py-1.5"
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        {/* Home team */}
        <TeamDisplay code={match.homeTeam.code} name={match.homeTeam.name} />

        {/* Inputs */}
        <div className="flex items-center gap-1 px-2">
          <MatchScoreInput
            registration={register(`matches.${index}.predictedHome`)}
            isFilled={homeIsFilled}
          />
          <span
            style={{
              fontSize: typography.sizes.xs,
              color: colors.mutedText,
            }}
          >
            vs
          </span>
          <MatchScoreInput
            registration={register(`matches.${index}.predictedAway`)}
            isFilled={awayIsFilled}
          />
        </div>

        {/* Away team */}
        <TeamDisplay code={match.awayTeam.code} name={match.awayTeam.name} />
      </div>
    </div>
  );
}
