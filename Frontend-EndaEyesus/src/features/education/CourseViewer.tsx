"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCourseContent } from "./courses";
import { Button } from "@/components/ui/button";
import { Loader2, HelpCircle, MessageCircle, Edit, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import apiClient from "@/api";
import { useAuthStore } from "@/store/authStore";

const SacredBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-[#F8F5F0]/90 via-[#FFF9F0]/70 to-[#EDE5D8]/90 dark:from-[#0E0E0F] dark:via-[#1A1816] dark:to-[#0A0A0B]" />
    <svg className="absolute inset-0 w-full h-full opacity-[0.06] dark:opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="crossPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M50 15 L52 48 L85 50 L52 52 L50 85 L48 52 L15 50 L48 48 Z" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C9A227]" />
        <circle cx="50" cy="50" r="4" fill="currentColor" className="text-[#7A1C1C]" />
      </pattern></defs>
      <rect width="100%" height="100%" fill="url(#crossPattern)" />
    </svg>
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7A1C1C]/10 rounded-full blur-3xl animate-pulse delay-700" />
  </div>
);

const getAuthHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

const insertExplanationMarkers = (container: HTMLElement, explanations: Array<{ id: string; quotedText: string; explanation: string }>) => {
  if (!container || !explanations.length) return;
  const existingMarkers = container.querySelectorAll(".inline-explain-trigger");
  existingMarkers.forEach(marker => marker.remove());

  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const parent = node.parentNode;
    if (parent && parent instanceof Element && !parent.closest(".inline-explain-trigger")) textNodes.push(node);
  }

  for (const exp of explanations) {
    const quoted = exp.quotedText.trim();
    if (!quoted) continue;
    let replaced = false;
    for (const node of textNodes) {
      const text = node.textContent || "";
      const index = text.indexOf(quoted);
      if (index !== -1 && !replaced) {
        const parent = node.parentNode;
        if (!parent || !(parent instanceof Element)) continue;

        const before = text.slice(0, index);
        const match = text.slice(index, index + quoted.length);
        const after = text.slice(index + quoted.length);

        const beforeNode = before ? document.createTextNode(before) : null;
        const matchSpan = document.createElement("span");
        matchSpan.className = "inline-explain-trigger cursor-pointer";
        matchSpan.style.borderBottom = "1px dashed #C9A227";
        matchSpan.style.backgroundColor = "rgba(201,162,39,0.1)";
        matchSpan.style.display = "inline-block";
        matchSpan.innerHTML = `${match}<span class="inline-explain-icon ml-1 text-[#C9A227] text-xs">ⓘ</span>`;
        matchSpan.setAttribute("data-explanation", exp.explanation);
        matchSpan.setAttribute("data-quoted", quoted);
        matchSpan.setAttribute("data-id", exp.id);

        const afterNode = after ? document.createTextNode(after) : null;

        if (beforeNode) parent.insertBefore(beforeNode, node);
        parent.insertBefore(matchSpan, node);
        if (afterNode) parent.insertBefore(afterNode, node);
        parent.removeChild(node);

        replaced = true;
        break;
      }
    }
  }
};

