import type { PlayerOption, TeamOption } from "../models/types";

/**
 * MOCK DATA — replace with real Prisma query once players.json is seeded.
 *
 * Shape matches PlayerOption exactly so the swap is a one-liner:
 *   const players = await prisma.player.findMany({ select: { ... } })
 */
export const MOCK_PLAYERS: PlayerOption[] = [
  {
    id: "mock-player-1",
    name: "Lionel Messi",
    photoUrl: null,
    position: "FORWARD",
    team: { id: "mock-team-arg", name: "Argentina", code: "ARG", flagUrl: "" },
  },
  {
    id: "mock-player-2",
    name: "Kylian Mbappé",
    photoUrl: null,
    position: "FORWARD",
    team: { id: "mock-team-fra", name: "Francia", code: "FRA", flagUrl: "" },
  },
  {
    id: "mock-player-3",
    name: "Erling Haaland",
    photoUrl: null,
    position: "FORWARD",
    team: { id: "mock-team-nor", name: "Noruega", code: "NOR", flagUrl: "" },
  },
  {
    id: "mock-player-4",
    name: "Vinicius Jr.",
    photoUrl: null,
    position: "FORWARD",
    team: { id: "mock-team-bra", name: "Brasil", code: "BRA", flagUrl: "" },
  },
  {
    id: "mock-player-5",
    name: "Alisson Becker",
    photoUrl: null,
    position: "GOALKEEPER",
    team: { id: "mock-team-bra", name: "Brasil", code: "BRA", flagUrl: "" },
  },
  {
    id: "mock-player-6",
    name: "Manuel Neuer",
    photoUrl: null,
    position: "GOALKEEPER",
    team: { id: "mock-team-ger", name: "Alemania", code: "GER", flagUrl: "" },
  },
  {
    id: "mock-player-7",
    name: "Pedri",
    photoUrl: null,
    position: "MIDFIELDER",
    team: { id: "mock-team-esp", name: "España", code: "ESP", flagUrl: "" },
  },
  {
    id: "mock-player-8",
    name: "Jude Bellingham",
    photoUrl: null,
    position: "MIDFIELDER",
    team: {
      id: "mock-team-eng",
      name: "Inglaterra",
      code: "GB-ENG",
      flagUrl: "",
    },
  },
];

/**
 * MOCK TEAMS — replace with real Prisma query.
 * Shape matches TeamOption exactly.
 */
export const MOCK_TEAMS: TeamOption[] = [
  { id: "mock-team-arg", name: "Argentina", code: "ARG", flagUrl: "" },
  { id: "mock-team-fra", name: "Francia", code: "FRA", flagUrl: "" },
  { id: "mock-team-bra", name: "Brasil", code: "BRA", flagUrl: "" },
  { id: "mock-team-ger", name: "Alemania", code: "GER", flagUrl: "" },
  { id: "mock-team-esp", name: "España", code: "ESP", flagUrl: "" },
  { id: "mock-team-eng", name: "Inglaterra", code: "GB-ENG", flagUrl: "" },
  { id: "mock-team-por", name: "Portugal", code: "POR", flagUrl: "" },
  { id: "mock-team-ned", name: "Países Bajos", code: "NED", flagUrl: "" },
];
