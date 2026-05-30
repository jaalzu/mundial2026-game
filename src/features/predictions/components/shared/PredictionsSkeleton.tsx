import { colors, borders } from "@/shared/constants/designSystem";

/**
 * Shown as Suspense fallback while predictions data loads.
 * Mirrors the real layout so there's no layout shift on hydration.
 */
export function PredictionsSkeleton() {
  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: colors.background }}
    >
      {/* Phase tabs skeleton */}
      <div
        className="grid grid-cols-3 mb-4"
        style={{ border: `2px solid ${colors.border}` }}
      >
        {["GRUPOS", "CAMPEONATO", "ELIMINATORIAS"].map((label, i) => (
          <div
            key={label}
            className="py-2 text-center"
            style={{
              borderLeft: i === 0 ? "none" : `2px solid ${colors.border}`,
              color: colors.mutedText,
              fontSize: "0.875rem",
              opacity: 0.4,
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Group tabs skeleton */}
      <div className="flex gap-3 mx-3 mb-4">
        {["A", "B", "C", "D", "E", "F"].map((g) => (
          <div
            key={g}
            className="px-3.5 py-1 animate-pulse"
            style={{
              border: borders.default,
              color: colors.mutedText,
              opacity: 0.4,
            }}
          >
            {g}
          </div>
        ))}
      </div>

      {/* Match rows skeleton */}
      <div className="mx-2" style={{ border: borders.default }}>
        <div className="px-6 py-1 h-9" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse"
            style={{
              height: "85px",
              borderTop: i > 0 ? borders.default : "none",
            }}
          >
            <div
              className="mx-auto mt-4 rounded"
              style={{
                height: "12px",
                width: "120px",
                backgroundColor: colors.mutedText,
                opacity: 0.15,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