export default function CourseViewer({ phase }: { phase: string }) {
  const [examAnswers, setExamAnswers] = useState<Record<string, string>>({});
  const [examResults, setExamResults] = useState<Record<string, { score: number; passed: boolean }>>({});
  const [selectedText, setSelectedText] = useState("");
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [explanationDialogOpen, setExplanationDialogOpen] = useState(false);
  const [newExplanation, setNewExplanation] = useState("");
  const [viewExplanation, setViewExplanation] = useState<{ id: string; quoted: string; explanation: string } | null>(null);
  const [editingExplanation, setEditingExplanation] = useState<{ id: string; quotedText: string; explanation: string } | null>(null);
  const [markerVersion, setMarkerVersion] = useState(0); // Force marker re‑insertion
  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const examContainerRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const { user } = useAuthStore();
  const isManager = user?.system_role === "SERVICE_MANAGER" && user?.serviceClassName === "የትምህርት ክፍል";
  const queryClient = useQueryClient();

  const content = getCourseContent(phase);
  if (!content) return <div className="text-center p-8">Course content not available.</div>;
  const subjects = content.subjects;

  const { data: explanationsMap, refetch: refetchExplanations } = useQuery({
    queryKey: ["course-explanations", phase],
    queryFn: async () => {
      const map: Record<string, any[]> = {};
      for (const subject of subjects) {
        for (const lesson of subject.lessons) {
          const res = await apiClient.instance.get(`/education/lessons/${lesson.id}/explanations`, { headers: getAuthHeaders() });
          map[lesson.id] = res.data;
        }
        if (subject.exam) {
          const examId = `exam_${subject.id}`;
          const res = await apiClient.instance.get(`/education/lessons/${examId}/explanations`, { headers: getAuthHeaders() });
          map[examId] = res.data;
        }
      }
      return map;
    },
    enabled: true,
  });

  useLayoutEffect(() => {
    if (!explanationsMap) return;
    const timer = setTimeout(() => {
      for (const [lessonId, explanations] of Object.entries(explanationsMap)) {
        const container = contentRefs.current.get(lessonId);
        if (container && explanations.length) insertExplanationMarkers(container, explanations);
      }
      for (const [examId, explanations] of Object.entries(explanationsMap)) {
        if (examId.startsWith("exam_")) {
          const container = examContainerRefs.current.get(examId);
          if (container && explanations.length) insertExplanationMarkers(container, explanations);
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [explanationsMap, markerVersion]); // Re‑run when markerVersion changes

  useEffect(() => {
    const handleMarkerClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      while (target && !target.classList?.contains("inline-explain-trigger")) target = target.parentElement as HTMLElement;
      if (target && target.classList.contains("inline-explain-trigger")) {
        const id = target.getAttribute("data-id");
        const explanation = target.getAttribute("data-explanation");
        const quoted = target.getAttribute("data-quoted") || "";
        if (id && explanation) setViewExplanation({ id, quoted, explanation });
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("click", handleMarkerClick);
    return () => document.removeEventListener("click", handleMarkerClick);
  }, []);

  const addExplanationMutation = useMutation({
    mutationFn: async ({ lessonId, quotedText, explanation }: any) => {
      const res = await apiClient.instance.post(`/education/lessons/${lessonId}/explanations`, { quotedText, explanation }, { headers: getAuthHeaders() });
      return res.data;
    },
    onSuccess: () => { toast.success("Explanation added"); setExplanationDialogOpen(false); setNewExplanation(""); refetchExplanations(); queryClient.invalidateQueries({ queryKey: ["course-explanations", phase] }); },
    onError: (err: any) => toast.error(err.response?.data?.error || "Failed to add"),
  });

  const updateExplanationMutation = useMutation({
    mutationFn: async ({ id, quotedText, explanation }: any) => {
      const res = await apiClient.instance.patch(`/education/explanations/${id}`, { quotedText, explanation }, { headers: getAuthHeaders() });
      return res.data;
    },
    onSuccess: () => { toast.success("Explanation updated"); setEditingExplanation(null); refetchExplanations(); queryClient.invalidateQueries({ queryKey: ["course-explanations", phase] }); setViewExplanation(null); setMarkerVersion(prev => prev + 1); },
    onError: (err: any) => toast.error(err.response?.data?.error || "Failed to update"),
  });

  const deleteExplanationMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.instance.delete(`/education/explanations/${id}`, { headers: getAuthHeaders() });
    },
    onSuccess: () => { toast.success("Explanation deleted"); refetchExplanations(); queryClient.invalidateQueries({ queryKey: ["course-explanations", phase] }); setViewExplanation(null); setMarkerVersion(prev => prev + 1); },
    onError: (err: any) => toast.error(err.response?.data?.error || "Failed to delete"),
  });

  const handleTextSelection = (targetId: string) => {
    if (!isManager) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    const selected = selection.toString().trim();
    if (!selected) return;
    setSelectedText(selected);
    setSelectedLessonId(targetId);
    setExplanationDialogOpen(true);
    selection.removeAllRanges();
  };

  const handleExamSubmit = (subjectId: string, questions: any[]) => {
    let totalPoints = 0, earned = 0;
    for (const q of questions) { totalPoints += q.points; if (examAnswers[q.id] === q.correctAnswer) earned += q.points; }
    const score = (earned / totalPoints) * 100;
    const passed = score >= 70;
    setExamResults(prev => ({ ...prev, [subjectId]: { score, passed } }));
    toast.success(passed ? `Passed! ${score.toFixed(1)}%` : `Failed, try again.`);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SacredBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isManager && <div className="fixed bottom-6 right-6 z-50"><div className="bg-[#C9A227] text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold animate-pulse">✨ Select any text to add explanation</div></div>}

        <div className="space-y-12">
          {subjects.map((subject) => (
            <div key={subject.id} className="rounded-2xl border border-[#ddd8d0] dark:border-[#2a2a2d] bg-white/80 dark:bg-[#1C1C1F]/80 backdrop-blur-md shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#7A1C1C]/10 to-[#C9A227]/10 p-6 border-b">
                <h2 className="text-2xl md:text-3xl font-bold text-[#7A1C1C] dark:text-[#D4AF37]">{subject.title}</h2>
                {subject.description && <p className="text-muted-foreground mt-1 italic">{subject.description}</p>}
              </div>
              <div className="p-6 space-y-8">
                {subject.lessons.map((lesson) => (
                  <div key={lesson.id} className="border-l-4 border-[#C9A227] pl-6">
                    <h3 className="text-xl font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">{lesson.title}</h3>
                    <div ref={(el) => { if (el) contentRefs.current.set(lesson.id, el); }} className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} onMouseUp={() => handleTextSelection(lesson.id)} />
                  </div>
                ))}
                {subject.exam && (
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-semibold text-[#C9A227]">Subject Exam</h3>
                    <div ref={(el) => { if (el) examContainerRefs.current.set(`exam_${subject.id}`, el); }} className="space-y-4" onMouseUp={() => handleTextSelection(`exam_${subject.id}`)}>
                      {!examResults[subject.id]?.passed && (
                        <form onSubmit={(e) => { e.preventDefault(); handleExamSubmit(subject.id, subject.exam.questions); }}>
                          {subject.exam.questions.map((q: any, idx: number) => (
                            <div key={q.id} className="mt-4 p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                              <p className="font-medium mb-2">{idx + 1}. {q.text}</p>
                              <RadioGroup onValueChange={(val) => setExamAnswers({ ...examAnswers, [q.id]: val })}>
                                {q.options.map((opt: string) => (<div key={opt} className="flex items-center space-x-2"><RadioGroupItem value={opt} id={`${q.id}-${opt}`} /><Label htmlFor={`${q.id}-${opt}`}>{opt}</Label></div>))}
                              </RadioGroup>
                            </div>
                          ))}
                          <Button type="submit" className="mt-4 bg-[#C9A227] hover:bg-[#B8911A] text-white">Submit Exam</Button>
                        </form>
                      )}
                      {examResults[subject.id]?.passed && <div className="mt-4 text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">✓ Passed ({examResults[subject.id].score.toFixed(1)}%)</div>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Explanation Dialog */}
      <Dialog open={explanationDialogOpen} onOpenChange={setExplanationDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white/95 dark:bg-[#1C1C1F]/95 backdrop-blur-xl border border-[#C9A227]/40 rounded-2xl">
          <DialogHeader><DialogTitle className="flex items-center gap-2 text-[#7A1C1C] dark:text-[#D4AF37]">Add Explanation</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div><label className="text-sm font-medium">Selected text</label><div className="mt-1 p-3 bg-muted rounded-md italic">“{selectedText}”</div></div>
            <div><label className="text-sm font-medium">Explanation</label><Textarea rows={6} value={newExplanation} onChange={(e) => setNewExplanation(e.target.value)} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setExplanationDialogOpen(false)}>Cancel</Button><Button onClick={() => addExplanationMutation.mutate({ lessonId: selectedLessonId, quotedText: selectedText, explanation: newExplanation })} disabled={!newExplanation.trim()} className="bg-[#C9A227]">Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Explanation Dialog */}
      <Dialog open={!!viewExplanation} onOpenChange={(open) => { if (!open) { setViewExplanation(null); setMarkerVersion(prev => prev + 1); } }}>
        <DialogContent className="sm:max-w-2xl w-[95vw] bg-white/95 dark:bg-[#1C1C1F]/95 backdrop-blur-xl border border-[#C9A227]/40 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between gap-2 text-[#7A1C1C] dark:text-[#D4AF37]">
              <span className="flex items-center gap-2"><HelpCircle className="h-5 w-5" /> Explanation</span>
              {isManager && viewExplanation && (
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => { setEditingExplanation({ id: viewExplanation.id, quotedText: viewExplanation.quoted, explanation: viewExplanation.explanation }); setViewExplanation(null); }}><Edit className="h-4 w-4" /></Button>
                  <Button size="sm" variant="ghost" className="text-red-600" onClick={() => { if (confirm("Delete this explanation?")) deleteExplanationMutation.mutate(viewExplanation.id); }}><Trash2 className="h-4 w-4" /></Button>
                </div>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg border border-[#C9A227]/30"><p className="text-sm font-medium text-muted-foreground">Quoted text:</p><p className="text-foreground italic mt-1">“{viewExplanation?.quoted}”</p></div>
            <div className="prose dark:prose-invert max-w-none"><div dangerouslySetInnerHTML={{ __html: viewExplanation?.explanation || "" }} /></div>
          </div>
          <DialogFooter><Button onClick={() => { setViewExplanation(null); setMarkerVersion(prev => prev + 1); }} className="bg-[#C9A227]">Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Explanation Dialog */}
      <Dialog open={!!editingExplanation} onOpenChange={() => setEditingExplanation(null)}>
        <DialogContent className="sm:max-w-lg bg-white/95 dark:bg-[#1C1C1F]/95 backdrop-blur-xl border border-[#C9A227]/40 rounded-2xl">
          <DialogHeader><DialogTitle className="text-[#7A1C1C] dark:text-[#D4AF37]">Edit Explanation</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div><label className="text-sm font-medium">Quoted text</label><Input value={editingExplanation?.quotedText || ""} onChange={(e) => setEditingExplanation(prev => prev ? { ...prev, quotedText: e.target.value } : null)} /></div>
            <div><label className="text-sm font-medium">Explanation</label><Textarea rows={6} value={editingExplanation?.explanation || ""} onChange={(e) => setEditingExplanation(prev => prev ? { ...prev, explanation: e.target.value } : null)} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setEditingExplanation(null)}>Cancel</Button><Button onClick={() => editingExplanation && updateExplanationMutation.mutate(editingExplanation)} disabled={!editingExplanation?.quotedText || !editingExplanation?.explanation} className="bg-[#C9A227]">Update</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}