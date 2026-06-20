"use client";

import { Bell, Plus, Edit, Trash2, MoreVertical, CheckCircle, XCircle, Share2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef, useCallback, memo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import apiClient from "@/api";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import chairmanApiService from "@/lib/chairmanApi";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:8080";

const TARGET_COLORS: Record<string, string> = {
    ALL: "#7A1C1C",
    CLASS: "#C9A227",
};

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });
}

// Utility to get embed URL from various platforms
function getEmbedUrl(url: string): string | null {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const ttMatch = url.match(/tiktok\.com\/@[\w.]+\/video\/(\d+)/);
    if (ttMatch) return `https://www.tiktok.com/embed/v2/${ttMatch[1]}`;
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    const gdMatch = url.match(/drive\.google\.com\/file\/d\/([^\/]+)/);
    if (gdMatch) return `https://drive.google.com/file/d/${gdMatch[1]}/preview`;
    return null;
}

function getPlatformInfo(url: string): { icon: string; label: string } {
    if (!url) return { icon: '🔗', label: 'Link' };
    if (url.includes('youtube.com') || url.includes('youtu.be')) return { icon: '▶️', label: 'YouTube' };
    if (url.includes('tiktok.com')) return { icon: '🎵', label: 'TikTok' };
    if (url.includes('vimeo.com')) return { icon: '🎬', label: 'Vimeo' };
    if (url.includes('drive.google.com')) return { icon: '📁', label: 'Google Drive' };
    if (url.includes('t.me')) return { icon: '📨', label: 'Telegram' };
    return { icon: '🔗', label: 'Link' };
}

// ===== LIGHTBOX / GALLERY =====
interface LightboxMedia {
    type: 'image' | 'video';
    url: string;
    originalUrl?: string;
    title?: string;
}

