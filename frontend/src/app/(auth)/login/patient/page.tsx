import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: 'Patient Login - SmartConsult+',
  description: 'Sign in to your SmartConsult+ account to access healthcare consultations.',
};

export default function PatientLoginPage() {
  return  <AuthForm type='login' userRole='patient'/>
}