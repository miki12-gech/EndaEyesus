"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { educationApi } from "./educationApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function MemberList() {
  const queryClient = useQueryClient();
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  // ✅ Get all education members with graduation status
  const { data: members, isLoading } = useQuery({
    queryKey: ["education", "members"],
    queryFn: async () => {
      const response = await fetch("/api/v1/education/members", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) throw new Error("Failed to fetch members");
      return response.json();
    },
  });

  // ✅ Get graduation phases
  const { data: phases } = useQuery({
    queryKey: ["education", "phases"],
    queryFn: async () => {
      const response = await fetch("/api/v1/education/phases", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) throw new Error("Failed to fetch phases");
      return response.json();
    },
  });

  // ✅ Mark member as graduated
  const graduateMutation = useMutation({
    mutationFn: async ({
      memberId,
      phase,
    }: {
      memberId: string;
      phase: string;
    }) => {
      const response = await fetch("/api/v1/education/members/graduate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memberId, phase }),
      });
      if (!response.ok) throw new Error("Failed to graduate member");
      return response.json();
    },
    onSuccess: () => {
      console.log("Member graduation status updated");
      queryClient.invalidateQueries({ queryKey: ["education", "members"] });
    },
    onError: (err: any) => {
      console.error(err.message || "Failed to update graduation status");
      alert(err.message || "Failed to update graduation status");
    },
  });

  // ✅ Remove graduation status
  const ungraduateMutation = useMutation({
    mutationFn: async ({
      memberId,
      phase,
    }: {
      memberId: string;
      phase: string;
    }) => {
      const response = await fetch("/api/v1/education/members/ungraduate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memberId, phase }),
      });
      if (!response.ok) throw new Error("Failed to remove graduation");
      return response.json();
    },
    onSuccess: () => {
      console.log("Graduation status removed");
      queryClient.invalidateQueries({ queryKey: ["education", "members"] });
    },
    onError: (err: any) => {
      console.error(err.message || "Failed to remove graduation status");
      alert(err.message || "Failed to remove graduation status");
    },
  });

  // ✅ Parse graduation phases from JSON
  const parseGraduatedPhases = (graduatedPhasesJson: any): string[] => {
    if (!graduatedPhasesJson) return [];
    try {
      const parsed =
        typeof graduatedPhasesJson === "string"
          ? JSON.parse(graduatedPhasesJson)
          : graduatedPhasesJson;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  if (isLoading)
    return <div className="p-4 text-center">Loading members...</div>;

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        📚 Click on a member to manage their Gubae graduation status (Gubae
        Abew, Hawaryat, Eclessia)
      </div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>University ID</TableHead>
              <TableHead>Graduation Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.map((member: any) => {
              const graduatedPhases = parseGraduatedPhases(
                member.graduated_phases,
              );
              const isExpanded = expandedMember === member.id;
              return (
                <TableRow
                  key={member.id}
                  className={isExpanded ? "bg-muted" : ""}
                >
                  <TableCell className="font-medium">
                    {member.full_name_three_parts}
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.university_id || "—"}</TableCell>
                  <TableCell>
                    {graduatedPhases.length === 0 ? (
                      <Badge variant="outline" className="bg-gray-100">
                        Not Graduated
                      </Badge>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {graduatedPhases.map((phase: string) => (
                          <Badge
                            key={phase}
                            variant="default"
                            className="bg-green-600"
                          >
                            {phase.replace(/_/g, " ").toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant={isExpanded ? "default" : "outline"}
                      onClick={() =>
                        setExpandedMember(isExpanded ? null : member.id)
                      }
                    >
                      {isExpanded ? "Hide" : "Manage"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Expanded view for managing graduation */}
      {expandedMember && members && (
        <div className="mt-6 p-4 border rounded-lg bg-card">
          <h3 className="font-semibold mb-4">
            Manage Graduation:{" "}
            {
              members.find((m: any) => m.id === expandedMember)
                ?.full_name_three_parts
            }
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {phases?.map((phase: any) => {
              const member = members.find((m: any) => m.id === expandedMember);
              const graduatedPhases = parseGraduatedPhases(
                member.graduated_phases,
              );
              const isGraduated = graduatedPhases.includes(phase.id);

              return (
                <div key={phase.id} className="p-3 border rounded-md">
                  <p className="font-medium text-sm mb-2">{phase.name}</p>
                  <Button
                    size="sm"
                    className="w-full"
                    variant={isGraduated ? "destructive" : "default"}
                    onClick={() => {
                      if (isGraduated) {
                        ungraduateMutation.mutate({
                          memberId: expandedMember,
                          phase: phase.id,
                        });
                      } else {
                        graduateMutation.mutate({
                          memberId: expandedMember,
                          phase: phase.id,
                        });
                      }
                    }}
                    disabled={
                      graduateMutation.isPending || ungraduateMutation.isPending
                    }
                  >
                    {isGraduated ? "Remove" : "Mark as Graduated"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
