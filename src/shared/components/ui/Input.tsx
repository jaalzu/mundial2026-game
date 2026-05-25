import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/shared/utils/cn";
import {
  borders,
  colors,
  spacing,
  typography,
} from "@/shared/constants/designSystem";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isCompleted?: boolean;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, isCompleted, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          className={cn(
            // Base styles
            "w-full px-4 py-4 md:px-6 md:py-5",
            "font-['Anonymous_Pro'] text-lg md:text-xl font-normal",
            "bg-transparent text-white placeholder:text-[#BCBCBC]",
            "transition-all duration-200",
            "focus:outline-none",

            // Completed state - BORDE VERDE
            isCompleted && "!border-[#3CAC3B] border-[2px]",

            // Error state
            error && "!border-[#E61D25]",

            className,
          )}
          style={{
            border: !isCompleted && !error ? borders.default : undefined,
            fontFamily: typography.fontFamily,
          }}
          {...props}
        />

        {/* Error message */}
        {error && (
          <p
            className="mt-2 text-base md:text-lg text-[#E61D25]"
            style={{ fontFamily: typography.fontFamily }}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
