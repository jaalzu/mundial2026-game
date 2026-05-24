import type { InputHTMLAttributes } from "react";

import { Check } from "lucide-react";

import { cn } from "@/shared/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  isFilled?: boolean;
};

export function Input({
  className,

  isFilled = false,

  ...props
}: InputProps) {
  return (
    <div className="relative">
      <input
        className={cn(
          [
            "h-14 w-full bg-transparent px-4 pr-12",
            "border-[2px]",
            "text-sm font-bold uppercase",
            "outline-none",

            isFilled ? "border-[#3CAC3B]" : "border-[#666666]",
          ],
          className,
        )}
        {...props}
      />

      {isFilled && (
        <Check
          size={18}
          strokeWidth={3}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3CAC3B]"
        />
      )}
    </div>
  );
}
