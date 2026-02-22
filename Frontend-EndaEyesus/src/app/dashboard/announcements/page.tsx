"use client";

import { Bell, Calendar, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Announcement } from "@/lib/types";
import { useAuthStore } from "@/store/authStore";

const TARGET_COLORS: Record<string, string> = {
    ALL: "#0F3D2E",
    CLASS: "#C9A227",
    LEADERS: "#7A1C1C",
};

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });
}

export default function AnnouncementsPage() {
    const { user } = useAuthStore();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    // Create announcement form (SUPER_ADMIN only)
    const [showForm, setShowForm] = useState(false);
    const [formTitle, setFormTitle] = useState("");
    const [formContent, setFormContent] = useState("");
    const [formTarget, setFormTarget] = useState<"ALL" | "CLASS" | "LEADERS">("ALL");
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        api.get<{ data: Announcement[] }>("/announcements")
            .then((res) => setAnnouncements(res.data.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formTitle.trim() || !formContent.trim()) { setFormError("Title and content are required."); return; }
        setSubmitting(true);
        setFormError("");
        try {
            const payload: any = {
                title: formTitle,
                content: formContent,
                targetType: formTarget,
            };
            if (formTarget === "CLASS") {
                payload.targetClassID = user?.classLeaderOf || user?.serviceClassID;
            }
            const res = await api.post<{ data: Announcement }>("/announcements", payload);
            setAnnouncements((prev) => [res.data.data, ...prev]);
            setShowForm(false);
            setFormTitle(""); setFormContent(""); setFormTarget("ALL");
        } catch (err: any) {
            setFormError(err.response?.data?.message || "Failed to create announcement.");
        } finally {
            setSubmitting(false);
        }
    };

    if (user?.status === "PENDING") {
        return (
            <div className="max-w-3xl mx-auto space-y-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0F3D2E] dark:bg-[#1E4D3A] flex items-center justify-center">
                            <Bell className="h-5 w-5 text-[#C9A227] dark:text-[#D4AF37]" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-[#0F3D2E] dark:text-[#D4AF37]">Announcements</h1>
                            <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">
                                Updates and notifications
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d] text-center shadow-sm">
                    <div className="w-12 h-12 bg-[#0F3D2E]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Bell className="h-6 w-6 text-[#0F3D2E] dark:text-[#D4AF37]" />
                    </div>
                    <h2 className="text-lg font-bold text-[#0F3D2E] dark:text-[#D4AF37] mb-2">Account Pending Approval</h2>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">
                        You will be able to view fellowship announcements once an administrator approves your account.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0F3D2E] dark:bg-[#1E4D3A] flex items-center justify-center">
                        <Bell className="h-5 w-5 text-[#C9A227] dark:text-[#D4AF37]" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-[#0F3D2E] dark:text-[#D4AF37]">Announcements</h1>
                        <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">
                            {loading ? "Loading..." : `${announcements.length} announcements`}
                        </p>
                    </div>
                </div>
                {user?.role === "SUPER_ADMIN" && (
                    <button onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-[#0F3D2E] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F] hover:bg-[#C9A227] dark:hover:bg-[#e0c040] hover:text-[#0F3D2E] transition-all">
                        <Plus className="h-4 w-4" /> New
                    </button>
                )}
            </div>

            {/* Create form — SUPER_ADMIN only */}
            {showForm && (
                <form onSubmit={handleCreate} className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-5 border border-[#C9A227] dark:border-[#D4AF37] shadow-md space-y-3">
                    <h2 className="text-sm font-bold text-[#0F3D2E] dark:text-[#D4AF37]">Create Announcement</h2>
                    <div className="flex gap-2">
                        {(["ALL", "CLASS", "LEADERS"] as const).map((t) => (
                            <button key={t} type="button" onClick={() => setFormTarget(t)}
                                className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase border transition-all ${formTarget === t ? "bg-[#0F3D2E] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F] border-transparent" : "border-[#ddd8d0] dark:border-[#2a2a2d] text-[#6b6b6b] dark:text-[#B0B0B0]"}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                    <input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Title"
                        className="w-full h-10 rounded-xl border border-[#ddd8d0] dark:border-[#2a2a2d] bg-[#F8F5F0] dark:bg-[#252529] text-sm px-3 dark:text-[#F5F5F5]" />
                    <textarea value={formContent} onChange={(e) => setFormContent(e.target.value)} placeholder="Content..." rows={3}
                        className="w-full rounded-xl border border-[#ddd8d0] dark:border-[#2a2a2d] bg-[#F8F5F0] dark:bg-[#252529] text-sm px-3 py-2 dark:text-[#F5F5F5] resize-none" />
                    {formError && <p className="text-xs text-red-500">⚠ {formError}</p>}
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setShowForm(false)}
                            className="flex-1 py-2 rounded-xl border border-[#ddd8d0] dark:border-[#2a2a2d] text-sm text-[#6b6b6b] dark:text-[#B0B0B0] hover:bg-[#F8F5F0] dark:hover:bg-[#252529] transition-colors">Cancel</button>
                        <button type="submit" disabled={submitting}
                            className="flex-[2] py-2 rounded-xl bg-[#0F3D2E] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F] text-sm font-semibold hover:bg-[#C9A227] dark:hover:bg-[#e0c040] hover:text-[#0F3D2E] transition-all disabled:opacity-60">
                            {submitting ? "Posting..." : "Post Announcement"}
                        </button>
                    </div>
                </form>
            )}

            {/* Loading skeleton */}
            {loading && (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white dark:bg-[#1C1C1F] rounded-xl p-5 border border-[#ddd8d0] dark:border-[#2a2a2d] animate-pulse">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#EDE9E2] dark:bg-[#252529] flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-[#EDE9E2] dark:bg-[#252529] rounded w-1/4" />
                                    <div className="h-4 bg-[#EDE9E2] dark:bg-[#252529] rounded w-2/3" />
                                    <div className="h-3 bg-[#EDE9E2] dark:bg-[#252529] rounded" />
                                    <div className="h-3 bg-[#EDE9E2] dark:bg-[#252529] rounded w-3/4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty state */}
            {!loading && announcements.length === 0 && (
                <div className="text-center py-16 bg-white dark:bg-[#1C1C1F] rounded-2xl border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <Bell className="h-10 w-10 text-[#C9A227]/30 dark:text-[#D4AF37]/30 mx-auto mb-3" />
                    <p className="text-sm font-medium text-[#6b6b6b] dark:text-[#B0B0B0]">No announcements yet</p>
                    <p className="text-xs text-[#6b6b6b]/60 dark:text-[#B0B0B0]/60 mt-1">Check back later</p>
                </div>
            )}

            {/* Announcement list */}
            <div className="space-y-4">
                {announcements.map((a) => {
                    const color = TARGET_COLORS[a.targetType] || "#0F3D2E";
                    return (
                        <article key={a.id}
                            className="bg-white dark:bg-[#1C1C1F] rounded-xl p-5 border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm hover:shadow-md transition-shadow"
                            style={{ borderLeft: `4px solid ${color}` }}>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{ backgroundColor: `${color}15` }}>
                                    <Calendar className="h-5 w-5" style={{ color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>
                                            {a.targetType}
                                        </span>
                                        <span className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0]">{formatDate(a.createdAt)}</span>
                                        {a.author && (
                                            <span className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0]">· by {a.author.fullName}</span>
                                        )}
                                        {a.isPinned && (
                                            <span className="text-[10px] font-bold text-[#C9A227] dark:text-[#D4AF37]">📌 Pinned</span>
                                        )}
                                    </div>
                                    <h2 className="text-sm font-bold text-[#0F3D2E] dark:text-[#F5F5F5] leading-snug mb-2">{a.title}</h2>
                                    <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed">{a.content}</p>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
