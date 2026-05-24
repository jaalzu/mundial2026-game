import { cn } from "@/shared/utils/cn";

type StepIndicatorProps = {
  currentStep: number;

  totalSteps?: number;
};

export function StepIndicator({
  currentStep,

  totalSteps = 3,
}: StepIndicatorProps) {
  return (
    <div className="mb-10 flex items-center">
      {Array.from({
        length: totalSteps,
      }).map((_, index) => {
        const step = index + 1;

        const isCompleted = step <= currentStep;

        return (
          <div key={step} className="flex flex-1 items-center">
            <div
              className={cn([
                "flex size-8 items-center justify-center",
                "border-[3px]",
                "transition-all duration-150",

                step === currentStep
                  ? "border-[#3CAC3B] bg-[#3CAC3B] text-[15px] font-bold text-black"
                  : isCompleted
                    ? "border-[#3CAC3B] text-[14px] font-normal text-[#3CAC3B]"
                    : "border-[#666666] text-[14px] font-normal text-[#666666]",
              ])}
            >
              {step}
            </div>

            {step !== totalSteps && (
              <div
                className={cn([
                  "h-[3px] flex-1",

                  step < currentStep ? "bg-[#3CAC3B]" : "bg-[#666666]",
                ])}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
