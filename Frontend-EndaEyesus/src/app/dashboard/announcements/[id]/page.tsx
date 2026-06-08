"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import apiClient from "@/api";
import { useAuthStore } from "@/store/authStore";
import { RichTextEditor } from "@/components/ui/RichTextEditor";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:8080";

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });
}

export default function AnnouncementDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuthStore();
    const [announcement, setAnnouncement] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!params.id) return;
        
        apiClient.announcements.listAnnouncements()
            .then((res) => {
                const data = res.data;
                const items = Array.isArray(data) ? data : (data as any)?.items || [];
                const found = items.find((a: any) => a.id === params.id);
                if (found) {
                    setAnnouncement(found);
                } else {
                    setError("Announcement not found");
                }
            })
            .catch(() => setError("Failed to load announcement"))
            .finally(() => setLoading(false));
    }, [params.id]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-[#EDE9E2] dark:bg-[#252529] rounded w-1/4" />
                    <div className="h-64 bg-[#EDE9E2] dark:bg-[#252529] rounded-xl" />
                </div>
            </div>
        );
    }

    if (error || !announcement) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <Link href="/dashboard/announcements" className="inline-flex items-center gap-2 text-sm text-[#7A1C1C] dark:text-[#D4AF37] hover:underline mb-4">
                    <ArrowLeft className="h-4 w-4" /> Back to Announcements
                </Link>
                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-8 border border-[#ddd8d0] dark:border-[#2a2a2d] text-center">
                    <p className="text-[#6b6b6b] dark:text-[#B0B0B0]">{error || "Announcement not found"}</p>
                </div>
            </div>
        );
    }

    const imageUrls = announcement.image_url ? (Array.isArray(announcement.image_url) ? announcement.image_url : JSON.parse(announcement.image_url || "[]")) : [];
    const videoUrls = announcement.video_url ? (Array.isArray(announcement.video_url) ? announcement.video_url : JSON.parse(announcement.video_url || "[]")) : [];
    const pdfUrls = announcement.pdf_url ? (Array.isArray(announcement.pdf_url) ? announcement.pdf_url : JSON.parse(announcement.pdf_url || "[]")) : [];

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Link href="/dashboard/announcements" className="inline-flex items-center gap-2 text-sm text-[#7A1C1C] dark:text-[#D4AF37] hover:underline">
                <ArrowLeft className="h-4 w-4" /> Back to Announcements
            </Link>

            <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-6 border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gradient-to-br from-[#7A1C1C] to-[#C9A227] dark:from-[#D4AF37] dark:to-[#1E4D3A]">
                        {announcement.author?.profileImageUrl ? (
                            <img src={announcement.author.profileImageUrl.startsWith("http") ? announcement.author.profileImageUrl : `${API_BASE}${announcement.author.profileImageUrl}`} alt={announcement.author.fullName} className="w-full h-full object-cover" />
                        ) : announcement.author?.fullName ? (
                            <span className="text-xl font-bold text-white">
                                {announcement.author.fullName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                            </span>
                        ) : (
                            <span className="text-xl font-bold text-white">?</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] mb-2">{announcement.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">
                            <div className="flex items-center gap-1.5">
                                <User className="h-4 w-4" />
                                <span>{announcement.author?.fullName || "Anonymous"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(announcement.published_at || new Date().toISOString())}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="prose dark:prose-invert max-w-none mb-6">
                    <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
                </div>

                {/* Media Attachments */}
                {(imageUrls.length > 0 || videoUrls.length > 0 || pdfUrls.length > 0) && (
                    <div className="space-y-6 pt-6 border-t border-[#ddd8d0] dark:border-[#2a2a2d]">
                        {imageUrls.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">Images</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {imageUrls.map((url: string, idx: number) => (
                                        <img
                                            key={idx}
                                            src={url.startsWith("http") ? url : `${API_BASE}${url}`}
                                            alt={`Attachment ${idx + 1}`}
                                            className="w-full h-64 object-cover rounded-lg"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {videoUrls.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">Videos</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {videoUrls.map((url: string, idx: number) => (
                                        <video
                                            key={idx}
                                            src={url.startsWith("http") ? url : `${API_BASE}${url}`}
                                            controls
                                            className="w-full h-64 rounded-lg"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {pdfUrls.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-[#7A1C1C] dark:text-[#D4AF37] mb-3">Documents</h3>
                                <div className="space-y-2">
                                    {pdfUrls.map((url: string, idx: number) => (
                                        <a
                                            key={idx}
                                            href={url.startsWith("http") ? url : `${API_BASE}${url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-[#F8F5F0] dark:bg-[#252529] rounded-lg hover:bg-[#EDE9E2] dark:hover:bg-[#2a2a2d] transition-colors"
                                        >
                                            <span className="text-2xl">📄</span>
                                            <span className="text-sm font-medium text-[#1a1a1a] dark:text-[#F5F5F5]">Document {idx + 1}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
