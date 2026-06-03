"use client";

import { useEffect, useState } from "react";
import { BookOpen, Clock, CheckCircle2, LockKeyhole, Play, Loader2, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import apiClient from "@/api";
import { Batch } from "@/api/generated/api";

// Roles that are allowed to access course content
const ALLOWED_ROLES = ["MEMBER", "TEACHER", "SERVICE_MANAGER", "SECRETARIAT_SECRETARY", "SECRETARIAT_VICE", "SECRETARIAT_CHAIRMAN", "SUPER_ADMIN", "CLASS_LEADER"];

interface LessonCard {
    id: string;
    title: string;
    description: string;
    week: number;
    isCompleted?: boolean;
}

// Static lesson definitions for Gubae Abew
// These will be enriched with real submission data from the API when available
const STATIC_LESSONS: LessonCard[] = [
    { id: "ga-01", title: "Introduction to Gubae Abew", description: "Foundation of the fellowship course, its vision and objectives.", week: 1 },
    { id: "ga-02", title: "Faith & Community", description: "Understanding the role of faith in community life at MU.", week: 2 },
    { id: "ga-03", title: "Spiritual Formation", description: "Practices and disciplines that foster spiritual growth.", week: 3 },
    { id: "ga-04", title: "Church History & Tradition", description: "The history of the Ethiopian Orthodox Tewahedo Church.", week: 4 },
    { id: "ga-05", title: "The Sacraments", description: "An overview of the seven sacraments and their significance.", week: 5 },
    { id: "ga-06", title: "Prayer & Fasting", description: "Disciplines of prayer and fasting in the Orthodox tradition.", week: 6 },
    { id: "ga-07", title: "Service & Mission", description: "Engaging with the campus and community through service.", week: 7 },
    { id: "ga-08", title: "Leadership in the Church", description: "Principles of servant leadership for fellowship members.", week: 8 },
];

function LessonCardComponent({
    lesson,
    isLocked,
    enrollmentId,
    onComplete,
}: {
    lesson: LessonCard;
    isLocked: boolean;
    enrollmentId?: string;
    onComplete?: (lessonId: string) => void;
}) {
    const [isCompleting, setIsCompleting] = useState(false);

    const handleComplete = async () => {
        if (!enrollmentId || lesson.isCompleted || isLocked) return;
        setIsCompleting(true);
        try {
            await apiClient.lms.completeLesson(enrollmentId, { lesson_id: lesson.id });
            onComplete?.(lesson.id);
        } catch {
            // silently ignore
        } finally {
            setIsCompleting(false);
        }
    };

    return (
        <div
            className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden ${isLocked
                ? "border-[#ddd8d0] dark:border-[#2a2a2d] bg-[#F8F5F0] dark:bg-[#1C1C1F] opacity-60 cursor-not-allowed"
                : lesson.isCompleted
                    ? "border-[#7A1C1C]/30 dark:border-[#7ac9a8]/30 bg-[#7A1C1C]/5 dark:bg-[#7ac9a8]/5"
                    : "border-[#ddd8d0] dark:border-[#2a2a2d] bg-white dark:bg-[#1C1C1F] hover:border-[#C9A227] dark:hover:border-[#D4AF37] hover:shadow-lg dark:hover:shadow-[0_4px_24px_rgba(212,175,55,0.1)] cursor-pointer"
                }`}
        >
            {/* Colored top stripe */}
            <div className={`h-1 w-full ${lesson.isCompleted ? "bg-[#7A1C1C] dark:bg-[#7ac9a8]" : isLocked ? "bg-[#ddd8d0] dark:bg-[#2a2a2d]" : "bg-[#C9A227] dark:bg-[#D4AF37]"}`} />

            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b6b6b] dark:text-[#B0B0B0]">
                                Week {lesson.week}
                            </span>
                            {lesson.isCompleted && (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-[#7A1C1C] dark:text-[#7ac9a8] bg-[#7A1C1C]/10 dark:bg-[#7ac9a8]/10 px-2 py-0.5 rounded-full">
                                    Completed
                                </span>
                            )}
                        </div>
                        <h3 className={`text-sm font-semibold leading-snug mb-1 ${isLocked ? "text-[#6b6b6b] dark:text-[#B0B0B0]" : "text-[#1a1a1a] dark:text-[#F5F5F5]"}`}>
                            {lesson.title}
                        </h3>
                        <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed line-clamp-2">
                            {lesson.description}
                        </p>
                    </div>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${isLocked
                        ? "bg-[#ddd8d0] dark:bg-[#252529]"
                        : lesson.isCompleted
                            ? "bg-[#7A1C1C] dark:bg-[#7ac9a8]/20"
                            : "bg-[#C9A227]/10 dark:bg-[#D4AF37]/10 group-hover:bg-[#C9A227] dark:group-hover:bg-[#D4AF37] transition-colors"
                        }`}>
                        {isLocked ? (
                            <LockKeyhole className="h-4 w-4 text-[#6b6b6b] dark:text-[#B0B0B0]" />
                        ) : lesson.isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-white dark:text-[#7ac9a8]" />
                        ) : (
                            <Play className="h-4 w-4 text-[#C9A227] dark:text-[#D4AF37] group-hover:text-white dark:group-hover:text-[#0E0E0F] transition-colors" />
                        )}
                    </div>
                </div>

                {!isLocked && !lesson.isCompleted && enrollmentId && (
                    <button
                        onClick={handleComplete}
                        disabled={isCompleting}
                        className="mt-4 w-full h-9 rounded-xl bg-[#7A1C1C] dark:bg-[#9B2323] text-white text-xs font-semibold hover:bg-[#C9A227] dark:hover:bg-[#D4AF37] hover:text-[#7A1C1C] dark:hover:text-[#0E0E0F] transition-all duration-200 flex items-center justify-center gap-1.5"
                    >
                        {isCompleting ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <><CheckCircle2 className="h-3.5 w-3.5" /> Mark as Complete</>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

export default function GubaePage() {
    const { user } = useAuthStore();
    const isAllowed = ALLOWED_ROLES.includes(user?.system_role || user?.role || "");

    const [batches, setBatches] = useState<Batch[]>([]);
    const [loadingBatches, setLoadingBatches] = useState(true);
    const [enrollmentId, setEnrollmentId] = useState<string | undefined>();
    const [isEnrolling, setIsEnrolling] = useState(false);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [enrollError, setEnrollError] = useState("");

    const lessons = STATIC_LESSONS.map((l) => ({
        ...l,
        isCompleted: completedLessons.includes(l.id),
    }));

    const progress = Math.round((completedLessons.length / STATIC_LESSONS.length) * 100);

    useEffect(() => {
        if (!isAllowed) return;
        apiClient.lms.listBatches({ course_track: "GUBAE_ABEW", limit: 10 })
            .then((res) => setBatches(res.data?.items || []))
            .catch(() => setBatches([]))
            .finally(() => setLoadingBatches(false));
    }, [isAllowed]);

    const activeBatch = batches.find((b) => b.status === "ACTIVE");

    const handleEnroll = async () => {
        if (!activeBatch?.id) return;
        setIsEnrolling(true);
        setEnrollError("");
        try {
            const res = await apiClient.lms.enroll({ batch_id: activeBatch.id });
            setEnrollmentId(res.data?.enrollment_id);
        } catch (err: any) {
            const d = err.response?.data;
            setEnrollError(d?.detail || d?.message || "Enrollment failed.");
        } finally {
            setIsEnrolling(false);
        }
    };

    const handleLessonComplete = (lessonId: string) => {
        setCompletedLessons((prev) => [...prev, lessonId]);
    };

    // Access denied
    if (!isAllowed) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#7A1C1C]/10 dark:bg-[#ff6b6b]/10 flex items-center justify-center">
                    <LockKeyhole className="h-8 w-8 text-[#7A1C1C] dark:text-[#ff6b6b]" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-[#F5F5F5] mb-2">Members Only</h2>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] max-w-sm leading-relaxed">
                        The Gubae Abew course is available to fellowship members only.
                        Apply for membership from your dashboard to gain access.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
            {/* Hero Banner */}
            <div
                className="relative rounded-2xl overflow-hidden"
                style={{ background: "linear-gradient(135deg, #7A1C1C 0%, #1a5c44 60%, #7A1C1C 100%)" }}
            >
                <div className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #C9A227 0%, transparent 60%)" }} />
                <div className="relative px-8 py-8">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                                    GUBAE ABEW COURSE
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-white leading-tight mb-2">
                                ጉባኤ ዓቤዉ
                            </h1>
                            <p className="text-white/70 text-sm max-w-md leading-relaxed">
                                The foundational fellowship course covering faith, community,
                                and spiritual formation for Mekelle University students.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-white/60 text-xs mb-1">Progress</p>
                                <p className="text-[#C9A227] text-2xl font-bold">{progress}%</p>
                            </div>
                            <div className="w-14 h-14 rounded-full border-4 border-[#C9A227]/30 flex items-center justify-center relative">
                                <svg className="absolute inset-0 -rotate-90" width="56" height="56" viewBox="0 0 56 56">
                                    <circle cx="28" cy="28" r="22" fill="none" stroke="#C9A227" strokeWidth="4"
                                        strokeDasharray={`${2 * Math.PI * 22 * progress / 100} ${2 * Math.PI * 22 * (1 - progress / 100)}`}
                                        strokeLinecap="round" opacity="0.8" />
                                </svg>
                                <BookOpen className="h-5 w-5 text-[#C9A227] relative z-10" />
                            </div>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-6 mt-5 pt-5 border-t border-white/10">
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-[#C9A227]/80" />
                            <span className="text-white/70 text-sm">{STATIC_LESSONS.length} Lessons</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-[#C9A227]/80" />
                            <span className="text-white/70 text-sm">8 Weeks</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#C9A227]/80" />
                            <span className="text-white/70 text-sm">{completedLessons.length} Completed</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enrollment section */}
            {!enrollmentId && (
                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl border border-[#ddd8d0] dark:border-[#2a2a2d] p-5">
                    {loadingBatches ? (
                        <div className="flex items-center gap-3 text-[#6b6b6b] dark:text-[#B0B0B0]">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Loading course batches...</span>
                        </div>
                    ) : activeBatch ? (
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h3 className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">
                                    Batch {activeBatch.batch_number} · Academic Year {activeBatch.academic_year}
                                </h3>
                                <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] mt-0.5">
                                    Enroll to track your progress and mark lessons complete
                                </p>
                                {enrollError && (
                                    <p className="text-xs text-[#7A1C1C] dark:text-[#ff6b6b] mt-1 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> {enrollError}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={handleEnroll}
                                disabled={isEnrolling}
                                className="px-5 h-10 rounded-xl bg-[#7A1C1C] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F] text-sm font-semibold hover:bg-[#C9A227] dark:hover:bg-[#e0c040] hover:text-[#7A1C1C] transition-all duration-200 flex items-center gap-2 flex-shrink-0"
                            >
                                {isEnrolling ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                                {isEnrolling ? "Enrolling..." : "Enroll in This Batch"}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 text-[#6b6b6b] dark:text-[#B0B0B0]">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">No active batch is currently available. Check back soon.</span>
                        </div>
                    )}
                </div>
            )}

            {enrollmentId && (
                <div className="bg-[#7A1C1C]/8 dark:bg-[#7ac9a8]/8 border border-[#7A1C1C]/20 dark:border-[#7ac9a8]/20 rounded-2xl px-5 py-3 flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#7A1C1C] dark:text-[#7ac9a8] flex-shrink-0" />
                    <p className="text-sm text-[#7A1C1C] dark:text-[#7ac9a8] font-medium">
                        You are enrolled in this batch. Mark lessons complete to track your progress.
                    </p>
                </div>
            )}

            {/* Lessons Grid */}
            <div>
                <h2 className="text-base font-bold text-[#1a1a1a] dark:text-[#F5F5F5] mb-4">Course Lessons</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {lessons.map((lesson) => (
                        <LessonCardComponent
                            key={lesson.id}
                            lesson={lesson}
                            isLocked={!enrollmentId}
                            enrollmentId={enrollmentId}
                            onComplete={handleLessonComplete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
