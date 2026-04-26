"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { healthcareCategories } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { userAuthStore } from "@/store/authStore";
import { ArrowRight, CheckCircle2, ShieldCheck, Stethoscope, Video } from "lucide-react";

const LandingHero = () => {
  const { isAuthenticated } = userAuthStore();
  const router = useRouter();

  const handleBookConsultation = () => {
    if (isAuthenticated) {
      router.push("/doctor-list");
    } else {
      router.push("/signup/patient");
    }
  };

  const handleCategoryClick = (categoryTitle: string) => {
    if (isAuthenticated) {
      router.push(`/doctor-list?category=${categoryTitle}`);
    } else {
      router.push("/signup/patient");
    }
  };
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white px-4 py-16 md:py-20">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <ShieldCheck className="h-4 w-4" />
              Trusted Online Healthcare Platform
            </div>

            <h1 className="text-4xl font-bold leading-tight text-blue-950 md:text-6xl">
              Consult certified doctors online
              <span className="block bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                anytime you need care
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base text-gray-600 md:text-lg lg:mx-0">
              CareBridge Health helps patients book secure video consultations, get digital prescriptions, and stay on top of follow-up care without clinic wait times.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <Button
                onClick={handleBookConsultation}
                size="lg"
                className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 text-base hover:from-blue-700 hover:to-blue-800"
              >
                Book Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/login/doctor">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full border-blue-300 text-blue-700 hover:bg-blue-50 sm:w-auto"
                >
                  Doctor Login
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                500+ Verified Doctors
              </span>
              <span className="inline-flex items-center gap-2">
                <Video className="h-4 w-4 text-blue-500" />
                HD Video Consultations
              </span>
              <span className="inline-flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-blue-700" />
                Personalized Care Plans
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white/80 p-6 shadow-xl backdrop-blur">
            <h2 className="text-lg font-semibold text-blue-900">Popular healthcare categories</h2>
            <p className="mt-1 text-sm text-gray-600">
              Browse specialists and book a consultation in minutes.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {healthcareCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.title)}
                  className="group rounded-2xl border border-gray-100 bg-white p-3 text-left transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${category.color}`}
                  >
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d={category.icon} />
                    </svg>
                  </div>
                  <p className="text-xs font-medium leading-snug text-blue-900">
                    {category.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;