import ProfilePage from "@/components/ProfilePage/ProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Profile | CareBridge Health",
  description: "View and manage your patient profile in CareBridge Health platform.",
};

export default function Page() {
  return  <ProfilePage userType='patient'/>
}