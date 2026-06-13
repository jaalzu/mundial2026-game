import { Logo } from "@/shared/components/ui/Logo";
import { NextMatch } from "@/shared/components/ui/NextMatch";
import type { NextMatchData } from "@/shared/components/ui/NextMatch";

interface NavProps {
  nextMatch: NextMatchData | null;
}

export function Nav({ nextMatch }: NavProps) {
  return (
    <header className="flex items-center justify-between px-2 py-3 md:px-8 md:py-6">
      <Logo />
      {nextMatch ? <NextMatch {...nextMatch} /> : null}
    </header>
  );
}
