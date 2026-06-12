"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { educationApi } from "./educationApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function PendingRegistrations() {
  const queryClient = useQueryClient();
  const { data: pendingResp, refetch } = useQuery({
    queryKey: ["education", "pending-registrations"],
    queryFn: () => educationApi.getPendingEnrollments(),
  });
  const pending = pendingResp?.data || [];

  const approveMutation = useMutation({
    mutationFn: (id: string) => educationApi.updateEnrollmentStatus(id, "ACTIVE"),
    onSuccess: () => refetch(),
  });
  const rejectMutation = useMutation({
    mutationFn: (id: string) => educationApi.updateEnrollmentStatus(id, "REJECTED"),
    onSuccess: () => refetch(),
  });

  if (!pending.length) return <div className="text-center py-8 text-muted-foreground">No pending registrations.</div>;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Phase</TableHead>
            <TableHead>Batch #</TableHead>
            <TableHead>Requested At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pending.map((req: any) => (
            <TableRow key={req.id}>
              <TableCell>{req.users?.full_name_three_parts}</TableCell>
              <TableCell>{req.lms_batches?.course_track}</TableCell>
              <TableCell>{req.lms_batches?.batch_number}</TableCell>
              <TableCell>{new Date(req.enrolled_at).toLocaleDateString()}</TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" onClick={() => approveMutation.mutate(req.id)}>Approve</Button>
                <Button size="sm" variant="destructive" onClick={() => rejectMutation.mutate(req.id)}>Reject</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}