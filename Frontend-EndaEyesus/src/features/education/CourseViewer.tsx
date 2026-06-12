"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { educationApi } from "./educationApi";
import { Button } from "@/components/ui/button";
import { Loader2, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function CourseViewer({ phase, batchId }: { phase: string; batchId: string }) {
  const queryClient = useQueryClient();
  const [examAnswers, setExamAnswers] = useState<Record<string, string>>({});
  const [examResult, setExamResult] = useState<{ score: number; passed: boolean } | null>(null);

  const { data: subjectsResp, isLoading } = useQuery({
    queryKey: ["education", "subjects", batchId],
    queryFn: () => educationApi.getSubjectsWithLessons(batchId),
  });
  const subjects = subjectsResp?.data || [];

  const submitExamMutation = useMutation({
    mutationFn: (examId: string) => educationApi.submitExam(examId, examAnswers),
    onSuccess: (response) => {
      // Extract data from Axios response
      const result = response.data;
      setExamResult(result);
      queryClient.invalidateQueries({ queryKey: ["education", "subjects", batchId] });
    },
  });

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <div className="space-y-8">
      {subjects.map((subject: any) => (
        <div key={subject.id} className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#7A1C1C]">{subject.title}</h2>
          <p className="text-muted-foreground mb-4">{subject.description}</p>
          {subject.lessons.map((lesson: any) => (
            <div key={lesson.id} className="mt-6">
              <h3 className="text-xl font-semibold">{lesson.title}</h3>
              <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: lesson.content }} />
              {lesson.inlineExplanations?.map((exp: any) => (
                <Accordion type="single" collapsible key={exp.id}>
                  <AccordionItem value={exp.id}>
                    <AccordionTrigger className="text-sm text-muted-foreground">
                      <HelpCircle className="h-4 w-4 inline mr-2" /> Explain: {exp.quotedText.substring(0, 60)}...
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="p-3 bg-muted rounded-md" dangerouslySetInnerHTML={{ __html: exp.explanation }} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          ))}
          {subject.exam && !subject.userProgress?.passed && (
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold">Subject Exam</h3>
              <form onSubmit={(e) => { e.preventDefault(); submitExamMutation.mutate(subject.exam.id); }}>
                {subject.exam.questions.map((q: any, idx: number) => (
                  <div key={q.id} className="mt-4">
                    <p className="font-medium">{idx+1}. {q.text}</p>
                    <RadioGroup onValueChange={(val) => setExamAnswers({ ...examAnswers, [q.id]: val })}>
                      {q.options.map((opt: string) => (
                        <div key={opt} className="flex items-center space-x-2">
                          <RadioGroupItem value={opt} id={`${q.id}-${opt}`} />
                          <Label htmlFor={`${q.id}-${opt}`}>{opt}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
                <Button type="submit" className="mt-4">Submit Exam</Button>
              </form>
            </div>
          )}
          {subject.userProgress?.passed && (
            <div className="mt-4 text-green-600">✓ Exam passed</div>
          )}
        </div>
      ))}
      {subjects.length > 0 && subjects.every((s: any) => s.userProgress?.passed) && (
        <div className="text-center p-6 bg-green-100 rounded-lg">
          <p className="text-lg">🎉 You have completed all subjects! Exit exam is available.</p>
          {/* Add exit exam button/component here */}
        </div>
      )}
      {examResult && <div className={`p-4 rounded ${examResult.passed ? "bg-green-100" : "bg-red-100"}`}>Score: {examResult.score}% – {examResult.passed ? "Passed!" : "Failed. Try again."}</div>}
    </div>
  );
}