"use client";

import { getCourseContent } from "./courses";
import { Button } from "@/components/ui/button";
import { Loader2, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function CourseViewer({ phase }: { phase: string }) {
  const [examAnswers, setExamAnswers] = useState<Record<string, string>>({});
  const [examResults, setExamResults] = useState<Record<string, { score: number; passed: boolean }>>({});

  const content = getCourseContent(phase);
  if (!content) {
    return <div className="text-center p-8">Course content not available for this phase.</div>;
  }

  const subjects = content.subjects;

  const handleExamSubmit = (subjectId: string, questions: any[]) => {
    let totalPoints = 0;
    let earnedPoints = 0;
    for (const q of questions) {
      totalPoints += q.points;
      if (examAnswers[q.id] === q.correctAnswer) earnedPoints += q.points;
    }
    const score = (earnedPoints / totalPoints) * 100;
    const passed = score >= 70; // all exams have passingScore 70
    setExamResults(prev => ({ ...prev, [subjectId]: { score, passed } }));
    if (passed) {
      toast.success(`Exam passed! Score: ${score.toFixed(1)}%`);
    } else {
      toast.error(`Exam failed. Score: ${score.toFixed(1)}%`);
    }
  };

  return (
    <div className="space-y-8">
      {subjects.map((subject) => (
        <div key={subject.id} className="border rounded-lg p-6 bg-white dark:bg-[#1C1C1F] shadow-sm">
          <h2 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37]">{subject.title}</h2>
          <p className="text-muted-foreground mb-4">{subject.description}</p>

          {subject.lessons.map((lesson) => (
            <div key={lesson.id} className="mt-6">
              <h3 className="text-xl font-semibold">{lesson.title}</h3>
              <div
                className="prose dark:prose-invert max-w-none mt-2"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
              {lesson.inlineExplanations?.map((exp) => (
                <Accordion type="single" collapsible key={exp.id}>
                  <AccordionItem value={exp.id}>
                    <AccordionTrigger className="text-sm text-muted-foreground">
                      <HelpCircle className="h-4 w-4 inline mr-2" /> Explain: {exp.quotedText.substring(0, 60)}...
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        className="p-3 bg-muted rounded-md"
                        dangerouslySetInnerHTML={{ __html: exp.explanation }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          ))}

          {subject.exam && !examResults[subject.id]?.passed && (
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold">Subject Exam</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleExamSubmit(subject.id, subject.exam.questions);
                }}
              >
                {subject.exam.questions.map((q, idx) => (
                  <div key={q.id} className="mt-4">
                    <p className="font-medium">{idx + 1}. {q.text}</p>
                    <RadioGroup
                      onValueChange={(val) => setExamAnswers({ ...examAnswers, [q.id]: val })}
                    >
                      {q.options.map((opt) => (
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

          {examResults[subject.id]?.passed && (
            <div className="mt-4 text-green-600 flex items-center gap-2">
              <span>✓</span> Exam passed (Score: {examResults[subject.id].score.toFixed(1)}%)
            </div>
          )}
        </div>
      ))}

      {subjects.length > 0 && subjects.every((s) => examResults[s.id]?.passed) && (
        <div className="text-center p-6 bg-green-100 dark:bg-green-900/20 rounded-lg">
          <p className="text-lg">🎉 You have completed all subjects! The exit exam will be available soon.</p>
        </div>
      )}
    </div>
  );
}