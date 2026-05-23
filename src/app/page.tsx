import { Trophy } from "lucide-react";
import { AppShell } from "@/shared/components/layout/app-shell";
import { LeaderboardTable } from "@/features/leaderboard/components/leaderboard-table";
import { mockLeaderboard } from "@/features/leaderboard/data/mock-leaderboard";

export default function HomePage() {
  return (
    <AppShell
      title="Mundial 2026"
      eyebrow="Fase de grupos"
      username="Invitado"
      activeTab="leaderboard"
    >
      <section className="space-y-4">
        <div className="border-2 border-[var(--border)] bg-[#202020] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase text-[var(--muted)]">Ranking global</p>
              <h1 className="mt-1 text-2xl font-bold uppercase">Tabla general</h1>
            </div>
            <div className="grid size-12 place-items-center border-2 border-[var(--primary)] text-[var(--primary)]">
              <Trophy aria-hidden="true" strokeWidth={2.75} />
            </div>
          </div>
        </div>

        <LeaderboardTable rows={mockLeaderboard} />
      </section>
    </AppShell>
  );
}
