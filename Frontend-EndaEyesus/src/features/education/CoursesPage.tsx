"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { educationApi } from "@/features/education/educationApi";
import CourseViewer from "@/features/education/CourseViewer";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import apiClient from "@/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface CoursesPageProps {
  preselectedPhase?: string;
}

export default function CoursesPage({ preselectedPhase = "" }: CoursesPageProps) {
  const [selectedPhase, setSelectedPhase] = useState(preselectedPhase);
  const queryClient = useQueryClient();

  // ✅ Fetch current user data directly from backend (ensures fresh graduated_phases)
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await apiClient.instance.get("/auth/me");
      return res.data;
    },
  });

  // Parse graduated_phases (it can be a JSON string or array)
  let graduatedPhases: string[] = [];
  if (user?.graduated_phases) {
    try {
      const raw = user.graduated_phases;
      if (typeof raw === "string") {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) graduatedPhases = parsed;
      } else if (Array.isArray(raw)) {
        graduatedPhases = raw;
      }
    } catch (e) {
      console.error("Failed to parse graduated_phases", e);
    }
  }

  // Sync selected phase with URL
  useEffect(() => {
    if (preselectedPhase && preselectedPhase !== selectedPhase) {
      setSelectedPhase(preselectedPhase);
    }
  }, [preselectedPhase, selectedPhase]);

  // Fetch enrollment for selected phase
  const { data: enrollmentResp, isLoading: enrollmentLoading } = useQuery({
    queryKey: ["education", "my-enrollment", selectedPhase, user?.id],
    queryFn: () => educationApi.getMyEnrollment(selectedPhase),
    enabled: !!selectedPhase && !!user,
  });
  const enrollment = enrollmentResp?.data;

  // Fetch batches for the selected phase
  const { data: batchesResp, isLoading: batchesLoading } = useQuery({
    queryKey: ["education", "batches", selectedPhase],
    queryFn: () => educationApi.listBatches(selectedPhase),
    enabled: !!selectedPhase,
  });
  const batches = batchesResp?.data;
  const activeBatch = batches?.[0];

  const requestRegistration = useMutation({
    mutationFn: () => educationApi.requestRegistration(selectedPhase, activeBatch?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education", "my-enrollment", selectedPhase] });
    },
  });

  // ✅ Prerequisite check – compare uppercase
  const canRegisterForPhase = (phase: string): boolean => {
    const current = phaseOrder[phase];
    if (current === 0) return true;
    const prevPhaseKey = Object.keys(phaseOrder).find(p => phaseOrder[p] === current - 1);
    if (!prevPhaseKey) return false;
    const graduatedUpper = graduatedPhases.map(p => p.toUpperCase());
    return graduatedUpper.includes(prevPhaseKey);
  };

  if (userLoading) {
    return (
      <div className="text-center p-8">
        <Loader2 className="animate-spin inline-block mr-2" /> Loading user data...
      </div>
    );
  }

  if (!selectedPhase) {
    return (
      <div className="max-w-md mx-auto p-4">
        <label className="block text-sm font-medium mb-2">Select Course Phase</label>
        <Select onValueChange={setSelectedPhase}>
          <SelectTrigger>
            <SelectValue placeholder="Choose phase" />
          </SelectTrigger>
          <SelectContent>
            {phases.map(p => (
              <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (enrollmentLoading || batchesLoading) {
    return (
      <div className="text-center p-8">
        <Loader2 className="animate-spin inline-block mr-2" /> Loading course data...
      </div>
    );
  }

  if (!canRegisterForPhase(selectedPhase)) {
    const prevPhaseLabel = phases[phaseOrder[selectedPhase] - 1]?.label;
    return (
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">Prerequisite Not Met</h2>
          <p className="text-yellow-700">
            You must complete <strong>{prevPhaseLabel}</strong> before accessing this course.
          </p>
        </div>
      </div>
    );
  }

  if (!enrollment) {
    if (!activeBatch) {
      return (
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="bg-gray-100 rounded-lg p-6">
            <p className="text-gray-700">No active batch available for {phases.find(p => p.value === selectedPhase)?.label}. Please check back later.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Not Registered</h2>
          <p className="text-blue-700 mb-4">
            You are not registered for <strong>{phases.find(p => p.value === selectedPhase)?.label}</strong>.
          </p>
          <Button onClick={() => requestRegistration.mutate()} disabled={requestRegistration.isPending}>
            {requestRegistration.isPending ? "Requesting..." : "Request Registration"}
          </Button>
        </div>
      </div>
    );
  }

  if (enrollment.status === "PENDING") {
    return (
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">Registration Pending</h2>
          <p className="text-yellow-700">
            Your registration request is waiting for approval by the Education Manager.
          </p>
        </div>
      </div>
    );
  }

  if (enrollment.status === "REJECTED") {
    return (
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Registration Denied</h2>
          <p className="text-red-700">
            Your registration request was denied. Please contact the Education Manager.
          </p>
        </div>
      </div>
    );
  }

  return <CourseViewer phase={selectedPhase} />;
}