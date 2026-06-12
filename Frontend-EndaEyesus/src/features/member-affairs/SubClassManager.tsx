// src/features/member-affairs/SubClassManager.tsx
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { memberAffairsApi, useMemberAffairsClassId } from "./memberAffairsApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SubClassManager() {
  const classId = useMemberAffairsClassId();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [subClassName, setSubClassName] = useState("");
  const [subChairId, setSubChairId] = useState("");
  const [subSecretaryId, setSubSecretaryId] = useState("");
  const [subViceId, setSubViceId] = useState("");

  const { data: subClasses, isLoading } = useQuery({
    queryKey: ["member-affairs", "sub-classes", classId],
    enabled: !!classId,
    queryFn: async () => {
      const res = await memberAffairsApi.getSubClasses(classId!);
      return res.data;
    },
  });

  const { data: members } = useQuery({
    queryKey: ["member-affairs", "members-for-subclass"],
    queryFn: async () => {
      const res = await memberAffairsApi.listMembers({});
      return res.data;
    },
  });

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
      setSubViceId("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => memberAffairsApi.deleteSubClass(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["member-affairs", "sub-classes"] }),
  });

  if (isLoading) return <div>Loading sub‑classes...</div>;

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
              <TableHead>Sub‑Vice</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subClasses?.map((sc: any) => (
              <TableRow key={sc.id}>
                <TableCell>{sc.sub_class_name}</TableCell>
                {/* ✅ Use the correct relation name from backend */}
                <TableCell>{sc.users_sub_classes_sub_chair_idTousers?.full_name_three_parts || "—"}</TableCell>
                <TableCell>{sc.users_sub_classes_sub_secretary_idTousers?.full_name_three_parts || "—"}</TableCell>
                <TableCell>{sc.users_sub_classes_sub_vice_idTousers?.full_name_three_parts || "—"}</TableCell>
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
                {members?.map((m: any) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.full_name_three_parts}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={subSecretaryId} onValueChange={setSubSecretaryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Sub‑Secretary" />
              </SelectTrigger>
              <SelectContent>
                {members?.map((m: any) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.full_name_three_parts}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={subViceId} onValueChange={setSubViceId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Sub‑Vice (Optional)" />
              </SelectTrigger>
              <SelectContent>
                {members?.map((m: any) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.full_name_three_parts}
                  </SelectItem>
                ))}
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