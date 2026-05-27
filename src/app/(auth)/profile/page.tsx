import { ProfilePageServer } from "@/features/profile/components/ProfilePageServer";

export const revalidate = 300;

export default function ProfilePage() {
  return <ProfilePageServer />;
}
