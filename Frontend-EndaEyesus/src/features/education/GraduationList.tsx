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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

// Helper to normalize phase to lowercase (expected by backend)
const normalizePhase = (phase: string) => phase.toLowerCase().trim();

export default function GraduationList() {
  const queryClient = useQueryClient();
  const [selectedPhase, setSelectedPhase] = useState<Record<string, string>>({});

  const { data: members, isLoading } = useQuery({
    queryKey: ["education", "enrolled-members"],
    queryFn: async () => {
      const res = await educationApi.getEnrolledMembers();
      return res.data;
    },
  });

  const graduateMutation = useMutation({
    mutationFn: ({ memberId, phase }: { memberId: string; phase: string }) => {
      const normalizedPhase = normalizePhase(phase);
      console.log(`Graduating member ${memberId} from phase: ${normalizedPhase}`);
      return educationApi.markMemberGraduated({ memberId, phase: normalizedPhase });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education", "enrolled-members"] });
      toast.success("Member graduated successfully");
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || error.message || "Graduation failed";
      toast.error(message);
      console.error("Graduation error:", error.response?.data);
    },
  });

  if (isLoading) return <div className="p-4 text-center">Loading enrolled members...</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Enrolled Phases</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Normal Graduate</TableHead>
              <TableHead>Force Graduate (Override)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.map((member: any) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.fullName}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {member.enrollments.map((e: any) => (
                      <Badge key={e.phase} variant={e.graduated ? "default" : "secondary"}>
                        {e.phase} {e.graduated && "✓"}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-xs">
                    {member.enrollments.map((e: any) => (
                      <div key={e.phase}>
                        {e.phase}: {e.finalExamScore ? `${e.finalExamScore}%` : "Not taken"}
                        {e.isPassed && <span className="text-green-600 ml-2">✓ Passed</span>}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {member.enrollments.some((e: any) => !e.graduated && e.isPassed) ? (
                    <div className="flex items-center gap-2">
                      <Select
                        value={selectedPhase[member.id] || ""}
                        onValueChange={(val) =>
                          setSelectedPhase((prev) => ({ ...prev, [member.id]: val }))
                        }
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select phase" />
                        </SelectTrigger>
                        <SelectContent>
                          {member.enrollments
                            .filter((e: any) => !e.graduated && e.isPassed)
                            .map((e: any) => (
                              <SelectItem key={e.phase} value={e.phase}>
                                {e.phase}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        onClick={() =>
                          graduateMutation.mutate({
                            memberId: member.id,
                            phase: selectedPhase[member.id],
                          })
                        }
                        disabled={!selectedPhase[member.id] || graduateMutation.isPending}
                      >
                        Graduate
                      </Button>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {member.enrollments
                      .filter((e: any) => !e.graduated)
                      .map((e: any) => (
                        <Button
                          key={e.phase}
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            const phaseToSend = normalizePhase(e.phase);
                            if (confirm(`⚠️ Force graduate ${member.fullName} from ${phaseToSend}?\n\nThis will mark them as graduated WITHOUT requiring the exit exam. This action cannot be undone.`)) {
                              graduateMutation.mutate({ 
                                memberId: member.id, 
                                phase: phaseToSend
                              });
                            }
                          }}
                          disabled={graduateMutation.isPending}
                        >
                          Force {e.phase}
                        </Button>
                      ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}