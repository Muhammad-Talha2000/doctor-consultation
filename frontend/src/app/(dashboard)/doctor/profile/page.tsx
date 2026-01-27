import ProfilePage from "@/components/ProfilePage/ProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor Profile | SmartConsult+",
  description: "View and manage your doctor profile in SmartConsult+ platform.",
};

export default function Page() {
  return  <ProfilePage userType='doctor'/>
}