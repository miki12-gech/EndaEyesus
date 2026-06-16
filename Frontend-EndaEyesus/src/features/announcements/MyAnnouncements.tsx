"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { announcementApi } from './announcementApi';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { useState } from 'react';
import { Edit, Trash2, RefreshCw, File, X } from 'lucide-react';
import api from '@/lib/api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:8080";

interface Announcement {
    id: string;
    title: string;
    content: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DRAFT';
    is_public: boolean;
    rejection_reason?: string | null;
    created_at?: string;
    published_at?: string;
    image_url?: string | string[] | null;
    video_url?: string | string[] | null;
    pdf_url?: string | string[] | null;
}

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

export default function MyAnnouncements() {
    const queryClient = useQueryClient();
    const [editId, setEditId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editImageUrls, setEditImageUrls] = useState<string[]>([]);
    const [editVideoUrl, setEditVideoUrl] = useState<string>('');
    const [editPdfUrls, setEditPdfUrls] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: myData, isLoading, refetch } = useQuery({
        queryKey: ['my-announcements'],
        queryFn: announcementApi.listMy,
    });
    const announcements: Announcement[] = myData?.data?.data || [];

    const uploadFiles = async (files: FileList, type: "image" | "pdf"): Promise<string[]> => {
        const uploadPromises = Array.from(files).map(async (file: File) => {
            const fd = new FormData();
            fd.append(type, file);
            const res = await api.post(`/upload/${type}`, fd);
            return res.data.data?.[`${type}URL`] || res.data.url;
        });
        return Promise.all(uploadPromises);
    };

    const resubmitMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            return announcementApi.resubmit(id, {
                title: data.title,
                content: data.content,
                imageUrl: data.imageUrls?.length > 0 ? data.imageUrls : null,
                videoUrl: data.videoUrl ? [data.videoUrl] : null,
                pdfUrl: data.pdfUrls?.length > 0 ? data.pdfUrls : null,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-announcements'] });
            setEditId(null);
            resetEditForm();
            refetch();
        },
        onError: (err: any) => {
            alert(err.response?.data?.message || 'Failed to resubmit announcement');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => announcementApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-announcements'] });
            refetch();
        },
    });

    const resetEditForm = () => {
        setEditTitle('');
        setEditContent('');
        setEditImageUrls([]);
        setEditVideoUrl('');
        setEditPdfUrls([]);
        setIsSubmitting(false);
    };

    const openEditDialog = (announcement: Announcement) => {
        setEditId(announcement.id);
        setEditTitle(announcement.title);
        setEditContent(announcement.content);
        const parseMedia = (field: any) => {
            if (!field) return [];
            if (Array.isArray(field)) return field;
            try { return JSON.parse(field); } catch { return []; }
        };
        setEditImageUrls(parseMedia(announcement.image_url));
        const videoUrls = parseMedia(announcement.video_url);
        setEditVideoUrl(videoUrls.length > 0 ? videoUrls[0] : '');
        setEditPdfUrls(parseMedia(announcement.pdf_url));
    };

    const handleResubmit = async () => {
        if (!editTitle.trim() || !editContent.trim()) {
            alert('Title and content are required.');
            return;
        }
        setIsSubmitting(true);
        try {
            await resubmitMutation.mutateAsync({
                id: editId!,
                data: {
                    title: editTitle,
                    content: editContent,
                    imageUrls: editImageUrls,
                    videoUrl: editVideoUrl,
                    pdfUrls: editPdfUrls,
                },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin h-8 w-8 border-4 border-[#7A1C1C] border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37]">My Announcements</h2>
                <span className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">
                    {announcements.filter((a: Announcement) => a.status === 'PENDING').length} pending
                </span>
            </div>

            {announcements.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-[#1C1C1F] rounded-2xl border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <p className="text-[#6b6b6b] dark:text-[#B0B0B0]">You haven't created any announcements yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {announcements.map((ann: Announcement) => {
                        const isPending = ann.status === 'PENDING';
                        const isRejected = ann.status === 'REJECTED';
                        const isApproved = ann.status === 'APPROVED';

                        return (
                            <div
                                key={ann.id}
                                className="bg-white dark:bg-[#1C1C1F] rounded-2xl p-5 border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm hover:shadow-md transition-shadow"
                                style={{ borderLeft: `4px solid ${isRejected ? '#EF4444' : isPending ? '#F59E0B' : '#10B981'}` }}
                            >
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-[#F5F5F5] truncate">
                                            {ann.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                                isApproved ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                                isPending ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                            }`}>
                                                {ann.status}
                                            </span>
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                                ann.is_public 
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                                                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                            }`}>
                                                {ann.is_public ? 'Public' : 'Class Only'}
                                            </span>
                                            {isRejected && ann.rejection_reason && (
                                                <span className="text-xs bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2.5 py-1 rounded-full">
                                                    Reason: {ann.rejection_reason}
                                                </span>
                                            )}
                                        </div>
                                        <div 
                                            className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mt-2 line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: ann.content }}
                                        />
                                        <div className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] mt-2">
                                            {new Date(ann.created_at || ann.published_at || Date.now()).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {isRejected && (
                                            <Button
                                                size="sm"
                                                onClick={() => openEditDialog(ann)}
                                                className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1.5 rounded-lg"
                                            >
                                                <Edit className="h-3.5 w-3.5 mr-1.5" /> Edit & Resubmit
                                            </Button>
                                        )}
                                        {!isApproved && (
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => {
                                                    if (confirm('Delete this announcement?')) {
                                                        deleteMutation.mutate(ann.id);
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <Dialog open={!!editId} onOpenChange={(open: boolean) => !open && setEditId(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1C1C1F] p-0 border-0 shadow-2xl rounded-2xl">
                    <div className="p-6 border-b border-[#ddd8d0] dark:border-[#2a2a2d] bg-gradient-to-r from-[#7A1C1C] to-[#C9A227] dark:from-[#D4AF37] dark:to-[#1E4D3A]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-white dark:text-[#0E0E0F]">
                                Edit & Resubmit
                            </DialogTitle>
                            <p className="text-white/80 dark:text-[#0E0E0F]/80 text-sm mt-1">
                                Update your announcement and submit it for approval again.
                            </p>
                        </DialogHeader>
                    </div>

                    <div className="p-6 space-y-5">
                        <div>
                            <label className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] block mb-1.5">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Enter announcement title..."
                                className="w-full h-12 rounded-xl border-[#ddd8d0] dark:border-[#2a2a2d] bg-[#F8F5F0] dark:bg-[#252529] text-sm px-4 dark:text-[#F5F5F5] focus:ring-2 focus:ring-[#C9A227]"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] block mb-1.5">
                                Content <span className="text-red-500">*</span>
                            </label>
                            <RichTextEditor
                                content={editContent}
                                onChange={setEditContent}
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
                                    onChange={async (e) => {
                                        if (e.target.files?.length) {
                                            try {
                                                const urls = await uploadFiles(e.target.files, 'image');
                                                setEditImageUrls((prev: string[]) => [...prev, ...urls]);
                                            } catch (err) {
                                                alert('Image upload failed. Please check file size and format.');
                                                console.error(err);
                                            }
                                        }
                                    }}
                                    className="flex-1 text-sm text-[#6b6b6b] dark:text-[#B0B0B0] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#7A1C1C] file:text-white hover:file:bg-[#C9A227] dark:file:bg-[#D4AF37] dark:file:text-[#0E0E0F] dark:hover:file:bg-[#e0c040]"
                                />
                                {editImageUrls.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setEditImageUrls([])}
                                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                            {editImageUrls.length > 0 && (
                                <div className="flex flex-wrap gap-3 mt-3">
                                    {editImageUrls.map((url: string, idx: number) => (
                                        <div key={idx} className="relative group">
                                            <img
                                                src={url.startsWith('http') ? url : `${API_BASE}${url}`}
                                                alt=""
                                                className="w-24 h-24 object-cover rounded-lg shadow-md border border-[#ddd8d0] dark:border-[#2a2a2d]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setEditImageUrls((prev: string[]) => prev.filter((_: string, i: number) => i !== idx))}
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
                                value={editVideoUrl}
                                onChange={(e) => setEditVideoUrl(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full h-12 rounded-xl border-[#ddd8d0] dark:border-[#2a2a2d] bg-[#F8F5F0] dark:bg-[#252529] text-sm px-4 dark:text-[#F5F5F5] focus:ring-2 focus:ring-[#C9A227]"
                            />
                            {editVideoUrl && getEmbedUrl(editVideoUrl) && (
                                <div className="mt-3 rounded-xl overflow-hidden border shadow-sm">
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
                            <label className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5] block mb-1.5">PDFs</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    multiple
                                    onChange={async (e) => {
                                        if (e.target.files?.length) {
                                            try {
                                                const urls = await uploadFiles(e.target.files, 'pdf');
                                                setEditPdfUrls((prev: string[]) => [...prev, ...urls]);
                                            } catch (err) {
                                                alert('PDF upload failed. Please check file size and format.');
                                                console.error(err);
                                            }
                                        }
                                    }}
                                    className="flex-1 text-sm text-[#6b6b6b] dark:text-[#B0B0B0] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#7A1C1C] file:text-white hover:file:bg-[#C9A227] dark:file:bg-[#D4AF37] dark:file:text-[#0E0E0F] dark:hover:file:bg-[#e0c040]"
                                />
                                {editPdfUrls.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setEditPdfUrls([])}
                                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                            {editPdfUrls.length > 0 && (
                                <div className="flex flex-wrap gap-3 mt-3">
                                    {editPdfUrls.map((url: string, idx: number) => (
                                        <div key={idx} className="relative group bg-[#F8F5F0] dark:bg-[#252529] px-4 py-3 rounded-lg border border-[#ddd8d0] dark:border-[#2a2a2d]">
                                            <div className="flex items-center gap-3">
                                                <File className="h-5 w-5 text-[#7A1C1C] dark:text-[#D4AF37]" />
                                                <a
                                                    href={url.startsWith('http') ? url : `${API_BASE}${url}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm font-medium text-[#7A1C1C] dark:text-[#D4AF37] hover:underline"
                                                >
                                                    PDF {idx + 1}
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => setEditPdfUrls((prev: string[]) => prev.filter((_: string, i: number) => i !== idx))}
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
                    </div>

                    <DialogFooter className="p-6 border-t border-[#ddd8d0] dark:border-[#2a2a2d] bg-[#F8F5F0] dark:bg-[#0E0E0F] rounded-b-2xl">
                        <div className="flex items-center justify-between w-full gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setEditId(null)}
                                className="px-6 py-2.5 rounded-xl border-[#ddd8d0] dark:border-[#2a2a2d] text-[#6b6b6b] dark:text-[#B0B0B0] hover:bg-[#EDE9E2] dark:hover:bg-[#252529] transition-colors"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleResubmit}
                                disabled={isSubmitting || !editTitle.trim() || !editContent.trim()}
                                className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#7A1C1C] to-[#C9A227] dark:from-[#D4AF37] dark:to-[#1E4D3A] text-white dark:text-[#0E0E0F] font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Submitting...
                                    </span>
                                ) : (
                                    <>
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Resubmit for Approval
                                    </>
                                )}
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}