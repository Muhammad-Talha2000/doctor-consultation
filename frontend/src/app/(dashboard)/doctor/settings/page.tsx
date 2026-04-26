import type { Metadata } from "next";
import ProfilePage from "@/components/ProfilePage/ProfilePage";

export const metadata: Metadata = {
  title: "Doctor Settings | CareBridge Health",
  description: "Manage your doctor settings in CareBridge Health.",
};

export default function Page() {
  return <ProfilePage userType="doctor" mode="settings" />;
}

