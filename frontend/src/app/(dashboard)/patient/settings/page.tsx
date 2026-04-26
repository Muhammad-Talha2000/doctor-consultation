import type { Metadata } from "next";
import ProfilePage from "@/components/ProfilePage/ProfilePage";

export const metadata: Metadata = {
  title: "Patient Settings | CareBridge Health",
  description: "Manage your patient settings in CareBridge Health.",
};

export default function Page() {
  return <ProfilePage userType="patient" mode="settings" />;
}

