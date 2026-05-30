"use client";

import type { UseFormRegister, UseFormWatch } from "react-hook-form";
import type { Match } from "../../models/types";
import type { GroupPredictionsFormValues } from "../../models/types";
import { formatMatchDate } from "../../utils/matchDate";
import {
  isValidScore,
  isPredictionComplete,
} from "../../utils/predictionHelpers";
import { TeamDisplay } from "./TeamDisplay";
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
  register: UseFormRegister<GroupPredictionsFormValues>;
  watch: UseFormWatch<GroupPredictionsFormValues>;
  onFocusRequest: () => void;
}

// MatchRow.tsx — arriba, antes del componente

function getPoints(home: string, away: string, match: Match): string {
  const ph = parseInt(home, 10);
  const pa = parseInt(away, 10);
  const sh = match.scoreHome!;
  const sa = match.scoreAway!;

  if (ph === sh && pa === sa) return "+3";

  const predictedWinner = ph > pa ? "home" : ph < pa ? "away" : "draw";
  const actualWinner = sh > sa ? "home" : sh < sa ? "away" : "draw";

  return predictedWinner === actualWinner ? "+1" : "0";
}

function getPointsColor(home: string, away: string, match: Match): string {
  const points = getPoints(home, away, match);
  if (points === "+3") return colors.primary;
  if (points === "+1") return "#f59f0be4";
  return colors.secondary;
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
  const homeIsFilled = isValidScore(homeVal);
  const awayIsFilled = isValidScore(awayVal);
  const isComplete = isPredictionComplete(homeVal, awayVal);
  const isFinished = match.status === "FINISHED";

  const rowBorder = isFinished
    ? `1px solid ${colors.primary}72`
    : isActive
      ? borders.light
      : isComplete
        ? states.completed.border
        : borders.default;

  return (
    <div
      onClick={!isFinished ? onFocusRequest : undefined}
      className="flex flex-col transition-all px-1 pb-4"
      style={{
        border: rowBorder,
        height: isFinished ? "95px" : "90px",
        cursor: isFinished ? "default" : "pointer",
      }}
    >
      <div className="w-full text-center pt-1 shrink-0">
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
            disabled={isFinished}
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
            disabled={isFinished}
          />
        </div>
        <TeamDisplay code={match.awayTeam.code} name={match.awayTeam.name} />
      </div>

      {/* FUERA del grid */}
      {isFinished && match.scoreHome != null && match.scoreAway != null && (
        <div className="w-full text-center ">
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.sm,
              color: colors.mutedText,
            }}
          >
            Resultado:{" "}
            <strong style={{ color: colors.text }}>
              {match.homeTeam.code} {match.scoreHome} — {match.scoreAway}{" "}
              {match.awayTeam.code}
            </strong>
            {isComplete && (
              <strong
                style={{ color: getPointsColor(homeVal, awayVal, match) }}
              >
                {" "}
                {getPoints(homeVal, awayVal, match)}
              </strong>
            )}
          </span>
        </div>
      )}
    </div>
  );
}
