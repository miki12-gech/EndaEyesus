"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

// Import all feature components
import BatchList from "@/features/education/BatchList";
import SubjectManager from "@/features/education/SubjectManager";
import PendingRegistrations from "@/features/education/PendingRegistrations";
import StudentResults from "@/features/education/StudentResults";
import SubClassManager from "@/features/member-affairs/SubClassManager";
import DepartmentAnnouncements from "@/features/member-affairs/DepartmentAnnouncements";
import PlanReportMatrix from "@/features/member-affairs/PlanReportMatrix";
import MemberList from "@/features/education/MemberList";

// Map tab names to components
const components: Record<string, React.ReactNode> = {
  batches: <BatchList />,
  subjects: <SubjectManager />,
  registrations: <PendingRegistrations />,
  results: <StudentResults />,
  subclasses: <SubClassManager />,
  announcements: <DepartmentAnnouncements />,
  plans: <PlanReportMatrix />,
  members: <MemberList />,
};

const pageTitles: Record<string, { title: string; description: string }> = {
  batches: { title: "Batches", description: "Manage course batches (ዙር) for each phase" },
  subjects: { title: "Subjects & Lessons", description: "Create and manage subjects, lessons, and inline explanations" },
  registrations: { title: "Registration Approvals", description: "Approve or reject member course registration requests" },
  results: { title: "Student Results", description: "View exam scores and graduate members" },
  subclasses: { title: "Sub‑Classes", description: "Manage internal sub‑classes within the Education department" },
  announcements: { title: "Department Announcements", description: "Post announcements visible only to Education department members" },
  plans: { title: "Plans & Reports", description: "Upload annual plans and quarterly progress reports" },
  members: { title: "Members List", description: "View all members of the Education department" },
};

function EducationContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "batches";
  const { user } = useAuthStore();

  const isEducationManager = user?.role === "SERVICE_MANAGER" && user?.serviceClassName === "የትምህርት ክፍል";
  const isSecretariat = ["SECRETARIAT_CHAIRMAN", "SECRETARIAT_VICE", "SECRETARIAT_SECRETARY", "SUPER_ADMIN"].includes(user?.role || "");

  if (!isEducationManager && !isSecretariat) {
    return <div className="text-center py-12">Access Denied</div>;
  }

  const currentComponent = components[tab] || components.batches;
  const { title, description } = pageTitles[tab] || pageTitles.batches;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#7A1C1C] dark:text-[#D4AF37]">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {currentComponent}
    </div>
  );
}

export default function EducationDashboard() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <EducationContent />
    </Suspense>
  );
}