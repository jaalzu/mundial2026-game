import type {
  KnockoutMatch,
  TeamOption,
} from "@/features/predictions/models/types";

export const MOCK_TEAMS: TeamOption[] = [
  { id: "t1", name: "Argentina", code: "AR", flagUrl: "" },
  { id: "t2", name: "Brasil", code: "BR", flagUrl: "" },
  { id: "t3", name: "Francia", code: "FR", flagUrl: "" },
  { id: "t4", name: "España", code: "ES", flagUrl: "" },
];

function emptyMatch(
  id: string,
  phase: KnockoutMatch["phase"],
  bracket: KnockoutMatch["bracket"],
): KnockoutMatch {
  return {
    id,
    phase,
    bracket,
    homeTeam: null,
    awayTeam: null,
    startsAt: null,
    status: "SCHEDULED",
  };
}

function buildRound(
  phase: KnockoutMatch["phase"],
  count: number,
  hasBracket: boolean,
): KnockoutMatch[] {
  const matches: KnockoutMatch[] = [];
  for (let i = 1; i <= count; i++) {
    const bracket = hasBracket ? (i <= count / 2 ? 1 : 2) : null;
    matches.push(emptyMatch(`${phase.toLowerCase()}-${i}`, phase, bracket));
  }
  return matches;
}

export const MOCK_KNOCKOUT_MATCHES: KnockoutMatch[] = [
  ...buildRound("ROUND_OF_16", 16, true),
  ...buildRound("ROUND_OF_8", 8, true),
  ...buildRound("QUARTER_FINAL", 4, false),
  ...buildRound("SEMI_FINAL", 2, false),
  ...buildRound("THIRD_PLACE", 1, false),
  ...buildRound("FINAL", 1, false),
];
