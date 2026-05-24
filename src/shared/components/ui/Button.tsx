import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;

  isLoading?: boolean;

  leftIcon?: ReactNode;
};

export function Button({
  children,

  className,

  disabled,

  isLoading,

  leftIcon,

  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        [
          "flex h-14 w-full items-center justify-center gap-3",
          "border-[4px] border-[#3CAC3B]",
          "px-4",
          "text-sm font-bold uppercase",
          "transition-all duration-150",

          disabled || isLoading
            ? "border-[#666666] text-[#666666]"
            : "bg-transparent text-white hover:bg-[#3CAC3B] hover:text-black",
        ],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {leftIcon}

      <span>{isLoading ? "Guardando..." : children}</span>
    </button>
  );
}
