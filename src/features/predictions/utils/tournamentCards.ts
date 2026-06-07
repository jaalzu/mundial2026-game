import type { TournamentCardConfig } from "../models/types";

export const TOURNAMENT_CARDS: TournamentCardConfig[] = [
  {
    field: "championTeamId",
    label: "Campeón",
    description: "¿Quién levanta la copa?",
    type: "team",
  },
  {
    field: "runnerUpTeamId",
    label: "Subcampeón",
    description: "¿Quién llega a la final pero no gana?",
    type: "team",
  },
  {
    field: "surpriseTeamId",
    label: "Selección Sorpresa",
    description: "La que nadie esperaba que llegara tan lejos",
    type: "team",
  },
  {
    field: "disappointmentTeamId",
    label: "Selección Decepción",
    description: "La que esperabas más y no apareció",
    type: "team",
  },
  {
    field: "mvpPlayerId",
    label: "MVP",
    description: "Mejor jugador del torneo",
    type: "player",
  },
  {
    field: "goldenBootPlayerId",
    label: "Bota de Oro",
    description: "Máximo goleador",
    type: "player",
  },
  {
    field: "bestGoalkeeperPlayerId",
    label: "Mejor Arquero",
    description: "El guardián del torneo",
    type: "player",
    filterPosition: "GK",
  },
  {
    field: "revelationPlayerId",
    label: "Jugador Revelación",
    description: "El que sorprendió a todos",
    type: "player",
  },
];
