import Image from "next/image";
import { Button } from "@/shared/components/ui/Button";
import { typography } from "@/shared/constants/designSystem";

type AvatarStepProps = {
  avatar: string;
  onSelectAvatar: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

// 🔴 TEMPORAL - Reemplazar con data de API (expandí a 20 jugadores)
const MOCK_PLAYERS = [
  { id: "1", photoUrl: "⚽" },
  { id: "2", photoUrl: "🏆" },
  { id: "3", photoUrl: "🔥" },
  { id: "4", photoUrl: "🇦🇷" },
  { id: "5", photoUrl: "⚡" },
  { id: "6", photoUrl: "👑" },
  { id: "7", photoUrl: "🎯" },
  { id: "8", photoUrl: "💪" },
  { id: "9", photoUrl: "🌟" },
  { id: "10", photoUrl: "🦅" },
  { id: "11", photoUrl: "🐐" },
  { id: "12", photoUrl: "🔴" },
  { id: "13", photoUrl: "🟢" },
  { id: "14", photoUrl: "🔵" },
  { id: "15", photoUrl: "🟡" },
];

export function AvatarStep({
  avatar,
  onSelectAvatar,
  onNext,
  onBack,
}: AvatarStepProps) {
  const isValid = !!avatar;

  return (
    <div className="mt-7 flex flex-1 flex-col">
      <h1
        className="text-[26px] font-bold uppercase mb-6"
        style={{ fontFamily: typography.fontFamily }}
      >
        Elegí tu avatar
      </h1>

      {/* Grid de avatares circulares */}
      <div className="grid grid-cols-5 md:grid-cols-6 gap-3 md:gap-4 mb-8">
        {MOCK_PLAYERS.map((player) => {
          const isSelected = avatar === player.id;

          return (
            <button
              key={player.id}
              type="button"
              onClick={() => onSelectAvatar(player.id)}
              className="relative aspect-square rounded-full overflow-hidden transition-all"
              style={{
                border: isSelected ? "3px solid #3CAC3B" : "none",
              }}
            >
              {/* 🔴 Cuando tengas la API, reemplazá esto: */}
              {/* <Image
                src={player.photoUrl}
                alt="Player avatar"
                fill
                className="object-cover rounded-full"
              /> */}

              {/* TEMPORAL - emoji placeholder */}
              <div className="flex h-full items-center justify-center text-3xl md:text-4xl bg-[#2A2A2A] rounded-full">
                {player.photoUrl}
              </div>

              {/* Check verde pequeño cuando está seleccionado */}
              {isSelected && (
                <div className=" rounded-full bg-[#3CAC3B] flex items-center justify-center "></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Botones */}
      <div className="mt-2 flex gap-3">
        <Button variant="muted" onClick={onBack} className="flex-1">
          Volver
        </Button>

        <Button disabled={!isValid} onClick={onNext} className="flex-1">
          Siguiente
        </Button>
      </div>
    </div>
  );
}
