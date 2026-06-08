// app/api/admin/rebuild/route.ts
import { rebuildLeaderboard } from "@/server/leaderboard/rebuildLeaderboard";

export async function GET() {
  await rebuildLeaderboard();
  return Response.json({ ok: true });
}
