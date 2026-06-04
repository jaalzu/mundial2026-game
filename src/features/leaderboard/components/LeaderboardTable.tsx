import Image from "next/image";
import { borders, colors, typography } from "@/shared/constants/designSystem";
import { getAvatarPlayer } from "@/shared/constants/avatarPlayers";
import Link from "next/link";

type LeaderboardEntry = {
  rank: number;
  userId: string;
  username: string;
  avatarPlayerId: string | null;
  totalPoints: number;
  rankDelta: number;
};

type LeaderboardTableProps = {
  entries: LeaderboardEntry[];
  currentUserId?: string;
};

export function LeaderboardTable({
  entries,
  currentUserId,
}: LeaderboardTableProps) {
  const rowBottomBorder = `1px solid rgba(128, 128, 128, 0.12)`;
  const headerColumnSeparator = borders.light;

  return (
    <div className="w-full">
      {/* Header */}
      <div
        className="grid grid-cols-[50px_1fr_60px] h-11 items-stretch text-center"
        style={{
          borderTop: borders.light,
          borderBottom: borders.light,
          fontSize: typography.sizes.md,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        <div
          className="flex items-center justify-center h-full"
          style={{ borderRight: headerColumnSeparator }}
        >
          RANK
        </div>
        <div className="text-left pl-3 flex items-center h-full">JUGADORES</div>
        <div
          className="flex items-center justify-center h-full"
          style={{
            borderLeft: headerColumnSeparator,
            borderRight: headerColumnSeparator,
          }}
        >
          PTS
        </div>
        {/* <div className="flex items-center justify-center h-full">+/-</div> */}
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {entries.map((entry) => {
          const isCurrentUser = entry.userId === currentUserId;
          const avatarPlayer = getAvatarPlayer(entry.avatarPlayerId);
          const rankColor =
            entry.rank === 1
              ? "#FFD700"
              : entry.rank === 2
                ? "#C0C0C0"
                : entry.rank === 3
                  ? "#CD7F32"
                  : colors.text;

          return (
            <div
              key={entry.userId}
              className="grid grid-cols-[50px_1fr_60px] items-center text-center"
              style={{
                borderBottom: rowBottomBorder,
                backgroundColor: isCurrentUser
                  ? "rgba(58, 172, 59, 0.05)"
                  : "transparent",
                fontFamily: typography.fontFamily,
              }}
            >
              {/* Rank */}
              <div
                className="py-4 flex flex-col items-center justify-center gap-0.5"
                style={{ color: rankColor }}
              >
                <span className="text-xl">{entry.rank}</span>
                {entry.rankDelta > 0 && (
                  <span
                    style={{
                      fontSize: "10px",
                      color: colors.primary,
                      lineHeight: 1,
                    }}
                  >
                    ↑{entry.rankDelta}
                  </span>
                )}
                {entry.rankDelta < 0 && (
                  <span
                    style={{
                      fontSize: "10px",
                      color: colors.secondary,
                      lineHeight: 1,
                    }}
                  >
                    ↓{Math.abs(entry.rankDelta)}
                  </span>
                )}
              </div>

              {/* User info */}
              <div className="flex items-center gap-2 pl-2 text-left">
                {/* Avatar */}
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
                  {avatarPlayer ? (
                    <Image
                      src={avatarPlayer.photoUrl}
                      alt={avatarPlayer.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-600" />
                  )}
                </div>

                {/* Nombre */}
                <Link href={`/profile/${entry.userId}`}>
                  <span
                    className="font-medium truncate hover:opacity-70 transition-opacity cursor-pointer"
                    style={{ fontSize: typography.sizes.md }}
                  >
                    {entry.username}
                  </span>
                </Link>
              </div>

              {/* Points */}
              <div
                className="py-4 font-bold"
                style={{ fontSize: typography.sizes.lg }}
              >
                {entry.totalPoints}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
