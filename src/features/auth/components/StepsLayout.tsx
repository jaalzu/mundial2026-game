import type { ReactNode } from "react";

import { AuthStepper } from "@/features/auth/components/AuthStepper";
import { Logo } from "@/shared/components/ui/Logo";
import { ScreenContainer } from "@/shared/components/ui/ScreenContainer";

type StepsLayoutProps = {
  children: ReactNode;
  currentStep: number;
};

export function StepsLayout({ children, currentStep }: StepsLayoutProps) {
  return (
    <ScreenContainer padding="minimal">
      <div className="mb-3">
        <Logo></Logo>
      </div>
      <div className="flex min-h-screen flex-col">
        <AuthStepper currentStep={currentStep} />

        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </ScreenContainer>
  );
}
