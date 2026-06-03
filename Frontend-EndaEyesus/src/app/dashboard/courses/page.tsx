"use client";

import Link from "next/link";
import { GraduationCap, Lock, CheckCircle, Clock } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function LMSPhaseHubPage() {
    const user = useAuthStore((s) => s.user);
    const role = user?.system_role || user?.role || "USER";
    const isMember = ["MEMBER", "TEACHER", "SERVICE_MANAGER", "SECRETARIAT_SECRETARY", "SECRETARIAT_VICE", "SECRETARIAT_CHAIRMAN", "SUPER_ADMIN", "CLASS_LEADER"].includes(role);

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37]">LMS Phase Hub</h1>
                <p className="text-[#6b6b6b] dark:text-[#B0B0B0] mt-1">
                    Progress through the Enda Eyesus fellowship courses.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Phase 1: Gubae Abew - Always Accessible */}
                <Link href="/dashboard/courses/gubae-abew" className="block group">
                    <div className="h-full bg-white dark:bg-[#1C1C1F] rounded-2xl p-6 border-2 border-[#7A1C1C]/20 dark:border-[#7A1C1C]/40 hover:border-[#7A1C1C] transition-all shadow-sm group-hover:shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#7A1C1C]/5 rounded-bl-full" />
                        <div className="w-12 h-12 rounded-xl bg-[#7A1C1C]/10 flex items-center justify-center mb-4 text-[#7A1C1C]">
                            <GraduationCap className="h-6 w-6" />
                        </div>
                        <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-[#F5F5F5] mb-2">Phase 1: Gubae Abew</h2>
                        <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mb-4">
                            Introduction to the fellowship and foundational Orthodox teachings. Open to all registered users.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#7A1C1C] dark:text-[#D4AF37]">
                            <span>Accessible</span> <CheckCircle className="h-4 w-4" />
                        </div>
                    </div>
                </Link>

                {/* Phase 2: Gubae Hawaryat - Requires Membership */}
                <div className={`h-full bg-white dark:bg-[#1C1C1F] rounded-2xl p-6 border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm relative overflow-hidden ${!isMember ? 'opacity-75' : ''}`}>
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#252529] flex items-center justify-center mb-4 text-gray-500">
                        <GraduationCap className="h-6 w-6" />
                    </div>
                    <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-[#F5F5F5] mb-2">Phase 2: Gubae Hawaryat</h2>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mb-4">
                        Intermediate teachings and class assignments.
                    </p>
                    {isMember ? (
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                            <span>Coming Soon</span> <Clock className="h-4 w-4" />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-xs font-semibold text-red-500/80">
                            <Lock className="h-4 w-4" /> <span>Requires Membership</span>
                        </div>
                    )}
                </div>

                {/* Phase 3: Gubae Ecclesiae - Requires Completion of Phase 2 */}
                <div className="h-full bg-white dark:bg-[#1C1C1F] rounded-2xl p-6 border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm opacity-75 relative overflow-hidden">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#252529] flex items-center justify-center mb-4 text-gray-500">
                        <GraduationCap className="h-6 w-6" />
                    </div>
                    <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-[#F5F5F5] mb-2">Phase 3: Gubae Ecclesiae</h2>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mb-4">
                        Advanced theological study and leadership training.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-500/80">
                        <Lock className="h-4 w-4" /> <span>Prerequisites not met</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
