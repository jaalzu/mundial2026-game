import { AdminKnockoutMatches } from "@/features/admin/components/knockout/AdminKnockoutMatches";
import {
  MOCK_KNOCKOUT_MATCHES,
  MOCK_TEAMS,
} from "@/features/admin/data/mockKnockoutMatches";

export default function KnockoutTestPage() {
  return (
    <div className="p-6">
      <AdminKnockoutMatches
        initialMatches={MOCK_KNOCKOUT_MATCHES}
        teams={MOCK_TEAMS}
      />
    </div>
  );
}
