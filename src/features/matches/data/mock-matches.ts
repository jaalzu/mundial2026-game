import type { MatchSummary } from "@/features/matches/types";

export const mockMatches: MatchSummary[] = [
  {
    id: "1",
    phase: "Grupo A",
    startsAt: "11 Jun, 21:00",
    homeTeam: "Argentina",
    awayTeam: "Canada",
    homeFlag: "ARG",
    awayFlag: "CAN"
  },
  {
    id: "2",
    phase: "Grupo A",
    startsAt: "12 Jun, 18:00",
    homeTeam: "Mexico",
    awayTeam: "Uruguay",
    homeFlag: "MEX",
    awayFlag: "URU"
  }
];
