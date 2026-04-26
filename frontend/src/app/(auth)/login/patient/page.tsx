import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: 'Patient Login - CareBridge Health',
  description: 'Sign in to your CareBridge Health account to access healthcare consultations.',
};

export default function PatientLoginPage() {
  return  <AuthForm type='login' userRole='patient'/>
}