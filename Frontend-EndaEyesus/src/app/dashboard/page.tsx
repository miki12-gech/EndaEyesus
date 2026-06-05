"use client";

import { Bell, BookOpen, Users, Calendar, ChevronRight, Sparkles, FileText, GraduationCap, Shield, Star } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import apiClient from "@/api";
import ApplyMembershipModal from "@/components/dashboard/ApplyMembershipModal";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:8080";

const ADMIN_ROLES = ["SECRETARIAT_CHAIRMAN", "SECRETARIAT_VICE", "SECRETARIAT_SECRETARY", "SUPER_ADMIN", "SERVICE_MANAGER"];
const MEMBER_ROLES = ["MEMBER", "TEACHER", "SERVICE_MANAGER", "SECRETARIAT_SECRETARY", "SECRETARIAT_VICE", "SECRETARIAT_CHAIRMAN", "SUPER_ADMIN", "CLASS_LEADER"];

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getRoleBadgeInfo(role: string) {
    const adminRoles: Record<string, string> = {
        SECRETARIAT_CHAIRMAN: "⭐ Chairman",
        SECRETARIAT_VICE: "⭐ Vice Chairman",
        SECRETARIAT_SECRETARY: "⭐ Secretary",
        SERVICE_MANAGER: "⭐ Service Manager",
        SUPER_ADMIN: "⭐ Super Admin",
        TEACHER: "🎓 Teacher",
        CLASS_LEADER: "🏷 Class Leader",
        MEMBER: "✓ Member",
    };
    return adminRoles[role] || null;
}

export default function DashboardPage() {
    const { user, updateUser } = useAuthStore();
    const role = user?.system_role || user?.role || "USER";
    const displayName = user?.fullName?.split(" ")[0] || "Member";
    const isAdmin = ADMIN_ROLES.includes(role);
    const isMember = MEMBER_ROLES.includes(role);
    const isNewUser = !isMember;

    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loadingAnn, setLoadingAnn] = useState(true);
    const [showMembershipModal, setShowMembershipModal] = useState(false);

    useEffect(() => {
        // Load announcements via new API client
        apiClient.announcements.listAnnouncements({ limit: 3 })
            .then((res) => setAnnouncements(res.data?.items || []))
            .catch(() => setAnnouncements([]))
            .finally(() => setLoadingAnn(false));
    }, []);

    const handleMembershipSuccess = (result: { status: string; service_class_id?: string }) => {
        if (result.status === "MEMBER_UPGRADED") {
            updateUser({ role: "MEMBER", serviceClassID: result.service_class_id });
        }
    };

    const badgeLabel = getRoleBadgeInfo(role);

    return (
        <div className="max-w-5xl mx-auto space-y-6">

            {/* ── New User Banner ── */}
            {isNewUser && (
                <div className="rounded-2xl border-2 border-dashed border-[#C9A227]/40 dark:border-[#D4AF37]/30 bg-[#C9A227]/5 dark:bg-[#D4AF37]/5 p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C9A227]/15 flex items-center justify-center flex-shrink-0">
                        <Star className="h-5 w-5 text-[#C9A227] dark:text-[#D4AF37]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">Complete your membership application</p>
                        <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] mt-0.5 leading-relaxed">
                            You&apos;re registered but not yet a full member. Apply to unlock course access,
                            class assignments, and all fellowship features.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowMembershipModal(true)}
                        className="flex-shrink-0 px-4 h-9 rounded-xl bg-[#C9A227] dark:bg-[#D4AF37] text-[#7A1C1C] dark:text-[#0E0E0F] text-xs font-bold hover:bg-[#e0c040] transition-all duration-200"
                    >
                        Apply Now
                    </button>
                </div>
            )}
            {/* ── Announcements Feed ── */}
            <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-[#7A1C1C] dark:text-[#D4AF37]">Recent Announcements</h2>
                    <Link href="/dashboard/announcements" className="text-xs text-[#C9A227] dark:text-[#D4AF37] font-semibold hover:text-[#7A1C1C] dark:hover:text-[#F5F5F5] flex items-center gap-0.5 transition-colors">
                        View all <ChevronRight className="h-3 w-3" />
                    </Link>
                </div>

                <div className="space-y-3">
                    {loadingAnn && [1, 2].map((i) => (
                        <div key={i} className="bg-white dark:bg-[#1C1C1F] rounded-xl p-5 border border-[#ddd8d0] dark:border-[#2a2a2d] animate-pulse">
                            <div className="h-3 bg-[#EDE9E2] dark:bg-[#252529] rounded w-1/3 mb-2" />
                            <div className="h-4 bg-[#EDE9E2] dark:bg-[#252529] rounded mb-2" />
                            <div className="h-3 bg-[#EDE9E2] dark:bg-[#252529] rounded w-2/3" />
                        </div>
                    ))}
                    {!loadingAnn && announcements.length === 0 && (
                        <div className="bg-white dark:bg-[#1C1C1F] rounded-xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d] text-center">
                            <Bell className="h-8 w-8 text-[#ddd8d0] dark:text-[#2a2a2d] mx-auto mb-2" />
                            <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">No announcements yet</p>
                        </div>
                    )}
                    {announcements.map((a: any) => (
                        <div key={a.id} className="bg-white dark:bg-[#1C1C1F] rounded-xl p-5 shadow-sm border border-[#ddd8d0] dark:border-[#2a2a2d] hover:shadow-md transition-shadow" style={{ borderLeft: `3px solid ${a.is_public ? "#7A1C1C" : "#C9A227"}` }}>
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: a.is_public ? "#7A1C1C" : "#C9A227" }}>
                                    {a.is_public ? "PUBLIC" : "CLASS"}
                                </span>
                                <span className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0]">
                                    {a.published_at ? formatDate(a.published_at) : ""}
                                </span>
                            </div>
                            <h3 className="text-sm font-semibold text-[#7A1C1C] dark:text-[#F5F5F5] leading-snug">{a.title}</h3>
                            <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] mt-1 leading-relaxed line-clamp-2">{a.content}</p>
                        </div>
                    ))}
                </div>
            </div>


            {/* Apply for Membership Modal */}
            <ApplyMembershipModal
                open={showMembershipModal}
                onClose={() => setShowMembershipModal(false)}
                onSuccess={handleMembershipSuccess}
            />
        </div>
    );
}

