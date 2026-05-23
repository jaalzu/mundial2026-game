type RecoveryStepProps = {
  recoveryCode: string;

  username: string;

  isLoading: boolean;

  onEnterApp: () => void;
};

export function RecoveryStep({
  recoveryCode,
  username,
  isLoading,
  onEnterApp,
}: RecoveryStepProps) {
  return (
    <div className="mt-16 flex flex-col">
      <div className="mb-10">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#BCBCBC]">
          Step 3
        </p>

        <h1 className="text-3xl font-bold uppercase leading-none">
          Guardá tu código
        </h1>
      </div>

      <div className="border-[3px] border-[#3CAC3B] p-6">
        <p className="mb-3 text-sm uppercase text-[#BCBCBC]">Recovery code</p>

        <p className="text-2xl font-bold uppercase">{recoveryCode}</p>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-[#BCBCBC]">
        Este código permite recuperar tu usuario si perdés acceso al
        dispositivo.
      </p>

      <div className="mt-10 border-[2px] border-[#666666] p-4">
        <p className="text-sm uppercase text-[#BCBCBC]">Username</p>

        <p className="mt-2 text-xl font-bold uppercase">{username}</p>
      </div>

      <button
        type="button"
        disabled={isLoading}
        onClick={onEnterApp}
        className={[
          "mt-10 h-14 border-[3px] text-sm font-bold uppercase",
          isLoading
            ? "border-[#666666] text-[#666666]"
            : "border-[#3CAC3B] bg-[#3CAC3B] text-black",
        ].join(" ")}
      >
        {isLoading ? "Creando usuario..." : "Entrar a la app"}
      </button>
    </div>
  );
}
