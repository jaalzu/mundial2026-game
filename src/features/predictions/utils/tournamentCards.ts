import type { TournamentCardConfig } from "../models/types";
import { TOURNAMENT_POINTS } from "@/server/scoring/points";

export const TOURNAMENT_CARDS: TournamentCardConfig[] = [
  {
    field: "championTeamId",
    label: "Campeón",
    description: "¿Quién levanta la copa?",
    type: "team",
    points: TOURNAMENT_POINTS.championTeamId,
  },
  {
    field: "runnerUpTeamId",
    label: "Subcampeón",
    description: "¿Quién llega a la final pero no gana?",
    type: "team",
    points: TOURNAMENT_POINTS.runnerUpTeamId,
  },
  {
    field: "surpriseTeamId",
    label: "Selección Sorpresa",
    description: "La que nadie esperaba que llegara tan lejos",
    type: "team",
    points: TOURNAMENT_POINTS.surpriseTeamId,
  },
  {
    field: "disappointmentTeamId",
    label: "Selección Decepción",
    description: "La que esperabas más y no apareció",
    type: "team",
    points: TOURNAMENT_POINTS.disappointmentTeamId,
  },
  {
    field: "mvpPlayerId",
    label: "MVP",
    description: "Mejor jugador del torneo",
    type: "player",
    points: TOURNAMENT_POINTS.mvpPlayerId,
  },
  {
    field: "goldenBootPlayerId",
    label: "Bota de Oro",
    description: "Máximo goleador",
    type: "player",
    points: TOURNAMENT_POINTS.goldenBootPlayerId,
  },
  {
    field: "bestGoalkeeperPlayerId",
    label: "Mejor Arquero",
    description: "El guardián del torneo",
    type: "player",
    filterPosition: "GK",
    points: TOURNAMENT_POINTS.bestGoalkeeperPlayerId,
  },
  {
    field: "revelationPlayerId",
    label: "Jugador Revelación",
    description: "El que sorprendió a todos",
    type: "player",
    points: TOURNAMENT_POINTS.revelationPlayerId,
  },
];
