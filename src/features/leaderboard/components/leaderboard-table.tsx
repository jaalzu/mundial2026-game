import type { LeaderboardRow } from "@/features/leaderboard/types";

type LeaderboardTableProps = {
  rows: LeaderboardRow[];
};

export function LeaderboardTable({ rows }: LeaderboardTableProps) {
  return (
    <div className="border-2 border-[var(--border)]">
      <div className="grid grid-cols-[44px_44px_1fr_56px_44px] border-b-2 border-[var(--border)] bg-[#111111] px-2 py-2 text-xs font-bold uppercase text-[var(--muted)]">
        <span>#</span>
        <span>Av</span>
        <span>Nombre</span>
        <span className="text-right">PTS</span>
        <span className="text-right">Mov</span>
      </div>

      {rows.map((row) => (
        <div
          key={row.userId}
          className="grid grid-cols-[44px_44px_1fr_56px_44px] items-center border-b-2 border-[var(--border)] bg-[#202020] px-2 py-3 last:border-b-0"
        >
          <span className="font-bold">#{row.rank}</span>
          <span className="grid size-8 place-items-center border-2 border-[var(--border)] bg-[#161616] text-sm">
            {row.avatar}
          </span>
          <span className="truncate pr-2 font-bold">{row.name}</span>
          <span className="text-right font-bold text-[var(--primary)]">{row.points}</span>
          <span className={`text-right font-bold ${getTrendColor(row.trend)}`}>{row.trend}</span>
        </div>
      ))}
    </div>
  );
}

function getTrendColor(trend: LeaderboardRow["trend"]) {
  if (trend.startsWith("+")) {
    return "text-[var(--primary)]";
  }

  if (trend.startsWith("-")) {
    return "text-[var(--danger)]";
  }

  return "text-[var(--muted)]";
}
