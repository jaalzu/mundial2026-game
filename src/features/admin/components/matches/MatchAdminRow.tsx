"use client";

import { useState } from "react";
import type { AdminMatch } from "../../data/getAdminMatches";
import { finishMatch } from "../../actions/finishMatch";
import { colors, borders, typography } from "@/shared/constants/designSystem";

interface MatchAdminRowProps {
  match: AdminMatch;
}

export function MatchAdminRow({ match }: MatchAdminRowProps) {
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFinished = match.status === "FINISHED";

  const handleFinish = async () => {
    const home = parseInt(homeScore, 10);
    const away = parseInt(awayScore, 10);

    if (isNaN(home) || isNaN(away)) {
      setError("Ingresá ambos scores.");
      return;
    }

    setLoading(true);
    setError(null);

    const result = await finishMatch({
      matchId: match.id,
      scoreHome: home,
      scoreAway: away,
    });

    if (!result.success) {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div
      className="flex items-center justify-between px-4 py-3 gap-4"
      style={{
        border: isFinished ? `1px solid ${colors.primary}22` : borders.default,
      }}
    >
      {/* Teams */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span
          className="truncate"
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.sm,
            color: colors.text,
          }}
        >
          {match.homeTeam.code} vs {match.awayTeam.code}
        </span>
      </div>

      {/* Right side */}
      {isFinished ? (
        <div className="flex items-center gap-2 shrink-0">
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.sm,
              color: colors.primary,
              fontWeight: 700,
            }}
          >
            {match.scoreHome} — {match.scoreAway}
          </span>
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.xs,
              color: colors.mutedText,
            }}
          >
            FINISHED
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 shrink-0">
          {error && (
            <span style={{ fontSize: typography.sizes.xs, color: "red" }}>
              {error}
            </span>
          )}
          <input
            type="text"
            inputMode="numeric"
            maxLength={2}
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value.replace(/\D/, ""))}
            placeholder="0"
            className="text-center outline-none"
            style={{
              width: "36px",
              height: "32px",
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.md,
              color: colors.text,
              border: borders.default,
              backgroundColor: colors.background,
            }}
          />
          <span
            style={{ color: colors.mutedText, fontSize: typography.sizes.xs }}
          >
            —
          </span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={2}
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value.replace(/\D/, ""))}
            placeholder="0"
            className="text-center outline-none"
            style={{
              width: "36px",
              height: "32px",
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.md,
              color: colors.text,
              border: borders.default,
              backgroundColor: colors.background,
            }}
          />
          <button
            onClick={handleFinish}
            disabled={loading}
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.xs,
              fontWeight: 700,
              color: loading ? colors.mutedText : colors.primary,
              background: "none",
              border: `1px solid ${loading ? colors.mutedText : colors.primary}`,
              padding: "4px 10px",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.05em",
            }}
          >
            {loading ? "..." : "OK"}
          </button>
        </div>
      )}
    </div>
  );
}
