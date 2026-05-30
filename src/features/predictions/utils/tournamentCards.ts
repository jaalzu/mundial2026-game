import type { TournamentCardConfig } from "../models/types";

/**
 * Single source of truth for all tournament prediction cards.
 * Order here = render order in the UI.
 * When players are ready, playerPosition filters the dropdown automatically.
 */
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
  //   {
  //     field: "finalHomeTeamId",
  //     label: "Final — Local",
  //     description: "Primer equipo en la gran final",
  //     type: "team",
  //   },
  //   {
  //     field: "finalAwayTeamId",
  //     label: "Final — Visitante",
  //     description: "Segundo equipo en la gran final",
  //     type: "team",
  //   },
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
    playerPosition: "FORWARD",
  },
  {
    field: "bestGoalkeeperPlayerId",
    label: "Mejor Arquero",
    description: "El guardián del torneo",
    type: "player",
    playerPosition: "GOALKEEPER",
  },
  {
    field: "revelationPlayerId",
    label: "Jugador Revelación",
    description: "El que sorprendió a todos",
    type: "player",
  },
];
