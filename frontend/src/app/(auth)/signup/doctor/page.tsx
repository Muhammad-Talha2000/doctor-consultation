import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: 'Join CareBridge Health as Healthcare Provider',
  description: 'Register as a healthcare provider on CareBridge Health to offer online consultations.',
};


export default function DoctorSignUpPage() {
  return  <AuthForm type='signup' userRole='doctor'/>
}