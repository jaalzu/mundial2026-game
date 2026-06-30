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
        {["GRUPOS", "ELIMINATORIAS", "CAMPEONATO"].map((label, i) => (
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
              opacity: i === 1 ? 1 : 0.6,
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Round Tabs */}
      <div
        className="flex overflow-x-auto gap-3 mx-3 mb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {["16AVOS", "8VOS", "4TOS", "SEMIS", "FINAL", "3ER"].map((round, i) => (
          <div
            key={round}
            className="flex-shrink-0 px-3.5 py-1 animate-pulse"
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.md,
              fontWeight: i === 0 ? 700 : 400,
              border: i === 0 ? borders.light : borders.default,
              backgroundColor: colors.background,
              color: i === 0 ? colors.text : colors.mutedText,
            }}
          >
            {round}
          </div>
        ))}
      </div>

      {/* Bracket Tabs */}
      <div className="flex mx-3 mb-4">
        {[1, 2].map((bracket) => (
          <div
            key={bracket}
            className="flex-1 py-1.5 text-center animate-pulse"
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.md,
              fontWeight: bracket === 1 ? 700 : 400,
              border: bracket === 1 ? borders.light : borders.default,
              backgroundColor: colors.background,
              color: bracket === 1 ? colors.text : colors.mutedText,
            }}
          >
            LLAVE {bracket}
          </div>
        ))}
      </div>

      {/* Round Header & Match Rows */}
      <div className="mx-3">
        <div className="flex items-center justify-between px-6 py-1">
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.xl,
              fontWeight: 700,
              color: colors.text,
              opacity: 0.7,
            }}
          >
            16AVOS — LLAVE 1
          </span>
        </div>

        <div className="flex flex-col gap-2 p-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col animate-pulse px-1 pb-3"
              style={{
                border: borders.default,
                minHeight: "90px",
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
