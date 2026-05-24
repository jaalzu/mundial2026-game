import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type ScreenContainerProps = {
  children: ReactNode;

  className?: string;
};

export function ScreenContainer({
  children,

  className,
}: ScreenContainerProps) {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white">
      <div
        className={cn(
          [
            "mx-auto flex min-h-screen w-full max-w-[500px]",
            "flex-col",
            "px-4 py-6 md:px-6 md:py-8",
          ],
          className,
        )}
      >
        {children}
      </div>
    </main>
  );
}
