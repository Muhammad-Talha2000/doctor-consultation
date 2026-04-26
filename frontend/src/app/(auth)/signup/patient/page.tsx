import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: 'Create Patient Account - CareBridge Health',
  description: 'Join CareBridge Health to access quality healthcare consultations from certified doctors.',
};

export default function PatientSignUpPage() {
  return  <AuthForm type='signup' userRole='patient'/>
}