"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { educationApi, useEducationManager } from "./educationApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BatchList() {
  const isManager = useEducationManager();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ course_track: "", batch_number: "", academic_year: "" });

  const { data: batchesResp } = useQuery({
    queryKey: ["education", "batches"],
    queryFn: () => educationApi.listBatches(),
  });
  const batches = batchesResp?.data || [];

  const createMutation = useMutation({
    mutationFn: () =>
      educationApi.createBatch({
        course_track: form.course_track,
        batch_number: parseInt(form.batch_number),
        academic_year: parseInt(form.academic_year),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education", "batches"] });
      setOpen(false);
      setForm({ course_track: "", batch_number: "", academic_year: "" });
    },
  });

  const phases = ["GUBAE_ABEW", "GUBAE_HAWARYAT", "GUBAE_ECCLESIAE"];

  return (
    <div>
      {isManager && (
        <div className="flex justify-end mb-4">
          <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" /> Create Batch</Button>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Phase</TableHead>
              <TableHead>Batch #</TableHead>
              <TableHead>Academic Year</TableHead>
              <TableHead>Enrolled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches.map((b: any) => (
              <TableRow key={b.id}>
                <TableCell>{b.course_track}</TableCell>
                <TableCell>{b.batch_number}</TableCell>
                <TableCell>{b.academic_year}</TableCell>
                <TableCell>{b._count?.lms_enrollments ?? 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create New Batch</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Select onValueChange={(v) => setForm({ ...form, course_track: v })}>
              <SelectTrigger><SelectValue placeholder="Phase" /></SelectTrigger>
              <SelectContent>{phases.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
            </Select>
            <Input placeholder="Batch Number" type="number" onChange={(e) => setForm({ ...form, batch_number: e.target.value })} />
            <Input placeholder="Academic Year" type="number" onChange={(e) => setForm({ ...form, academic_year: e.target.value })} />
          </div>
          <DialogFooter>
            <Button onClick={() => createMutation.mutate()}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}