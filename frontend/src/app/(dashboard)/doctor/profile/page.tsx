import ProfilePage from "@/components/ProfilePage/ProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor Profile | CareBridge Health",
  description: "View and manage your doctor profile in CareBridge Health platform.",
};

export default function Page() {
  return  <ProfilePage userType='doctor'/>
}