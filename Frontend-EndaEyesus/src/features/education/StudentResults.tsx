"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { educationApi } from "./educationApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function StudentResults() {
  const queryClient = useQueryClient();
  const [filterBatch, setFilterBatch] = useState("all");

  const { data: batchesResp } = useQuery({
    queryKey: ["education", "batches"],
    queryFn: () => educationApi.listBatches(),
  });
  const batches = batchesResp?.data || [];

  const { data: resultsResp, refetch } = useQuery({
    queryKey: ["education", "results", filterBatch],
    queryFn: () => educationApi.getStudentResults({ batchId: filterBatch === "all" ? undefined : filterBatch }),
  });
  const results = resultsResp?.data || [];

  const graduateMutation = useMutation({
    mutationFn: (enrollmentId: string) => educationApi.graduateMember(enrollmentId),
    onSuccess: () => refetch(),
  });

  return (
    <div className="space-y-4">
      <div className="w-64">
        <Select value={filterBatch} onValueChange={setFilterBatch}>
          <SelectTrigger><SelectValue placeholder="Filter by Batch" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Batches</SelectItem>
            {batches.map((b: any) => <SelectItem key={b.id} value={b.id}>{b.course_track} - Batch {b.batch_number}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Subject Scores</TableHead>
              <TableHead>Exit Exam</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((r: any) => (
              <TableRow key={r.id}>
                <TableCell>{r.users?.full_name_three_parts}</TableCell>
                <TableCell>{r.lms_batches?.course_track} #{r.lms_batches?.batch_number}</TableCell>
                <TableCell>
                  {Object.entries(r.quiz_scores || {}).map(([subjId, data]: any) => (
                    <div key={subjId} className="text-xs">{subjId.slice(0,8)}: {data.score}% {data.passed ? "✓" : "✗"}</div>
                  ))}
                </TableCell>
                <TableCell>{r.final_exam_score ? `${r.final_exam_score}%` : "Not taken"} {r.is_passed && "✓"}</TableCell>
                <TableCell><Badge>{r.status}</Badge></TableCell>
                <TableCell>
                  {r.is_passed && r.status !== "GRADUATED" && (
                    <Button size="sm" onClick={() => graduateMutation.mutate(r.id)}>Graduate</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}