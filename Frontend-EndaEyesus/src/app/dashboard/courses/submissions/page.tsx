"use client";

import { useAuthStore } from "@/store/authStore";
import { GraduationCap, FileText, CheckCircle, XCircle, Clock } from "lucide-react";

export default function TeacherDashboard() {
    const user = useAuthStore((s) => s.user);
    const role = user?.system_role || user?.role || "USER";
    const isTeacherOrAdmin = ["TEACHER", "SERVICE_MANAGER", "SUPER_ADMIN", "SECRETARIAT_CHAIRMAN", "SECRETARIAT_VICE", "SECRETARIAT_SECRETARY"].includes(role);

    if (!isTeacherOrAdmin) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-[#7A1C1C]/10 rounded-full flex items-center justify-center mb-4 text-[#7A1C1C]">
                    <XCircle className="w-8 h-8" />
                </div>
                <h1 className="text-xl font-bold text-[#1a1a1a] dark:text-[#F5F5F5]">Access Denied</h1>
                <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mt-2 max-w-sm">
                    You do not have the required privileges to view the Teacher Dashboard.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37]">Teacher Dashboard</h1>
                <p className="text-[#6b6b6b] dark:text-[#B0B0B0] mt-1">
                    Manage course submissions and grading.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course Submission Interface */}
                <div className="bg-white dark:bg-[#1C1C1F] border border-[#ddd8d0] dark:border-[#2a2a2d] rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#7A1C1C]/10 rounded-xl flex items-center justify-center text-[#7A1C1C]">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-[#F5F5F5]">Course Submissions</h2>
                    </div>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mb-6">
                        Submit new course content for review, including attached documents, video links, and quiz definitions.
                    </p>
                    <button className="w-full py-2.5 bg-[#7A1C1C] text-white rounded-xl text-sm font-semibold hover:bg-[#8A1538] transition-colors">
                        Create New Submission
                    </button>

                    <div className="mt-6 pt-6 border-t border-[#ddd8d0] dark:border-[#2a2a2d]">
                        <h3 className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] mb-3">Recent Status</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#6b6b6b] dark:text-[#B0B0B0]">Foundations of Faith</span>
                                <span className="flex items-center gap-1.5 text-[#C9A227]"><Clock className="w-4 h-4" /> Under Review</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#6b6b6b] dark:text-[#B0B0B0]">Gubae Abew Ch 4</span>
                                <span className="flex items-center gap-1.5 text-green-600 dark:text-green-500"><CheckCircle className="w-4 h-4" /> Published</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grading Dashboard */}
                <div className="bg-white dark:bg-[#1C1C1F] border border-[#ddd8d0] dark:border-[#2a2a2d] rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#C9A227]/10 rounded-xl flex items-center justify-center text-[#C9A227]">
                            <FileText className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-[#F5F5F5]">Grading Dashboard</h2>
                    </div>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mb-6">
                        Review and manually grade open-ended exam submissions from students in your assigned classes.
                    </p>
                    <button className="w-full py-2.5 bg-[#F8F5F0] dark:bg-[#252529] text-[#7A1C1C] dark:text-[#D4AF37] rounded-xl text-sm font-semibold hover:bg-[#EDE9E2] dark:hover:bg-[#2a2a2d] transition-colors">
                        Open Grading Panel
                    </button>
                    
                    <div className="mt-6 pt-6 border-t border-[#ddd8d0] dark:border-[#2a2a2d]">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">Pending Grades</span>
                            <span className="text-xl font-bold text-[#1a1a1a] dark:text-[#F5F5F5]">14</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
