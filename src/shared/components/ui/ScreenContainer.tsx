import { type ReactNode } from "react";

import { cn } from "@/shared/utils/cn";
import { colors } from "@/shared/constants/designSystem";

interface ScreenContainerProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "minimal" | "standard" | "spacious";
}

const paddingVariants = {
  none: "p-0",
  minimal: "px-4 py-2",
  standard: "px-6 py-4",
  spacious: "px-8 py-10",
};

export function ScreenContainer({
  children,
  className,
  padding = "standard",
}: ScreenContainerProps) {
  return (
    <div
      className={cn(
        "min-h-screen w-full",
        "mx-auto max-w-[500px]",
        paddingVariants[padding],
        className,
      )}
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {children}
    </div>
  );
}
