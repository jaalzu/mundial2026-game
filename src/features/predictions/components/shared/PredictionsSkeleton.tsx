"use client";

import { colors, borders, typography } from "@/shared/constants/designSystem";

export function PredictionsSkeleton() {
  return (
    <div className="flex flex-col ">
      {/* Phase Tabs */}
      <div
        className="grid grid-cols-3 mb-4"
        style={{ border: `2px solid ${colors.border}` }}
      >
        {["GRUPOS", "CAMPEONATO", "ELIMINATORIAS"].map((label, i) => (
          <div
            key={label}
            className="py-2 text-center"
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.lg,
              fontWeight: 700,
              color: colors.text,
              borderLeft: i === 0 ? "none" : `2px solid ${colors.border}`,
              backgroundColor: colors.background,
              opacity: 0.6,
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Group Tabs */}
      <div
        className="flex overflow-x-auto gap-3 mx-3 mb-5"
        style={{ scrollbarWidth: "none" }}
      >
        {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((group) => (
          <div
            key={group}
            className="flex-shrink-0 px-3.5 py-1 animate-pulse"
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.md,
              fontWeight: 700,
              border: borders.default,
              backgroundColor: colors.background,
              color: colors.text,
            }}
          >
            {group}
          </div>
        ))}
      </div>

      {/* Points Legend */}
      <div className="flex justify-end gap-3 px-4 ">
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.sm,
            color: colors.primary,
          }}
        >
          <strong>+3</strong> exacto
        </span>
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.sm,
            color: "#f59f0be4",
          }}
        >
          <strong>+1</strong> ganador
        </span>
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.sm,
            color: colors.secondary,
          }}
        >
          <strong>0</strong> fallo
        </span>
      </div>

      {/* Group Header & Match Rows */}
      <div className="mx-2" style={{ border: borders.default }}>
        {/* Group Title */}
        <div
          className="flex items-center justify-between px-6 py-1"
          style={{ borderBottom: borders.default }}
        >
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.xl,
              fontWeight: 700,
              color: colors.text,
              opacity: 0.7,
            }}
          >
            Grupo A
          </span>
        </div>

        {/* Match Rows */}
        <div className="flex flex-col">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col animate-pulse"
              style={{
                height: "90px",
                borderTop: i > 0 ? borders.default : "none",
                padding: "8px 4px 16px 4px",
              }}
            >
              {/* Date skeleton */}
              <div className="w-full text-center pt-1 shrink-0">
                <div
                  className="mx-auto rounded"
                  style={{
                    height: "10px",
                    width: "100px",
                    backgroundColor: colors.mutedText,
                    opacity: 0.15,
                  }}
                />
              </div>

              {/* Teams + Score skeleton */}
              <div
                className="grid items-center w-full flex-1 mt-2"
                style={{ gridTemplateColumns: "1fr auto 1fr" }}
              >
                {/* Home Team */}
                <div className="flex flex-col items-center gap-1 w-full justify-center">
                  <div
                    style={{
                      width: "36px",
                      height: "26px",
                      backgroundColor: colors.mutedText,
                      opacity: 0.15,
                    }}
                  />
                  <div
                    className="rounded"
                    style={{
                      height: "8px",
                      width: "60px",
                      backgroundColor: colors.mutedText,
                      opacity: 0.15,
                    }}
                  />
                </div>

                {/* Score inputs */}
                <div className="flex items-center gap-1 px-2 justify-center">
                  <div
                    className="rounded"
                    style={{
                      width: "42px",
                      height: "38px",
                      backgroundColor: colors.mutedText,
                      opacity: 0.15,
                    }}
                  />
                  <span
                    style={{
                      fontSize: typography.sizes.xs,
                      color: colors.mutedText,
                      opacity: 0.5,
                    }}
                  >
                    vs
                  </span>
                  <div
                    className="rounded"
                    style={{
                      width: "42px",
                      height: "38px",
                      backgroundColor: colors.mutedText,
                      opacity: 0.15,
                    }}
                  />
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center gap-1 w-full justify-center">
                  <div
                    style={{
                      width: "36px",
                      height: "26px",
                      backgroundColor: colors.mutedText,
                      opacity: 0.15,
                    }}
                  />
                  <div
                    className="rounded"
                    style={{
                      height: "8px",
                      width: "60px",
                      backgroundColor: colors.mutedText,
                      opacity: 0.15,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
