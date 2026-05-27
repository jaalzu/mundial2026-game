// Nav.tsx
import { Logo } from "@/shared/components/ui/Logo";
import { typography } from "@/shared/constants/designSystem";

type NavProps = { userName?: string };

export function Nav({ userName }: NavProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6">
      <Logo />
      {userName && (
        <p
          className="text-base md:text-lg text-white font-bold"
          style={{ fontFamily: typography.fontFamily }}
        >
          {userName}
        </p>
      )}
    </header>
  );
}
