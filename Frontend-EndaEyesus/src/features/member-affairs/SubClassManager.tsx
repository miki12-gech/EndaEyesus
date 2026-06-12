// src/features/member-affairs/SubClassManager.tsx
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { memberAffairsApi, useMemberAffairsClassId } from "./memberAffairsApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner"; // adjust to your toast library if different

export default function SubClassManager() {
  const classId = useMemberAffairsClassId();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [subClassName, setSubClassName] = useState("");
  const [subChairId, setSubChairId] = useState("");
  const [subSecretaryId, setSubSecretaryId] = useState("");

  const { data: subClasses, isLoading } = useQuery({
    queryKey: ["member-affairs", "sub-classes", classId],
    enabled: !!classId,
    queryFn: async () => {
      const res = await memberAffairsApi.getSubClasses(classId!);
      return res.data;
    },
  });

  const { data: allMembers, isLoading: membersLoading } = useQuery({
    queryKey: ["member-affairs", "members-for-subclass"],
    queryFn: async () => {
      const res = await memberAffairsApi.listMembers({});
      return res.data;
    },
  });

  // ✅ Filter: members of current class AND have graduated Gubae Hawaryat
  const eligibleMembers = useMemo(() => {
    if (!allMembers || !classId) return [];
    return allMembers.filter((m: any) => {
      // Belongs to current service class
      const sameClass = (m.service_class_id === classId || m.classId === classId);
      if (!sameClass) return false;

      // Check graduation
let graduatedPhases: string[] = [];
if (m.graduated_phases) {
  try {
    graduatedPhases = typeof m.graduated_phases === 'string'
      ? JSON.parse(m.graduated_phases)
      : m.graduated_phases;
    graduatedPhases = graduatedPhases.map(p => p.toLowerCase());
  } catch { graduatedPhases = []; }
}
return graduatedPhases.includes('gubae_hawaryat') || graduatedPhases.includes('gubae_eclessia');
    });
  }, [allMembers, classId]);

  const createMutation = useMutation({
    mutationFn: () =>
      memberAffairsApi.createSubClass(classId!, {
        sub_class_name: subClassName,
        sub_chair_id: subChairId || undefined,
        sub_secretary_id: subSecretaryId || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member-affairs", "sub-classes"] });
      setOpen(false);
      setSubClassName("");
      setSubChairId("");
      setSubSecretaryId("");
      toast.success("Sub‑class created successfully");
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Failed to create sub‑class";
      toast.error(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => memberAffairsApi.deleteSubClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member-affairs", "sub-classes"] });
      toast.success("Sub‑class deleted");
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Failed to delete sub‑class";
      toast.error(message);
    },
  });

  if (isLoading || membersLoading) return <div>Loading sub‑classes...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Create Sub‑Class
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Sub‑Chair</TableHead>
              <TableHead>Sub‑Secretary</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subClasses?.map((sc: any) => (
              <TableRow key={sc.id}>
                <TableCell>{sc.sub_class_name}</TableCell>
                <TableCell>{sc.users_sub_classes_sub_chair_idTousers?.full_name_three_parts || "—"}</TableCell>
                <TableCell>{sc.users_sub_classes_sub_secretary_idTousers?.full_name_three_parts || "—"}</TableCell>
                <TableCell>{sc.members?.length || 0}</TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost" onClick={() => deleteMutation.mutate(sc.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Sub‑Class</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Sub‑Class Name"
              value={subClassName}
              onChange={(e) => setSubClassName(e.target.value)}
            />
            <Select value={subChairId} onValueChange={setSubChairId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Sub‑Chair" />
              </SelectTrigger>
              <SelectContent>
                {eligibleMembers.length === 0 ? (
                  <div className="p-2 text-sm text-muted-foreground">No eligible members (must have graduated Gubae Hawaryat)</div>
                ) : (
                  eligibleMembers.map((m: any) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.full_name_three_parts}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Select value={subSecretaryId} onValueChange={setSubSecretaryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Sub‑Secretary" />
              </SelectTrigger>
              <SelectContent>
                {eligibleMembers.length === 0 ? (
                  <div className="p-2 text-sm text-muted-foreground">No eligible members (must have graduated Gubae Hawaryat)</div>
                ) : (
                  eligibleMembers.map((m: any) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.full_name_three_parts}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}