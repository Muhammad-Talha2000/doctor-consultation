"use client";
import React, { useEffect, useState } from "react";
import Header from "../landing/Header";
import { useSearchParams } from "next/navigation";
import { userAuthStore } from "@/store/authStore";
import { useDoctorStore } from "@/store/doctorStore";
import { Appointment, useAppointmentStore } from "@/store/appointmentStore";
import {
  Activity,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  HeartPulse,
  MapPin,
  Phone,
  Plus,
  Star,
  TrendingUp,
  Timer,
  UserRoundCheck,
  Users,
  Video,
} from "lucide-react";
import PrescriptionModal from "./PrescriptionModal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { getStatusColor } from "@/lib/constant";
import { Progress } from "../ui/progress";

const DoctorDashboardContent: React.FC = () => {
  const searchParams = useSearchParams();
  const { user } = userAuthStore();
  const {
    dashboard: dashboardData,
    fetchDashboard,
    loading,
  } = useDoctorStore();

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [completingAppointmentId, setCompletingAppointmentId] = useState<
    string | null
  >(null);
  const [modalLoading, setModalLoading] = useState(false);
  const { endConsultation, fetchAppointmentById, currentAppointment } =
    useAppointmentStore();

  useEffect(() => {
    if (user?.type === "doctor") {
      fetchDashboard(user?.type);
    }
  }, [user, fetchDashboard]);

  useEffect(() => {
    const completedCallId = searchParams.get("completedCall");
    if (completedCallId) {
      setCompletingAppointmentId(completedCallId);
      fetchAppointmentById(completedCallId);
      setShowPrescriptionModal(true);
    }
  }, [searchParams, fetchAppointmentById]);

  const handleSavePrescription = async (
    prescription: string,
    notes: string
  ) => {
    if (!completingAppointmentId) return;
    setModalLoading(true);
    try {
      await endConsultation(completingAppointmentId, prescription, notes);
      setShowPrescriptionModal(false);
      setCompletingAppointmentId(null);

      if (user?.type) {
        fetchDashboard(user.type);
      }

      const url = new URL(window.location.href);
      url.searchParams.delete("completedCall");
      window.history.replaceState({}, "", url.pathname);
    } catch (error) {
      console.error("failed to complete consultation", error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowPrescriptionModal(false);
    setCompletingAppointmentId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("completedCall");
    window.history.replaceState({}, "", url.pathname);
  };

  const formateDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getMinutesUntil = (dateString: string) => {
    const diffMs = new Date(dateString).getTime() - new Date().getTime();
    return Math.round(diffMs / (1000 * 60));
  };

  const canJoinCall = (appointment: any) => {
    const appointmentTime = new Date(appointment.slotStartIso);
    const now = new Date();
    const diffMintues =
      (appointmentTime.getTime() - now.getTime()) / (1000 * 60);

    return (
      diffMintues <= 15 && //not earliar than 15 min before start
      diffMintues >= -120 && //not later than 2 hours after start
      (appointment.status === "Scheduled" ||
        appointment.status === "In Progress")
    );
  };

  if (loading || !dashboardData) {
    return (
      <>
        <Header showDashboardNav={true} />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-8 bg-gray-300 rounded w-64"></div>
                  <div className="h-4 bg-gray-300 rounded w-48"></div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const patientName = currentAppointment?.patientId?.name;
  const completedToday = dashboardData?.todayAppointments?.filter(
    (appointment: Appointment) => appointment.status === "Completed"
  )?.length;
  const inProgressToday = dashboardData?.todayAppointments?.filter(
    (appointment: Appointment) => appointment.status === "In Progress"
  )?.length;
  const pendingToday = dashboardData?.todayAppointments?.filter(
    (appointment: Appointment) => appointment.status === "Scheduled"
  )?.length;

  const nextAppointment = dashboardData?.todayAppointments?.find(
    (appointment: Appointment) =>
      appointment.status !== "Completed" &&
      appointment.status !== "Cancelled" &&
      getMinutesUntil(appointment.slotStartIso) >= -120
  );

  const statsCards = [
    {
      title: "Total Patients",
      value: dashboardData?.stats?.totalPatients?.toString() || "0",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      subtitle: "Unique patients treated",
    },
    {
      title: "Today's Appointments",
      value: dashboardData?.stats?.todayAppointments?.toString() || "0",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
      subtitle: `${completedToday || 0} completed`,
    },
    {
      title: "Total Revenue",
      value: `${dashboardData?.stats?.totalRevenue?.toLocaleString() || "0"}`,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      subtitle: "From completed consultations",
    },
    {
      title: "Completion Rate",
      value: dashboardData?.performance?.completionRate || "0%",
      icon: UserRoundCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      subtitle: "Successful consultations",
    },
    {
      title: "Avg Rating",
      value: `${dashboardData?.stats?.averageRating || 0}/5`,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      subtitle: "Patient satisfaction",
    },
    {
      title: "Avg Response",
      value: dashboardData?.performance?.responseTime || "N/A",
      icon: Timer,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      subtitle: "Time to accept requests",
    },
    {
      title: "In Progress Today",
      value: `${inProgressToday || 0}`,
      icon: Activity,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      subtitle: `${pendingToday || 0} upcoming today`,
    },
  ];

  const weeklyTrend = dashboardData?.analytics?.weeklyTrend || [];
  const todayAppointments = Array.isArray(dashboardData?.todayAppointments)
    ? dashboardData.todayAppointments
    : [];
  const maxWeeklyAppointments = Math.max(
    1,
    ...weeklyTrend.map((day: any) => day.appointments || 0)
  );
  const maxWeeklyRevenue = Math.max(
    1,
    ...weeklyTrend.map((day: any) => day.revenue || 0)
  );
  const typeSplit = dashboardData?.analytics?.consultationTypeSplit || {
    video: 0,
    voice: 0,
  };
  const totalTypeCount = (typeSplit.video || 0) + (typeSplit.voice || 0);
  const videoPercent = totalTypeCount
    ? Math.round(((typeSplit.video || 0) / totalTypeCount) * 100)
    : 0;
  const voicePercent = totalTypeCount ? 100 - videoPercent : 0;
  return (
    <>
      <Header showDashboardNav={true} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 ">
                <Avatar className="w-20 h-20 ring-4 ring-blue-100">
                  <AvatarImage
                    src={dashboardData?.user?.profileImage}
                    alt={dashboardData?.user?.name}
                  />
                  <AvatarFallback>
                    {dashboardData?.user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h1 className="text-md md:text-3xl font-bold text-gray-900">
                    {getGreeting()}, Dr. {dashboardData?.user?.name}
                  </h1>
                  <p className="text-gray-600 text-xs md:text-lg">
                    {dashboardData?.user?.specialization}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {dashboardData?.user?.hospitalInfo?.name},{" "}
                        {dashboardData?.user?.hospitalInfo?.city}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-orange-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">
                        {dashboardData?.stats?.averageRating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-3">
                <Link href="/doctor/profile">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    <Plus className="w-4 h-4 mr-2" />
                    Update Availability
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="border-blue-100 bg-gradient-to-r from-blue-50 to-white">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-blue-700">Next Appointment</p>
                {nextAppointment ? (
                  <>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {nextAppointment?.patientId?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formateDate(nextAppointment.slotStartIso)} ({getMinutesUntil(nextAppointment.slotStartIso)} min)
                    </p>
                  </>
                ) : (
                  <p className="mt-1 text-sm text-gray-600">No pending appointments for now.</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-emerald-100 bg-gradient-to-r from-emerald-50 to-white">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-emerald-700">Today Workflow</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {completedToday || 0} done / {dashboardData?.stats?.todayAppointments || 0} total
                </p>
                <p className="text-sm text-gray-600">
                  {pendingToday || 0} scheduled, {inProgressToday || 0} in progress
                </p>
              </CardContent>
            </Card>

            <Card className="border-violet-100 bg-gradient-to-r from-violet-50 to-white">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-violet-700">Revenue Insight</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  ${dashboardData?.stats?.totalRevenue?.toLocaleString() || 0}
                </p>
                <p className="text-sm text-gray-600">
                  Lifetime revenue from completed consultations
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>

                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">{stat.subtitle}</p>
                    </div>

                    <div
                      className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <stat.icon className={`w-7 h-7 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span>Today's Schedule</span>
                  <Badge variant="secondary" className="ml-2">
                    {todayAppointments.length} appointments
                  </Badge>
                </CardTitle>
                <Link href="/doctor/appointments">
                  <Button variant="ghost" size="sm">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>

              <CardContent className="space-y-4 min-h-[220px]">
                {todayAppointments.length > 0 ? (
                  todayAppointments.map(
                    (appointment: Appointment) => (
                      <div
                        key={appointment?._id}
                        className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                          <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">
                              {appointment?.patientId?.name}
                            </h4>
                            <div className="text-sm font-medium text-blue-600 ">
                              {formateDate(appointment.slotStartIso)}
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 line-clamp-1">
                            Age: {appointment?.patientId?.age}
                          </p>

                          <p className="text-sm text-gray-600 line-clamp-1">
                            {appointment?.symptoms.substring(0, 80)}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge
                              className={getStatusColor(appointment.status)}
                            >
                              {appointment.status}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              {appointment.consultationType ===
                              "Video Consultation" ? (
                                <Video className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Phone className="w-4 h-4 text-green-600" />
                              )}
                              <span className="text-sm text-gray-500">
                                ${appointment.doctorId?.fees}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {canJoinCall(appointment) && (
                            <Link href={`/call/${appointment._id}`}>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Video className="w-4 h-4 mr-2" />
                                Start
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="flex min-h-[180px] flex-col items-center justify-center text-center py-4">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No appointment today
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">Enjoy your free day!</p>
                    <Link href="/doctor/appointments">
                      <Button variant="outline" size="sm">View appointment history</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span>Upcoming</span>
                  </CardTitle>
                  <Link href="/doctor/appointments">
                    <Button variant="ghost" size="sm">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardHeader>

                <CardContent className="space-y-4">
                  {dashboardData?.upcomingAppointments?.length > 0 ? (
                    dashboardData?.upcomingAppointments?.map(
                      (appointment: Appointment) => (
                        <div
                          key={appointment?._id}
                          className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={appointment.patientId.profileImage}
                            />
                            <AvatarFallback className="bg-green-100 text-green-600 text-sm">
                              {appointment.patientId?.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm truncate">
                              {appointment?.patientId?.name}
                            </h4>
                            <div className="text-sm font-medium text-blue-600 ">
                              {formateDate(appointment.slotStartIso)}
                            </div>
                            <div className="flex items-center space-x-1 mt-1">
                              {appointment.consultationType ===
                              "Video Consultation" ? (
                                <Video className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Phone className="w-4 h-4 text-green-600" />
                              )}
                              <span className="text-sm text-gray-500">
                                ${appointment.doctorId?.fees}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="text-center py-12">
                      <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-sm text-gray-500">
                        No upcoming appointments
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    <span>Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Patient Satisfaction
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {dashboardData?.performance?.patientSatisfaction} / 5
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Completion Rate
                    </span>
                    <span className="font-semibold text-green-600">
                      {dashboardData?.performance?.completionRate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Response Time
                    </span>
                    <span className="font-semibold text-blue-600">
                      {dashboardData?.performance?.responseTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Active Caseload
                    </span>
                    <span className="font-semibold text-rose-600">
                      {inProgressToday || 0} in progress
                    </span>
                  </div>
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                    <div className="flex items-start gap-2">
                      <HeartPulse className="mt-0.5 h-4 w-4 text-blue-600" />
                      <p className="text-xs text-blue-800">
                        Keep response time under 15 minutes to improve patient satisfaction and repeat bookings.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span>This Week Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {weeklyTrend.length > 0 ? (
                  <div className="space-y-4">
                    {weeklyTrend.map((day: any) => (
                      <div key={day.date} className="grid grid-cols-12 items-center gap-3">
                        <div className="col-span-2 text-sm font-medium text-gray-600">
                          {day.label}
                        </div>
                        <div className="col-span-5">
                          <p className="mb-1 text-xs text-gray-500">
                            Appointments: {day.appointments}
                          </p>
                          <Progress
                            value={(day.appointments / maxWeeklyAppointments) * 100}
                            className="bg-blue-100"
                          />
                        </div>
                        <div className="col-span-5">
                          <p className="mb-1 text-xs text-gray-500">
                            Revenue: ${day.revenue}
                          </p>
                          <Progress
                            value={(day.revenue / maxWeeklyRevenue) * 100}
                            className="bg-purple-100"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No weekly trend data available.</p>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">Consultation Type Split</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Video Consultation</span>
                      <span className="font-semibold">{videoPercent}%</span>
                    </div>
                    <Progress value={videoPercent} className="bg-blue-100" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Voice Call</span>
                      <span className="font-semibold">{voicePercent}%</span>
                    </div>
                    <Progress value={voicePercent} className="bg-green-100" />
                  </div>
                  <p className="text-xs text-gray-500">
                    Total consultations: {totalTypeCount}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">No-show & Cancellation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm text-gray-600">No-show Rate</span>
                    <span className="font-semibold text-amber-600">
                      {dashboardData?.analytics?.noShowRate || "0%"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm text-gray-600">Cancellation Rate</span>
                    <span className="font-semibold text-rose-600">
                      {dashboardData?.analytics?.cancellationRate || "0%"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    No-shows: {dashboardData?.analytics?.noShowCount || 0} | Cancelled:{" "}
                    {dashboardData?.analytics?.cancelledCount || 0}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="mt-8 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Recent Rating Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardData?.analytics?.recentRatings?.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-5 lg:grid-cols-10">
                  {dashboardData.analytics.recentRatings.map((item: any, index: number) => (
                    <div key={`${item.date}-${index}`} className="rounded-lg border p-3 text-center">
                      <p className="text-xs text-gray-500">{item.date}</p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{item.rating}/5</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No completed appointments with ratings yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <PrescriptionModal
        isOpen={showPrescriptionModal}
        onClose={handleCloseModal}
        onSave={handleSavePrescription}
        patientName={patientName}
      />
    </>
  );
};

export default DoctorDashboardContent;
