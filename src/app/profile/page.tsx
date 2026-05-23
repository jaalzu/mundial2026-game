import { Copy, KeyRound } from "lucide-react";
import { AppShell } from "@/shared/components/layout/app-shell";

export default function ProfilePage() {
  return (
    <AppShell
      title="Mundial 2026"
      eyebrow="Mi cuenta"
      username="Invitado"
      activeTab="profile"
    >
      <section className="space-y-4">
        <div>
          <p className="text-sm uppercase text-[var(--muted)]">Resumen</p>
          <h1 className="mt-1 text-2xl font-bold uppercase">Mis stats</h1>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <StatBlock label="PTS" value="0" />
          <StatBlock label="Exactos" value="0" />
          <StatBlock label="Rank" value="#-" />
        </div>

        <div className="border-2 border-[var(--border)] bg-[#202020] p-4">
          <div className="flex items-center gap-2 text-[var(--primary)]">
            <KeyRound aria-hidden="true" size={20} strokeWidth={2.75} />
            <h2 className="font-bold uppercase">Recovery key</h2>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 border-2 border-[var(--border)] bg-[#161616] p-3">
            <code className="text-sm text-[var(--muted)]">Pendiente</code>
            <button
              className="grid size-10 place-items-center border-2 border-[var(--primary)] text-[var(--primary)]"
              type="button"
              aria-label="Copiar recovery key"
            >
              <Copy aria-hidden="true" size={18} strokeWidth={2.75} />
            </button>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-[var(--border)] bg-[#202020] p-3 text-center">
      <p className="text-xs uppercase text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}
