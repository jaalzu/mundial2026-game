type AvatarStepProps = {
  avatar: string;
  onSelectAvatar: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

const avatars = ["⚽", "🏆", "🔥", "🇦🇷"];

export function AvatarStep({
  avatar,
  onSelectAvatar,
  onNext,
  onBack,
}: AvatarStepProps) {
  return (
    <div className="mt-16 flex flex-col">
      <div className="mb-10">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#BCBCBC]">
          Step 2
        </p>

        <h1 className="text-3xl font-bold uppercase leading-none">
          Elegí tu avatar
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {avatars.map((item) => {
          const isSelected = avatar === item;

          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelectAvatar(item)}
              className={[
                "flex h-24 items-center justify-center border-[3px] text-4xl",
                isSelected
                  ? "border-[#3CAC3B] bg-[#3CAC3B]"
                  : "border-[#666666]",
              ].join(" ")}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border-[3px] border-[#666666] py-4 text-sm font-bold uppercase"
        >
          Volver
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!avatar}
          className={[
            "flex-1 border-[3px] py-4 text-sm font-bold uppercase",
            avatar
              ? "border-[#3CAC3B] bg-[#3CAC3B] text-black"
              : "border-[#666666] text-[#666666]",
          ].join(" ")}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
