"use client";

import { Bell, Calendar, Plus, ArrowLeft, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import apiClient from "@/api";
import { useAuthStore } from "@/store/authStore";
import chairmanApiService from "@/lib/chairmanApi";
import { RichTextEditor } from "@/components/ui/RichTextEditor";

const TARGET_COLORS: Record<string, string> = {
    ALL: "#7A1C1C",
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
    const userRole = user?.system_role || user?.role || "USER";
    const canCreateAnn = ["SECRETARIAT_CHAIRMAN", "SECRETARIAT_VICE", "SECRETARIAT_SECRETARY", "SERVICE_MANAGER", "SUPER_ADMIN"].includes(userRole);
    const isChairman = userRole === "SECRETARIAT_CHAIRMAN" || userRole === "SUPER_ADMIN";
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Create announcement form
    const [showForm, setShowForm] = useState(false);
    const [formTitle, setFormTitle] = useState("");
    const [formContent, setFormContent] = useState("");
    const [formTarget, setFormTarget] = useState<"ALL" | "CLASS" | "LEADERS">("ALL");
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");

    // Edit announcement form
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editTarget, setEditTarget] = useState<"ALL" | "CLASS" | "LEADERS">("ALL");
    const [editSubmitting, setEditSubmitting] = useState(false);
    const [editError, setEditError] = useState("");

    const fetchAnnouncements = () => {
        apiClient.announcements.listAnnouncements()
            .then((res) => {
                const data = res.data;
                const items = Array.isArray(data) ? data : (data as any)?.items || [];
                setAnnouncements(items);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchAnnouncements();
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
                targetClassID: formTarget === "CLASS" ? (user?.classLeaderOf || user?.serviceClassID) : null,
                isPinned: false,
            };
            await apiClient.announcements.createAnnouncement(payload);
            fetchAnnouncements();
            setShowForm(false);
            setFormTitle(""); setFormContent(""); setFormTarget("ALL");
        } catch (err: any) {
            setFormError(err.response?.data?.message || "Failed to create announcement.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editTitle.trim() || !editContent.trim()) { setEditError("Title and content are required."); return; }
        setEditSubmitting(true);
        setEditError("");
        try {
            const payload: any = {
                title: editTitle,
                content: editContent,
                targetType: editTarget,
                targetClassID: editTarget === "CLASS" ? (user?.classLeaderOf || user?.serviceClassID) : null,
            };
            await chairmanApiService.updateAnnouncement(editingId!, payload);
            fetchAnnouncements();
            setEditingId(null);
            setEditTitle(""); setEditContent(""); setEditTarget("ALL");
        } catch (err: any) {
            setEditError(err.response?.data?.message || "Failed to update announcement.");
        } finally {
            setEditSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this announcement?")) return;
        try {
            await chairmanApiService.deleteAnnouncement(id);
            fetchAnnouncements();
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to delete announcement.");
        }
    };

    const startEdit = (announcement: any) => {
        setEditingId(announcement.id);
        setEditTitle(announcement.title);
        setEditContent(announcement.content);
        setEditTarget(announcement.is_public ? "ALL" : "CLASS");
        setEditError("");
    };

    if (user?.status === "PENDING") {
        return (
            <div className="max-w-3xl mx-auto space-y-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#7A1C1C] dark:bg-[#9B2323] flex items-center justify-center">
                            <Bell className="h-5 w-5 text-[#C9A227] dark:text-[#D4AF37]" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37]">Announcements</h1>
                            <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">
                                Updates and notifications
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d] text-center shadow-sm">
                    <div className="w-12 h-12 bg-[#7A1C1C]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Bell className="h-6 w-6 text-[#7A1C1C] dark:text-[#D4AF37]" />
                    </div>
                    <h2 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">Account Pending Approval</h2>
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
                    <div className="w-10 h-10 rounded-xl bg-[#7A1C1C] dark:bg-[#9B2323] flex items-center justify-center">
                        <Bell className="h-5 w-5 text-[#C9A227] dark:text-[#D4AF37]" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-[#7A1C1C] dark:text-[#D4AF37]">Announcements</h1>
                        <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">
                            {loading ? "Loading..." : `${announcements.length} announcements`}
                        </p>
                    </div>
                </div>
                {canCreateAnn && (
                    <button onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-[#7A1C1C] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F] hover:bg-[#C9A227] dark:hover:bg-[#e0c040] hover:text-[#7A1C1C] transition-all">
                        <Plus className="h-4 w-4" /> New
                    </button>
                )}
            </div>

            {/* Create form — SUPER_ADMIN only */}
            {showForm && (
                <form onSubmit={handleCreate} className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-5 border border-[#C9A227] dark:border-[#D4AF37] shadow-md space-y-3">
                    <h2 className="text-sm font-bold text-[#7A1C1C] dark:text-[#D4AF37]">Create Announcement</h2>
                    <div className="flex gap-2">
                        {(["ALL", "CLASS", "LEADERS"] as const).map((t) => (
                            <button key={t} type="button" onClick={() => setFormTarget(t)}
                                className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase border transition-all ${formTarget === t ? "bg-[#7A1C1C] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F] border-transparent" : "border-[#ddd8d0] dark:border-[#2a2a2d] text-[#6b6b6b] dark:text-[#B0B0B0]"}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                    <input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Title"
                        className="w-full h-10 rounded-xl border border-[#ddd8d0] dark:border-[#2a2a2d] bg-[#F8F5F0] dark:bg-[#252529] text-sm px-3 dark:text-[#F5F5F5]" />
                    <RichTextEditor content={formContent} onChange={setFormContent} placeholder="Content..." />
                    {formError && <p className="text-xs text-red-500">⚠ {formError}</p>}
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setShowForm(false)}
                            className="flex-1 py-2 rounded-xl border border-[#ddd8d0] dark:border-[#2a2a2d] text-sm text-[#6b6b6b] dark:text-[#B0B0B0] hover:bg-[#F8F5F0] dark:hover:bg-[#252529] transition-colors">Cancel</button>
                        <button type="submit" disabled={submitting}
                            className="flex-[2] py-2 rounded-xl bg-[#7A1C1C] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F] text-sm font-semibold hover:bg-[#C9A227] dark:hover:bg-[#e0c040] hover:text-[#7A1C1C] transition-all disabled:opacity-60">
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
                    const color = TARGET_COLORS[a.is_public ? "ALL" : "CLASS"] || "#7A1C1C";
                    const isEditing = editingId === a.id;
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
                                    {/* Chairman Edit/Delete Buttons */}
                                    {isChairman && !isEditing && (
                                        <div className="flex justify-end gap-2 mb-2">
                                            <button
                                                onClick={() => startEdit(a)}
                                                className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-[#F8F5F0] dark:bg-[#252529] text-[#7A1C1C] dark:text-[#D4AF37] hover:bg-[#7A1C1C]/10 dark:hover:bg-[#D4AF37]/10 transition-colors"
                                            >
                                                <Edit className="h-3 w-3" /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(a.id)}
                                                className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-[#7A1C1C]/10 dark:bg-[#8B2C2C]/10 text-[#7A1C1C] dark:text-[#8B2C2C] hover:bg-[#7A1C1C]/20 dark:hover:bg-[#8B2C2C]/20 transition-colors"
                                            >
                                                <Trash2 className="h-3 w-3" /> Delete
                                            </button>
                                        </div>
                                    )}

                                    {/* Edit Form */}
                                    {isEditing && (
                                        <form onSubmit={handleEdit} className="mb-4 space-y-3">
                                            <div className="flex gap-2">
                                                {(["ALL", "CLASS", "LEADERS"] as const).map((t) => (
                                                    <button key={t} type="button" onClick={() => setEditTarget(t)}
                                                        className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase border transition-all ${editTarget === t ? "bg-[#7A1C1C] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F] border-transparent" : "border-[#ddd8d0] dark:border-[#2a2a2d] text-[#6b6b6b] dark:text-[#B0B0B0]"}`}>
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                            <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Title"
                                                className="w-full h-10 rounded-xl border border-[#ddd8d0] dark:border-[#2a2a2d] bg-[#F8F5F0] dark:bg-[#252529] text-sm px-3 dark:text-[#F5F5F5]" />
                                            <RichTextEditor content={editContent} onChange={setEditContent} placeholder="Content..." />
                                            {editError && <p className="text-xs text-red-500">⚠ {editError}</p>}
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => setEditingId(null)}
                                                    className="flex-1 py-2 rounded-xl border border-[#ddd8d0] dark:border-[#2a2a2d] text-sm text-[#6b6b6b] dark:text-[#B0B0B0] hover:bg-[#F8F5F0] dark:hover:bg-[#252529] transition-colors">Cancel</button>
                                                <button type="submit" disabled={editSubmitting}
                                                    className="flex-[2] py-2 rounded-xl bg-[#7A1C1C] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F] text-sm font-semibold hover:bg-[#C9A227] dark:hover:bg-[#e0c040] hover:text-[#7A1C1C] transition-all disabled:opacity-60">
                                                    {editSubmitting ? "Updating..." : "Update Announcement"}
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {!isEditing && (
                                        <>
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>
                                                    {a.is_public ? "PUBLIC" : "CLASS"}
                                                </span>
                                                <span className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0]">{formatDate(a.published_at || new Date().toISOString())}</span>
                                                {a.author && (
                                                    <span className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0]">· by {a.author.full_name_three_parts}</span>
                                                )}
                                            </div>
                                            <h2 className="text-sm font-bold text-[#7A1C1C] dark:text-[#F5F5F5] leading-snug mb-2">{a.title}</h2>
                                            <div 
                                                className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{ __html: a.content }}
                                            />
                                            
                                            {/* Interactions */}
                                            <div className="mt-4 flex items-center gap-3 border-t border-[#ddd8d0] dark:border-[#2a2a2d] pt-3">
                                                <button
                                                    onClick={async () => {
                                                        await apiClient.announcements.reactToAnnouncement(a.id, { type: "LIKE" });
                                                        fetchAnnouncements();
                                                    }}
                                                    className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F8F5F0] dark:bg-[#252529] hover:bg-[#7A1C1C]/10 dark:hover:bg-[#D4AF37]/10 transition-all"
                                                >
                                                    <span className="text-lg group-hover:scale-110 transition-transform">👍</span>
                                                    <span className="text-xs font-bold text-[#7A1C1C] dark:text-[#D4AF37]">{a.reaction_counts?.likes || 0}</span>
                                                </button>
                                                <button
                                                    onClick={async () => {
                                                        await apiClient.announcements.reactToAnnouncement(a.id, { type: "STAR" });
                                                        fetchAnnouncements();
                                                    }}
                                                    className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F8F5F0] dark:bg-[#252529] hover:bg-[#C9A227]/10 dark:hover:bg-[#D4AF37]/10 transition-all"
                                                >
                                                    <span className="text-lg group-hover:scale-110 transition-transform">⭐</span>
                                                    <span className="text-xs font-bold text-[#C9A227] dark:text-[#D4AF37]">{a.reaction_counts?.stars || 0}</span>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const comment = window.prompt("Enter your comment:");
                                                        if (comment) {
                                                            apiClient.announcements.commentOnAnnouncement(a.id, { content: comment })
                                                                .then(() => fetchAnnouncements());
                                                        }
                                                    }}
                                                    className="group ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7A1C1C]/10 dark:bg-[#D4AF37]/10 hover:bg-[#7A1C1C] dark:hover:bg-[#D4AF37] transition-all"
                                                >
                                                    <span className="text-lg group-hover:scale-110 transition-transform">💬</span>
                                                    <span className="text-xs font-bold text-[#7A1C1C] dark:text-[#D4AF37]">Comment</span>
                                                </button>
                                            </div>

                                            {/* Comments Section */}
                                            {a.comments && a.comments.length > 0 && (
                                                <div className="mt-4 pt-4 border-t border-[#ddd8d0] dark:border-[#2a2a2d]">
                                                    <h4 className="text-xs font-semibold text-[#6b6b6b] dark:text-[#B0B0B0] mb-3">Comments ({a.comments.length})</h4>
                                                    <div className="space-y-3">
                                                        {a.comments.map((comment: any) => (
                                                            <div key={comment.id} className="flex gap-2">
                                                                <div className="w-6 h-6 rounded-full bg-[#7A1C1C]/10 flex items-center justify-center flex-shrink-0">
                                                                    <span className="text-[10px] font-bold text-[#7A1C1C] dark:text-[#D4AF37]">
                                                                        {comment.author?.fullName?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "??"}
                                                                    </span>
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[10px] font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">
                                                                            {comment.author?.fullName || "Anonymous"}
                                                                        </span>
                                                                        <span className="text-[9px] text-[#6b6b6b] dark:text-[#B0B0B0]">
                                                                            {new Date(comment.created_at).toLocaleDateString()}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-[11px] text-[#6b6b6b] dark:text-[#B0B0B0] mt-0.5">{comment.content}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
