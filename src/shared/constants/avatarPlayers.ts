export type AvatarPlayer = {
  id: string;
  name: string;
  photoUrl: string;
};

export const AVATAR_PLAYERS: AvatarPlayer[] = [
  { id: "messi", name: "Messi", photoUrl: "/players/messi2.webp" },
  { id: "cr7", name: "el bicho", photoUrl: "/players/cr7.webp" },
  { id: "nazario", name: "Ronaldo", photoUrl: "/players/nazario.webp" },
  { id: "cruyff", name: "Cruyff", photoUrl: "/players/cruyff.webp" },
  { id: "enzo", name: "Enzo", photoUrl: "/players/enzo.webp" },
  { id: "kante", name: "Kante", photoUrl: "/players/kante.webp" },
  { id: "maradona", name: "Maradona", photoUrl: "/players/maradona.webp" },
  { id: "maradona2", name: "Maradona", photoUrl: "/players/maradona2.webp" },
  { id: "pele", name: "Pele", photoUrl: "/players/pele.webp" },
  { id: "yamal", name: "yamal", photoUrl: "/players/yamal.webp" },
  { id: "dibu", name: "el dibu", photoUrl: "/players/dibu.webp" },
  { id: "kane", name: "harry kane", photoUrl: "/players/kane.webp" },
];

export function getAvatarPlayer(id: string | null | undefined) {
  return AVATAR_PLAYERS.find((p) => p.id === id) ?? null;
}
