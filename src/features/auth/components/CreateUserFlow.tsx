"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/features/auth/actions/createUser";
import { StepsLayout } from "@/features/auth/components/StepsLayout";
import { AvatarStep } from "@/features/auth/components/AvatarStep";
import { RecoveryStep } from "@/features/auth/components/RecoveryStep";
import { UsernameStep } from "@/features/auth/components/UsernameStep";
import { useOnboarding } from "@/features/auth/hooks/useOnboarding";

export function CreateUserFlow() {
  const router = useRouter();
  const {
    currentStep,
    recoveryCode,
    isLoading,
    setIsLoading,
    nextStep,
    previousStep,
  } = useOnboarding();

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  async function handleEnterApp() {
    setIsLoading(true);

    await createUser({
      username,
      avatar,
      recoveryCode,
    });

    setIsLoading(false);
  }

  return (
    <StepsLayout currentStep={currentStep}>
      {currentStep === 1 && (
        <UsernameStep
          username={username}
          onUsernameChange={setUsername}
          onNext={nextStep}
        />
      )}

      {currentStep === 2 && (
        <AvatarStep
          avatar={avatar}
          onSelectAvatar={setAvatar}
          onNext={nextStep}
          onBack={previousStep}
        />
      )}

      {currentStep === 3 && (
        <RecoveryStep
          recoveryCode={recoveryCode}
          username={username}
          isLoading={isLoading}
          onEnterApp={handleEnterApp}
        />
      )}
    </StepsLayout>
  );
}
