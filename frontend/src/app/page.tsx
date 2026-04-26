'use client'
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import LandingHero from "@/components/landing/LandingHero";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import { userAuthStore } from "@/store/authStore";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
 const {user} = userAuthStore();
  const router = useRouter();

  useEffect(() => {
    if(user?.type === 'doctor') {
      router.replace('/doctor/dashboard')
    }
  },[user,router])

  if(user?.type === 'doctor'){
    return null;
  }

  return (
     <div className="min-h-screen bg-white">
      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: "CareBridge Health Online Doctor Consultation",
            description:
              "Book online consultations with certified doctors, receive digital prescriptions, and manage follow-up care.",
            url: "https://carebridgehealth.com",
            provider: {
              "@type": "Organization",
              name: "CareBridge Health",
              url: "https://carebridgehealth.com",
            },
          }),
        }}
      />
      <Header showDashboardNav={false}/>
      <main className="pt-16">
         <LandingHero/>
         <TestimonialsSection/>
         <FAQSection/>
         <Footer/>
      </main>
     </div>
  );
}
