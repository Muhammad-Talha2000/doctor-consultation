import type { Metadata } from "next";
import ProfilePage from "@/components/ProfilePage/ProfilePage";

export const metadata: Metadata = {
  title: "Doctor Settings | SmartConsult+",
  description: "Manage your doctor settings in SmartConsult+.",
};

export default function Page() {
  return <ProfilePage userType="doctor" mode="settings" />;
}

