export type AvatarPlayer = {
  id: string;
  name: string;
  photoUrl: string;
};

export const AVATAR_PLAYERS: AvatarPlayer[] = [
  { id: "messi", name: "Messi", photoUrl: "/players/messi3.jpg" },
  { id: "cr7", name: "Ronaldo", photoUrl: "/players/cr7.jpg" },
  { id: "nazario", name: "Ronaldo", photoUrl: "/players/nazario2.webp" },
  { id: "cruyff", name: "Cruyff", photoUrl: "/players/cruyff.webp" },
  { id: "enzo", name: "Enzo", photoUrl: "/players/enzo.webp" },
  { id: "kante", name: "Kante", photoUrl: "/players/kante.webp" },
  { id: "maradona", name: "Maradona", photoUrl: "/players/maradona2.webp" },
  { id: "pele", name: "Pele", photoUrl: "/players/pele.webp" },
  { id: "alvarez", name: "Araña", photoUrl: "/players/alvarez.webp" },
  { id: "messi", name: "Araña", photoUrl: "/players/messi4.webp" },
];

export function getAvatarPlayer(id: string | null | undefined) {
  return AVATAR_PLAYERS.find((p) => p.id === id) ?? null;
}
