import { typography, colors } from "@/shared/constants/designSystem";

export interface NextMatchData {
  group: string | null;
  startsAt: Date;
  homeTeam: { code: string };
  awayTeam: { code: string };
}

function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

function formatGroup(group: string | null): string {
  return group?.replace("Group ", "") ?? "";
}

export function NextMatch({
  group,
  startsAt,
  homeTeam,
  awayTeam,
}: NextMatchData) {
  const sep = <span style={{ color: colors.primary }}> - </span>;

  return (
    <div className="flex flex-col items-end">
      <span
        style={{
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.xs,
          color: colors.mutedText,
          letterSpacing: "0.08em",
        }}
      >
        SIGUIENTE PARTIDO
      </span>
      <span
        style={{
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.sm,
          color: colors.text,
        }}
      >
        {homeTeam.code} VS {awayTeam.code}
        {sep}
        {formatTime(startsAt)}
        {sep}GRUPO {formatGroup(group)}
      </span>
    </div>
  );
}
