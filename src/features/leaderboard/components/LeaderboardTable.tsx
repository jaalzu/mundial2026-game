import { borders, colors, typography } from "@/shared/constants/designSystem";

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

// DATA FAKE PARA TESTEAR
const fakeEntries: LeaderboardEntry[] = Array.from({ length: 50 }, (_, i) => ({
  rank: i + 1,
  userId: `${i + 1}`,
  username: i % 5 === 0 ? `SuperUltraLongUsername_${i + 1}` : `Player_${i + 1}`,
  avatarPlayerId: null,
  totalPoints: 300 - i * 3,
  rankDelta: Math.floor(Math.random() * 11) - 5, // -5 a +5
}));

export function LeaderboardTable({
  entries = fakeEntries,
  currentUserId = "4",
}: LeaderboardTableProps) {
  // Borde inferior muy leve y gris opaco para separar a los jugadores
  const rowBottomBorder = `1px solid rgba(128, 128, 128, 0.12)`;

  // Separador verde para los títulos (Header)
  const headerColumnSeparator = borders.light;

  return (
    <div className="w-full">
      {/* Header */}
      <div
        className="grid grid-cols-[50px_1fr_60px_50px] h-10 items-stretch text-center"
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

        <div className="flex items-center justify-center h-full">+/-</div>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {entries.map((entry) => {
          const isCurrentUser = entry.userId === currentUserId;

          // Rank colors
          const rankColor =
            entry.rank === 1
              ? "#FFD700" // Oro
              : entry.rank === 2
                ? "#C0C0C0" // Plata
                : entry.rank === 3
                  ? "#CD7F32" // Bronce
                  : colors.text;

          const deltaColor =
            entry.rankDelta > 0
              ? colors.primary
              : entry.rankDelta < 0
                ? colors.secondary
                : colors.text;

          return (
            <div
              key={entry.userId}
              className="grid grid-cols-[50px_1fr_60px_50px] items-center text-center"
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
                className="py-4 text-xl"
                style={{
                  color: rankColor,
                }}
              >
                {entry.rank}
              </div>

              {/* User info */}
              <div className="flex items-center gap-2 pl-2 text-left min-w-0">
                {/* Avatar */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xl shrink-0"
                  style={{
                    backgroundColor: "rgba(255, 0, 0, 0.93)",
                  }}
                />

                {/* Username */}
                <span
                  className="font-medium truncate"
                  style={{
                    fontSize: typography.sizes.md,
                  }}
                >
                  {entry.username}
                </span>
              </div>

              {/* Points */}
              <div
                className="py-4 font-bold text-xl"
                style={{
                  fontSize: typography.sizes.lg,
                }}
              >
                {entry.totalPoints}
              </div>

              {/* Rank Delta */}
              <div
                className="py-4 font-bold"
                style={{
                  color: deltaColor,
                  fontSize: typography.sizes.md,
                }}
              >
                {entry.rankDelta > 0 && `+${entry.rankDelta}`}
                {entry.rankDelta < 0 && `${entry.rankDelta}`}
                {entry.rankDelta === 0 && `0`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// import { borders, colors, typography } from "@/shared/constants/designSystem";

// type LeaderboardEntry = {
//   rank: number;
//   userId: string;
//   username: string;
//   avatarPlayerId: string | null;
//   totalPoints: number;
//   rankDelta: number;
// };

// type LeaderboardTableProps = {
//   entries: LeaderboardEntry[];
//   currentUserId?: string;
// };

// export function LeaderboardTable({
//   entries,
//   currentUserId,
// }: LeaderboardTableProps) {
//   // Borde inferior muy leve y gris opaco para separar a los jugadores
//   const rowBottomBorder = `1px solid rgba(128, 128, 128, 0.12)`;

//   // Separador verde para los títulos (Header)
//   const headerColumnSeparator = borders.light;

//   return (
//     <div className="w-full">
//       {/* Header */}
//       <div
//         className="grid grid-cols-[50px_1fr_60px_50px] h-10 items-stretch text-center"
//         style={{
//           borderTop: borders.light,
//           borderBottom: borders.light,
//           fontSize: typography.sizes.md,
//           fontWeight: "bold",
//           textTransform: "uppercase",
//         }}
//       >
//         <div
//           className="flex items-center justify-center  h-full"
//           style={{ borderRight: headerColumnSeparator }}
//         >
//           RANK
//         </div>
//         <div className="text-left pl-3 flex items-center h-full">JUGADORES</div>
//         <div
//           className="flex items-center justify-center h-full"
//           style={{
//             borderLeft: headerColumnSeparator,
//             borderRight: headerColumnSeparator,
//           }}
//         >
//           PTS
//         </div>
//         <div className="flex items-center justify-center h-full">+/-</div>
//       </div>

//       {/* Rows */}
//       <div className="flex flex-col">
//         {entries.map((entry) => {
//           const isCurrentUser = entry.userId === currentUserId;

//           // Rank colors
//           const rankColor =
//             entry.rank === 1
//               ? "#FFD700" // Oro
//               : entry.rank === 2
//                 ? "#C0C0C0" // Plata
//                 : entry.rank === 3
//                   ? "#CD7F32" // Bronce
//                   : colors.text;

//           const deltaColor =
//             entry.rankDelta > 0
//               ? colors.primary
//               : entry.rankDelta < 0
//                 ? colors.secondary
//                 : colors.text;

//           return (
//             <div
//               key={entry.userId}
//               className="grid grid-cols-[50px_1fr_60px_50px] items-center text-center"
//               style={{
//                 borderBottom: rowBottomBorder,
//                 backgroundColor: isCurrentUser
//                   ? "rgba(58, 172, 59, 0.05)"
//                   : "transparent",
//                 fontFamily: typography.fontFamily,
//               }}
//             >
//               {/* Rank  */}
//               <div
//                 className="py-4  text-xl"
//                 style={{
//                   color: rankColor,
//                 }}
//               >
//                 {entry.rank}
//               </div>

//               {/* User info (Casilla limpia con mucho espacio) */}
//               <div className="flex items-center gap-2  pl-2 text-left">
//                 {/* Avatar grande */}
//                 <div
//                   className="w-7 h-7 rounded-full flex items-center justify-center text-xl shrink-0"
//                   style={{ backgroundColor: "rgba(255, 0, 0, 0.93)" }}
//                 ></div>

//                 {/* Nombre */}
//                 <span
//                   className="font-medium truncate"
//                   style={{ fontSize: typography.sizes.md }}
//                 >
//                   {entry.username}
//                 </span>
//               </div>

//               {/* Points (Limpio) */}
//               <div
//                 className="py-4 font-bold text-xl"
//                 style={{ fontSize: typography.sizes.lg }}
//               >
//                 {entry.totalPoints}
//               </div>

//               {/* Rank Delta */}
//               <div
//                 className="py-4 font-bold"
//                 style={{
//                   color: deltaColor,
//                   fontSize: typography.sizes.md,
//                 }}
//               >
//                 {entry.rankDelta > 0 && `+${entry.rankDelta}`}
//                 {entry.rankDelta < 0 && `${entry.rankDelta}`}
//                 {entry.rankDelta === 0 && `0`}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
