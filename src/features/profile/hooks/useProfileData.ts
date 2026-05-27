// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { getProfileData } from "../actions/getProfileData";
// import { resolveTournamentPredictionDisplay } from "../utils/resolveTournamentPredictionDisplay";
// import { getMockStats } from "../data/mockProfileData";

// const PROFILE_INIT_TIME = Date.now();

// export type UseProfileDataReturn = {
//   stats: ReturnType<typeof getMockStats>;
//   predictions: ReturnType<typeof resolveTournamentPredictionDisplay>;
//   isLoading: boolean;
//   error: Error | null;
// };

// export function useProfileData(
//   userId: string,
//   initialData?: Awaited<ReturnType<typeof getProfileData>>,
// ): UseProfileDataReturn {
//   const query = useQuery({
//     queryKey: ["profile", userId],
//     queryFn: () => getProfileData(userId),
//     initialData,
//     initialDataUpdatedAt: PROFILE_INIT_TIME,
//     staleTime: 24 * 60 * 60 * 1000,
//     gcTime: 7 * 24 * 60 * 60 * 1000,
//     retry: 1,
//     enabled: !!userId,
//   });

//   return {
//     stats: query.data?.stats ?? getMockStats(),
//     predictions: resolveTournamentPredictionDisplay(
//       query.data?.prediction ?? null,
//     ),
//     isLoading: query.isLoading,
//     error: query.error as Error | null,
//   };
// }
