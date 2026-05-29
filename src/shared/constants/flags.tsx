/**
 * flags.tsx
 *
 * Banderas del Mundial 2026 con 3 SVGs inline para:
 * - England (ENG o GB-ENG)
 * - Scotland (SCO o GB-SCT)
 * - Curaçao (CUW o CW)
 *
 * El resto usa flag-icons CSS.
 * Soporta tanto fifa_code como iso_code.
 */

import React from "react";

/**
 * Mapeo DUAL: acepta tanto FIFA codes como ISO codes
 * fifa_code → iso2 (para flag-icons)
 * iso_code → iso2 (para flag-icons)
 */
export const FIFA_TO_ISO2: Record<string, string> = {
  // CONMEBOL (FIFA)
  ARG: "ar",
  BRA: "br",
  COL: "co",
  ECU: "ec",
  PAR: "py",
  URU: "uy",
  // CONCACAF (FIFA)
  CAN: "ca",
  MEX: "mx",
  USA: "us",
  CUW: "inline-curacao",
  HAI: "ht",
  PAN: "pa",
  // UEFA (FIFA)
  AUT: "at",
  BEL: "be",
  BIH: "ba",
  CRO: "hr",
  CZE: "cz",
  ENG: "inline-england",
  ESP: "es",
  FRA: "fr",
  GER: "inline-germany",

  NED: "nl",
  NOR: "no",
  POR: "pt",
  SCO: "inline-scotland",
  SUI: "ch",
  SWE: "se",
  TUR: "tr",
  // CAF (FIFA)
  ALG: "dz",
  CPV: "cv",
  CIV: "ci",
  COD: "cd",
  EGY: "eg",
  GHA: "gh",
  MAR: "ma",
  RSA: "za",
  SEN: "sn",
  TUN: "tn",
  // AFC (FIFA)
  IRN: "ir",
  IRQ: "iq",
  JPN: "jp",
  JOR: "jo",
  KOR: "kr",
  KSA: "sa",
  QAT: "qa",
  UZB: "uz",
  // OFC (FIFA)
  AUS: "au",
  NZL: "nz",

  // ========== ISO CODES (para cuando uses iso_code en DB) ==========
  // CONMEBOL (ISO)
  AR: "ar",
  BR: "br",
  CO: "co",
  EC: "ec",
  PY: "py",
  UY: "uy",
  // CONCACAF (ISO)
  CA: "ca",
  MX: "mx",
  US: "us",
  CW: "inline-curacao",
  HT: "ht",
  PA: "pa",
  // UEFA (ISO)
  AT: "at",
  BE: "be",
  BA: "ba",
  HR: "hr",
  CZ: "cz",
  "GB-ENG": "inline-england",
  ES: "es",
  FR: "fr",
  DE: "de",
  NL: "nl",
  NO: "no",
  PT: "pt",
  "GB-SCT": "inline-scotland",
  CH: "ch",
  SE: "se",
  TR: "tr",
  // CAF (ISO)
  DZ: "dz",
  CV: "cv",
  CI: "ci",
  CD: "cd",
  EG: "eg",
  GH: "gh",
  MA: "ma",
  ZA: "za",
  SN: "sn",
  TN: "tn",
  // AFC (ISO)
  IR: "ir",
  IQ: "iq",
  JP: "jp",
  JO: "jo",
  KR: "kr",
  SA: "sa",
  QA: "qa",
  UZ: "uz",
  // OFC (ISO)
  AU: "au",
  NZ: "nz",
};

/**
 * SVGs inline de alta calidad (900x600, ratio 3:2)
 * Fuente: Wikimedia Commons (Public Domain)
 */
const INLINE_SVGS = {
  "inline-england": (
    <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="600" fill="white" />
      <rect x="400" y="0" width="100" height="600" fill="#c8102e" />
      <rect x="0" y="250" width="900" height="100" fill="#c8102e" />
    </svg>
  ),

  "inline-germany": (
    <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="200" fill="#000000" />
      <rect y="200" width="900" height="200" fill="#DD0000" />
      <rect y="400" width="900" height="200" fill="#FFCE00" />
    </svg>
  ),

  "inline-scotland": (
    <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="600" fill="#003da5" />
      <line
        x1="0"
        y1="0"
        x2="900"
        y2="600"
        stroke="white"
        strokeWidth="120"
        strokeLinecap="round"
      />
      <line
        x1="900"
        y1="0"
        x2="0"
        y2="600"
        stroke="white"
        strokeWidth="120"
        strokeLinecap="round"
      />
    </svg>
  ),

  "inline-curacao": (
    <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="150" fill="#002082" />
      <rect y="150" width="900" height="300" fill="white" />
      <rect y="450" width="900" height="150" fill="#ffd700" />
      <rect y="145" width="900" height="10" fill="#ffd700" />
      <rect y="445" width="900" height="10" fill="#ffd700" />
      <g fill="white">
        <circle cx="450" cy="300" r="25" />
        <circle cx="330" cy="240" r="20" />
        <circle cx="570" cy="240" r="20" />
        <circle cx="330" cy="360" r="20" />
        <circle cx="570" cy="360" r="20" />
      </g>
    </svg>
  ),
};

interface FlagProps {
  code: string;
  className?: string;
  alt?: string;
}

/**
 * Flag component que soporta:
 * - FIFA codes (ENG, SCO, CUW, ARG, etc)
 * - ISO codes (GB-ENG, GB-SCT, CW, AR, etc)
 *
 * Renderiza con flag-icons CSS o SVG inline según el caso.
 */
export function Flag({ code, className = "w-9 h-6", alt }: FlagProps) {
  if (!code) {
    return (
      <span
        className={`${className} inline-block bg-gray-200 rounded-sm`}
        title="Código vacío"
        aria-label={alt ?? "unknown"}
      />
    );
  }

  const lookupCode = code.toUpperCase();
  const iso2 = FIFA_TO_ISO2[lookupCode];

  if (!iso2) {
    return (
      <span
        className={`${className} inline-block bg-gray-200 rounded-sm`}
        title={`Bandera no encontrada: ${code}`}
        aria-label={alt ?? code}
      />
    );
  }

  // Si es un SVG inline, renderizarlo directamente
  if (iso2.startsWith("inline-")) {
    const svgContent = INLINE_SVGS[iso2 as keyof typeof INLINE_SVGS];
    return (
      <span
        className={`inline-flex items-center justify-center rounded-sm overflow-hidden ${className}`}
        style={{ aspectRatio: "3 / 2", width: "100%", height: "100%" }}
        role="img"
        aria-label={alt ?? code}
      >
        {svgContent}
      </span>
    );
  }

  return (
    <span
      className={`fi fi-${iso2} inline-block rounded-sm ${className}`}
      role="img"
      aria-label={alt ?? code}
      style={{ backgroundSize: "cover", width: "100%", height: "100%" }}
    />
  );
}

export function getISO2(code: string): string | undefined {
  return FIFA_TO_ISO2[code?.toUpperCase()];
}
