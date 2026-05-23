"use client";

import { useRouter } from "next/navigation";

import { createUser } from "@/features/auth/actions/createUser";

import { AuthStepper } from "@/features/auth/components/AuthStepper";
import { AvatarStep } from "@/features/auth/components/AvatarStep";
import { RecoveryStep } from "@/features/auth/components/RecoveryStep";
import { UsernameStep } from "@/features/auth/components/UsernameStep";

import { useOnboarding } from "@/features/auth/hooks/useOnboarding";
import { useOnboardingForm } from "@/features/auth/hooks/useOnboardingForm";

export default function CreateUserPage() {
  const router = useRouter();

  const onboarding = useOnboarding();

  const {
    currentStep,
    recoveryCode,

    isLoading,
    setIsLoading,

    nextStep,
    previousStep,
  } = onboarding;

  const { register, watch, setValue } = useOnboardingForm();

  const avatar = watch("avatar");

  const username = watch("username");

  async function handleEnterApp() {
    setValue("recoveryCode", recoveryCode);

    setIsLoading(true);

    const result = await createUser({
      username,
      avatar,
      recoveryCode,
    });

    setIsLoading(false);

    if (!result.success) {
      return;
    }

    router.push("/leaderboard");
  }

  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[500px] flex-col px-6 py-10">
        <AuthStepper currentStep={currentStep} />

        {currentStep === 1 && (
          <UsernameStep
            register={register}
            username={username}
            onNext={nextStep}
          />
        )}

        {currentStep === 2 && (
          <AvatarStep
            avatar={avatar}
            onSelectAvatar={(value) => setValue("avatar", value)}
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
      </div>
    </main>
  );
}
