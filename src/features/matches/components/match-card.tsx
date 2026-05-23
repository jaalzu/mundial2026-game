import type { MatchSummary } from "@/features/matches/types";

export function MatchCard({ match }: { match: MatchSummary }) {
  return (
    <article className="border-2 border-[var(--border)] bg-[#202020] p-3">
      <div className="flex items-center justify-between gap-3 border-b-2 border-[var(--border)] pb-2">
        <div>
          <p className="text-xs uppercase text-[var(--muted)]">{match.phase}</p>
          <p className="text-sm font-bold">{match.startsAt}</p>
        </div>
        <span className="border-2 border-[var(--border)] px-2 py-1 text-xs uppercase text-[var(--muted)]">
          Abierto
        </span>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_96px_1fr] items-center gap-2">
        <TeamBlock flag={match.homeFlag} name={match.homeTeam} />
        <div className="grid grid-cols-[1fr_20px_1fr] items-center text-center">
          <ScoreStepper value={0} />
          <span className="font-bold text-[var(--muted)]">-</span>
          <ScoreStepper value={0} />
        </div>
        <TeamBlock flag={match.awayFlag} name={match.awayTeam} align="right" />
      </div>
    </article>
  );
}

function TeamBlock({
  flag,
  name,
  align = "left"
}: {
  flag: string;
  name: string;
  align?: "left" | "right";
}) {
  return (
    <div className={`min-w-0 ${align === "right" ? "text-right" : "text-left"}`}>
      <p className="text-2xl">{flag}</p>
      <p className="truncate text-sm font-bold uppercase">{name}</p>
    </div>
  );
}

function ScoreStepper({ value }: { value: number }) {
  return (
    <div className="mx-auto grid w-8 gap-1">
      <button className="h-7 border-2 border-[var(--primary)] text-[var(--primary)]" type="button">
        +
      </button>
      <span className="grid h-8 place-items-center border-2 border-[var(--border)] font-bold">
        {value}
      </span>
      <button className="h-7 border-2 border-[var(--border)] text-[var(--muted)]" type="button">
        -
      </button>
    </div>
  );
}
