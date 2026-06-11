// src/features/member-affairs/PlanReportMatrix.tsx
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { memberAffairsApi, useMemberAffairsClassId } from "./memberAffairsApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PlanReportMatrix() {
  const classId = useMemberAffairsClassId();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [docType, setDocType] = useState<"PLAN" | "REPORT">("PLAN");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [driveUrl, setDriveUrl] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [quarter, setQuarter] = useState("");

  const { data: plans } = useQuery({
    queryKey: ["member-affairs", "documents", "PLAN", classId],
    enabled: !!classId,
    queryFn: async () => {
      const res = await memberAffairsApi.getDocuments(classId!, "PLAN");
      return res.data;
    },
  });

  const { data: reports } = useQuery({
    queryKey: ["member-affairs", "documents", "REPORT", classId],
    enabled: !!classId,
    queryFn: async () => {
      const res = await memberAffairsApi.getDocuments(classId!, "REPORT");
      return res.data;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: () =>
      memberAffairsApi.uploadDocument(classId!, {
        document_type: docType,
        title,
        description,
        drive_url: driveUrl,
        academic_year: docType === "PLAN" ? parseInt(academicYear) : null,
        quarter: docType === "REPORT" ? parseInt(quarter) : null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member-affairs", "documents"] });
      setOpen(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => memberAffairsApi.deleteDocument(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["member-affairs", "documents"] }),
  });

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDriveUrl("");
    setAcademicYear("");
    setQuarter("");
  };

  const isValidDriveUrl = (url: string) =>
    /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\//.test(url) ||
    /^https:\/\/docs\.google\.com\/(document|presentation|spreadsheets|forms)\/d\//.test(url);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Upload Document
        </Button>
      </div>

      <Tabs defaultValue="plans">
        <TabsList>
          <TabsTrigger value="plans">Annual Plans</TabsTrigger>
          <TabsTrigger value="reports">Quarterly Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="plans">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Academic Year</TableHead>
                  <TableHead>Uploaded At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans?.map((doc: any) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.title}</TableCell>
                    <TableCell>{doc.academic_year}</TableCell>
                    <TableCell>{new Date(doc.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <a href={doc.drive_url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                        <Button size="sm" variant="ghost" onClick={() => deleteMutation.mutate(doc.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Quarter</TableHead>
                  <TableHead>Uploaded At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports?.map((doc: any) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.title}</TableCell>
                    <TableCell>Q{doc.quarter}</TableCell>
                    <TableCell>{new Date(doc.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <a href={doc.drive_url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                        <Button size="sm" variant="ghost" onClick={() => deleteMutation.mutate(doc.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Select value={docType} onValueChange={(v) => setDocType(v as "PLAN" | "REPORT")}>
              <SelectTrigger>
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PLAN">Annual Plan</SelectItem>
                <SelectItem value="REPORT">Quarterly Report</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              placeholder="Google Drive URL"
              value={driveUrl}
              onChange={(e) => setDriveUrl(e.target.value)}
            />
            {docType === "PLAN" && (
              <Input
                type="number"
                placeholder="Academic Year (e.g., 2024)"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
              />
            )}
            {docType === "REPORT" && (
              <Select value={quarter} onValueChange={setQuarter}>
                <SelectTrigger>
                  <SelectValue placeholder="Quarter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Quarter 1</SelectItem>
                  <SelectItem value="2">Quarter 2</SelectItem>
                  <SelectItem value="3">Quarter 3</SelectItem>
                  <SelectItem value="4">Quarter 4</SelectItem>
                </SelectContent>
              </Select>
            )}
            {driveUrl && !isValidDriveUrl(driveUrl) && (
              <p className="text-red-500 text-sm">Invalid Google Drive/Docs URL</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => uploadMutation.mutate()}
              disabled={
                !driveUrl ||
                !title ||
                (docType === "PLAN" && !academicYear) ||
                (docType === "REPORT" && !quarter)
              }
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}