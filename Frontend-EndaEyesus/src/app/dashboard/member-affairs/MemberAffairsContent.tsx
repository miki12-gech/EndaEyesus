"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PendingApprovals from "../../../features/member-affairs/PendingApprovals";
import MemberCensus from "../../../features/member-affairs/MemberCensus";
import SpiritualAssignments from "../../../features/member-affairs/SpiritualAssignments";
import SubClassManager from "../../../features/member-affairs/SubClassManager";
import PlanReportMatrix from "../../../features/member-affairs/PlanReportMatrix";
import BatchAssign from "../../../features/member-affairs/BatchAssign";

const components: Record<string, React.ReactNode> = {
  pending: <PendingApprovals />,
  census: <MemberCensus />,
  spiritual: <SpiritualAssignments />,
  subclasses: <SubClassManager />,
  documents: <PlanReportMatrix />,
  batch: <BatchAssign />,
};

const titles: Record<string, { title: string; description: string }> = {
  pending: { title: "Pending Approvals", description: "Review and approve membership applications" },
  census: { title: "Member Census", description: "Full list of verified members with spiritual assignments" },
  spiritual: { title: "Spiritual Care Matrix", description: "Assign repentance fathers, deacons, and spiritual mentors" },
  subclasses: { title: "Sub‑Class Management", description: "Create and manage internal sub‑classes" },
  documents: { title: "Plans & Reports", description: "Upload annual plans and quarterly progress reports" },
  batch: { title: "Batch Class Assignment", description: "Assign multiple members to a service class" },
};

export default function MemberAffairsContent() {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const validTabs = Object.keys(components);
  const activeTab = tabParam && validTabs.includes(tabParam) ? tabParam : "pending";
  const [pageInfo, setPageInfo] = useState(titles[activeTab]);

  useEffect(() => {
    setPageInfo(titles[activeTab]);
  }, [activeTab]);

  // Permission check
  const isMemberAffairsManager = user?.role === "SERVICE_MANAGER" && user?.serviceClassName === "የአባልነት ጉዳይ ክፍል";
  const isSecretariat = ["SECRETARIAT_CHAIRMAN", "SECRETARIAT_VICE", "SECRETARIAT_SECRETARY", "SUPER_ADMIN"].includes(user?.role || "");

  if (!isMemberAffairsManager && !isSecretariat) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You do not have permission to view this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#7A1C1C] dark:text-[#D4AF37]">{pageInfo.title}</h1>
        <p className="text-muted-foreground">{pageInfo.description}</p>
      </div>
      {components[activeTab]}
    </div>
  );
}