import type { Metadata } from "next";
import ProfilePage from "@/components/ProfilePage/ProfilePage";

export const metadata: Metadata = {
  title: "Patient Settings | SmartConsult+",
  description: "Manage your patient settings in SmartConsult+.",
};

export default function Page() {
  return <ProfilePage userType="patient" mode="settings" />;
}

