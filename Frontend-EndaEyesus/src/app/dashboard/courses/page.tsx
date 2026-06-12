// src/features/education/CoursesPage.tsx
"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { educationApi } from "@/features/education/educationApi";
import CourseViewer from "@/features/education/CourseViewer";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

const phases = [
  { value: "GUBAE_ABEW", label: "ጉባኤ አበው" },
  { value: "GUBAE_HAWARYAT", label: "ጉባኤ ሐዋርያት" },
  { value: "GUBAE_ECCLESIAE", label: "ጉባኤ ኤቅሌስያ" },
];

const phaseOrder: Record<string, number> = {
  GUBAE_ABEW: 0,
  GUBAE_HAWARYAT: 1,
  GUBAE_ECCLESIAE: 2,
};

export default function CoursesPage() {
  const [selectedPhase, setSelectedPhase] = useState("");
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: enrollmentResp, refetch } = useQuery({
    queryKey: ["education", "my-enrollment", selectedPhase],
    queryFn: () => educationApi.getMyEnrollment(selectedPhase),
    enabled: !!selectedPhase,
  });
  const enrollment = enrollmentResp?.data;

  const { data: batchesResp } = useQuery({
    queryKey: ["education", "batches", selectedPhase],
    queryFn: () => educationApi.listBatches(selectedPhase),
    enabled: !!selectedPhase,
  });
  const batches = batchesResp?.data;
  const activeBatch = batches?.[0]; // most recent batch

  const requestRegistration = useMutation({
    mutationFn: () => educationApi.requestRegistration(selectedPhase, activeBatch?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education", "my-enrollment", selectedPhase] });
    },
  });

  if (!selectedPhase) {
    return (
      <div className="max-w-md mx-auto">
        <label className="block text-sm font-medium mb-2">Select Course Phase</label>
        <Select onValueChange={setSelectedPhase}>
          <SelectTrigger><SelectValue placeholder="Choose phase" /></SelectTrigger>
          <SelectContent>
            {phases.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (!enrollment) {
    const canRegister = checkPrerequisite(selectedPhase, (user as any)?.graduated_phases);
    if (!canRegister) {
      return <div className="text-center p-8">You must complete the previous phase first.</div>;
    }
    if (!activeBatch) {
      return <div className="text-center p-8">No active batch available for this phase.</div>;
    }
    return (
      <div className="text-center p-8">
        <p>You are not registered for this course.</p>
        <Button onClick={() => requestRegistration.mutate()} disabled={requestRegistration.isPending}>
          Request Registration
        </Button>
      </div>
    );
  }

  if (enrollment.status === "PENDING") return <div className="text-center p-8">Registration request pending approval.</div>;
  if (enrollment.status === "REJECTED") return <div className="text-center p-8 text-red-600">Registration denied.</div>;

  return <CourseViewer phase={selectedPhase} batchId={enrollment.batch_id} />;
}

function checkPrerequisite(phase: string, graduatedPhases: any): boolean {
  const current = phaseOrder[phase];
  if (current === 0) return true;
  const prevPhase = Object.keys(phaseOrder).find(p => phaseOrder[p] === current - 1);
  return graduatedPhases?.includes(prevPhase);
}