import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: 'Doctor Login - CareBridge Health',
  description: 'Healthcare provider sign in to CareBridge Health platform. Manage your practice and consultations.',
};


export default function DoctorLoginPage() {
  return  <AuthForm type='login' userRole='doctor'/>
}