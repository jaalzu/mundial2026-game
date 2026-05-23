import { BottomNav, type NavTab } from "@/shared/components/layout/bottom-nav";

type AppShellProps = {
  title: string;
  eyebrow: string;
  username: string;
  activeTab: NavTab;
  children: React.ReactNode;
};

export function AppShell({ title, eyebrow, username, activeTab, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[500px] flex-col border-x-2 border-[var(--border)] bg-[var(--background)]">
        <header className="sticky top-0 z-10 border-b-2 border-[var(--border)] bg-[var(--background)] px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase text-[var(--muted)]">{eyebrow}</p>
              <p className="text-lg font-bold uppercase">{title}</p>
            </div>
            <p className="max-w-32 truncate border-2 border-[var(--border)] px-2 py-1 text-sm">
              {username}
            </p>
          </div>
        </header>

        <main className="flex-1 px-4 pb-24 pt-4">{children}</main>

        <BottomNav activeTab={activeTab} />
      </div>
    </div>
  );
}
