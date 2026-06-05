import { borders, typography } from "@/shared/constants/designSystem";

export function LeaderboardSkeleton() {
  return (
    <div className="w-full">
      <div
        className="grid grid-cols-[50px_1fr_60px_50px] h-11 items-stretch text-center"
        style={{
          borderTop: borders.light,
          borderBottom: borders.light,
          fontSize: typography.sizes.md,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        <div
          className="flex items-center justify-center h-full"
          style={{ borderRight: borders.light }}
        >
          RANK
        </div>
        <div className="text-left pl-3 flex items-center h-full">JUGADORES</div>
        <div
          className="flex items-center justify-center h-full"
          style={{ borderLeft: borders.light, borderRight: borders.light }}
        >
          PTS
        </div>
        <div className="flex items-center justify-center h-full">+/-</div>
      </div>

      <div className="flex flex-col">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[50px_1fr_60px_50px] items-center text-center"
            style={{ borderBottom: "1px solid rgba(128,128,128,0.12)" }}
          >
            <div className="py-4 flex justify-center">
              <div className="w-5 h-5 rounded-full bg-gray-700/40 animate-pulse" />
            </div>

            <div className="flex items-center gap-2 pl-2">
              <div className="w-11 h-11 rounded-full bg-gray-700/40 animate-pulse shrink-0" />
              <div
                className="h-3 rounded bg-gray-700/40 animate-pulse"
                style={{ width: `${50 + ((i * 17) % 45)}px` }}
              />
            </div>

            <div className="py-4 flex justify-center">
              <div className="w-8 h-3 rounded bg-gray-700/40 animate-pulse" />
            </div>

            <div className="py-4 flex justify-center">
              <div className="w-5 h-3 rounded bg-gray-700/40 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
