import Image from "next/image";
import { Button } from "@/shared/components/ui/Button";
import { typography } from "@/shared/constants/designSystem";
import { AVATAR_PLAYERS } from "@/shared/constants/avatarPlayers";

type AvatarStepProps = {
  avatar: string;
  onSelectAvatar: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export function AvatarStep({
  avatar,
  onSelectAvatar,
  onNext,
  onBack,
}: AvatarStepProps) {
  return (
    <div className="mt-7 flex flex-1 flex-col">
      <h1
        className="text-[26px] font-bold uppercase mb-6"
        style={{ fontFamily: typography.fontFamily }}
      >
        Elegí tu avatar
      </h1>

      <div className="grid grid-cols-5 md:grid-cols-6 gap-12 md:gap-4 mb-8">
        {AVATAR_PLAYERS.map((player) => (
          <button
            key={player.id}
            type="button"
            onClick={() => onSelectAvatar(player.id)}
            className="relative w-18 h-18 rounded-full overflow-hidden transition-all mx-auto"
            style={{
              border:
                avatar === player.id
                  ? "3px solid #3CAC3B"
                  : "3px solid transparent",
            }}
          >
            <Image
              src={player.photoUrl}
              alt={player.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>

      <div className="mt-2 flex gap-3">
        <Button variant="muted" onClick={onBack} className="flex-1">
          Volver
        </Button>
        <Button disabled={!avatar} onClick={onNext} className="flex-1">
          Siguiente
        </Button>
      </div>
    </div>
  );
}
