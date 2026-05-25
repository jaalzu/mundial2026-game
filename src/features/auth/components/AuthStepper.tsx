type AuthStepperProps = {
  currentStep: number;
};

const steps = [1, 2, 3];

export function AuthStepper({ currentStep }: AuthStepperProps) {
  return (
    <div className="flex w-full items-center">
      {steps.map((step, index) => {
        const isActive = step <= currentStep;

        const isCurrent = step === currentStep;

        const isLast = index === steps.length - 1;

        return (
          <div key={step} className="contents">
            <div
              className={[
                "flex h-10 w-10 shrink-0 items-center justify-center border-[2px]",

                isCurrent ? "text-[17px] font-bold" : "text-[15px] font-normal",

                isActive
                  ? "border-[#3CAC3B] bg-[#3CAC3B] text-black"
                  : "border-[#666666] text-[#666666]",
              ].join(" ")}
            >
              {step}
            </div>

            {!isLast && (
              <div
                className={[
                  "h-[2px] flex-1",
                  step < currentStep ? "bg-[#3CAC3B]" : "bg-[#666666]",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