function Lightbox({
    isOpen,
    media,
    currentIndex,
    onClose,
    onPrev,
    onNext
}: {
    isOpen: boolean;
    media: LightboxMedia[];
    currentIndex: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}) {
    if (!isOpen || media.length === 0) return null;
    const item = media[currentIndex];
    const isImage = item.type === 'image';

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose, onPrev, onNext]);

    return (
        <div
            className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="relative max-w-[90vw] max-h-[90vh] bg-black/20 rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Media */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {isImage ? (
                        <img
                            src={item.url.startsWith('http') ? item.url : `${API_BASE}${item.url}`}
                            alt={item.title || 'Media'}
                            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                        />
                    ) : (
                        <iframe
                            src={item.url}
                            className="w-[90vw] h-[80vh] rounded-xl shadow-2xl"
                            allowFullScreen
                            title="Media"
                        />
                    )}
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                    <X className="h-6 w-6" />
                </button>

                {/* Navigation arrows (if >1) */}
                {media.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); onPrev(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onNext(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                        >
                            <ChevronRight className="h-8 w-8" />
                        </button>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {media.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-white' : 'bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="absolute bottom-6 right-6 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                            {currentIndex + 1} / {media.length}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// ===== TYPES =====
interface AnnouncementItemProps {
    announcement: any;
    isEditing: boolean;
    editTarget: "ALL" | "CLASS";
    setEditTarget: React.Dispatch<React.SetStateAction<"ALL" | "CLASS">>;
    editTitle: string;
    setEditTitle: React.Dispatch<React.SetStateAction<string>>;
    editContent: string;
    setEditContent: React.Dispatch<React.SetStateAction<string>>;
    editImageUrls: string[];
    setEditImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
    editVideoUrl: string;
    setEditVideoUrl: React.Dispatch<React.SetStateAction<string>>;
    editPdfUrls: string[];
    setEditPdfUrls: React.Dispatch<React.SetStateAction<string[]>>;
    editSubmitting: boolean;
    editError: string;
    handleEdit: (e: React.FormEvent) => Promise<void>;
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
    startEdit: (announcement: any) => void;
    handleDeleteAnnouncement: (id: string) => Promise<void>;
    handleApprove: (id: string) => Promise<void>;
    handleReact: (id: string, type: "LIKE" | "STAR") => Promise<void>;
    handleShare: (id: string) => Promise<void>;
    openLightbox: (items: LightboxMedia[], initialIndex: number) => void;
    isChairman: boolean;
    isSecretariat: boolean;
    isServiceManager: boolean;
    user: any;
    setRejectAnnouncementId: React.Dispatch<React.SetStateAction<string | null>>;
    setRejectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setDropdownOpen: React.Dispatch<React.SetStateAction<string | null>>;
    dropdownOpen: string | null;
    uploadFiles: (files: FileList, type: "image" | "pdf", setter: React.Dispatch<React.SetStateAction<string[]>>) => Promise<void>;
    API_BASE: string;
}

// ===== MEMOIZED COMPONENT =====
const AnnouncementItem = memo((props: AnnouncementItemProps) => {
    const {
        announcement,
        isEditing,
        editTarget,
        setEditTarget,
        editTitle,
        setEditTitle,
        editContent,
        setEditContent,
        editImageUrls,
        setEditImageUrls,
        editVideoUrl,
        setEditVideoUrl,
        editPdfUrls,
        setEditPdfUrls,
        editSubmitting,
        editError,
        handleEdit,
        setEditingId,
        startEdit,
        handleDeleteAnnouncement,
        handleApprove,
        handleReact,
        handleShare,
        openLightbox,
        isChairman,
        isSecretariat,
        isServiceManager,
        user,
        setRejectAnnouncementId,
        setRejectDialogOpen,
        setDropdownOpen,
        dropdownOpen,
        uploadFiles,
        API_BASE
    } = props;

    const color = TARGET_COLORS[announcement.is_public ? "ALL" : "CLASS"] || "#7A1C1C";
    const isPending = announcement.status === "PENDING";
    const canApprove = isSecretariat && isPending && announcement.is_public;
    const isAuthor = announcement.author_id === user?.id;
    const canEditAnnouncement = isChairman || isAuthor;
    const canDeleteAnnouncement = isChairman || isAuthor;
    const userLiked = announcement.reactions?.some((r: any) => r.user_id === user?.id && r.reaction_type === 'LIKE') || false;
    const userDisliked = announcement.reactions?.some((r: any) => r.user_id === user?.id && r.reaction_type === 'STAR') || false;

    const imageUrls = announcement.image_url ? (Array.isArray(announcement.image_url) ? announcement.image_url : JSON.parse(announcement.image_url || "[]")) : [];
    const videoUrl = announcement.video_url ? (Array.isArray(announcement.video_url) ? announcement.video_url[0] : JSON.parse(announcement.video_url || "[]")[0]) : null;
    const pdfUrls = announcement.pdf_url ? (Array.isArray(announcement.pdf_url) ? announcement.pdf_url : JSON.parse(announcement.pdf_url || "[]")) : [];

    const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;
    const platformInfo = videoUrl ? getPlatformInfo(videoUrl) : null;

    // Build media gallery items (images + video embed)
    const mediaItems: LightboxMedia[] = [];
    imageUrls.forEach((url: string) => {
        mediaItems.push({ type: 'image', url, title: announcement.title });
    });
    if (embedUrl) {
        mediaItems.push({ type: 'video', url: embedUrl, originalUrl: videoUrl, title: announcement.title });
    }

    const handleMediaClick = (index: number) => {
        if (mediaItems.length > 0) {
            openLightbox(mediaItems, index);
        }
    };

    return (
        <article
            key={announcement.id}
            id={`announcement-${announcement.id}`}
            className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-6 border shadow-md hover:shadow-lg transition-shadow duration-200 scroll-mt-24"
            style={{ borderLeft: `6px solid ${isPending ? "#F59E0B" : color}` }}
        >
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-linear-to-br from-[#7A1C1C] to-[#C9A227] dark:from-[#D4AF37] dark:to-[#1E4D3A] shadow-md">
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

                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-sm font-bold text-[#1a1a1a] dark:text-[#F5F5F5]">
                                {announcement.author?.fullName || "Anonymous"}
                            </span>
                            <span className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0]">
                                {formatDate(announcement.published_at || announcement.submitted_at || new Date().toISOString())}
                            </span>
                            {isPending && <span className="text-[10px] bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-semibold">Pending Approval</span>}
                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: color }}>
                                {announcement.is_public ? "PUBLIC" : "CLASS"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleShare(announcement.id)}
                                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                title="Share"
                            >
                                <Share2 className="h-4 w-4 text-gray-500" />
                            </button>
                            {(canEditAnnouncement || canDeleteAnnouncement) && !isEditing && (
                                <div className="relative">
                                    <button onClick={() => setDropdownOpen(dropdownOpen === announcement.id ? null : announcement.id)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                                        <MoreVertical className="h-5 w-5 text-gray-500" />
                                    </button>
                                    {dropdownOpen === announcement.id && (
                                        <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-[#1C1C1F] shadow-xl rounded-xl border border-[#ddd8d0] dark:border-[#2a2a2d] z-10 overflow-hidden">
                                            {canEditAnnouncement && (
                                                <button onClick={() => { startEdit(announcement); setDropdownOpen(null); }} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left hover:bg-[#F8F5F0] dark:hover:bg-[#252529] transition-colors">
                                                    <Edit className="h-4 w-4" /> Edit
                                                </button>
                                            )}
                                            {canDeleteAnnouncement && (
                                                <button onClick={() => { handleDeleteAnnouncement(announcement.id); setDropdownOpen(null); }} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                                    <Trash2 className="h-4 w-4" /> Delete
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleEdit} className="mb-4 space-y-3">
                            {!isChairman && (
                                <div className="flex gap-2">
                                    {(["ALL", "CLASS"] as const).map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setEditTarget(t)}
                                            className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase border transition-all ${editTarget === t
                                                    ? "bg-[#7A1C1C] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F] border-transparent"
                                                    : "border-[#ddd8d0] dark:border-[#2a2a2d] text-[#6b6b6b] dark:text-[#B0B0B0]"
                                                }`}
                                        >
                                            {t === "ALL" ? "Public" : "Class Only"}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Title"
                                className="w-full h-10 rounded-xl border p-2"
                            />
                            <RichTextEditor
                                content={editContent}
                                onChange={setEditContent}
                                placeholder="Content..."
                            />
                            <div className="space-y-2">
                                {/* Images */}
                                <div>
                                    <label className="text-sm font-semibold">Images:</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => e.target.files && uploadFiles(e.target.files, "image", setEditImageUrls)}
                                    />
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {editImageUrls.map((url: string, idx: number) => (
                                            <div key={idx} className="relative">
                                                <img
                                                    src={url.startsWith("http") ? url : `${API_BASE}${url}`}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setEditImageUrls((prev: string[]) => prev.filter((_: string, i: number) => i !== idx))}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Media Link */}
                                <div>
                                    <label className="text-sm font-semibold">Media Link (YouTube, TikTok, Vimeo, Google Drive, Telegram, etc.)</label>
                                    <input
                                        type="url"
                                        value={editVideoUrl}
                                        onChange={(e) => setEditVideoUrl(e.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="w-full h-10 rounded-xl border p-2 mt-1"
                                    />
                                    {editVideoUrl && getEmbedUrl(editVideoUrl) && (
                                        <div className="mt-2 rounded-xl overflow-hidden border shadow-sm">
                                            <iframe
                                                src={getEmbedUrl(editVideoUrl)!}
                                                className="w-full aspect-video"
                                                allowFullScreen
                                                title="Media preview"
                                            />
                                            <div className="p-2 bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 flex items-center gap-2">
                                                <span>{getPlatformInfo(editVideoUrl).icon}</span>
                                                <span>{getPlatformInfo(editVideoUrl).label}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* PDFs */}
                                <div>
                                    <label className="text-sm font-semibold">PDFs:</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        multiple
                                        onChange={(e) => e.target.files && uploadFiles(e.target.files, "pdf", setEditPdfUrls)}
                                    />
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {editPdfUrls.map((url: string, idx: number) => (
                                            <div key={idx} className="relative px-3 py-1 bg-gray-100 rounded">
                                                <a href={url.startsWith("http") ? url : `${API_BASE}${url}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">📄 PDF {idx + 1}</a>
                                                <button type="button" onClick={() => setEditPdfUrls((prev: string[]) => prev.filter((_: string, i: number) => i !== idx))} className="ml-2 text-red-500">×</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {editError && <p className="text-xs text-red-500">{editError}</p>}
                            <div className="flex gap-2">
                                <button type="button" onClick={() => setEditingId(null)} className="flex-1 py-2 rounded-xl border">Cancel</button>
                                <button type="submit" disabled={editSubmitting} className="flex-2 py-2 rounded-xl bg-[#7A1C1C] text-white">Update</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37] leading-tight mb-3">{announcement.title}</h2>
                            <div className="mb-4 space-y-3">
                                {/* Images gallery with "Show more" */}
                                {imageUrls.length > 0 && (
                                    <div className={`grid gap-3 ${imageUrls.length === 1 ? 'grid-cols-1' : imageUrls.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
                                        {imageUrls.slice(0, 3).map((url: string, idx: number) => {
                                            const isLastVisible = idx === 2 && imageUrls.length > 3;
                                            const clickIndex = isLastVisible ? 2 : idx; // if "+N", open at index 2
                                            return (
                                                <div
                                                    key={idx}
                                                    className="relative group overflow-hidden rounded-xl cursor-pointer"
                                                    onClick={() => handleMediaClick(clickIndex)}
                                                >
                                                    <img
                                                        src={url.startsWith("http") ? url : `${API_BASE}${url}`}
                                                        className="w-full h-56 md:h-64 lg:h-72 object-cover transition-transform hover:scale-105 duration-300"
                                                    />
                                                    {isLastVisible && (
                                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-colors group-hover:bg-black/70">
                                                            <span className="text-white text-2xl font-bold">+{imageUrls.length - 3}</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                                                            {isLastVisible ? 'View all' : 'Click to expand'}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                {/* Video embed */}
                                {videoUrl && embedUrl && (
                                    <div
                                        className="rounded-xl overflow-hidden border shadow-sm cursor-pointer group relative"
                                        onClick={() => {
                                            const videoIdx = imageUrls.length; // after images
                                            handleMediaClick(videoIdx);
                                        }}
                                    >
                                        <iframe
                                            src={embedUrl}
                                            className="w-full aspect-video pointer-events-none"
                                            allowFullScreen
                                            title="Media"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                                                Click to view fullscreen
                                            </span>
                                        </div>
                                        <div className="p-2 bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 flex items-center gap-2">
                                            <span>{platformInfo?.icon}</span>
                                            <span>{platformInfo?.label}</span>
                                            <a
                                                href={videoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline ml-auto"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                View original
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {/* PDFs */}
                                {pdfUrls.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {pdfUrls.map((url: string, idx: number) => (
                                            <a key={idx} href={url.startsWith("http") ? url : `${API_BASE}${url}`} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-[#7A1C1C] to-[#C9A227] text-white hover:from-[#C9A227] hover:to-[#7A1C1C] transition-all shadow-md hover:shadow-lg">
                                                <span className="text-lg">📄</span>
                                                <span className="text-xs font-semibold">PDF {idx + 1}</span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: announcement.content }} />

                            {canApprove && (
                                <div className="mt-4 flex gap-3">
                                    <button onClick={() => handleApprove(announcement.id)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg">
                                        <CheckCircle className="h-4 w-4" /> Approve
                                    </button>
                                    <button onClick={() => { setRejectAnnouncementId(announcement.id); setRejectDialogOpen(true); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg">
                                        <XCircle className="h-4 w-4" /> Reject
                                    </button>
                                </div>
                            )}

                            <div className="mt-5 flex items-center gap-4 border-t border-[#ddd8d0] dark:border-[#2a2a2d] pt-4">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleReact(announcement.id, "LIKE");
                                    }}
                                    className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${userLiked
                                            ? "bg-blue-500 text-white shadow-md scale-105"
                                            : "bg-[#F8F5F0] dark:bg-[#252529] text-[#6b6b6b] dark:text-[#B0B0B0] hover:bg-blue-100 dark:hover:bg-blue-900/30"
                                        }`}
                                >
                                    <span className="text-lg transition-transform group-hover:scale-110">👍</span>
                                    <span className="text-xs font-bold">{announcement.reaction_counts?.likes || 0}</span>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleReact(announcement.id, "STAR");
                                    }}
                                    className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${userDisliked
                                            ? "bg-red-500 text-white shadow-md scale-105"
                                            : "bg-[#F8F5F0] dark:bg-[#252529] text-[#6b6b6b] dark:text-[#B0B0B0] hover:bg-red-100 dark:hover:bg-red-900/30"
                                        }`}
                                >
                                    <span className="text-lg transition-transform group-hover:scale-110">👎</span>
                                    <span className="text-xs font-bold">{announcement.reaction_counts?.stars || 0}</span>
                                </button>
                                <button
                                    onClick={() => handleShare(announcement.id)}
                                    className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8F5F0] dark:bg-[#252529] hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                                >
                                    <Share2 className="h-4 w-4" />
                                    <span className="text-xs font-medium">Share</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </article>
    );
});
AnnouncementItem.displayName = 'AnnouncementItem';

// ===== CONTENT COMPONENT (uses useSearchParams) =====
function AnnouncementsContent() {
    const searchParams = useSearchParams();
    const highlightId = searchParams.get("announcementId");

    const { user } = useAuthStore();
    const userRole = user?.system_role || user?.role || "USER";
    const isSecretariat = ["SECRETARIAT_CHAIRMAN", "SECRETARIAT_VICE", "SECRETARIAT_SECRETARY", "SUPER_ADMIN"].includes(userRole);
    const isServiceManager = userRole === "SERVICE_MANAGER";
    const canCreateAnn = isSecretariat || isServiceManager;
    const isChairman = userRole === "SECRETARIAT_CHAIRMAN" || userRole === "SUPER_ADMIN";

    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Lightbox state
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxMedia, setLightboxMedia] = useState<LightboxMedia[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [rejectAnnouncementId, setRejectAnnouncementId] = useState<string | null>(null);
    const [rejectReason, setRejectReason] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [formTitle, setFormTitle] = useState("");
    const [formContent, setFormContent] = useState("");
    const [formTarget, setFormTarget] = useState<"ALL" | "CLASS">("ALL");
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [formImageUrls, setFormImageUrls] = useState<string[]>([]);
    const [formVideoUrl, setFormVideoUrl] = useState<string>("");
    const [formPdfUrls, setFormPdfUrls] = useState<string[]>([]);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editTarget, setEditTarget] = useState<"ALL" | "CLASS">("ALL");
    const [editImageUrls, setEditImageUrls] = useState<string[]>([]);
    const [editVideoUrl, setEditVideoUrl] = useState<string>("");
    const [editPdfUrls, setEditPdfUrls] = useState<string[]>([]);
    const [editSubmitting, setEditSubmitting] = useState(false);
    const [editError, setEditError] = useState("");

    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const announcementRefs = useRef<Record<string, HTMLElement | null>>({});

    // Lightbox controls
    const openLightbox = (media: LightboxMedia[], index: number) => {
        setLightboxMedia(media);
        setLightboxIndex(index);
        setLightboxOpen(true);
    };
    const closeLightbox = () => {
        setLightboxOpen(false);
        setLightboxMedia([]);
        setLightboxIndex(0);
    };
    const goPrev = () => {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxMedia.length - 1));
    };
    const goNext = () => {
        setLightboxIndex((prev) => (prev < lightboxMedia.length - 1 ? prev + 1 : 0));
    };

    const handleShare = async (announcementId: string) => {
        const announcement = announcements.find((a: any) => a.id === announcementId);
        if (!announcement) return;
        const shareUrl = `${window.location.origin}/dashboard/announcements?announcementId=${announcementId}`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: announcement.title,
                    text: announcement.content?.replace(/<[^>]*>/g, '') || '',
                    url: shareUrl,
                });
            } catch (e) {
                if ((e as Error).name !== 'AbortError') {
                    console.error('Share failed', e);
                    await navigator.clipboard.writeText(shareUrl);
                    alert('Link copied to clipboard!');
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl);
                alert('Link copied to clipboard!');
            } catch (e) {
                const input = document.createElement('input');
                input.value = shareUrl;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
                alert('Link copied to clipboard!');
            }
        }
    };

    const fetchAnnouncements = useCallback(async () => {
        setLoading(true);
        try {
            const res = await apiClient.announcements.listAnnouncements();
            const data = res.data;
            const items = Array.isArray(data) ? data : (data as any)?.items || [];
            setAnnouncements(items);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAnnouncements();
        const interval = setInterval(fetchAnnouncements, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, [fetchAnnouncements]);

    useEffect(() => {
        if (!loading && highlightId && announcements.length > 0) {
            const found = announcements.find((a: any) => a.id === highlightId);
            if (found) {
                setTimeout(() => {
                    const el = announcementRefs.current[highlightId];
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                        el.classList.add("ring-2", "ring-[#C9A227]", "shadow-lg", "transition-all", "duration-300");
                        setTimeout(() => {
                            el.classList.remove("ring-2", "ring-[#C9A227]", "shadow-lg");
                        }, 3000);
                    }
                }, 200);
            }
        }
    }, [loading, announcements, highlightId]);

    const handleApprove = async (id: string) => {
        try {
            await api.patch(`/announcements/${id}/approve`);
            await fetchAnnouncements();
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to approve announcement");
        }
    };

    const handleReject = async () => {
        if (!rejectAnnouncementId || !rejectReason.trim()) {
            alert("Please provide a rejection reason");
            return;
        }
        try {
            await api.patch(`/announcements/${rejectAnnouncementId}/reject`, { reason: rejectReason });
            setRejectDialogOpen(false);
            setRejectAnnouncementId(null);
            setRejectReason("");
            await fetchAnnouncements();
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to reject announcement");
        }
    };

    const updateReactionLocally = useCallback(
        (announcementId: string, reactionType: "LIKE" | "STAR") => {
            setAnnouncements((prev: any[]) =>
                prev.map((ann: any) => {
                    if (ann.id !== announcementId) return ann;
                    const reactions = ann.reactions || [];
                    const existingIndex = reactions.findIndex((r: any) => r.user_id === user?.id);
                    let newReactions = [...reactions];
                    let countDelta = 0;
                    const reactionKey = reactionType === "LIKE" ? "likes" : "stars";

                    if (existingIndex !== -1) {
                        const existingType = newReactions[existingIndex].reaction_type;
                        if (existingType === reactionType) {
                            newReactions.splice(existingIndex, 1);
                            countDelta = -1;
                        } else {
                            newReactions[existingIndex] = { user_id: user?.id, reaction_type: reactionType };
                            const oldKey = existingType === "LIKE" ? "likes" : "stars";
                            const newKey = reactionType === "LIKE" ? "likes" : "stars";
                            const currentOld = ann.reaction_counts?.[oldKey] || 0;
                            const currentNew = ann.reaction_counts?.[newKey] || 0;
                            return {
                                ...ann,
                                reactions: newReactions,
                                reaction_counts: {
                                    ...ann.reaction_counts,
                                    [oldKey]: Math.max(0, currentOld - 1),
                                    [newKey]: currentNew + 1,
                                },
                            };
                        }
                    } else {
                        newReactions.push({ user_id: user?.id, reaction_type: reactionType });
                        countDelta = 1;
                    }

                    const currentCount = ann.reaction_counts?.[reactionKey] || 0;
                    return {
                        ...ann,
                        reactions: newReactions,
                        reaction_counts: {
                            ...ann.reaction_counts,
                            [reactionKey]: Math.max(0, currentCount + countDelta),
                        },
                    };
                })
            );
        },
        [user?.id]
    );

    const handleReact = useCallback(
        async (announcementId: string, type: "LIKE" | "STAR") => {
            updateReactionLocally(announcementId, type);
            try {
                await apiClient.announcements.reactToAnnouncement(announcementId, { type });
            } catch (err: any) {
                await fetchAnnouncements();
                alert(err.response?.data?.message || "Failed to update reaction");
            }
        },
        [updateReactionLocally, fetchAnnouncements]
    );

    const handleEdit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (!editTitle.trim() || !editContent.trim()) {
                setEditError("Title and content are required.");
                return;
            }
            setEditSubmitting(true);
            setEditError("");
            try {
                const payload: any = {
                    title: editTitle,
                    content: editContent,
                    targetType: editTarget,
                    targetClassID: editTarget === "CLASS" ? (user?.classLeaderOf || user?.serviceClassID) : null,
                    imageUrl: editImageUrls.length > 0 ? editImageUrls : null,
                    videoUrl: editVideoUrl ? [editVideoUrl] : null,
                    pdfUrl: editPdfUrls.length > 0 ? editPdfUrls : null,
                };
                const response = await chairmanApiService.updateAnnouncement(editingId!, payload);
                const updatedAnnouncement = response.data || response;
                setAnnouncements((prev: any[]) =>
                    prev.map((a: any) => (a.id === editingId ? { ...a, ...updatedAnnouncement } : a))
                );
                fetchAnnouncements();
                setEditingId(null);
                setEditTitle("");
                setEditContent("");
                setEditTarget("ALL");
                setEditImageUrls([]);
                setEditVideoUrl("");
                setEditPdfUrls([]);
            } catch (err: any) {
                setEditError(err.response?.data?.message || "Failed to update announcement.");
            } finally {
                setEditSubmitting(false);
            }
        },
        [editTitle, editContent, editTarget, editImageUrls, editVideoUrl, editPdfUrls, editingId, user, fetchAnnouncements]
    );

    const handleDeleteAnnouncement = async (id: string) => {
        if (!confirm("Are you sure you want to delete this announcement?")) return;
        try {
            await chairmanApiService.deleteAnnouncement(id);
            await fetchAnnouncements();
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to delete announcement.");
        }
    };

    const startEdit = (announcement: any) => {
        setEditingId(announcement.id);
        setEditTitle(announcement.title);
        setEditContent(announcement.content);
        setEditTarget(
            isChairman
                ? "ALL"
                : announcement.is_public
                    ? "ALL"
                    : "CLASS"
        );
        const parseMedia = (field: any) => {
            if (!field) return [];
            if (Array.isArray(field)) return field;
            try { return JSON.parse(field); } catch { return []; }
        };
        setEditImageUrls(parseMedia(announcement.image_url));
        const videoUrls = parseMedia(announcement.video_url);
        setEditVideoUrl(videoUrls.length > 0 ? videoUrls[0] : "");
        setEditPdfUrls(parseMedia(announcement.pdf_url));
        setEditError("");
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formTitle.trim() || !formContent.trim()) {
            setFormError("Title and content are required.");
            return;
        }
        setSubmitting(true);
        setFormError("");
        try {
            const payload: any = {
                title: formTitle,
                content: formContent,
                targetType: formTarget,
                targetClassID: formTarget === "CLASS" ? (user?.classLeaderOf || user?.serviceClassID) : null,
                isPinned: false,
                imageUrl: formImageUrls.length > 0 ? formImageUrls : null,
                videoUrl: formVideoUrl ? [formVideoUrl] : null,
                pdfUrl: formPdfUrls.length > 0 ? formPdfUrls : null,
            };
            await apiClient.announcements.createAnnouncement(payload);
            await fetchAnnouncements();
            setShowForm(false);
            setFormTitle("");
            setFormContent("");
            setFormTarget("ALL");
            setFormImageUrls([]);
            setFormVideoUrl("");
            setFormPdfUrls([]);
        } catch (err: any) {
            setFormError(err.response?.data?.message || "Failed to create announcement.");
        } finally {
            setSubmitting(false);
        }
    };

    const uploadFiles = async (
        files: FileList,
        type: "image" | "pdf",
        setter: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        const uploadPromises = Array.from(files).map(async (file: File) => {
            const fd = new FormData();
            fd.append(type, file);
            const res = await api.post(`/upload/${type}`, fd);
            return res.data.data?.[`${type}URL`] || res.data.url;
        });
        const urls = await Promise.all(uploadPromises);
        setter((prev: string[]) => [...prev, ...urls.filter(Boolean)]);
    };

    const filteredAnnouncements = announcements.filter((a: any) => {
        if (isSecretariat) return a.is_public === true;
        if (isServiceManager) {
            if (a.is_public)
                return a.status === "APPROVED" || (a.status === "PENDING" && a.author_id === user?.id);
            else
                return (
                    a.target_class_id === user?.serviceClassID &&
                    (a.status === "APPROVED" || (a.status === "PENDING" && a.author_id === user?.id))
                );
        }
        return a.status === "APPROVED" && (a.is_public || a.target_class_id === user?.serviceClassID);
    });

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
                            <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">Updates and notifications</p>
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
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
                {canCreateAnn && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-[#7A1C1C] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F] hover:bg-[#C9A227] dark:hover:bg-[#e0c040] hover:text-[#7A1C1C] transition-all"
                    >
                        <Plus className="h-4 w-4" /> New
                    </button>
                )}
            </div>

            {/* Create Form */}
            {showForm && (
                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl border-2 border-[#C9A227] dark:border-[#D4AF37] shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-[#ddd8d0] dark:border-[#2a2a2d] bg-linear-to-r from-[#7A1C1C] to-[#C9A227] dark:from-[#D4AF37] dark:to-[#1E4D3A]">
                        <h2 className="text-2xl font-bold text-white dark:text-[#0E0E0F]">Create Announcement</h2>
                        <p className="text-white/80 dark:text-[#0E0E0F]/80 text-sm mt-1">Share updates, media, and more with your community</p>
                    </div>

                    <form onSubmit={handleCreate} className="p-6 space-y-5">
                        <div>
                            <label className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] block mb-1.5">Audience</label>
                            <div className="flex gap-3">
                                {(["ALL", "CLASS"] as const).map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setFormTarget(t)}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold uppercase border-2 transition-all ${formTarget === t
                                                ? "bg-[#7A1C1C] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F] border-transparent shadow-md"
                                                : "border-[#ddd8d0] dark:border-[#2a2a2d] text-[#6b6b6b] dark:text-[#B0B0B0] hover:border-[#C9A227]"
                                            }`}
                                    >
                                        {t === "ALL" ? "Public" : "Class Only"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] block mb-1.5">Title <span className="text-red-500">*</span></label>
                            <Input
                                value={formTitle}
                                onChange={(e) => setFormTitle(e.target.value)}
                                placeholder="Enter announcement title..."
                                className="w-full h-12 rounded-xl border-[#ddd8d0] dark:border-[#2a2a2d] bg-[#F8F5F0] dark:bg-[#252529] text-sm px-4 dark:text-[#F5F5F5] focus:ring-2 focus:ring-[#C9A227]"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] block mb-1.5">Content <span className="text-red-500">*</span></label>
                            <RichTextEditor
                                content={formContent}
                                onChange={setFormContent}
                                placeholder="Write your announcement content..."
                            />
                        </div>

                        {/* Images */}
                        <div>
                            <label className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] block mb-1.5">Images</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => e.target.files && uploadFiles(e.target.files, "image", setFormImageUrls)}
                                    className="flex-1 text-sm text-[#6b6b6b] dark:text-[#B0B0B0] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#7A1C1C] file:text-white hover:file:bg-[#C9A227] dark:file:bg-[#D4AF37] dark:file:text-[#0E0E0F] dark:hover:file:bg-[#e0c040]"
                                />
                                {formImageUrls.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setFormImageUrls([])}
                                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                            {formImageUrls.length > 0 && (
                                <div className="flex flex-wrap gap-3 mt-3">
                                    {formImageUrls.map((url: string, idx: number) => (
                                        <div key={idx} className="relative group">
                                            <img
                                                src={url.startsWith("http") ? url : `${API_BASE}${url}`}
                                                alt=""
                                                className="w-24 h-24 object-cover rounded-lg shadow-md border border-[#ddd8d0] dark:border-[#2a2a2d]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setFormImageUrls((prev: string[]) => prev.filter((_: string, i: number) => i !== idx))}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-sm font-bold shadow-md hover:bg-red-600 transition-colors"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Media Link */}
                        <div>
                            <label className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] block mb-1.5">Media Link (YouTube, TikTok, Vimeo, Google Drive, Telegram, etc.)</label>
                            <Input
                                type="url"
                                value={formVideoUrl}
                                onChange={(e) => setFormVideoUrl(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full h-12 rounded-xl border-[#ddd8d0] dark:border-[#2a2a2d] bg-[#F8F5F0] dark:bg-[#252529] text-sm px-4 dark:text-[#F5F5F5] focus:ring-2 focus:ring-[#C9A227]"
                            />
                            {formVideoUrl && getEmbedUrl(formVideoUrl) && (
                                <div className="mt-3 rounded-xl overflow-hidden border shadow-sm">
                                    <iframe
                                        src={getEmbedUrl(formVideoUrl)!}
                                        className="w-full aspect-video"
                                        allowFullScreen
                                        title="Media preview"
                                    />
                                    <div className="p-2 bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 flex items-center gap-2">
                                        <span>{getPlatformInfo(formVideoUrl).icon}</span>
                                        <span>{getPlatformInfo(formVideoUrl).label}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* PDFs */}
                        <div>
                            <label className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] block mb-1.5">PDFs</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    multiple
                                    onChange={(e) => e.target.files && uploadFiles(e.target.files, "pdf", setFormPdfUrls)}
                                    className="flex-1 text-sm text-[#6b6b6b] dark:text-[#B0B0B0] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#7A1C1C] file:text-white hover:file:bg-[#C9A227] dark:file:bg-[#D4AF37] dark:file:text-[#0E0E0F] dark:hover:file:bg-[#e0c040]"
                                />
                                {formPdfUrls.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setFormPdfUrls([])}
                                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                            {formPdfUrls.length > 0 && (
                                <div className="flex flex-wrap gap-3 mt-3">
                                    {formPdfUrls.map((url: string, idx: number) => (
                                        <div key={idx} className="relative group bg-[#F8F5F0] dark:bg-[#252529] px-4 py-3 rounded-lg border border-[#ddd8d0] dark:border-[#2a2a2d]">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">📄</span>
                                                <a
                                                    href={url.startsWith("http") ? url : `${API_BASE}${url}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm font-medium text-[#7A1C1C] dark:text-[#D4AF37] hover:underline"
                                                >
                                                    PDF {idx + 1}
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormPdfUrls((prev: string[]) => prev.filter((_: string, i: number) => i !== idx))}
                                                    className="ml-auto text-red-500 hover:text-red-700"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {formError && <p className="text-xs text-red-500">⚠ {formError}</p>}

                        <div className="flex gap-3 pt-2 border-t border-[#ddd8d0] dark:border-[#2a2a2d]">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="flex-1 py-3 rounded-xl border border-[#ddd8d0] dark:border-[#2a2a2d] text-sm font-medium hover:bg-[#F8F5F0] dark:hover:bg-[#252529] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-2 py-3 rounded-xl bg-linear-to-r from-[#7A1C1C] to-[#C9A227] dark:from-[#D4AF37] dark:to-[#1E4D3A] text-white dark:text-[#0E0E0F] font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                            >
                                {submitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Posting...
                                    </span>
                                ) : (
                                    'Post Announcement'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Loading skeleton */}
            {loading && (
                <div className="space-y-4">
                    {[1, 2, 3].map((i: number) => (
                        <div key={i} className="bg-white dark:bg-[#1C1C1F] rounded-xl p-5 border border-[#ddd8d0] dark:border-[#2a2a2d] animate-pulse">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#EDE9E2] dark:bg-[#252529] shrink-0" />
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

            {!loading && filteredAnnouncements.length === 0 && (
                <div className="text-center py-16 bg-white dark:bg-[#1C1C1F] rounded-2xl border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <Bell className="h-10 w-10 text-[#C9A227]/30 dark:text-[#D4AF37]/30 mx-auto mb-3" />
                    <p className="text-sm font-medium text-[#6b6b6b] dark:text-[#B0B0B0]">No announcements yet</p>
                    <p className="text-xs text-[#6b6b6b]/60 dark:text-[#B0B0B0]/60 mt-1">Check back later</p>
                </div>
            )}

            <div className="space-y-6">
                {filteredAnnouncements.map((a: any) => (
                    <AnnouncementItem
                        key={a.id}
                        announcement={a}
                        isEditing={editingId === a.id}
                        editTarget={editTarget}
                        setEditTarget={setEditTarget}
                        editTitle={editTitle}
                        setEditTitle={setEditTitle}
                        editContent={editContent}
                        setEditContent={setEditContent}
                        editImageUrls={editImageUrls}
                        setEditImageUrls={setEditImageUrls}
                        editVideoUrl={editVideoUrl}
                        setEditVideoUrl={setEditVideoUrl}
                        editPdfUrls={editPdfUrls}
                        setEditPdfUrls={setEditPdfUrls}
                        editSubmitting={editSubmitting}
                        editError={editError}
                        handleEdit={handleEdit}
                        setEditingId={setEditingId}
                        startEdit={startEdit}
                        handleDeleteAnnouncement={handleDeleteAnnouncement}
                        handleApprove={handleApprove}
                        handleReact={handleReact}
                        handleShare={handleShare}
                        openLightbox={openLightbox}
                        isChairman={isChairman}
                        isSecretariat={isSecretariat}
                        isServiceManager={isServiceManager}
                        user={user}
                        setRejectAnnouncementId={setRejectAnnouncementId}
                        setRejectDialogOpen={setRejectDialogOpen}
                        setDropdownOpen={setDropdownOpen}
                        dropdownOpen={dropdownOpen}
                        uploadFiles={uploadFiles}
                        API_BASE={API_BASE}
                    />
                ))}
            </div>

            {/* Lightbox */}
            <Lightbox
                isOpen={lightboxOpen}
                media={lightboxMedia}
                currentIndex={lightboxIndex}
                onClose={closeLightbox}
                onPrev={goPrev}
                onNext={goNext}
            />

            <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-[#7A1C1C] dark:text-[#D4AF37]">Reject Announcement</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <label className="text-sm font-semibold mb-2 block text-[#6b6b6b] dark:text-[#B0B0B0]">Reason for rejection (will be sent to the creator)</label>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Enter rejection reason..."
                            className="w-full h-24 rounded-lg border border-[#ddd8d0] dark:border-[#2a2a2d] bg-[#F8F5F0] dark:bg-[#252529] text-sm p-3 dark:text-[#F5F5F5] focus:ring-2 focus:ring-[#C9A227]"
                        />
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleReject}>Confirm Reject</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// ===== MAIN PAGE with Suspense =====
export default function AnnouncementsPage() {
    return (
        <Suspense fallback={<div className="p-4 text-center">Loading announcements...</div>}>
            <AnnouncementsContent />
        </Suspense>
    );
}