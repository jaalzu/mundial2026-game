"use client";

import { useState } from "react";

import { generateRecoveryCode } from "@/features/auth/utils/recoveryCode";

type AuthStep = 1 | 2 | 3;

export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState<AuthStep>(1);

  const [isLoading, setIsLoading] = useState(false);

  const [recoveryCode] = useState(generateRecoveryCode);

  function nextStep() {
    setCurrentStep((prev) => {
      if (prev === 1) return 2;
      if (prev === 2) return 3;

      return 3;
    });
  }

  function previousStep() {
    setCurrentStep((prev) => {
      if (prev === 3) return 2;
      if (prev === 2) return 1;

      return 1;
    });
  }

  return {
    currentStep,
    recoveryCode,
    isLoading,
    setIsLoading,

    nextStep,
    previousStep,
  };
}
