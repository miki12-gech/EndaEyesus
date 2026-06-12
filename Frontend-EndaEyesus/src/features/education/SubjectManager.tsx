"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { educationApi } from "./educationApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SubjectManager() {
  const queryClient = useQueryClient();
  const [selectedBatch, setSelectedBatch] = useState("");
  const [openSubject, setOpenSubject] = useState(false);
  const [openLesson, setOpenLesson] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [subjectForm, setSubjectForm] = useState({ title: "", description: "", order: 0 });
  const [lessonForm, setLessonForm] = useState({ subjectId: "", title: "", content: "", order: 0 });
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const { data: batchesResp } = useQuery({
    queryKey: ["education", "batches"],
    queryFn: () => educationApi.listBatches(),
  });
  const batches = batchesResp?.data || [];

  const { data: subjectsResp, refetch } = useQuery({
    queryKey: ["education", "subjects", selectedBatch],
    queryFn: () => educationApi.getSubjectsWithLessons(selectedBatch),
    enabled: !!selectedBatch,
  });
  const subjects = subjectsResp?.data || [];

  const createSubject = useMutation({
    mutationFn: () => educationApi.createSubject({ ...subjectForm, batchId: selectedBatch, order: parseInt(subjectForm.order as any) }),
    onSuccess: () => { refetch(); setOpenSubject(false); resetSubjectForm(); },
  });
  const createLesson = useMutation({
    mutationFn: () => educationApi.createLesson(lessonForm),
    onSuccess: () => { refetch(); setOpenLesson(false); resetLessonForm(); },
  });

  const resetSubjectForm = () => setSubjectForm({ title: "", description: "", order: 0 });
  const resetLessonForm = () => setLessonForm({ subjectId: "", title: "", content: "", order: 0 });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select onValueChange={setSelectedBatch} value={selectedBatch}>
          <SelectTrigger className="w-64"><SelectValue placeholder="Select Batch" /></SelectTrigger>
          <SelectContent>
            {batches.map((b: any) => <SelectItem key={b.id} value={b.id}>{b.course_track} - Batch {b.batch_number}</SelectItem>)}
          </SelectContent>
        </Select>
        {selectedBatch && <Button onClick={() => setOpenSubject(true)}><Plus className="h-4 w-4 mr-2" /> Add Subject</Button>}
      </div>

      {selectedBatch && subjects.length > 0 && (
        <div className="space-y-4">
          {subjects.map((subject: any) => (
            <div key={subject.id} className="border rounded-lg">
              <div className="flex items-center justify-between p-4 bg-muted/30 cursor-pointer" onClick={() => setExpandedSubject(expandedSubject === subject.id ? null : subject.id)}>
                <div className="flex items-center gap-2">
                  {expandedSubject === subject.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  <span className="font-semibold">{subject.title}</span>
                  <span className="text-xs text-muted-foreground">Order: {subject.order}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setEditingSubject(subject); setSubjectForm({ title: subject.title, description: subject.description || "", order: subject.order }); setOpenSubject(true); }}><Edit className="h-4 w-4" /></Button>
                </div>
              </div>
              {expandedSubject === subject.id && (
                <div className="p-4 border-t">
                  <div className="flex justify-end mb-2">
                    <Button size="sm" onClick={() => { setLessonForm({ ...lessonForm, subjectId: subject.id }); setOpenLesson(true); }}><Plus className="h-4 w-4 mr-1" /> Add Lesson</Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subject.lessons.map((lesson: any) => (
                        <TableRow key={lesson.id}>
                          <TableCell>{lesson.title}</TableCell>
                          <TableCell>{lesson.order}</TableCell>
                          <TableCell><Button size="sm" variant="ghost"><Edit className="h-4 w-4" /></Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {selectedBatch && subjects.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No subjects yet. Click "Add Subject" to create one.</div>
      )}

      {/* Create/Edit Subject Dialog */}
      <Dialog open={openSubject} onOpenChange={setOpenSubject}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSubject ? "Edit Subject" : "New Subject"}</DialogTitle>
          </DialogHeader>
          <Input placeholder="Title" value={subjectForm.title} onChange={(e) => setSubjectForm({ ...subjectForm, title: e.target.value })} />
          <Textarea placeholder="Description" value={subjectForm.description} onChange={(e) => setSubjectForm({ ...subjectForm, description: e.target.value })} />
          <Input type="number" placeholder="Order" value={subjectForm.order} onChange={(e) => setSubjectForm({ ...subjectForm, order: parseInt(e.target.value) })} />
          <DialogFooter>
            <Button onClick={() => createSubject.mutate()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Lesson Dialog */}
      <Dialog open={openLesson} onOpenChange={setOpenLesson}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Lesson</DialogTitle>
          </DialogHeader>
          <Input placeholder="Title" value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} />
          <Textarea placeholder="HTML Content" rows={10} value={lessonForm.content} onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })} />
          <Input type="number" placeholder="Order" value={lessonForm.order} onChange={(e) => setLessonForm({ ...lessonForm, order: parseInt(e.target.value) })} />
          <DialogFooter>
            <Button onClick={() => createLesson.mutate()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}