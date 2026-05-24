import type { UseFormRegister } from "react-hook-form";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

type UsernameStepProps = {
  username: string;

  onNext: () => void;

  register: UseFormRegister<{
    username: string;

    avatar: string;

    recoveryCode: string;
  }>;
};

export function UsernameStep({
  username,

  onNext,

  register,
}: UsernameStepProps) {
  const isValid = username.trim().length >= 3;

  return (
    <div className="mt-8 flex flex-1 flex-col">
      <h1 className="text-[22px] font-bold uppercase">Elegí tu username</h1>

      <div className="mt-8">
        <Input
          autoComplete="off"
          placeholder="Username"
          isFilled={isValid}
          {...register("username")}
        />
      </div>

      <div className="mt-auto pt-8">
        <Button disabled={!isValid} onClick={onNext}>
          Siguiente paso
        </Button>
      </div>
    </div>
  );
}
