// getProfileData.ts
"use server";

import { getCachedProfileData } from "../queries/getProfileDataQuery";

export async function getProfileData(userId: string) {
  return getCachedProfileData(userId)();
}
