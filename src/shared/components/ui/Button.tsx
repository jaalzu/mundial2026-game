import { Slot } from "@radix-ui/react-slot";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/shared/utils/cn";
import {
  borders,
  colors,
  spacing,
  states,
} from "@/shared/constants/designSystem";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "muted";
  isLoading?: boolean;
  loadingText?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      asChild = false,
      variant = "primary",
      isLoading,
      loadingText,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles - MUCHO MÁS LARGO Y PADDING INTERNO
          "relative w-full inline-flex items-center justify-center  gap-3",
          "px-8 py-3 md:px-12 md:py-6",
          "font-['Anonymous_Pro'] font-bold uppercase tracking-wide",
          "text-xl md:text-3xl",
          "transition-all duration-300 ease-in-out",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "overflow-hidden",

          // Variant styles con HOVER EFFECT FUNCIONAL
          variant === "primary" && [
            "bg-transparent text-white",
            "before:absolute before:inset-0 before:z-0 before:bg-[#3CAC3B] before:translate-y-full",
            "before:transition-transform before:duration-300 before:ease-in-out",
            "before:pointer-events-none",
            "hover:before:translate-y-0",
          ],

          variant === "secondary" && [
            "bg-transparent text-white",
            "before:absolute before:inset-0 before:z-0 before:bg-[#E61D25] before:translate-y-full",
            "before:transition-transform before:duration-300 before:ease-in-out",
            "before:pointer-events-none",
            "hover:before:translate-y-0",
          ],

          variant === "muted" && [
            "bg-transparent text-[#BCBCBC]",
            "hover:text-white",
          ],

          // Disabled state
          (disabled || isLoading) && "cursor-not-allowed",
          disabled && "opacity-50",

          className,
        )}
        style={{
          border: variant === "muted" ? "3px solid #666666" : borders.button,
        }}
        {...props}
      >
        <span className="relative z-30">
          {isLoading ? (
            <>
              <span style={{ opacity: states.saving.opacity }}>
                {loadingText}
              </span>
              {/* TODO: Replace with football icon spinner */}
              <span className="animate-spin ml-2">⚽</span>
            </>
          ) : (
            children
          )}
        </span>
      </Comp>
    );
  },
);

Button.displayName = "Button";
