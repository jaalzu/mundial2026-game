export type AvatarPlayer = {
  id: string;
  name: string;
  photoUrl: string;
};

export const AVATAR_PLAYERS: AvatarPlayer[] = [
  { id: "messi", name: "Messi", photoUrl: "/players/messi3.jpg" },
  { id: "cr7", name: "Ronaldo", photoUrl: "/players/cr7.jpg" },
  { id: "neymar", name: "Neymar", photoUrl: "/players/neymar.jpg" },
];

export function getAvatarPlayer(id: string | null | undefined) {
  return AVATAR_PLAYERS.find((p) => p.id === id) ?? null;
}
