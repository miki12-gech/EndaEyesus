"use client";

import { Bell, BookOpen, Users, Calendar, ChevronRight, Sparkles, FileText } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Announcement } from "@/lib/types";

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function DashboardPage() {
    const user = useAuthStore((s) => s.user);
    const displayName = user?.fullName?.split(" ")[0] || "Member";

    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [stats, setStats] = useState({ totalUsers: 0, pendingApprovals: 0, classes: 0, announcements: 0 });
    const [loadingAnn, setLoadingAnn] = useState(true);

    useEffect(() => {
        // Load announcements for all users
        api.get<{ data: Announcement[] }>("/announcements")
            .then((res) => setAnnouncements(res.data.data.slice(0, 3)))
            .catch(() => { })
            .finally(() => setLoadingAnn(false));

        // Load stats (SUPER_ADMIN gets real stats; others get simplified view)
        if (user?.role === "SUPER_ADMIN") {
            api.get<{ data: any }>("/admin/dashboard-stats")
                .then((res) => {
                    const d = res.data.data;
                    setStats({
                        totalUsers: d.totalUsers ?? 0,
                        pendingApprovals: d.byStatus?.find((s: any) => s.status === "PENDING")?._count?.id ?? 0,
                        classes: 13,
                        announcements: announcements.length,
                    });
                }).catch(() => { });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.role]);

    const statCards = user?.role === "SUPER_ADMIN"
        ? [
            { label: "Total Members", value: stats.totalUsers.toString(), icon: Users, color: "#0F3D2E" },
            { label: "Service Classes", value: "13", icon: BookOpen, color: "#C9A227" },
            { label: "Pending Approvals", value: stats.pendingApprovals.toString(), icon: Bell, color: "#7A1C1C" },
            { label: "Announcements", value: announcements.length.toString(), icon: Calendar, color: "#0F3D2E" },
        ]
        : [
            { label: "Service Classes", value: "13", icon: BookOpen, color: "#C9A227" },
            { label: "My Class", value: user?.serviceClassName || "—", icon: Users, color: "#0F3D2E" },
            { label: "Posts", value: "Feed", icon: FileText, color: "#0F3D2E" },
            { label: "Announcements", value: announcements.length.toString(), icon: Bell, color: "#7A1C1C" },
        ];

    const catColors: Record<string, string> = {
        SERVICE: "#0F3D2E", CHOIR: "#C9A227", EDUCATION: "#7A1C1C",
        ALL: "#0F3D2E", CLASS: "#C9A227", LEADERS: "#7A1C1C",
    };

    if (user?.status === "PENDING") {
        return (
            <div className="max-w-3xl mx-auto mt-12 text-center p-8 bg-white dark:bg-[#1C1C1F] rounded-2xl border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm">
                <div className="w-16 h-16 bg-[#C9A227]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-[#C9A227]" />
                </div>
                <h1 className="text-2xl font-bold text-[#0F3D2E] dark:text-[#D4AF37] mb-2">Registration Successful!</h1>
                <p className="text-[#6b6b6b] dark:text-[#B0B0B0] mb-6">
                    Welcome to the Enda Eyesus MU Fellowship portal, {displayName}. Your account is currently pending approval by the administrators. You will be able to access the full dashboard once your account is activated.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F8F5F0] dark:bg-[#252529] rounded-xl text-sm font-medium text-[#1a1a1a] dark:text-[#F5F5F5] border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse" />
                    Status: Pending Approval
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Welcome banner */}
            <div className="rounded-2xl p-6 flex items-center gap-5" style={{ background: "linear-gradient(135deg, #0F3D2E 0%, #1a5c44 100%)", borderLeft: "4px solid #C9A227" }}>
                <div className="w-14 h-14 rounded-full border-2 border-[#C9A227]/60 overflow-hidden flex-shrink-0">
                    {user?.profileImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`http://localhost:8080${user.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-[#C9A227]/20 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <rect x="10.5" y="1" width="3" height="22" rx="1" fill="#C9A227" />
                                <rect x="2" y="7" width="20" height="3" rx="1" fill="#C9A227" />
                            </svg>
                        </div>
                    )}
                </div>
                <div>
                    <h1 className="text-white font-bold text-xl leading-tight flex items-center gap-2">
                        Welcome back, {displayName} <Sparkles className="h-5 w-5 text-[#C9A227]" />
                    </h1>
                    <p className="text-white/60 text-sm mt-0.5">
                        {user?.serviceClassName || "Fellowship Member"} · Enda Eyesus MU Fellowship
                    </p>
                    {user?.role === "SUPER_ADMIN" && (
                        <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#C9A227]/20 text-[#C9A227] border border-[#C9A227]/30">
                            ⭐ Super Admin
                        </span>
                    )}
                    {user?.role === "CLASS_LEADER" && (
                        <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/20">
                            🏷 Class Leader
                        </span>
                    )}
                </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-white dark:bg-[#1C1C1F] rounded-xl p-4 shadow-sm border border-[#ddd8d0] dark:border-[#2a2a2d] flex items-center gap-4" style={{ borderLeft: `3px solid ${color}` }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
                            <Icon className="h-5 w-5" style={{ color }} />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-[#1a1a1a] dark:text-[#F5F5F5]">{value}</p>
                            <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] font-medium">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Announcements feed */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-[#0F3D2E] dark:text-[#D4AF37]">Recent Announcements</h2>
                        <Link href="/dashboard/announcements" className="text-xs text-[#C9A227] dark:text-[#D4AF37] font-semibold hover:text-[#0F3D2E] dark:hover:text-[#F5F5F5] flex items-center gap-0.5 transition-colors">
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
                                <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">No announcements yet</p>
                            </div>
                        )}
                        {announcements.map((a) => {
                            const color = catColors[a.targetType] || "#0F3D2E";
                            return (
                                <div key={a.id} className="bg-white dark:bg-[#1C1C1F] rounded-xl p-5 shadow-sm border border-[#ddd8d0] dark:border-[#2a2a2d] hover:shadow-md transition-shadow" style={{ borderLeft: `3px solid ${color}` }}>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>{a.targetType}</span>
                                        <span className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0]">{formatDate(a.createdAt)}</span>
                                    </div>
                                    <h3 className="text-sm font-semibold text-[#0F3D2E] dark:text-[#F5F5F5] leading-snug">{a.title}</h3>
                                    <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] mt-1 leading-relaxed line-clamp-2">{a.content}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="space-y-4">
                    <div className="bg-white dark:bg-[#1C1C1F] rounded-xl p-5 shadow-sm border border-[#ddd8d0] dark:border-[#2a2a2d]" style={{ borderTop: "3px solid #C9A227" }}>
                        <h2 className="text-sm font-semibold text-[#0F3D2E] dark:text-[#D4AF37] mb-3">My Service Class</h2>
                        <div className="flex items-center gap-3 bg-[#F8F5F0] dark:bg-[#252529] rounded-xl p-3">
                            <div className="w-10 h-10 rounded-xl bg-[#C9A227]/15 flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-[#C9A227] dark:text-[#D4AF37]" />
                            </div>
                            <p className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">{user?.serviceClassName || "Not assigned"}</p>
                        </div>
                        <Link href="/dashboard/my-class" className="mt-3 text-xs text-[#0F3D2E] dark:text-[#D4AF37] font-semibold hover:text-[#C9A227] flex items-center gap-0.5 transition-colors">
                            View class details <ChevronRight className="h-3 w-3" />
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-[#1C1C1F] rounded-xl p-5 shadow-sm border border-[#ddd8d0] dark:border-[#2a2a2d]" style={{ borderTop: "3px solid #0F3D2E" }}>
                        <h2 className="text-sm font-semibold text-[#0F3D2E] dark:text-[#D4AF37] mb-3">Quick Links</h2>
                        <div className="space-y-2">
                            <Link href="/dashboard/posts" className="flex items-center gap-2 text-sm text-[#6b6b6b] dark:text-[#B0B0B0] hover:text-[#0F3D2E] dark:hover:text-[#D4AF37] transition-colors">
                                <FileText className="h-4 w-4" /> Posts Feed
                            </Link>
                            <Link href="/dashboard/announcements" className="flex items-center gap-2 text-sm text-[#6b6b6b] dark:text-[#B0B0B0] hover:text-[#0F3D2E] dark:hover:text-[#D4AF37] transition-colors">
                                <Bell className="h-4 w-4" /> Announcements
                            </Link>
                            {user?.role === "SUPER_ADMIN" && (
                                <Link href="/dashboard/agent" className="flex items-center gap-2 text-sm text-[#C9A227] dark:text-[#D4AF37] hover:text-[#0F3D2E] dark:hover:text-[#F5F5F5] font-semibold transition-colors">
                                    ⭐ Admin Panel
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
