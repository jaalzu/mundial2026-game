import { AppShell } from "@/shared/components/layout/app-shell";
import { MatchCard } from "@/features/matches/components/match-card";
import { mockMatches } from "@/features/matches/data/mock-matches";

export default function PredictionsPage() {
  return (
    <AppShell
      title="Mundial 2026"
      eyebrow="Predicciones"
      username="Invitado"
      activeTab="predictions"
    >
      <section className="space-y-4">
        <div>
          <p className="text-sm uppercase text-[var(--muted)]">Grupo A</p>
          <h1 className="mt-1 text-2xl font-bold uppercase">Tus partidos</h1>
        </div>

        <div className="space-y-3">
          {mockMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
