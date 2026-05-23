import Link from "next/link";
import { BarChart3, CircleUserRound, ClipboardList } from "lucide-react";

export type NavTab = "leaderboard" | "predictions" | "profile";

const navItems = [
  {
    href: "/",
    label: "Tabla",
    tab: "leaderboard" as const,
    Icon: BarChart3
  },
  {
    href: "/predictions",
    label: "Predic.",
    tab: "predictions" as const,
    Icon: ClipboardList
  },
  {
    href: "/profile",
    label: "Yo",
    tab: "profile" as const,
    Icon: CircleUserRound
  }
];

export function BottomNav({ activeTab }: { activeTab: NavTab }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 grid w-full max-w-[500px] -translate-x-1/2 grid-cols-3 border-x-2 border-t-2 border-[var(--border)] bg-[#111111]">
      {navItems.map(({ href, label, tab, Icon }) => {
        const isActive = activeTab === tab;

        return (
          <Link
            key={tab}
            href={href}
            className={`flex min-h-16 flex-col items-center justify-center gap-1 border-b-[3px] text-xs font-bold uppercase transition-colors ${
              isActive
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--muted)]"
            }`}
          >
            <Icon aria-hidden="true" size={22} strokeWidth={2.75} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
