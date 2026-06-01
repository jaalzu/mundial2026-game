import { ProfilePageServer } from "@/features/profile/components/ProfilePageServer";

export const revalidate = 3600;

export default function ProfilePage() {
  return <ProfilePageServer />;
}
