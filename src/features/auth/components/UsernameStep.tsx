import type { UseFormRegister } from "react-hook-form";

import type { CreateUserInput } from "@/features/auth/schemas/createUserSchema";

type UsernameStepProps = {
  register: UseFormRegister<CreateUserInput>;
  username: string;
  onNext: () => void;
};

export function UsernameStep({
  register,
  onNext,
  username,
}: UsernameStepProps) {
  return (
    <div className="mt-16 flex flex-col">
      <div className="mb-10">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#BCBCBC]">
          Step 1
        </p>

        <h1 className="text-3xl font-bold uppercase leading-none">
          Elegí tu username
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="username"
          className="text-sm font-bold uppercase text-[#BCBCBC]"
        >
          Username
        </label>

        <input
          id="username"
          placeholder="MESSI_FAN"
          maxLength={16}
          {...register("username")}
          className="h-14 border-[2px] border-[#666666] bg-transparent px-4 text-lg font-bold uppercase outline-none placeholder:text-[#666666]"
        />
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={username.trim().length < 3}
        className={[
          "mt-10 h-14 border-[3px] text-sm font-bold uppercase transition-opacity duration-150",
          username.trim().length < 3
            ? "border-[#666666] text-[#666666]"
            : "border-[#3CAC3B] bg-[#3CAC3B] text-black active:opacity-80",
        ].join(" ")}
      >
        Siguiente paso
      </button>
    </div>
  );
}
