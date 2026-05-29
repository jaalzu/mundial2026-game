export const TEAM_NAMES_ES: Record<string, string> = {
  // Grupo A
  MEX: "México",
  RSA: "Sudáfrica",
  KOR: "Corea",
  CZE: "Chequia",

  // Grupo B
  CAN: "Canadá",
  BIH: "Bosnia ",
  QAT: "Qatar",
  SUI: "Suiza",

  // Grupo C
  BRA: "Brasil",
  MAR: "Marruecos",
  HAI: "Haití",
  "GB-SCT": "Escocia",

  // Grupo D
  USA: "USA",
  PAR: "Paraguay",
  AUS: "Australia",
  TUR: "Turquía",

  // Grupo E
  GER: "Alemania",
  CUW: "Curazao",
  CIV: "C. de Marfil",
  ECU: "Ecuador",

  // Grupo F
  NED: "Holanda",
  JPN: "Japón",
  SWE: "Suecia",
  TUN: "Túnez",

  // Grupo G
  BEL: "Bélgica",
  EGY: "Egipto",
  IRN: "Irán",
  NZL: "New Zeland",

  // Grupo H
  ESP: "España",
  CPV: "Cabo Verde",
  KSA: "Arabia",
  URU: "Uruguay",

  // Grupo I
  FRA: "Francia",
  SEN: "Senegal",
  IRQ: "Irak",
  NOR: "Noruega",

  // Grupo J
  ARG: "Argentina",
  ALG: "Argelia",
  AUT: "Austria",
  JOR: "Jordania",

  // Grupo K
  POR: "Portugal",
  COD: "Congo",
  UZB: "Uzbekistán",
  COL: "Colombia",

  // Grupo L
  "GB-ENG": "Inglaterra",
  CRO: "Croacia",
  GHA: "Ghana",
  PAN: "Panamá",
};
export function getTeamNameEs(code: string, fallback: string): string {
  return TEAM_NAMES_ES[code] ?? fallback;
}
